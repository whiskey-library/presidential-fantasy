import { useEffect, useState } from "react";
import type { GameState } from "../game/types";
import type { ElectionResult } from "../game/engine";
import { STAT_KEYS, STAT_META } from "../game/engine";
import { sfxDefeat, sfxFanfare, sfxBreaking } from "../game/sound";
import Confetti from "./Confetti";

export default function ElectionScreen({
  game,
  result,
  reducedMotion,
  onContinue,
}: {
  game: GameState;
  result: ElectionResult;
  reducedMotion?: boolean;
  onContinue: () => void;
}) {
  const [reporting, setReporting] = useState(0); // precincts %
  const [shown, setShown] = useState(0); // your vote share
  const [phase, setPhase] = useState<"counting" | "projection" | "verdict">("counting");

  useEffect(() => {
    if (reducedMotion) {
      // Skip the ceremony: straight to the verdict.
      setReporting(100);
      setShown(result.share);
      setPhase("verdict");
      if (result.won) sfxFanfare();
      else sfxDefeat();
      return;
    }
    sfxBreaking();
    const duration = 2400;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setReporting(Math.round(eased * 100));
      setShown(result.share * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("projection");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result.share, result.won, reducedMotion]);

  useEffect(() => {
    if (phase === "projection") {
      const t = setTimeout(() => {
        setPhase("verdict");
        if (result.won) sfxFanfare();
        else sfxDefeat();
      }, 850);
      return () => clearTimeout(t);
    }
  }, [phase, result.won]);

  const opp = 100 - shown;

  return (
    <div className={`card board ${phase === "verdict" && !result.won ? "board--dimmed" : ""}`}>
      {phase === "verdict" && result.won && <Confetti />}

      <div className="board__slug">ELECTION NIGHT // TERM {game.term} // GENERAL</div>
      <h1 className="board__title">The Voters Decide</h1>

      <div className="board__reporting">
        <span>PRECINCTS REPORTING</span>
        <span className="board__reporting-track">
          <span className="board__reporting-fill" style={{ transform: `scaleX(${reporting / 100})` }} />
        </span>
        <span className="board__reporting-num">{reporting}%</span>
      </div>

      <div className="board__rows">
        <div className="board__row board__row--you">
          <span className="board__cand">{game.president.name.toUpperCase()}</span>
          <span className="board__bar">
            <span className="board__bar-fill you" style={{ transform: `scaleX(${shown / 100})` }} />
          </span>
          <span className="board__pct">{shown.toFixed(1)}%</span>
        </div>
        <div className="board__row">
          <span className="board__cand">THE CHALLENGER</span>
          <span className="board__bar">
            <span className="board__bar-fill opp" style={{ transform: `scaleX(${opp / 100})` }} />
          </span>
          <span className="board__pct">{opp.toFixed(1)}%</span>
        </div>
      </div>

      <div className="board__record">
        {STAT_KEYS.map((k) => (
          <span key={k} className="board__stat">
            {STAT_META[k].short} <strong className={`stat-${k}-text`}>{game.stats[k]}</strong>
          </span>
        ))}
      </div>

      {phase !== "counting" && (
        <div className="board__projection">
          <span className="stamp stamp--projection">PROJECTION</span>
        </div>
      )}

      {phase === "verdict" && (
        <div className={`board__verdict ${result.won ? "is-win" : "is-loss"}`}>
          <h2 className="woodtype">{result.won ? "FOUR MORE YEARS" : "REJECTED"}</h2>
          <p>
            {result.won
              ? "The mandate is yours. History is watching what you do with it."
              : "A single typed line from the residence: “The people have spoken. Serve them well.”"}
          </p>
          <button className="btn btn--primary btn--block" onClick={onContinue}>
            {result.won ? "Begin your second term →" : "Read your legacy →"}
          </button>
        </div>
      )}
    </div>
  );
}
