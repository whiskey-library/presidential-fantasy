// ── Synthesized sound design (WebAudio, zero assets) ───────────────────────
// Every cue is generated with oscillators + envelopes so the game ships no
// audio files and works offline. Kept tasteful: short, quiet, musical.

let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean): void {
  enabled = on;
}

function ensureCtx(): AudioContext | null {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

interface Note {
  freq: number;
  /** Start offset in seconds. */
  at: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  /** Optional pitch slide target. */
  slideTo?: number;
}

function play(notes: Note[], master = 0.16): void {
  const ac = ensureCtx();
  if (!ac) return;
  const now = ac.currentTime + 0.01;
  for (const n of notes) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.setValueAtTime(n.freq, now + n.at);
    if (n.slideTo) osc.frequency.exponentialRampToValueAtTime(n.slideTo, now + n.at + n.dur);
    const peak = (n.gain ?? 1) * master;
    g.gain.setValueAtTime(0, now + n.at);
    g.gain.linearRampToValueAtTime(peak, now + n.at + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + n.at + n.dur);
    osc.connect(g).connect(ac.destination);
    osc.start(now + n.at);
    osc.stop(now + n.at + n.dur + 0.05);
  }
}

/** Soft click when committing a decision. */
export function sfxDecide(): void {
  play([
    { freq: 660, at: 0, dur: 0.06, type: "triangle", gain: 0.8 },
    { freq: 440, at: 0.05, dur: 0.1, type: "triangle", gain: 0.6 },
  ]);
}

/** Warm two-note chime for good news. */
export function sfxPositive(): void {
  play([
    { freq: 523.25, at: 0, dur: 0.14, type: "triangle" },
    { freq: 783.99, at: 0.1, dur: 0.22, type: "triangle" },
  ]);
}

/** Low descending sting for bad news. */
export function sfxNegative(): void {
  play([
    { freq: 220, at: 0, dur: 0.18, type: "sawtooth", gain: 0.45 },
    { freq: 174.61, at: 0.14, dur: 0.28, type: "sawtooth", gain: 0.4 },
  ]);
}

/** Urgent three-hit breaking-news stinger. */
export function sfxBreaking(): void {
  play([
    { freq: 587.33, at: 0, dur: 0.09, type: "square", gain: 0.35 },
    { freq: 587.33, at: 0.12, dur: 0.09, type: "square", gain: 0.35 },
    { freq: 880, at: 0.24, dur: 0.2, type: "square", gain: 0.4 },
  ]);
}

/** Ticking clock — last seconds of the decision timer. */
export function sfxTick(urgent: boolean): void {
  play(
    [{ freq: urgent ? 1180 : 880, at: 0, dur: 0.03, type: "square", gain: urgent ? 0.5 : 0.3 }],
    0.08
  );
}

/** Election-night fanfare. */
export function sfxFanfare(): void {
  play([
    { freq: 392, at: 0, dur: 0.16, type: "triangle" },
    { freq: 523.25, at: 0.14, dur: 0.16, type: "triangle" },
    { freq: 659.25, at: 0.28, dur: 0.16, type: "triangle" },
    { freq: 783.99, at: 0.42, dur: 0.4, type: "triangle", gain: 1.2 },
  ]);
}

/** Concession — a slow minor descent. */
export function sfxDefeat(): void {
  play([
    { freq: 440, at: 0, dur: 0.3, type: "sine", gain: 0.7 },
    { freq: 349.23, at: 0.26, dur: 0.3, type: "sine", gain: 0.6 },
    { freq: 261.63, at: 0.52, dur: 0.5, type: "sine", gain: 0.6 },
  ]);
}

/** Achievement unlock sparkle. */
export function sfxUnlock(): void {
  play([
    { freq: 1046.5, at: 0, dur: 0.08, type: "sine", gain: 0.5 },
    { freq: 1318.5, at: 0.07, dur: 0.12, type: "sine", gain: 0.5 },
    { freq: 1568, at: 0.15, dur: 0.2, type: "sine", gain: 0.6 },
  ]);
}

/** Rising whoosh for the day counter / transitions. */
export function sfxWhoosh(): void {
  play([{ freq: 180, at: 0, dur: 0.25, type: "sine", gain: 0.3, slideTo: 420 }], 0.1);
}
