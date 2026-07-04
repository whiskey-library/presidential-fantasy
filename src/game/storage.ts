import type { GameState, HallOfFameEntry, Settings } from "./types";
import { SCHEMA, legacyRank } from "./engine";
import { listProfiles } from "../auth/local";
import { todaySeed } from "./rng";

const saveKey = (profileId: string) => `pf:save:v1:${profileId}`;
const hofKey = (profileId: string) => `pf:hof:v1:${profileId}`;
const SETTINGS_KEY = "pf:settings:v1";

// ── In-progress career (auto-save, per profile) ─────────────────────────────
export function saveGame(profileId: string, state: GameState): void {
  try {
    // Don't persist finished careers as resumable saves.
    if (state.status === "gameover" || state.status === "victory") {
      localStorage.removeItem(saveKey(profileId));
      return;
    }
    localStorage.setItem(saveKey(profileId), JSON.stringify(state));
  } catch {
    /* storage may be unavailable (private mode, etc.) — fail quietly */
  }
}

export function loadGame(profileId: string): GameState | null {
  try {
    const raw = localStorage.getItem(saveKey(profileId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.schema !== SCHEMA) return null;
    if (parsed.status === "gameover" || parsed.status === "victory") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSave(profileId: string): void {
  try {
    localStorage.removeItem(saveKey(profileId));
  } catch {
    /* ignore */
  }
}

// ── Hall of Fame (per profile) + cross-profile leaderboard ──────────────────
export function loadHallOfFame(profileId: string): HallOfFameEntry[] {
  try {
    const raw = localStorage.getItem(hofKey(profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HallOfFameEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordHallOfFame(profileId: string, state: GameState): HallOfFameEntry[] {
  const entry: HallOfFameEntry = {
    name: state.president.name,
    personaId: state.president.personaId,
    legacy: state.legacy,
    rank: legacyRank(state.legacy).title,
    days: state.day,
    terms: state.term,
    endReason: state.endReason ?? "",
    date: new Date().toISOString(),
    difficulty: state.difficulty,
    dailySeed: state.dailySeed,
  };
  // Cap the list, but never evict today's daily runs — the daily board needs them.
  const merged = [...loadHallOfFame(profileId), entry].sort((a, b) => b.legacy - a.legacy);
  const list = merged.filter((e, i) => i < 20 || e.dailySeed === todaySeed());
  try {
    localStorage.setItem(hofKey(profileId), JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}

/** Every career across every local profile, ranked — the leaderboard. */
export function loadLeaderboard(): HallOfFameEntry[] {
  const rows: HallOfFameEntry[] = [];
  for (const p of listProfiles()) {
    for (const e of loadHallOfFame(p.id)) {
      rows.push({ ...e, profileId: p.id, profileName: p.name, profileAvatar: p.avatar });
    }
  }
  const sorted = rows.sort((a, b) => b.legacy - a.legacy);
  return sorted.filter((e, i) => i < 50 || e.dailySeed === todaySeed());
}

// ── Settings ────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: Settings = {
  sound: true,
  timerOverride: null,
  reducedMotion: false,
  fastBriefings: false,
};

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}
