import type { Effects, GameEvent, GameState } from "../game/types";
import { getEvent } from "../game/engine";
import NewsWire from "./NewsWire";
import SocialFeed from "./SocialFeed";

const EFFECT_LABEL: Record<keyof Effects, string> = {
  approval: "Approval",
  economy: "Economy",
  stability: "Stability",
  world: "World",
  capital: "Capital",
  legacy: "Legacy",
};

const EFFECT_ORDER: (keyof Effects)[] = [
  "approval",
  "economy",
  "stability",
  "world",
  "capital",
  "legacy",
];

export default function ResultScreen({
  game,
  pool,
  onContinue,
}: {
  game: GameState;
  pool: GameEvent[];
  onContinue: () => void;
}) {
  const ev = getEvent(pool, game.currentEventId);
  const choice = ev?.choices.find((c) => c.id === game.lastChoiceId);
  if (!ev || !choice) return null;

  const effects = choice.effects;
  const chips = EFFECT_ORDER.filter((k) => effects[k]);

  return (
    <article className="card result" key={choice.id}>
      <div className="section-label">You decided</div>
      <h2 className="result__choice">{choice.label}</h2>
      <p className="result__narration">{choice.result}</p>

      {chips.length > 0 && (
        <div className="result__effects">
          {chips.map((k) => {
            const v = effects[k]!;
            return (
              <span key={k} className={`delta ${v > 0 ? "delta--up" : "delta--down"}`}>
                {EFFECT_LABEL[k]} {v > 0 ? "+" : ""}
                {v}
              </span>
            );
          })}
        </div>
      )}

      <NewsWire items={choice.news} />
      <SocialFeed items={choice.social} />

      {choice.advisor && (
        <div className="advisor">
          <span className="advisor__icon">🎙️</span>
          <div className="advisor__body">
            <span className="advisor__who">Chief of Staff</span>
            <p className="advisor__text">{choice.advisor}</p>
          </div>
        </div>
      )}

      <button className="btn btn--primary btn--block" onClick={onContinue}>
        Next briefing →
      </button>
    </article>
  );
}
