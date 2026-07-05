import { useEffect, useState } from "react";
import type { Effects, GameEvent, GameState } from "../game/types";
import { DITHER_CHOICE, getEvent } from "../game/engine";
import { OUTLET_BY_ID, LEAN_LABEL } from "../game/outlets";
import { sfxBreaking, sfxNegative, sfxPositive } from "../game/sound";
import Portrait from "./Portrait";
import SocialFeed from "./SocialFeed";

const EFFECT_LABEL: Record<keyof Effects, string> = {
  approval: "Approval",
  economy: "Economy",
  stability: "Stability",
  world: "World",
  capital: "Capital",
  legacy: "Legacy",
};

const EFFECT_ORDER: (keyof Effects)[] = ["approval", "economy", "stability", "world", "capital", "legacy"];

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
  const choice = game.dithered ? DITHER_CHOICE : ev?.choices.find((c) => c.id === game.lastChoiceId);
  const news = choice?.news ?? [];
  const [page, setPage] = useState(0);
  const [showMore, setShowMore] = useState(false);

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

  const lead = news[page] ?? news[0];
  const leadOutlet = lead ? OUTLET_BY_ID[lead.outlet] : null;

  return (
    <article className="card result vresult" key={`${ev.id}-result`}>
      {/* What you did, in one line */}
      <div className="vresult__action">
        <span className="vresult__action-tag">{game.dithered ? "⏰ TIME EXPIRED" : "✒️ YOU SIGNED"}</span>
        <span className="vresult__action-label">{choice.label}</span>
      </div>

      <DeltaChips effects={game.lastEffects ?? choice.effects} />

      {/* The morning paper — one big front page, tap the mastheads to flip */}
      {lead && (
        <div className={`front tone-${lead.tone ?? "neutral"} lean-${leadOutlet?.lean ?? "center"}`}>
          <div className="front__tabs" role="tablist" aria-label="Newspapers">
            {news.map((n, i) => {
              const o = OUTLET_BY_ID[n.outlet];
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  className={`front__tab lean-${o?.lean ?? "center"} ${i === page ? "front__tab--on" : ""}`}
                  onClick={() => setPage(i)}
                >
                  {(o?.name ?? n.outlet).replace("The ", "")}
                </button>
              );
            })}
          </div>
          <div className="front__page" key={page}>
            <div className="front__mast">
              <span className="front__name">{leadOutlet?.name ?? lead.outlet}</span>
              <span className="front__lean">{LEAN_LABEL[leadOutlet?.lean ?? "center"]}</span>
            </div>
            <h2 className="front__headline">“{lead.headline}”</h2>
            <p className="front__dek">{choice.result}</p>
          </div>
        </div>
      )}
      {!lead && <p className="front__dek front__dek--solo">{choice.result}</p>}

      {/* Delayed consequences — always loud */}
      {game.lastEchoes.map((echo, i) => (
        <aside key={i} className={`echo tone-${echo.tone ?? "negative"}`}>
          <div className="echo__slug">🪃 CONSEQUENCE · {echo.sourceTitle}</div>
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

      {/* Advisor verdict — a person, not a memo */}
      {choice.advisor && (
        <div className="vresult__advisor">
          <Portrait name="Chief of Staff" size={48} />
          <div className="bubble bubble--tight">
            <span className="bubble__who">Chief of Staff</span>
            <p>{choice.advisor}</p>
          </div>
        </div>
      )}

      {/* Optional depth: the feed + remaining coverage */}
      {(choice.social?.length ?? 0) > 0 && (
        <div className="vresult__more">
          <button className="vresult__more-btn" onClick={() => setShowMore((s) => !s)} aria-expanded={showMore}>
            💬 Public reaction {showMore ? "▴" : "▾"}
          </button>
          {showMore && <SocialFeed items={choice.social} />}
        </div>
      )}

      <button className="btn btn--primary btn--block btn--lg" onClick={onContinue}>
        Next briefing →
      </button>
    </article>
  );
}
