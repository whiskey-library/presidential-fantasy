import type {
  CabinetMember,
  EventCategory,
  GameState,
  PositionId,
  Trait,
} from "./types";
import { drawFrom, nextRandom } from "./rng";

// ── The Cabinet ─────────────────────────────────────────────────────────────
// Six seats, each governing a slice of the event deck. Members are generated
// characters whose traits mechanically bend outcomes in their field — and the
// player can fire and replace any of them mid-term.

export const POSITIONS: Record<
  PositionId,
  { title: string; short: string; emoji: string; categories: EventCategory[] }
> = {
  chief: { title: "Chief of Staff", short: "Chief", emoji: "📋", categories: ["personal", "wildcard", "scandal"] },
  treasury: { title: "Treasury Secretary", short: "Treasury", emoji: "💵", categories: ["economy"] },
  state: { title: "Secretary of State", short: "State", emoji: "🌐", categories: ["foreign"] },
  defense: { title: "Secretary of Defense", short: "Defense", emoji: "🛡️", categories: ["security", "crisis"] },
  justice: { title: "Attorney General", short: "Justice", emoji: "⚖️", categories: ["domestic"] },
  science: { title: "Science Advisor", short: "Science", emoji: "🔬", categories: ["tech", "environment"] },
};

export const POSITION_IDS = Object.keys(POSITIONS) as PositionId[];

export const TRAITS: Record<
  Trait,
  { name: string; emoji: string; desc: string }
> = {
  steady: { name: "Steady Hand", emoji: "🪨", desc: "Bad outcomes in their field hit 25% softer." },
  brilliant: { name: "Brilliant", emoji: "🧠", desc: "Good outcomes gain +2 — but their abrasive style costs 1 Stability per briefing in their field." },
  loyal: { name: "True Believer", emoji: "🤝", desc: "Bold moves in their field refund +1 Capital." },
  media: { name: "Media Darling", emoji: "📸", desc: "+1 Approval on every call in their field." },
  crony: { name: "Old Crony", emoji: "🥃", desc: "+1 Capital per briefing in their field — but outcomes run 20% weaker." },
  hawk: { name: "Hardliner", emoji: "🦅", desc: "Outcomes in their field swing 20% harder — both directions." },
};

const TRAIT_POOL: Trait[] = ["steady", "brilliant", "loyal", "media", "crony", "hawk"];

const FIRST = [
  "Morgan", "Riley", "Dana", "Alex", "Jordan", "Casey", "Quinn", "Avery",
  "Harper", "Rowan", "Ellis", "Sawyer", "Marlowe", "Vaughn", "Sloane", "Emerson",
  "Blair", "Hollis", "Lennox", "Ari", "Nova", "Sterling", "Wren", "August",
];
const LAST = [
  "Hale", "Whitmore", "Okafor", "Reyes", "Lindqvist", "Nakamura", "Calloway", "Vance",
  "Ashford", "Delacroix", "Marsh", "Ortega", "Kessler", "Boone", "Ferrara", "Singh",
  "Thorne", "Abernathy", "Castellano", "Drummond", "Voss", "Hargrove", "Ives", "Quill",
];

// ── Generation (rng-threaded so daily runs stay deterministic) ─────────────
function genName(rngState: number, taken: Set<string>): { name: string; rngState: number } {
  let s = rngState;
  for (let tries = 0; tries < 12; tries++) {
    const a = nextRandom(s);
    const b = nextRandom(a.state);
    s = b.state;
    const name = `${FIRST[Math.floor(a.value * FIRST.length)]} ${LAST[Math.floor(b.value * LAST.length)]}`;
    if (!taken.has(name)) return { name, rngState: s };
  }
  return { name: `${FIRST[0]} ${LAST[Math.floor(Math.random() * LAST.length)]}`, rngState: s };
}

export function genInitialCabinet(
  rngState: number,
  decisions = 0
): { cabinet: Record<PositionId, CabinetMember>; rngState: number } {
  const taken = new Set<string>();
  let s = rngState;
  const cabinet = {} as Record<PositionId, CabinetMember>;
  for (const pid of POSITION_IDS) {
    const n = genName(s, taken);
    taken.add(n.name);
    const t = nextRandom(n.rngState);
    s = t.state;
    cabinet[pid] = {
      name: n.name,
      trait: TRAIT_POOL[Math.floor(t.value * TRAIT_POOL.length)],
      appointedAt: decisions,
    };
  }
  return { cabinet, rngState: s };
}

