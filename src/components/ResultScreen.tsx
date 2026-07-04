import { useEffect } from "react";
import type { Effects, GameEvent, GameState } from "../game/types";
import { DITHER_CHOICE, getEvent } from "../game/engine";
import { sfxBreaking, sfxNegative, sfxPositive } from "../game/sound";
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

function DeltaChips({ effects }: { effects: Effects }) {
  const chips = EFFECT_ORDER.filter((k) => effects[k]);
  if (!chips.length) return null;
  return (
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
  );
}

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
  const choice = game.dithered
    ? DITHER_CHOICE
    : ev?.choices.find((c) => c.id === game.lastChoiceId);

  // Score the beat: chime or sting by how approval moved.
  useEffect(() => {
    const t = game.approvalTrend;
    const d = t.length >= 2 ? t[t.length - 1] - t[t.length - 2] : 0;
    const timer = setTimeout(() => (d >= 0 ? sfxPositive() : sfxNegative()), 250);
    const sting = game.lastEchoes.length ? setTimeout(() => sfxBreaking(), 700) : undefined;
    return () => {
      clearTimeout(timer);
      if (sting) clearTimeout(sting);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ev || !choice) return null;

  return (
    <article className="card result" key={`${ev.id}-result`}>
      <div className="section-label">{game.dithered ? "NO ACTION TAKEN" : "EXECUTIVE ACTION"}</div>
      <h2 className={`result__choice ${game.dithered ? "result__choice--dither" : ""}`}>{choice.label}</h2>
      <p className="result__narration">{choice.result}</p>
      {/* Show the scaled effects that actually hit the meters. */}
      <DeltaChips effects={game.lastEffects ?? choice.effects} />

      {game.lastEchoes.map((echo, i) => (
        <aside key={i} className={`echo tone-${echo.tone ?? "negative"}`}>
          <div className="echo__slug">CONSEQUENCE // {echo.sourceTitle.toUpperCase()}</div>
          <h3 className="echo__title">{echo.title}</h3>
          <p className="echo__text">{echo.text}</p>
          <DeltaChips effects={echo.effects} />
        </aside>
      ))}

      {game.notices.map((n, i) => (
        <div key={i} className="notice">
          {n}
        </div>
      ))}

      <NewsWire items={choice.news} />
      <SocialFeed items={choice.social} />

      {choice.advisor && (
        <div className="advisor">
          <span className="advisor__icon">🎙️</span>
          <div className="advisor__body">
            <span className="advisor__who">CHIEF OF STAFF</span>
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
