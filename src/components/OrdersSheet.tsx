import type { GameState } from "../game/types";
import { ORDERS, orderAvailable } from "../game/cabinet";
import { sfxFanfare } from "../game/sound";

export default function OrdersSheet({
  game,
  onExecute,
  onClose,
}: {
  game: GameState;
  onExecute: (orderId: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet eo" onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" aria-hidden />
        <h2 className="cab__title">EXECUTIVE ORDERS</h2>
        <p className="cab__sub">
          Raw presidential power, once per term each. You have{" "}
          <strong className="eo__capital">⚡{game.capital}</strong> capital.
        </p>

        <div className="eo__list">
          {ORDERS.map((o) => {
            const avail = orderAvailable(game, o);
            return (
              <button
                key={o.id}
                className={`eo__row ${avail.ok ? "" : "eo__row--off"}`}
                disabled={!avail.ok}
                onClick={() => {
                  sfxFanfare();
                  onExecute(o.id);
                }}
              >
                <span className="eo__emoji">{o.emoji}</span>
                <span className="eo__main">
                  <span className="eo__name">{o.name}</span>
                  <span className="eo__desc">{o.desc}</span>
                  <span className="eo__effect">{o.effectLine}</span>
                </span>
                <span className="eo__right">
                  <span className="eo__cost">⚡{o.cost}</span>
                  {!avail.ok && <span className="eo__why">{avail.why}</span>}
                </span>
              </button>
            );
          })}
        </div>

        <button className="btn btn--primary btn--block sheet__done" onClick={onClose}>
          Back to the desk
        </button>
      </div>
    </div>
  );
}
