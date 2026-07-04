// ── Seeded RNG for daily challenges ─────────────────────────────────────────
// mulberry32: tiny, fast, good-enough PRNG. The state is a 32-bit int we keep
// in GameState so daily runs stay deterministic across save/resume.

export function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^= h >>> 16) >>> 0;
}

/** One draw of mulberry32. Returns the next state and a float in [0, 1). */
export function nextRandom(state: number): { state: number; value: number } {
  let t = (state + 0x6d2b79f5) >>> 0;
  let r = t;
  r = Math.imul(r ^ (r >>> 15), r | 1);
  r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
  const value = ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  return { state: t, value };
}

/** Today's daily-challenge seed string (local time — "your" day). */
export function todaySeed(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
