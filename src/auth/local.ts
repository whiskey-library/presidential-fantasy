import type { GameState, Profile, ProfileTotals } from "../game/types";

// ── Local-first auth provider ───────────────────────────────────────────────
// Real sign-in UX (accounts, sessions, per-profile saves) with zero backend —
// which is what keeps the game free forever. The surface below is deliberately
// provider-shaped so a cloud auth backend (e.g. Supabase) can slot in later
// without touching the UI.

const PROFILES_KEY = "pf:profiles:v1";
const SESSION_KEY = "pf:session:v1";

export const AVATARS = [
  "🦅", "🇺🇸", "🎩", "🗽", "🦁", "🐘", "🐴", "🦊",
  "🌟", "🔥", "⚡", "🛡️", "🌹", "🌵", "🏔️", "🚀",
];

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — degrade gracefully */
  }
}

const emptyTotals = (): ProfileTotals => ({
  careers: 0,
  decisions: 0,
  days: 0,
  bestLegacy: 0,
  wins: 0,
});

export function listProfiles(): Profile[] {
  const profiles = read<Profile[]>(PROFILES_KEY, []);
  return Array.isArray(profiles) ? profiles : [];
}

export function getProfile(id: string): Profile | null {
  return listProfiles().find((p) => p.id === id) ?? null;
}

export function createProfile(name: string, avatar: string): Profile | null {
  const now = new Date().toISOString();
  const profile: Profile = {
    id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim() || "President",
    avatar: AVATARS.includes(avatar) ? avatar : AVATARS[0],
    createdAt: now,
    lastSeenAt: now,
    totals: emptyTotals(),
    achievements: [],
    daily: {},
  };
  write(PROFILES_KEY, [...listProfiles(), profile]);
  // Verify the write actually persisted (storage can be full or blocked).
  return getProfile(profile.id);
}

export function updateProfile(updated: Profile): void {
  write(
    PROFILES_KEY,
    listProfiles().map((p) => (p.id === updated.id ? updated : p))
  );
}

export function deleteProfile(id: string): void {
  write(PROFILES_KEY, listProfiles().filter((p) => p.id !== id));
  try {
    localStorage.removeItem(`pf:save:v1:${id}`);
    localStorage.removeItem(`pf:hof:v1:${id}`);
  } catch {
    /* ignore */
  }
  if (currentSession() === id) signOut();
}

// ── Session ─────────────────────────────────────────────────────────────────
export function currentSession(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function signIn(profileId: string): Profile | null {
  const profile = getProfile(profileId);
  if (!profile) return null;
  try {
    localStorage.setItem(SESSION_KEY, profileId);
  } catch {
    /* ignore */
  }
  updateProfile({ ...profile, lastSeenAt: new Date().toISOString() });
  return profile;
}

export function signOut(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/** Roll a finished career into the profile's lifetime record. */
export function recordCareerToProfile(profile: Profile, state: GameState): Profile {
  // Re-base on fresh storage so concurrent tabs can't clobber lifetime totals.
  const base = getProfile(profile.id) ?? profile;
  const totals: ProfileTotals = {
    careers: base.totals.careers + 1,
    decisions: base.totals.decisions + state.decisions,
    days: base.totals.days + state.day,
    bestLegacy: Math.max(base.totals.bestLegacy, state.legacy),
    wins: base.totals.wins + (state.status === "victory" ? 1 : 0),
  };
  const achievements = [...new Set([...base.achievements, ...state.achievements])];
  const daily = { ...base.daily };
  if (state.dailySeed) {
    daily[state.dailySeed] = Math.max(daily[state.dailySeed] ?? 0, state.legacy);
  }
  const updated: Profile = { ...base, totals, achievements, daily };
  updateProfile(updated);
  return updated;
}

// ── Legacy v1 migration (pre-profile saves) ─────────────────────────────────
const V1_SAVE_KEY = "presidential-fantasy:save:v1";
const V1_HOF_KEY = "presidential-fantasy:hof:v1";

/** If v1 data exists and no profiles do, seed a profile that adopts it. */
export function migrateV1IfNeeded(): void {
  try {
    if (listProfiles().length > 0) return;
    const v1Save = localStorage.getItem(V1_SAVE_KEY);
    const v1Hof = localStorage.getItem(V1_HOF_KEY);
    if (!v1Save && !v1Hof) return;

    let name = "President";
    try {
      const parsed = v1Save ? JSON.parse(v1Save) : null;
      if (parsed?.president?.name) name = parsed.president.name;
    } catch {
      /* fall through with default name */
    }
    const profile = createProfile(name, "🦅");
    if (!profile) return; // storage unavailable — leave v1 data untouched
    if (v1Hof) localStorage.setItem(`pf:hof:v1:${profile.id}`, v1Hof);
    // v1 in-progress saves are schema 1 — not resumable under v2 rules; the
    // hall of fame is the part worth carrying forward.
    localStorage.removeItem(V1_SAVE_KEY);
    localStorage.removeItem(V1_HOF_KEY);
  } catch {
    /* migration is best-effort */
  }
}
