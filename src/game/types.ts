// ── Core type system for Presidential Fantasy ──────────────────────────────

export type StatKey = "approval" | "economy" | "stability" | "world";

export interface Stats {
  /** Public approval — your "water." The headline meter. Hit 0 and you're out. */
  approval: number;
  /** Economic health — jobs, markets, prices. */
  economy: number;
  /** Domestic & political stability — Congress, party, the streets. */
  stability: number;
  /** World standing — allies, rivals, the global stage. */
  world: number;
}

export type Sentiment = "positive" | "negative" | "neutral";

export type OutletLean = "left" | "center" | "right" | "tabloid";

export interface Outlet {
  id: string;
  name: string;
  lean: OutletLean;
  /** Short descriptor shown under the masthead. */
  tag: string;
}

export interface NewsReaction {
  /** Outlet id from outlets.ts */
  outlet: string;
  headline: string;
  tone?: Sentiment;
}

export interface SocialReaction {
  handle: string;
  text: string;
  sentiment?: Sentiment;
  /** Optional follower flourish, e.g. "2.1M". */
  clout?: string;
}

/** Stat deltas applied when a choice is made. All optional, all additive. */
export interface Effects {
  approval?: number;
  economy?: number;
  stability?: number;
  world?: number;
  /** Political-capital delta (spendable resource). */
  capital?: number;
  /** Direct legacy-score delta, on top of approval-derived legacy. */
  legacy?: number;
}

export interface Choice {
  id: string;
  /** The button label — the action. */
  label: string;
  /** Optional sub-line describing the move. */
  detail?: string;
  /** Political capital required to select. Hidden/locked if you can't afford it. */
  cost?: number;
  /** Marks a high-risk / dramatic option for styling. */
  bold?: boolean;
  effects: Effects;
  /** Narration shown in the aftermath. */
  result: string;
  news?: NewsReaction[];
  social?: SocialReaction[];
  /** A line of feedback from your inner circle. */
  advisor?: string;
  setFlags?: string[];
  clearFlags?: string[];
  /** Achievement id to award when this choice is taken. */
  unlock?: string;
}

export type EventCategory =
  | "economy"
  | "foreign"
  | "domestic"
  | "crisis"
  | "scandal"
  | "tech"
  | "environment"
  | "security"
  | "personal"
  | "wildcard";

export interface GameEvent {
  id: string;
  category: EventCategory;
  /** Short situation title. */
  title: string;
  /** The full briefing the player reads. */
  briefing: string;
  /** Who's bringing this to the Resolute Desk, e.g. "Chief of Staff". */
  source?: string;
  /** Selection weight (default 1). Higher = appears more often. */
  weight?: number;
  /** Earliest day in office this can surface. */
  minDay?: number;
  /** Only eligible if ALL of these flags are set. */
  requireFlags?: string[];
  /** Ineligible if ANY of these flags are set. */
  forbidFlags?: string[];
  /** Stat gates: stat value must be within [min, max] inclusive. */
  requireStat?: Partial<Record<StatKey, [number, number]>>;
  /** If false, the event can recur within a single career. Default true. */
  once?: boolean;
  choices: Choice[];
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  blurb: string;
  perk: string;
  startStats: Partial<Stats>;
  startCapital: number;
  emoji: string;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  emoji: string;
}

export interface CareerLogEntry {
  day: number;
  term: number;
  eventTitle: string;
  choiceLabel: string;
  approvalAfter: number;
}

export type GameStatus =
  | "intro"
  | "playing"
  | "result"
  | "election"
  | "gameover"
  | "victory";

export interface GameState {
  schema: number;
  president: { name: string; personaId: string };
  stats: Stats;
  capital: number;
  /** Days in office — ticks up forever; the spine of your career. */
  day: number;
  /** 1-based term number. */
  term: number;
  /** Decisions made this term (drives the election clock). */
  termDecisions: number;
  /** Total decisions made across the whole career. */
  decisions: number;
  peakApproval: number;
  legacy: number;
  flags: Record<string, true>;
  seenEvents: string[];
  achievements: string[];
  /** Recent approval values for the sparkline. */
  approvalTrend: number[];
  log: CareerLogEntry[];
  status: GameStatus;
  currentEventId: string | null;
  lastChoiceId: string | null;
  endReason?: string;
  /** Achievements unlocked but not yet shown as a toast. */
  pendingToasts: string[];
}

/** Persistent cross-career record kept in localStorage. */
export interface HallOfFameEntry {
  name: string;
  personaId: string;
  legacy: number;
  rank: string;
  days: number;
  terms: number;
  endReason: string;
  date: string;
}
