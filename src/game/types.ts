// ── Core type system for Presidential Fantasy v2 ───────────────────────────

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

/** A delayed consequence planted by a choice — fires N decisions later. */
export interface EchoSpec {
  /** How many decisions later the echo fires. */
  delay: number;
  /** Short headline for the consequence card, e.g. "The Sanctions Bite Back". */
  title: string;
  /** 1–2 sentence narration of the delayed fallout. */
  text: string;
  effects: Effects;
  tone?: Sentiment;
}

/** An echo queued in game state, waiting for its due decision. */
export interface PendingEcho extends EchoSpec {
  /** Fires when state.decisions reaches this count. */
  dueAtDecision: number;
  /** Title of the event that planted it (for the card's source line). */
  sourceTitle: string;
}

/** An echo that just fired — rendered on the result screen. */
export interface FiredEcho {
  title: string;
  text: string;
  effects: Effects;
  tone?: Sentiment;
  sourceTitle: string;
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
  /** Optional delayed consequence — the decision comes back around. */
  echo?: EchoSpec;
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

export type Difficulty = "easy" | "normal" | "hard";

export interface DifficultySpec {
  id: Difficulty;
  name: string;
  blurb: string;
  emoji: string;
  /** Multiplier applied to negative stat deltas. */
  negScale: number;
  /** Default decision timer in seconds (0 = off). */
  timer: number;
  /** Election-night random swing, ± this many points. */
  electionNoise: number;
}

export type GameStatus =
  | "playing"
  | "result"
  | "midterm"
  | "election"
  | "gameover"
  | "victory";

export interface MidtermResult {
  share: number;
  tier: "hold" | "split" | "lose";
  title: string;
  text: string;
  effects: Effects;
}

// ── Cabinet ─────────────────────────────────────────────────────────────────

export type PositionId = "chief" | "treasury" | "state" | "defense" | "justice" | "science";

export type Trait = "steady" | "brilliant" | "loyal" | "media" | "crony" | "hawk";

export interface CabinetMember {
  name: string;
  trait: Trait;
  /** Decision count when they took the seat. */
  appointedAt: number;
}

/** Candidates offered after a firing, keyed by the vacant position. */
export type HiringState = Partial<Record<PositionId, CabinetMember[]>>;

export interface GameState {
  schema: number;
  president: { name: string; personaId: string };
  difficulty: Difficulty;
  /** Set when this career is a date-seeded daily challenge (e.g. "2026-07-04"). */
  dailySeed: string | null;
  /** Deterministic RNG cursor for daily runs (advances every draw). */
  rngState: number;
  stats: Stats;
  capital: number;
  /** Days in office — ticks up forever; the spine of your career. */
  day: number;
  /** 1-based term number. */
  term: number;
  /** Decisions made this term (drives midterms + the election clock). */
  termDecisions: number;
  /** Total decisions made across the whole career. */
  decisions: number;
  peakApproval: number;
  legacy: number;
  /** National mood: −8 (furious) .. +8 (euphoric). Drifts toward 0. */
  mood: number;
  /** Consecutive approval-positive decisions (momentum). */
  streak: number;
  /** Consecutive decisions with economy below the recession line. */
  recessionWatch: number;
  /** Consecutive decisions with stability below the unrest line. */
  unrestWatch: number;
  flags: Record<string, true>;
  seenEvents: string[];
  achievements: string[];
  /** Recent approval values for the sparkline. */
  approvalTrend: number[];
  log: CareerLogEntry[];
  /** Echoes waiting to fire. */
  pendingEchoes: PendingEcho[];
  /** Echoes that fired on the last decision (for the result screen). */
  lastEchoes: FiredEcho[];
  /** Midterm result awaiting display (status === "midterm"). */
  midterm: MidtermResult | null;
  /** True once this term's midterm has run. */
  midtermDone: boolean;
  /** Election-night roll, drawn once at the term boundary and persisted so
   *  re-renders and reloads can never re-roll the outcome. */
  electionRoll?: number;
  /** The difficulty/persona/mood-scaled effects actually applied last turn. */
  lastEffects?: Effects;
  status: GameStatus;
  currentEventId: string | null;
  lastChoiceId: string | null;
  /** True when the last "choice" was the timer expiring on the player. */
  dithered: boolean;
  endReason?: string;
  /** Achievements unlocked but not yet shown as a toast. */
  pendingToasts: string[];
  /** One-off notices (momentum, mood shifts) for the result screen. */
  notices: string[];
  /** The cabinet: null seat = fired and not yet refilled. */
  cabinet: Record<PositionId, CabinetMember | null>;
  /** Open searches: fired seats with their 3 generated candidates. */
  hiring: HiringState;
  /** Executive orders spent: order id → term it was used in. */
  ordersUsed: Record<string, number>;
}

/** A finished career recorded to a profile's hall of fame / leaderboard. */
export interface HallOfFameEntry {
  name: string;
  personaId: string;
  legacy: number;
  rank: string;
  days: number;
  terms: number;
  endReason: string;
  date: string;
  difficulty?: Difficulty;
  dailySeed?: string | null;
  /** Owning profile (added when merging into the cross-profile leaderboard). */
  profileId?: string;
  profileName?: string;
  profileAvatar?: string;
}

// ── Profiles & auth ─────────────────────────────────────────────────────────

export interface ProfileTotals {
  careers: number;
  decisions: number;
  days: number;
  bestLegacy: number;
  wins: number;
}

export interface Profile {
  id: string;
  name: string;
  /** Emoji avatar. */
  avatar: string;
  createdAt: string;
  lastSeenAt: string;
  totals: ProfileTotals;
  /** All-time achievement union across careers. */
  achievements: string[];
  /** Daily-challenge results: date → best legacy that day. */
  daily: Record<string, number>;
}

export interface Settings {
  sound: boolean;
  /** Decision timer seconds; null = use difficulty default; 0 = off. */
  timerOverride: number | null;
  reducedMotion: boolean;
  /** Skip redaction reveals and ceremonial beats. */
  fastBriefings: boolean;
}
