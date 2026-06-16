import type { GameEvent, GameState, Stats, StatKey } from "./types";
import { PERSONA_BY_ID } from "./personas";

// ── Tunable constants ──────────────────────────────────────────────────────
export const SCHEMA = 1;
export const DECISIONS_PER_TERM = 24; // ~4 years of monthly-ish calls
export const DAYS_PER_DECISION = 61; // 24 * 61 ≈ 1,464 days ≈ a full term
export const TERM_LIMIT = 2; // term-limited out, just like the real thing
const TREND_LEN = 16;
const CAPITAL_MAX = 20;
const CAPITAL_PER_DECISION = 1;

export const STAT_KEYS: StatKey[] = ["approval", "economy", "stability", "world"];

export const STAT_META: Record<StatKey, { label: string; emoji: string; short: string }> = {
  approval: { label: "Approval", emoji: "🇺🇸", short: "APP" },
  economy: { label: "Economy", emoji: "💵", short: "ECO" },
  stability: { label: "Stability", emoji: "⚖️", short: "STB" },
  world: { label: "World Standing", emoji: "🌐", short: "WLD" },
};

export const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

// ── Career creation ────────────────────────────────────────────────────────
export function createCareer(name: string, personaId: string, pool: GameEvent[]): GameState {
  const persona = PERSONA_BY_ID[personaId] ?? PERSONA_BY_ID["professor"];
  const base: Stats = { approval: 50, economy: 50, stability: 50, world: 50, ...persona.startStats };
  const stats: Stats = {
    approval: clamp(base.approval),
    economy: clamp(base.economy),
    stability: clamp(base.stability),
    world: clamp(base.world),
  };

  const state: GameState = {
    schema: SCHEMA,
    president: { name: name.trim() || "President", personaId: persona.id },
    stats,
    capital: persona.startCapital,
    day: 1,
    term: 1,
    termDecisions: 0,
    decisions: 0,
    peakApproval: stats.approval,
    legacy: 0,
    flags: {},
    seenEvents: [],
    achievements: [],
    approvalTrend: [stats.approval],
    log: [],
    status: "playing",
    currentEventId: null,
    lastChoiceId: null,
    pendingToasts: [],
  };

  return withNextEvent(state, pool, null);
}

// ── Event eligibility & selection ──────────────────────────────────────────
function isEligible(state: GameState, ev: GameEvent): boolean {
  if (ev.once !== false && state.seenEvents.includes(ev.id)) return false;
  if (ev.minDay && state.day < ev.minDay) return false;
  if (ev.requireFlags && !ev.requireFlags.every((f) => state.flags[f])) return false;
  if (ev.forbidFlags && ev.forbidFlags.some((f) => state.flags[f])) return false;
  if (ev.requireStat) {
    for (const k of Object.keys(ev.requireStat) as StatKey[]) {
      const range = ev.requireStat[k]!;
      const v = state.stats[k];
      if (v < range[0] || v > range[1]) return false;
    }
  }
  // Need at least one choice the player can actually afford.
  if (!ev.choices.some((c) => (c.cost ?? 0) <= state.capital)) return false;
  return true;
}

export function pickEvent(
  state: GameState,
  pool: GameEvent[],
  avoidCategory: string | null
): GameEvent | null {
  const eligible = pool.filter((ev) => isEligible(state, ev));
  if (eligible.length === 0) return null;

  // Weight events; soften repeats of the same category back-to-back.
  const weighted = eligible.map((ev) => {
    let w = ev.weight ?? 1;
    if (avoidCategory && ev.category === avoidCategory) w *= 0.25;
    return { ev, w };
  });

  const total = weighted.reduce((s, x) => s + x.w, 0);
  let roll = Math.random() * total;
  for (const { ev, w } of weighted) {
    roll -= w;
    if (roll <= 0) return ev;
  }
  return weighted[weighted.length - 1].ev;
}

function withNextEvent(state: GameState, pool: GameEvent[], avoidCategory: string | null): GameState {
  const next = pickEvent(state, pool, avoidCategory);
  return {
    ...state,
    status: "playing",
    currentEventId: next ? next.id : null,
    lastChoiceId: null,
  };
}

