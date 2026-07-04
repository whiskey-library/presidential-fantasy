import { useEffect } from "react";
import type { GameState } from "../game/types";
import { sfxBreaking } from "../game/sound";

export default function MidtermScreen({
  game,
  onContinue,
}: {
  game: GameState;
  onContinue: () => void;
}) {
  const m = game.midterm;
  useEffect(() => {
    sfxBreaking();
  }, []);
  if (!m) return null;

  const mandate = m.tier === "hold";

  return (
    <div className="card memo-page">
      <div className="memo-page__slug">MEMORANDUM // MIDTERM RESULTS // TERM {game.term}</div>
      <h1 className="memo-page__title">{m.title}</h1>

      <div className="memo-page__ledger">
        <div className="ledger-row">
          <span>NATIONAL VOTE SHARE</span>
          <span className="ledger-dots" aria-hidden />
          <span className="ledger-val">{m.share.toFixed(1)}%</span>
        </div>
        {m.effects.stability != null && (
          <div className="ledger-row">
            <span>STABILITY</span>
            <span className="ledger-dots" aria-hidden />
            <span className={`ledger-val ${m.effects.stability >= 0 ? "up" : "down"}`}>
              {m.effects.stability > 0 ? "+" : ""}
              {m.effects.stability}
            </span>
          </div>
        )}
        {m.effects.capital != null && (
          <div className="ledger-row">
            <span>POLITICAL CAPITAL</span>
            <span className="ledger-dots" aria-hidden />
            <span className={`ledger-val ${m.effects.capital >= 0 ? "up" : "down"}`}>
              {m.effects.capital > 0 ? "+" : ""}
              {m.effects.capital}
            </span>
          </div>
        )}
      </div>

      <div className={`verdict-stamp ${mandate ? "verdict-stamp--mandate" : "verdict-stamp--rebuke"}`}>
        {mandate ? "MANDATE" : m.tier === "split" ? "STALEMATE" : "REBUKE"}
      </div>

      <p className="memo-page__editorial">“{m.text}”</p>

      <button className="btn btn--primary btn--block" onClick={onContinue}>
        Back to work →
      </button>
    </div>
  );
}
