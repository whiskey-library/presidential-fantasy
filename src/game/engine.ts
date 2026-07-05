import type {
  Choice,
  Difficulty,
  DifficultySpec,
  Effects,
  FiredEcho,
  GameEvent,
  GameState,
  MidtermResult,
  Stats,
  StatKey,
} from "./types";
import { PERSONA_BY_ID } from "./personas";
import { drawFrom, hashSeed } from "./rng";
import { genInitialCabinet, memberForEvent, positionForCategory, TRAITS } from "./cabinet";

// ── Tunable constants ──────────────────────────────────────────────────────
export const SCHEMA = 3;
export const DECISIONS_PER_TERM = 24; // ~4 years of monthly-ish calls
export const MIDTERM_AT = 12; // halfway through a term
export const DAYS_PER_DECISION = 61; // 24 * 61 ≈ 1,464 days ≈ a full term
export const TERM_LIMIT = 2; // term-limited out, just like the real thing
const TREND_LEN = 16;
const CAPITAL_MAX = 20;
const CAPITAL_PER_DECISION = 1;
const RECESSION_LINE = 25;
const UNREST_LINE = 25;
const WATCH_TRIGGER = 3; // consecutive decisions below the line

export const STAT_KEYS: StatKey[] = ["approval", "economy", "stability", "world"];

export const STAT_META: Record<StatKey, { label: string; emoji: string; short: string }> = {
  approval: { label: "Approval", emoji: "🇺🇸", short: "APP" },
  economy: { label: "Economy", emoji: "💵", short: "ECO" },
  stability: { label: "Stability", emoji: "⚖️", short: "STB" },
  world: { label: "World Standing", emoji: "🌐", short: "WLD" },
};

export const DIFFICULTIES: DifficultySpec[] = [
  {
    id: "easy",
    name: "Honeymoon",
    blurb: "Gentler setbacks, no clock. Learn the ropes.",
    emoji: "🌤️",
    negScale: 0.85,
    timer: 0,
    electionNoise: 8,
  },
  {
    id: "normal",
    name: "Commander",
    blurb: "The real job: a ticking clock and honest consequences.",
    emoji: "🦅",
    negScale: 1,
    timer: 45,
    electionNoise: 10,
  },
  {
    id: "hard",
    name: "Crucible",
    blurb: "Brutal press, harder falls, 30 seconds to decide.",
    emoji: "🔥",
    negScale: 1.2,
    timer: 30,
    electionNoise: 12,
  },
];

export const DIFFICULTY_BY_ID: Record<Difficulty, DifficultySpec> = Object.fromEntries(
  DIFFICULTIES.map((d) => [d.id, d])
) as Record<Difficulty, DifficultySpec>;

export const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

// ── RNG: Math.random for free play, seeded stream for daily runs ───────────
const draw = drawFrom<GameState>;

