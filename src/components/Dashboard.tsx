import type { GameState } from "../game/types";
import { STAT_KEYS, legacyRank } from "../game/engine";
import { ACHIEVEMENTS } from "../game/achievements";
import { PERSONA_BY_ID } from "../game/personas";
import Meter from "./Meter";
import Sparkline from "./Sparkline";

export default function Dashboard({
  game,
  onClose,
}: {
  game: GameState;
  onClose: () => void;
}) {
  const persona = PERSONA_BY_ID[game.president.personaId];
  const rank = legacyRank(game.legacy);
  const recent = [...game.log].reverse().slice(0, 14);
  const earned = new Set(game.achievements);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal__head">
          <div>
            <h2 className="modal__title">
              {persona?.emoji} {game.president.name}
            </h2>
            <p className="modal__sub">
              Term {game.term} · Day {game.day.toLocaleString()} · Legacy {game.legacy.toLocaleString()} ({rank.title})
            </p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="modal__body">
          <section className="modal__section">
            <div className="section-label">Approval trend</div>
            <Sparkline data={game.approvalTrend} />
          </section>

          <section className="modal__section">
            <div className="section-label">The four meters</div>
            <div className="modal__meters">
              {STAT_KEYS.map((k) => (
                <Meter key={k} statKey={k} value={game.stats[k]} />
              ))}
            </div>
          </section>

          <section className="modal__section">
            <div className="section-label">Career timeline</div>
            <ul className="timeline">
              {recent.map((l, i) => (
                <li key={i} className="timeline__row">
                  <span className="timeline__day">Day {l.day.toLocaleString()}</span>
                  <span className="timeline__event">{l.eventTitle}</span>
                  <span className="timeline__choice">— {l.choiceLabel}</span>
                  <span className="timeline__app">{l.approvalAfter}%</span>
                </li>
              ))}
              {recent.length === 0 && <li className="timeline__row timeline__empty">No decisions logged yet.</li>}
            </ul>
          </section>

          <section className="modal__section">
            <div className="section-label">
              Achievements ({earned.size}/{ACHIEVEMENTS.length})
            </div>
            <div className="ach-grid">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.id} className={`ach ${earned.has(a.id) ? "ach--on" : "ach--off"}`} title={a.desc}>
                  <span className="ach__emoji">{earned.has(a.id) ? a.emoji : "🔒"}</span>
                  <span className="ach__name">{a.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
