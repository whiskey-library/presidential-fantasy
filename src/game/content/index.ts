import type { GameEvent } from "../types";
import { SEED_EVENTS } from "./seed";
import { GENERATED_EVENTS } from "./generated";

// Merge all packs, de-duplicate by id (seed wins ties), and validate lightly so
// a malformed generated entry can never crash the game at runtime.
function isPlayable(ev: GameEvent): boolean {
  return Boolean(
    ev &&
      typeof ev.id === "string" &&
      typeof ev.title === "string" &&
      Array.isArray(ev.choices) &&
      ev.choices.length >= 2 &&
      ev.choices.every((c) => c && typeof c.label === "string" && c.effects && typeof c.result === "string")
  );
}

function dedupe(events: GameEvent[]): GameEvent[] {
  const byId = new Map<string, GameEvent>();
  for (const ev of events) {
    if (!isPlayable(ev)) continue;
    if (!byId.has(ev.id)) byId.set(ev.id, ev);
  }
  return [...byId.values()];
}

// Seed first so its ids take precedence over any generated collision.
export const ALL_EVENTS: GameEvent[] = dedupe([...SEED_EVENTS, ...GENERATED_EVENTS]);

export const EVENT_COUNT = ALL_EVENTS.length;
