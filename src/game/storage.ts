import type { GameState, HallOfFameEntry } from "./types";
import { SCHEMA, legacyRank } from "./engine";
import { PERSONA_BY_ID } from "./personas";

const SAVE_KEY = "presidential-fantasy:save:v1";
const HOF_KEY = "presidential-fantasy:hof:v1";

// ── In-progress career (auto-save) ─────────────────────────────────────────
export function saveGame(state: GameState): void {
  try {
    // Don't persist finished careers as resumable saves.
    if (state.status === "gameover" || state.status === "victory") {
      localStorage.removeItem(SAVE_KEY);
      return;
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable (private mode, etc.) — fail quietly */
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.schema !== SCHEMA) return null;
    if (parsed.status === "gameover" || parsed.status === "victory") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

// ── Hall of Fame (persists across careers — "build over time") ──────────────
export function loadHallOfFame(): HallOfFameEntry[] {
  try {
    const raw = localStorage.getItem(HOF_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HallOfFameEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordHallOfFame(state: GameState): HallOfFameEntry[] {
  const persona = PERSONA_BY_ID[state.president.personaId];
  const entry: HallOfFameEntry = {
    name: state.president.name,
    personaId: state.president.personaId,
    legacy: state.legacy,
    rank: legacyRank(state.legacy).title,
    days: state.day,
    terms: state.term,
    endReason: state.endReason ?? "",
    date: new Date().toISOString(),
  };
  void persona;
  const list = [...loadHallOfFame(), entry]
    .sort((a, b) => b.legacy - a.legacy)
    .slice(0, 12);
  try {
    localStorage.setItem(HOF_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}
