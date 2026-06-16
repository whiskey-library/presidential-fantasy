import { useEffect, useState } from "react";
import type { GameState } from "../game/types";
import type { ElectionResult } from "../game/engine";
import { STAT_KEYS, STAT_META } from "../game/engine";

export default function ElectionScreen({
  game,
  result,
  onContinue,
}: {
  game: GameState;
  result: ElectionResult;
  onContinue: () => void;
}) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  // Tick the vote share up for an election-night reveal.
  useEffect(() => {
    const target = result.share;
    const duration = 1700;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(target * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setShown(target);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result.share]);

  const opp = 100 - shown;

  return (
    <div className="card election">
      <div className="election__kicker">ELECTION NIGHT · TERM {game.term}</div>
      <h1 className="election__title">The Voters Decide</h1>
      <p className="election__sub">
        Four years of decisions come down to this. Polls are closing across the country…
      </p>

      <div className="election__tally">
        <div className="election__side election__side--you">
          <span className="election__pct">{shown.toFixed(1)}%</span>
          <span className="election__who">{game.president.name}</span>
        </div>
        <div className="election__vs">vs</div>
        <div className="election__side election__side--opp">
          <span className="election__pct">{opp.toFixed(1)}%</span>
          <span className="election__who">The Challenger</span>
        </div>
      </div>

      <div className="election__bar">
        <div className="election__bar-you" style={{ width: `${shown}%` }} />
      </div>

      <div className="election__record">
        {STAT_KEYS.map((k) => (
          <div key={k} className="election__stat">
            <span>{STAT_META[k].emoji}</span>
            <span className="election__stat-val">{game.stats[k]}</span>
            <span className="election__stat-lbl">{STAT_META[k].short}</span>
          </div>
        ))}
      </div>

      {done && (
        <div className={`election__verdict ${result.won ? "is-win" : "is-loss"}`}>
          <h2>{result.won ? "🎉 RE-ELECTED" : "🏳️ DEFEATED"}</h2>
          <p>
            {result.won
              ? "The people have spoken — four more years. The mandate is yours."
              : "A gracious concession speech awaits. Your time in office has come to an end."}
          </p>
          <button className="btn btn--primary btn--block" onClick={onContinue}>
            {result.won ? "Begin your next term →" : "See your legacy →"}
          </button>
        </div>
      )}
    </div>
  );
}