/** Three replacement candidates with three DISTINCT traits. */
function genCandidates(state: GameState): { candidates: CabinetMember[]; state: GameState } {
  const taken = new Set(
    Object.values(state.cabinet)
      .filter((m): m is CabinetMember => Boolean(m))
      .map((m) => m.name)
  );
  let cur = state;
  const candidates: CabinetMember[] = [];
  // Shuffle trait pool via draws, take three distinct.
  let pool = [...TRAIT_POOL];
  const traits: Trait[] = [];
  for (let i = 0; i < 3; i++) {
    const d = drawFrom(cur);
    cur = d.state;
    traits.push(pool.splice(Math.floor(d.value * pool.length), 1)[0]);
  }
  for (const trait of traits) {
    const n = genName(cur.rngState, taken);
    taken.add(n.name);
    // Thread the name-gen cursor back only for daily runs; free play keeps Math.random flavor.
    cur = cur.dailySeed != null ? { ...cur, rngState: n.rngState } : cur;
    candidates.push({ name: n.name, trait, appointedAt: cur.decisions });
  }
  return { candidates, state: cur };
}

// ── Category ↔ seat routing ─────────────────────────────────────────────────
export function positionForCategory(category: EventCategory): PositionId | null {
  for (const pid of POSITION_IDS) {
    if (POSITIONS[pid].categories.includes(category)) return pid;
  }
  return null;
}

/** Map an event's free-text `source` to a seat, if one plausibly owns it. */
export function positionForSource(source: string | undefined): PositionId | null {
  if (!source) return null;
  const s = source.toLowerCase();
  if (/treasury|fed chair|labor|commerce|budget/.test(s)) return "treasury";
  if (/secretary of state|state department|ambassador|protocol|un\b/.test(s)) return "state";
  if (/defense|joint chiefs|dni|cia|nsa|pentagon|homeland|fema|situation room|cyber|national security/.test(s)) return "defense";
  if (/attorney|justice|counsel|judge|courts?/.test(s)) return "justice";
  if (/science|nasa|ftc|surgeon|cdc|energy|interior|epa|agriculture|environment/.test(s)) return "science";
  if (/chief of staff|press|communications|social|scheduler|white house/.test(s)) return "chief";
  return null;
}

/** The member who "owns" an event, preferring its source, falling back to category. */
export function memberForEvent(
  state: GameState,
  source: string | undefined,
  category: EventCategory
): { position: PositionId; member: CabinetMember } | null {
  const pid = positionForSource(source) ?? positionForCategory(category);
  if (!pid) return null;
  const member = state.cabinet[pid];
  return member ? { position: pid, member } : null;
}

