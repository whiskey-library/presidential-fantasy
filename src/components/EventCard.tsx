import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { EventCategory, GameState, GameEvent } from "../game/types";
import { DITHER_CHOICE, getEvent } from "../game/engine";
import { sfxBreaking, sfxDecide } from "../game/sound";
import TimerRing from "./TimerRing";

export const CATEGORY_LABEL: Record<EventCategory, string> = {
  economy: "Economy",
  foreign: "Foreign Policy",
  domestic: "Domestic",
  crisis: "Crisis",
  scandal: "Scandal",
  tech: "Technology",
  environment: "Environment",
  security: "National Security",
  personal: "The Office",
  wildcard: "Wildcard",
};

const GLYPHS = ["A", "B", "C", "D"];

function severityOf(ev: GameEvent): "routine" | "elevated" | "critical" {
  if (ev.category === "crisis" || ev.category === "security") return "critical";
  if (ev.category === "scandal" || ev.category === "foreign") return "elevated";
  return "routine";
}

/** The stat a choice moves hardest — for the memo's hint strip. */
function dominantStat(effects: Record<string, number | undefined>): string | null {
  let best: string | null = null;
  let mag = 0;
  for (const k of ["approval", "economy", "stability", "world"]) {
    const v = Math.abs(effects[k] ?? 0);
    if (v > mag) {
      mag = v;
      best = k;
    }
  }
  return best;
}

export default function EventCard({
  game,
  pool,
  timerSeconds,
  fastBriefings,
  onChoose,
}: {
  game: GameState;
  pool: GameEvent[];
  timerSeconds: number;
  fastBriefings: boolean;
  onChoose: (choiceId: string) => void;
}) {
  const ev = getEvent(pool, game.currentEventId);
  const [revealed, setRevealed] = useState(fastBriefings);
  const [signing, setSigning] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);

  const severity = ev ? severityOf(ev) : "routine";
  const lines = useMemo(() => {
    if (!ev) return [];
    // Split briefing into sentence-ish lines for the redaction sweep.
    return ev.briefing.match(/[^.!?]+[.!?]+["']?\s*/g) ?? [ev.briefing];
  }, [ev]);

  // Redaction reveal: unseal choices when the sweep finishes (or instantly).
  useEffect(() => {
    setRevealed(fastBriefings);
    setSigning(null);
    if (fastBriefings) return;
    const total = 420 + lines.length * 60 + 120;
    const t = setTimeout(() => setRevealed(true), Math.min(total, 900));
    return () => clearTimeout(t);
  }, [game.currentEventId, fastBriefings, lines.length]);

  // Crisis stinger + screen shake on arrival.
  useEffect(() => {
    if (ev && severity === "critical") {
      sfxBreaking();
      const root = document.getElementById("root");
      root?.classList.add("shake");
      const t = setTimeout(() => root?.classList.remove("shake"), 350);
      return () => {
        clearTimeout(t);
        root?.classList.remove("shake");
      };
    }
  }, [game.currentEventId, severity, ev]);

  if (!ev) {
    return (
      <article className="card dossier">
        <h1 className="dossier__title">A quiet day in the West Wing</h1>
        <p className="dossier__briefing">No briefings on the desk right now.</p>
      </article>
    );
  }

  const sign = (choiceId: string, afford: boolean) => {
    if (!afford || signing) return;
    setSigning(choiceId);
    sfxDecide();
    setTimeout(() => onChoose(choiceId), fastBriefings ? 60 : 220);
  };

  return (
    <article
      className={`card dossier sev-${severity} ${urgent ? "dossier--urgent" : ""}`}
      key={ev.id}
      data-cat={ev.category}
    >
      {/* Portal: .card's contain:paint would clip a fixed-position vignette. */}
      {urgent && createPortal(<div className="urgency-vignette" aria-hidden="true" />, document.body)}
      {severity === "critical" && <div className="dossier__flash">FLASH // CRITICAL</div>}

      <div className="dossier__head">
        <span className="dossier__file">FILE No. {String(game.decisions + 1).padStart(4, "0")}</span>
        <span className={`stamp stamp--cat cat-${ev.category}`}>{CATEGORY_LABEL[ev.category].toUpperCase()}</span>
        <TimerRing
          key={ev.id}
          seconds={timerSeconds}
          paused={Boolean(signing)}
          onExpire={() => onChoose(DITHER_CHOICE.id)}
          onUrgent={setUrgent}
        />
      </div>
      {ev.source && <div className="dossier__source">FROM: {ev.source.toUpperCase()}</div>}

      <h1 className="dossier__title">{ev.title}</h1>

      <div className={`dossier__briefing ${revealed ? "is-revealed" : ""}`} onClick={() => setRevealed(true)}>
        {lines.map((l, i) => (
          <span key={i} className={fastBriefings ? undefined : "redact-line"} style={{ animationDelay: `${i * 60}ms` }}>
            {l}
          </span>
        ))}
      </div>

      <div className={`dossier__choices ${revealed ? "" : "dossier__choices--sealed"}`}>
        <div className="section-label">YOUR ORDER, MR. PRESIDENT</div>
        {ev.choices.map((c, i) => {
          const cost = c.cost ?? 0;
          const afford = cost <= game.capital;
          const hint = dominantStat(c.effects as Record<string, number>);
          return (
            <button
              key={c.id}
              className={`memo ${c.bold ? "memo--bold" : ""} ${afford ? "" : "memo--locked"} ${
                signing === c.id ? "memo--signed" : ""
              }`}
              disabled={!afford || !revealed || Boolean(signing)}
              onClick={() => sign(c.id, afford)}
            >
              {hint && <span className={`memo__hint stat-${hint}`} aria-hidden />}
              <span className="memo__glyph">{GLYPHS[i] ?? "•"}</span>
              <span className="memo__main">
                <span className="memo__label">{c.label}</span>
                {c.detail && <span className="memo__detail">{c.detail}</span>}
              </span>
              {cost > 0 && (
                <span className={`memo__cost ${afford ? "" : "memo__cost--locked"}`}>
                  ⚡{cost}
                </span>
              )}
              {signing === c.id && <span className="memo__stamp">SIGNED</span>}
            </button>
          );
        })}
      </div>
    </article>
  );
}