export function getEvent(pool: GameEvent[], id: string | null): GameEvent | undefined {
  if (!id) return undefined;
  return pool.find((e) => e.id === id);
}

// ── Making a decision ──────────────────────────────────────────────────────
function intensity(state: GameState, category: string): number {
  // Later terms hit harder on the dramatic stuff.
  const dangerous = category === "crisis" || category === "security" || category === "scandal";
  return dangerous ? 1 + (state.term - 1) * 0.12 : 1;
}

export function chooseOption(state: GameState, pool: GameEvent[], choiceId: string): GameState {
  const ev = getEvent(pool, state.currentEventId);
  if (!ev) return state;
  const choice = ev.choices.find((c) => c.id === choiceId);
  if (!choice) return state;
  if ((choice.cost ?? 0) > state.capital) return state; // can't afford

  const scale = intensity(state, ev.category);
  const e = choice.effects;
  const applyDelta = (cur: number, delta: number | undefined) => {
    if (delta == null) return cur;
    return clamp(cur + (delta < 0 ? delta * scale : delta));
  };

  const stats: Stats = {
    approval: applyDelta(state.stats.approval, e.approval),
    economy: applyDelta(state.stats.economy, e.economy),
    stability: applyDelta(state.stats.stability, e.stability),
    world: applyDelta(state.stats.world, e.world),
  };

  // Political capital: small passive income, plus the choice's own delta, minus cost.
  let capital = state.capital + CAPITAL_PER_DECISION + (e.capital ?? 0) - (choice.cost ?? 0);
  capital = Math.max(0, Math.min(CAPITAL_MAX, capital));

  // Legacy grows with how the public sees you, plus any explicit legacy swing.
  const legacy = state.legacy + Math.round(stats.approval / 8) + (e.legacy ?? 0);

  const flags = { ...state.flags };
  choice.setFlags?.forEach((f) => (flags[f] = true));
  choice.clearFlags?.forEach((f) => delete flags[f]);

  const day = state.day + DAYS_PER_DECISION;
  const decisions = state.decisions + 1;
  const termDecisions = state.termDecisions + 1;
  const approvalTrend = [...state.approvalTrend, stats.approval].slice(-TREND_LEN);

  let next: GameState = {
    ...state,
    stats,
    capital,
    legacy,
    flags,
    day,
    decisions,
    termDecisions,
    approvalTrend,
    peakApproval: Math.max(state.peakApproval, stats.approval),
    seenEvents: state.seenEvents.includes(ev.id) ? state.seenEvents : [...state.seenEvents, ev.id],
    log: [
      ...state.log,
      {
        day,
        term: state.term,
        eventTitle: ev.title,
        choiceLabel: choice.label,
        approvalAfter: stats.approval,
      },
    ].slice(-200),
    status: "result",
    lastChoiceId: choiceId,
  };

  // Award achievements: the choice's own unlock, then any stat/flag milestones.
  if (choice.unlock) next = award(next, choice.unlock);
  next = checkMilestones(next);
  return next;
}

// ── What happens after you read the headlines ──────────────────────────────
export function continueAfterResult(state: GameState, pool: GameEvent[]): GameState {
  // Fatal outcomes first — you see the fallout, then the consequences.
  if (state.stats.approval <= 0) {
    return finalizeCareer(state, "gameover",
      "Your approval cratered to zero. With the cabinet eyeing the exits, you resign before they can remove you.");
  }
  if (state.stats.stability <= 0) {
    return finalizeCareer(state, "gameover",
      "The government collapses around you. Congress and the courts move in unison — you are removed from office.");
  }

  // End of a term?
  if (state.termDecisions >= DECISIONS_PER_TERM) {
    if (state.term < TERM_LIMIT) {
      return { ...state, status: "election" };
    }
    // Completed the final allowed term — a triumphant, term-limited exit.
    const flagged = { ...state, flags: { ...state.flags, two_terms_done: true as const } };
    const awarded = award(flagged, "two_terms");
    return finalizeCareer(awarded, "victory",
      "Term-limited out after two full terms. You walk out the way few do — on your own terms, into the history books.");
  }

  const ev = getEvent(pool, state.currentEventId);
  return withNextEvent(state, pool, ev?.category ?? null);
}