// ── Achievements (module-local award to avoid an engine import cycle) ──────
function pushAward(state: GameState, id: string): GameState {
  if (state.achievements.includes(id)) return state;
  return {
    ...state,
    achievements: [...state.achievements, id],
    pendingToasts: [...state.pendingToasts, id],
  };
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

// ── Firing & hiring ─────────────────────────────────────────────────────────
export const FIRE_COST = { stability: 2, capital: 1 };

export function fireMember(state: GameState, position: PositionId): GameState {
  const member = state.cabinet[position];
  if (!member) return state;
  if (state.capital < FIRE_COST.capital) return state;

  const { candidates, state: drawn } = genCandidates(state);
  let next: GameState = {
    ...drawn,
    cabinet: { ...drawn.cabinet, [position]: null },
    hiring: { ...drawn.hiring, [position]: candidates },
    stats: { ...drawn.stats, stability: clamp(drawn.stats.stability - FIRE_COST.stability) },
    capital: Math.max(0, drawn.capital - FIRE_COST.capital),
    notices: [
      ...drawn.notices,
      `🚪 ${member.name} is out at ${POSITIONS[position].title}. The West Wing rumor mill goes berserk.`,
    ],
  };
  next = pushAward(next, "clean_house");
  return next;
}

export function appointMember(state: GameState, position: PositionId, index: number): GameState {
  const candidates = state.hiring[position];
  if (!candidates || !candidates[index]) return state;
  const chosen = { ...candidates[index], appointedAt: state.decisions };
  const hiring = { ...state.hiring };
  delete hiring[position];
  let next: GameState = {
    ...state,
    cabinet: { ...state.cabinet, [position]: chosen },
    hiring,
    notices: [
      ...state.notices,
      `🖋️ ${chosen.name} confirmed as ${POSITIONS[position].title} (${TRAITS[chosen.trait].name}).`,
    ],
  };
  next = pushAward(next, "fresh_blood");
  return next;
}

// ── Executive orders ────────────────────────────────────────────────────────
export interface ExecutiveOrder {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  desc: string;
  /** Human-readable effect line, shown in the menu. */
  effectLine: string;
}

export const ORDERS: ExecutiveOrder[] = [
  {
    id: "address",
    name: "Address the Nation",
    emoji: "📺",
    cost: 3,
    desc: "Prime-time, flags, the good teleprompter.",
    effectLine: "+4 Approval",
  },
  {
    id: "stimulus",
    name: "Emergency Stimulus",
    emoji: "💰",
    cost: 4,
    desc: "Sign a fast-track spending package.",
    effectLine: "+6 Economy · −2 Approval",
  },
  {
    id: "tour",
    name: "Diplomatic Tour",
    emoji: "🛫",
    cost: 3,
    desc: "Five capitals in four days.",
    effectLine: "+5 World · −1 Stability",
  },
  {
    id: "defuse",
    name: "Defuse a Scandal",
    emoji: "🧯",
    cost: 2,
    desc: "Quietly make the next looming consequence disappear.",
    effectLine: "Cancels your next negative consequence",
  },
];

export function orderAvailable(state: GameState, order: ExecutiveOrder): { ok: boolean; why?: string } {
  if (state.ordersUsed[order.id] === state.term) return { ok: false, why: "Used this term" };
  if (state.capital < order.cost) return { ok: false, why: "Not enough ⚡" };
  if (order.id === "defuse") {
    const hasNegEcho = state.pendingEchoes.some(
      (e) => Object.values(e.effects).reduce((s, v) => s + (v ?? 0), 0) < 0
    );
    if (!hasNegEcho) return { ok: false, why: "Nothing looming" };
  }
  return { ok: true };
}

export function executeOrder(state: GameState, orderId: string): GameState {
  const order = ORDERS.find((o) => o.id === orderId);
  if (!order) return state;
  if (!orderAvailable(state, order).ok) return state;

  let next: GameState = {
    ...state,
    capital: Math.max(0, state.capital - order.cost),
    ordersUsed: { ...state.ordersUsed, [order.id]: state.term },
  };

  switch (order.id) {
    case "address":
      next = {
        ...next,
        stats: { ...next.stats, approval: clamp(next.stats.approval + 4) },
        notices: [...next.notices, "📺 Your address lands. The overnight numbers tick up."],
      };
      break;
    case "stimulus":
      next = {
        ...next,
        stats: {
          ...next.stats,
          economy: clamp(next.stats.economy + 6),
          approval: clamp(next.stats.approval - 2),
        },
        notices: [...next.notices, "💰 Stimulus signed. Markets cheer; deficit hawks screech."],
      };
      break;
    case "tour":
      next = {
        ...next,
        stats: {
          ...next.stats,
          world: clamp(next.stats.world + 5),
          stability: clamp(next.stats.stability - 1),
        },
        notices: [...next.notices, "🛫 The tour plays beautifully abroad. Congress sulks while you're gone."],
      };
      break;
    case "defuse": {
      // Remove the soonest-due net-negative echo.
      const idx = [...next.pendingEchoes]
        .map((e, i) => ({ i, due: e.dueAtDecision, net: Object.values(e.effects).reduce((s, v) => s + (v ?? 0), 0) }))
        .filter((x) => x.net < 0)
        .sort((a, b) => a.due - b.due)[0]?.i;
      if (idx != null) {
        const gone = next.pendingEchoes[idx];
        next = {
          ...next,
          pendingEchoes: next.pendingEchoes.filter((_, i) => i !== idx),
          notices: [...next.notices, `🧯 "${gone.title}" quietly ceases to be a problem. No one will ever know.`],
        };
      }
      break;
    }
  }

  next = pushAward(next, "executive_pen");
  return next;
}