// ── Career creation ────────────────────────────────────────────────────────
export function createCareer(
  name: string,
  personaId: string,
  pool: GameEvent[],
  difficulty: Difficulty = "normal",
  dailySeed: string | null = null
): GameState {
  const persona = PERSONA_BY_ID[personaId] ?? PERSONA_BY_ID["professor"];
  const base: Stats = { approval: 50, economy: 50, stability: 50, world: 50, ...persona.startStats };
  const stats: Stats = {
    approval: clamp(base.approval),
    economy: clamp(base.economy),
    stability: clamp(base.stability),
    world: clamp(base.world),
  };

  // Seed the cabinet: daily runs derive it from the day's seed (same six
  // officials for everyone), free play from entropy.
  const seedCursor = dailySeed ? hashSeed(`PF-${dailySeed}`) : hashSeed(`${name}-${Date.now()}`);
  const { cabinet, rngState: cabCursor } = genInitialCabinet(seedCursor);

  const state: GameState = {
    schema: SCHEMA,
    president: { name: name.trim() || "President", personaId: persona.id },
    difficulty,
    dailySeed,
    rngState: dailySeed ? cabCursor : 0,
    stats,
    capital: persona.startCapital,
    day: 1,
    term: 1,
    termDecisions: 0,
    decisions: 0,
    peakApproval: stats.approval,
    legacy: 0,
    mood: 0,
    streak: 0,
    recessionWatch: 0,
    unrestWatch: 0,
    flags: {},
    seenEvents: [],
    achievements: [],
    approvalTrend: [stats.approval],
    log: [],
    pendingEchoes: [],
    lastEchoes: [],
    midterm: null,
    midtermDone: false,
    status: "playing",
    currentEventId: null,
    lastChoiceId: null,
    dithered: false,
    pendingToasts: [],
    notices: [],
    cabinet,
    hiring: {},
    ordersUsed: {},
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
): { event: GameEvent | null; state: GameState } {
  const eligible = pool.filter((ev) => isEligible(state, ev));
  if (eligible.length === 0) return { event: null, state };

  // Weight events; soften repeats of the same category back-to-back.
  // Sort for determinism in seeded runs (pool order is stable, but be explicit).
  const weighted = eligible
    .map((ev) => {
      let w = ev.weight ?? 1;
      if (avoidCategory && ev.category === avoidCategory) w *= 0.25;
      return { ev, w };
    })
    .sort((a, b) => (a.ev.id < b.ev.id ? -1 : 1));

  const total = weighted.reduce((s, x) => s + x.w, 0);
  const { state: nextState, value } = draw(state);
  let roll = value * total;
  for (const { ev, w } of weighted) {
    roll -= w;
    if (roll <= 0) return { event: ev, state: nextState };
  }
  return { event: weighted[weighted.length - 1].ev, state: nextState };
}

function withNextEvent(state: GameState, pool: GameEvent[], avoidCategory: string | null): GameState {
  const { event, state: nextState } = pickEvent(state, pool, avoidCategory);
  return {
    ...nextState,
    status: "playing",
    currentEventId: event ? event.id : null,
    lastChoiceId: null,
    dithered: false,
    lastEchoes: [],
    notices: [],
  };
}

export function getEvent(pool: GameEvent[], id: string | null): GameEvent | undefined {
  if (!id) return undefined;
  return pool.find((e) => e.id === id);
}

// ── Persona + difficulty + mood scaling ─────────────────────────────────────
function scaleEffects(state: GameState, ev: GameEvent, choice: Choice): Effects {
  const spec = DIFFICULTY_BY_ID[state.difficulty] ?? DIFFICULTY_BY_ID.normal;
  const persona = state.president.personaId;
  const dangerous = ev.category === "crisis" || ev.category === "security" || ev.category === "scandal";
  // Later terms hit harder on the dramatic stuff.
  const termScale = dangerous ? 1 + (state.term - 1) * 0.12 : 1;

  // The seat that owns this event — their trait bends the outcome.
  const owner = memberForEvent(state, ev.source, ev.category);
  const trait = owner?.member.trait ?? null;

  const out: Effects = {};
  for (const k of Object.keys(choice.effects) as (keyof Effects)[]) {
    let v = choice.effects[k]!;
    if (v < 0) v *= spec.negScale * termScale;
    // The Reformer swings harder on bold moves — both directions.
    if (persona === "reformer" && choice.bold) v *= 1.2;
    // The Tycoon squeezes extra from good economic news.
    if (persona === "tycoon" && k === "economy" && v > 0) v += 1;
    // The General shrugs off crisis/security fallout.
    if (persona === "general" && dangerous && v < 0) v *= 0.75;
    // ── Cabinet traits (stat keys only — capital/legacy handled elsewhere) ──
    if (trait && (k === "approval" || k === "economy" || k === "stability" || k === "world")) {
      if (trait === "steady" && v < 0) v *= 0.75;
      if (trait === "hawk") v *= 1.2;
      if (trait === "crony") v *= 0.8;
      if (trait === "brilliant" && v > 0) v += 2 / countPositive(choice.effects);
    }
    out[k] = v;
  }
  // Media Darling: +1 approval on any call in their field.
  if (trait === "media") out.approval = (out.approval ?? 0) + 1;

  // National mood bends approval swings: euphoric crowds amplify wins,
  // furious crowds amplify losses.
  if (out.approval != null) {
    if (state.mood >= 4 && out.approval > 0) out.approval += 1;
    if (state.mood <= -4 && out.approval < 0) out.approval -= 1;
  }
  return out;
}

/** How many positive stat deltas a choice has (for splitting Brilliant's +2). */
function countPositive(effects: Effects): number {
  let n = 0;
  for (const k of ["approval", "economy", "stability", "world"] as const) {
    if ((effects[k] ?? 0) > 0) n++;
  }
  return Math.max(1, n);
}

// ── Making a decision ──────────────────────────────────────────────────────
/** The synthetic "you ran out the clock" outcome. */
export const DITHER_CHOICE: Choice = {
  id: "__dither",
  label: "You let the clock run out",
  effects: { approval: -4, stability: -2, capital: -1 },
  result:
    "You waited for a cleaner option that never came. The moment passed, aides scrambled to spin the silence, and the country noticed the empty podium.",
  news: [
    { outlet: "beacon", headline: "White House silent as the deadline passes", tone: "negative" },
    { outlet: "ledger", headline: "Indecision at the top — leadership vacuum feared", tone: "negative" },
    { outlet: "tribune", headline: "A presidency of dithering?", tone: "negative" },
    { outlet: "buzz", headline: "POTUS FREEZES 🥶 — nation left on READ", tone: "negative" },
  ],
  social: [
    { handle: "@decisive_dan", text: "not choosing is also a choice. a bad one.", sentiment: "negative" },
  ],
  advisor: "Indecision is the one move with no upside. Next time, pick a lane — any lane.",
};

export function chooseOption(state: GameState, pool: GameEvent[], choiceId: string): GameState {
  // Reject any late-arriving call (timer expiry racing a human click, etc.) —
  // exactly one decision may resolve per briefing.
  if (state.status !== "playing") return state;
  const ev = getEvent(pool, state.currentEventId);
  if (!ev) return state;
  const dithered = choiceId === DITHER_CHOICE.id;
  const choice = dithered ? DITHER_CHOICE : ev.choices.find((c) => c.id === choiceId);
  if (!choice) return state;
  if ((choice.cost ?? 0) > state.capital) return state; // can't afford

  const scaled = scaleEffects(state, ev, choice);
  const applyDelta = (cur: number, delta: number | undefined) =>
    delta == null ? cur : clamp(cur + delta);

  let stats: Stats = {
    approval: applyDelta(state.stats.approval, scaled.approval),
    economy: applyDelta(state.stats.economy, scaled.economy),
    stability: applyDelta(state.stats.stability, scaled.stability),
    world: applyDelta(state.stats.world, scaled.world),
  };

  // Carry notices queued between decisions (firings, appointments, orders).
  const notices: string[] = [...state.notices];
  const decisions = state.decisions + 1;

  // Political capital: passive income, persona bonus, choice delta, minus cost.
  let capital = state.capital + CAPITAL_PER_DECISION + (scaled.capital ?? 0) - (choice.cost ?? 0);
  if (state.president.personaId === "professor" && decisions % 4 === 0) {
    capital += 1;
    notices.push("🎓 The Professor's homework pays off: +1 bonus Capital.");
  }

  // ── Cabinet trait side-effects (the owning seat for this event) ──────────
  const owner = dithered ? null : memberForEvent(state, ev.source, ev.category);
  if (owner) {
    const { member } = owner;
    if (member.trait === "loyal" && choice.bold) {
      capital += 1;
      notices.push(`🤝 ${member.name} covers for the bold call: +1 Capital.`);
    }
    if (member.trait === "crony") {
      capital += 1;
      notices.push(`🥃 ${member.name} calls in a favor: +1 Capital. (Their work? Sloppy.)`);
    }
    if (member.trait === "brilliant") {
      stats = { ...stats, stability: clamp(stats.stability - 1) };
      notices.push(`🧠 ${member.name} is right again — and everyone in the room hates it. −1 Stability.`);
    }
    if (member.trait === "steady") {
      notices.push(`🪨 ${member.name} (${TRAITS.steady.name}) kept the worst of it off your desk.`);
    }
    if (member.trait === "hawk") {
      notices.push(`🦅 ${member.name} pushed it further than you asked. Everything hits harder.`);
    }
  } else if (!dithered && positionForCategory(ev.category) && !state.cabinet[positionForCategory(ev.category)!]) {
    // A vacant seat means nobody sanded the edges: small stability tax.
    stats = { ...stats, stability: clamp(stats.stability - 1) };
    notices.push("🪑 That portfolio has no secretary right now. The chaos costs 1 Stability.");
  }

  // ── Echoes: queue this choice's echo, fire any that are due ─────────────
  let pendingEchoes = [...state.pendingEchoes];
  if (choice.echo) {
    pendingEchoes.push({
      ...choice.echo,
      dueAtDecision: decisions + Math.max(1, choice.echo.delay),
      sourceTitle: ev.title,
    });
  }
  const firing = pendingEchoes.filter((e) => e.dueAtDecision <= decisions);
  pendingEchoes = pendingEchoes.filter((e) => e.dueAtDecision > decisions);
  const lastEchoes: FiredEcho[] = [];
  let echoLegacy = 0;
  for (const echo of firing) {
    stats = {
      approval: applyDelta(stats.approval, echo.effects.approval),
      economy: applyDelta(stats.economy, echo.effects.economy),
      stability: applyDelta(stats.stability, echo.effects.stability),
      world: applyDelta(stats.world, echo.effects.world),
    };
    capital += echo.effects.capital ?? 0;
    echoLegacy += echo.effects.legacy ?? 0;
    lastEchoes.push({
      title: echo.title,
      text: echo.text,
      effects: echo.effects,
      tone: echo.tone,
      sourceTitle: echo.sourceTitle,
    });
  }

  // ── Systemic watchers: slow-burn consequences of neglect ────────────────
  let recessionWatch = stats.economy < RECESSION_LINE ? state.recessionWatch + 1 : 0;
  let unrestWatch = stats.stability < UNREST_LINE ? state.unrestWatch + 1 : 0;
  const flags = { ...state.flags };
  choice.setFlags?.forEach((f) => (flags[f] = true));
  choice.clearFlags?.forEach((f) => delete flags[f]);

  if (recessionWatch >= WATCH_TRIGGER && !flags["recession_declared"]) {
    flags["recession_declared"] = true;
    recessionWatch = 0;
    stats = { ...stats, approval: clamp(stats.approval - 6) };
    lastEchoes.push({
      title: "Recession Declared",
      text: "Three straight quarters in the red. Economists make it official, and the word alone drains confidence from every kitchen table in the country.",
      effects: { approval: -6 },
      tone: "negative",
      sourceTitle: "A neglected economy",
    });
  }
  if (unrestWatch >= WATCH_TRIGGER && !flags["unrest_erupted"]) {
    flags["unrest_erupted"] = true;
    unrestWatch = 0;
    stats = { ...stats, approval: clamp(stats.approval - 4), world: clamp(stats.world - 3) };
    lastEchoes.push({
      title: "Nationwide Unrest",
      text: "Weeks of instability boil over into the streets. Foreign papers run the images on every front page.",
      effects: { approval: -4, world: -3 },
      tone: "negative",
      sourceTitle: "A destabilized country",
    });
  }
  // Recovery clears the scars so they can (grimly) happen again.
  if (flags["recession_declared"] && stats.economy >= 45) delete flags["recession_declared"];
  if (flags["unrest_erupted"] && stats.stability >= 45) delete flags["unrest_erupted"];

  // ── Momentum: reward win streaks with capital ────────────────────────────
  const approvalDelta = stats.approval - state.stats.approval;
  let streak = approvalDelta > 0 ? state.streak + 1 : 0;
  if (streak >= 3) {
    streak = 0;
    capital += 2;
    notices.push("🔥 Momentum! Three wins in a row — +2 Capital.");
  }

  // ── National mood drifts with the crowd, decays toward neutral ──────────
  let mood = state.mood + Math.max(-3, Math.min(3, approvalDelta));
  mood = mood > 0 ? mood - 1 : mood < 0 ? mood + 1 : 0;
  mood = Math.max(-8, Math.min(8, mood));

  capital = Math.max(0, Math.min(CAPITAL_MAX, Math.round(capital)));

  // Legacy grows with how the public sees you, plus any explicit legacy swing.
  const legacy =
    state.legacy + Math.round(stats.approval / 8) + Math.round(scaled.legacy ?? 0) + echoLegacy;

  const day = state.day + DAYS_PER_DECISION;
  const termDecisions = state.termDecisions + 1;
  const approvalTrend = [...state.approvalTrend, stats.approval].slice(-TREND_LEN);

  let next: GameState = {
    ...state,
    stats,
    capital,
    legacy,
    mood,
    streak,
    recessionWatch,
    unrestWatch,
    flags,
    day,
    decisions,
    termDecisions,
    approvalTrend,
    pendingEchoes,
    lastEchoes,
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
    lastChoiceId: choice.id,
    dithered,
    notices,
    // What actually hit the meters (scaled), rounded for display.
    lastEffects: Object.fromEntries(
      Object.entries(scaled).map(([k, v]) => [k, Math.round(v as number)])
    ) as Effects,
  };

  if (!dithered && choice.unlock) next = award(next, choice.unlock);
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

  // Midterms at the halfway mark of every term.
  if (!state.midtermDone && state.termDecisions >= MIDTERM_AT && state.termDecisions < DECISIONS_PER_TERM) {
    return runMidterm(state);
  }

  // End of a term?
  if (state.termDecisions >= DECISIONS_PER_TERM) {
    if (state.term < TERM_LIMIT) {
      // Draw election-night randomness ONCE, here, and persist it — so neither
      // re-renders nor a reload-on-the-verdict can ever re-roll the outcome.
      const { state: drawn, value } = draw(state);
      return { ...drawn, status: "election", electionRoll: value };
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

// ── Midterms ────────────────────────────────────────────────────────────────
function runMidterm(state: GameState): GameState {
  const s = state.stats;
  const raw = s.approval * 0.7 + s.economy * 0.3;
  const { state: drawn, value } = draw(state);
  const share = clamp(raw + (value - 0.5) * 12, 25, 75);

  let midterm: MidtermResult;
  if (share >= 52) {
    midterm = {
      share,
      tier: "hold",
      title: "Your Party Holds Congress",
      text: "The country just handed you a governing majority for the back half of the term. Use it.",
      effects: { stability: 5, capital: 2 },
    };
  } else if (share >= 46) {
    midterm = {
      share,
      tier: "split",
      title: "A Split Decision",
      text: "Congress splits down the middle. Every bill from here on is a knife fight.",
      effects: { stability: -2 },
    };
  } else {
    midterm = {
      share,
      tier: "lose",
      title: "You Lose the House",
      text: "A midterm shellacking. The opposition now controls the committees — and the subpoenas.",
      effects: { stability: -7, capital: -1 },
    };
  }

  const stats: Stats = {
    ...drawn.stats,
    stability: clamp(drawn.stats.stability + (midterm.effects.stability ?? 0)),
  };
  const capital = Math.max(0, Math.min(CAPITAL_MAX, drawn.capital + (midterm.effects.capital ?? 0)));

  return { ...drawn, stats, capital, midterm, midtermDone: true, status: "midterm" };
}

export function continueAfterMidterm(state: GameState, pool: GameEvent[]): GameState {
  // A midterm shellacking can itself collapse the government.
  if (state.stats.stability <= 0) {
    return finalizeCareer(state, "gameover",
      "The government collapses around you. Congress and the courts move in unison — you are removed from office.");
  }
  const cleared = { ...state, midterm: null };
  const ev = getEvent(pool, state.currentEventId);
  return withNextEvent(cleared, pool, ev?.category ?? null);
}

// ── Elections ──────────────────────────────────────────────────────────────
export interface ElectionResult {
  won: boolean;
  share: number; // your share of the two-party vote, for the reveal
  state: GameState;
}

export function resolveElection(state: GameState, pool: GameEvent[]): ElectionResult {
  const spec = DIFFICULTY_BY_ID[state.difficulty] ?? DIFFICULTY_BY_ID.normal;
  const s = state.stats;
  // Approval dominates; the economy is the next-biggest lever.
  const raw = s.approval * 0.6 + s.economy * 0.22 + s.stability * 0.1 + s.world * 0.08;
  // Pure: consumes the roll drawn at the term boundary (see continueAfterResult).
  const value = state.electionRoll ?? 0.5;
  const drawn: GameState = { ...state, electionRoll: undefined };
  const swing = (value - 0.5) * spec.electionNoise * 2;
  const share = clamp(raw + swing, 28, 72);
  const won = share >= 50;

  if (!won) {
    const ended = finalizeCareer(drawn, "gameover",
      `You lost the election with ${share.toFixed(1)}% of the vote. The voters thanked you for your service — and chose someone else.`);
    return { won, share, state: ended };
  }

  let next: GameState = {
    ...drawn,
    term: drawn.term + 1,
    termDecisions: 0,
    midtermDone: false,
    legacy: drawn.legacy + 120, // a mandate is worth something
    flags: { ...drawn.flags, reelected: true as const },
    // A fresh mandate buys a little goodwill and capital.
    stats: { ...drawn.stats, approval: clamp(drawn.stats.approval + 4) },
    capital: Math.min(CAPITAL_MAX, drawn.capital + 3),
    mood: Math.min(8, drawn.mood + 3),
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
  let next: GameState = {
    ...state,
    status,
    endReason: reason,
    currentEventId: null,
    midterm: null,
    electionRoll: undefined,
  };
  if (status === "gameover") next = award(next, "disgraced");
  if (next.legacy >= 800) next = award(next, "rushmore");
  if (next.dailySeed) next = award(next, "daily_donein");
  return next;
}

// ── Timer helpers ───────────────────────────────────────────────────────────
export function decisionSeconds(state: GameState, timerOverride: number | null): number {
  if (timerOverride != null) return timerOverride;
  return (DIFFICULTY_BY_ID[state.difficulty] ?? DIFFICULTY_BY_ID.normal).timer;
}

// ── Mood display ────────────────────────────────────────────────────────────
export function moodMeta(mood: number): { emoji: string; label: string } {
  if (mood >= 5) return { emoji: "☀️", label: "Euphoric" };
  if (mood >= 2) return { emoji: "🌤️", label: "Upbeat" };
  if (mood > -2) return { emoji: "⛅", label: "Wary" };
  if (mood > -5) return { emoji: "🌧️", label: "Sour" };
  return { emoji: "⛈️", label: "Furious" };
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
  if (s.lastEchoes.length > 0) s = award(s, "comes_around");
  if (s.dithered) s = award(s, "deer_in_headlights");
  const inBand = STAT_KEYS.every((k) => stats[k] >= 45 && stats[k] <= 55);
  if (inBand) s = award(s, "centrist");
  return s;
}

export function clearToasts(state: GameState): GameState {
  return state.pendingToasts.length ? { ...state, pendingToasts: [] } : state;
}