// ── Elections ──────────────────────────────────────────────────────────────
export interface ElectionResult {
  won: boolean;
  share: number; // your share of the two-party vote, for the reveal
  state: GameState;
}

export function resolveElection(state: GameState, pool: GameEvent[]): ElectionResult {
  const s = state.stats;
  // Approval dominates; the economy is the next-biggest lever.
  const raw = s.approval * 0.6 + s.economy * 0.22 + s.stability * 0.1 + s.world * 0.08;
  const swing = (Math.random() - 0.5) * 10; // a few points of election-night noise
  const share = clamp(raw + swing, 28, 72);
  const won = share >= 50;

  if (!won) {
    const ended = finalizeCareer(state, "gameover",
      `You lost the election with ${share.toFixed(1)}% of the vote. The voters thanked you for your service — and chose someone else.`);
    return { won, share, state: ended };
  }

  let next: GameState = {
    ...state,
    term: state.term + 1,
    termDecisions: 0,
    legacy: state.legacy + 120, // a mandate is worth something
    flags: { ...state.flags, reelected: true as const },
    // A fresh mandate buys a little goodwill and capital.
    stats: { ...state.stats, approval: clamp(state.stats.approval + 4) },
    capital: Math.min(CAPITAL_MAX, state.capital + 3),
  };
  next = award(next, "reelected");
  next = withNextEvent(next, pool, null);
  return { won, share, state: next };
}

// ── Endgame & legacy ───────────────────────────────────────────────────────
export const LEGACY_RANKS: { min: number; title: string; note: string }[] = [
  { min: 900, title: "Mount Rushmore", note: "Generations will study your presidency." },
  { min: 750, title: "Transformational", note: "You bent the arc of history." },
  { min: 600, title: "Consequential", note: "A presidency that mattered." },
  { min: 440, title: "Solid", note: "A steady hand on the wheel." },
  { min: 300, title: "Forgettable", note: "A footnote, but not a stain." },
  { min: 150, title: "Troubled", note: "A presidency that struggled." },
  { min: -9999, title: "Disgraced", note: "History will not be kind." },
];

export function legacyRank(legacy: number) {
  return LEGACY_RANKS.find((r) => legacy >= r.min) ?? LEGACY_RANKS[LEGACY_RANKS.length - 1];
}

export function finalizeCareer(
  state: GameState,
  status: "gameover" | "victory",
  reason: string
): GameState {
  let next: GameState = { ...state, status, endReason: reason, currentEventId: null };
  if (status === "gameover") next = award(next, "disgraced");
  if (next.legacy >= 800) next = award(next, "rushmore");
  return next;
}

// ── Achievements ───────────────────────────────────────────────────────────
function award(state: GameState, id: string): GameState {
  if (state.achievements.includes(id)) return state;
  return {
    ...state,
    achievements: [...state.achievements, id],
    pendingToasts: [...state.pendingToasts, id],
  };
}

function checkMilestones(state: GameState): GameState {
  let s = state;
  const { stats, decisions, day, flags } = s;
  if (decisions >= 1) s = award(s, "first_call");
  if (stats.approval >= 80) s = award(s, "landslide");
  if (stats.approval < 20 && stats.approval > 0) s = award(s, "underwater");
  if (stats.economy >= 85) s = award(s, "boom");
  if (stats.world >= 85) s = award(s, "peacemaker");
  if (stats.stability >= 85) s = award(s, "iron_grip");
  if (day > 1000) s = award(s, "survivor");
  if (decisions >= 50) s = award(s, "veteran");
  if (flags["weathered_scandal"]) s = award(s, "scandal");
  const inBand = STAT_KEYS.every((k) => stats[k] >= 45 && stats[k] <= 55);
  if (inBand) s = award(s, "centrist");
  return s;
}

export function clearToasts(state: GameState): GameState {
  return state.pendingToasts.length ? { ...state, pendingToasts: [] } : state;
}
