import { useEffect, useRef, useState } from "react";
import type { GameState, StatKey } from "../game/types";
import { DECISIONS_PER_TERM, STAT_KEYS, STAT_META, moodMeta } from "../game/engine";
import { PERSONA_BY_ID } from "../game/personas";
import Ticker from "./Ticker";

interface Delta {
  key: string;
  stat: StatKey;
  amount: number;
}

function MoodGlyph({ mood }: { mood: number }) {
  // Inline SVG weather glyph tinted by mood.
  const color = mood >= 2 ? "var(--mood-calm)" : mood > -4 ? "var(--mood-tense)" : "var(--mood-crisis)";
  if (mood >= 2) {
    return (
      <svg className="mood-glyph" viewBox="0 0 16 16" width="13" height="13" aria-hidden>
        <circle cx="8" cy="8" r="3.4" fill="none" stroke={color} strokeWidth="1.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="8"
            y1="1"
            x2="8"
            y2="3"
            stroke={color}
            strokeWidth="1.4"
            transform={`rotate(${deg} 8 8)`}
          />
        ))}
      </svg>
    );
  }
  if (mood > -4) {
    return (
      <svg className="mood-glyph" viewBox="0 0 16 16" width="13" height="13" aria-hidden>
        <path
          d="M4 11h7a2.6 2.6 0 0 0 0-5.2 3.6 3.6 0 0 0-7-0.4A2.8 2.8 0 0 0 4 11Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className="mood-glyph" viewBox="0 0 16 16" width="13" height="13" aria-hidden>
      <path
        d="M4 9.4h7a2.6 2.6 0 0 0 0-5.2 3.6 3.6 0 0 0-7-.4 2.8 2.8 0 0 0 0 5.6Z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 10.5 7 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hud({
  game,
  onOpenDashboard,
}: {
  game: GameState;
  onOpenDashboard: () => void;
}) {
  const persona = PERSONA_BY_ID[game.president.personaId];
  const termProgress = Math.min(100, (game.termDecisions / DECISIONS_PER_TERM) * 100);
  const mood = moodMeta(game.mood);
  const moodClass = game.mood >= 2 ? "calm" : game.mood > -4 ? "tense" : "crisis";
  const crisis = game.status === "playing" && isCrisisEvent(game);

  // ── Floating delta stamps ─────────────────────────────────────────────────
  const prevStats = useRef(game.stats);
  const [deltas, setDeltas] = useState<Delta[]>([]);
  useEffect(() => {
    const prev = prevStats.current;
    if (prev !== game.stats) {
      const fresh: Delta[] = [];
      for (const k of STAT_KEYS) {
        const d = game.stats[k] - prev[k];
        if (d !== 0) fresh.push({ key: `${k}-${game.decisions}-${d}`, stat: k, amount: d });
      }
      prevStats.current = game.stats;
      if (fresh.length) {
        setDeltas(fresh.slice(0, 4));
        const t = setTimeout(() => setDeltas([]), 900);
        return () => clearTimeout(t);
      }
    }
  }, [game.stats, game.decisions]);

  return (
    <header className="hud">
      <div className={`classbar classbar--${moodClass}`}>
        <button className="classbar__id" onClick={onOpenDashboard} title="Open the career dossier">
          <span>
            TOP SECRET // {persona?.emoji} {game.president.name.toUpperCase()} // T{game.term} · DAY{" "}
            {game.day.toLocaleString()}
          </span>
          <span className="classbar__dash" aria-hidden>
            ▤
          </span>
        </button>
        <span className={`classbar__mood classbar__mood--${moodClass}`} title={`National mood: ${mood.label}`}>
          <MoodGlyph mood={game.mood} />
          {mood.label.toUpperCase()}
        </span>
      </div>

      <div className="hud__stats">
        {STAT_KEYS.map((k) => (
          <div key={k} className={`gauge stat-${k} ${game.stats[k] < 22 ? "gauge--danger" : game.stats[k] < 40 ? "gauge--warn" : ""}`}>
            <span className="gauge__label">{STAT_META[k].short}</span>
            <span className="gauge__value">{game.stats[k]}</span>
            <span className="gauge__track">
              <span className="gauge__fill" style={{ transform: `scaleX(${game.stats[k] / 100})` }} />
            </span>
            {deltas
              .filter((d) => d.stat === k)
              .map((d) => (
                <span key={d.key} className={`gauge__delta ${d.amount > 0 ? "up" : "down"}`}>
                  {d.amount > 0 ? "+" : ""}
                  {d.amount}
                </span>
              ))}
          </div>
        ))}
        <div className="gauge gauge--capital" title="Political Capital — fuel for your boldest moves">
          <span className="gauge__label">CAP</span>
          <span className="gauge__value gauge__value--capital">⚡{game.capital}</span>
          <span className="gauge__track">
            <span className="gauge__fill gauge__fill--capital" style={{ transform: `scaleX(${game.capital / 20})` }} />
          </span>
        </div>
      </div>

      <div className="hud__term" title="Progress toward the next election">
        <div className="hud__term-fill" style={{ width: `${termProgress}%` }} />
      </div>

      <Ticker game={game} crisis={crisis} />
    </header>
  );
}

function isCrisisEvent(game: GameState): boolean {
  // The HUD only knows the id; EventCard sets the tone. Cheap heuristic:
  return Boolean(game.currentEventId && /crisis|security/.test(game.currentEventId));
}
