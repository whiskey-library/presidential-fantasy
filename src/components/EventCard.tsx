import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { EventCategory, GameState, GameEvent, Choice, StatKey } from "../game/types";
import { DITHER_CHOICE, getEvent } from "../game/engine";
import { sfxBreaking, sfxDecide } from "../game/sound";
import TimerRing from "./TimerRing";
import Portrait from "./Portrait";
import Scene from "./scenes";

export const CATEGORY_LABEL: Record<EventCategory, string> = {
  economy: "Economy",
  foreign: "Foreign",
  domestic: "Domestic",
  crisis: "Crisis",
  scandal: "Scandal",
  tech: "Tech",
  environment: "Environment",
  security: "Security",
  personal: "The Office",
  wildcard: "Wildcard",
};

const STAT_DOT: StatKey[] = ["approval", "economy", "stability", "world"];
const SWIPE_COMMIT = 92; // px of drag that counts as a decision

function severityOf(ev: GameEvent): "routine" | "elevated" | "critical" {
  if (ev.category === "crisis" || ev.category === "security") return "critical";
  if (ev.category === "scandal" || ev.category === "foreign") return "elevated";
  return "routine";
}

/** Which meters a choice touches — shown as hint dots (direction stays secret). */
function touchedStats(c: Choice): StatKey[] {
  return STAT_DOT.filter((k) => (c.effects[k] ?? 0) !== 0);
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
  const [signing, setSigning] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // ── Swipe physics (2 affordable choices → left/right like a real desk) ────
  const [drag, setDrag] = useState(0);
  const dragStart = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const choices = ev?.choices ?? [];
  const affordable = choices.filter((c) => (c.cost ?? 0) <= game.capital);
  const swipeable = !signing && choices.length === 2 && affordable.length === 2;
  const leftChoice = swipeable ? choices[0] : null;
  const rightChoice = swipeable ? choices[1] : null;

  useEffect(() => {
    setExpanded(false);
    setSigning(null);
    setDrag(0);
    dragStart.current = null;
  }, [game.currentEventId]);

  // Crisis stinger + screen shake on arrival.
  const severity = ev ? severityOf(ev) : "routine";
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
      <article className="card vcard">
        <h1 className="vcard__title">A quiet day in the West Wing</h1>
        <p className="vcard__short">No briefings on the desk right now.</p>
      </article>
    );
  }

  const sign = (choice: Choice) => {
    if (signing) return;
    if ((choice.cost ?? 0) > game.capital) return;
    setSigning(choice.id);
    sfxDecide();
    setTimeout(() => onChoose(choice.id), fastBriefings ? 60 : 240);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!swipeable) return;
    // Don't hijack presses that start on buttons/links.
    if ((e.target as HTMLElement).closest("button")) return;
    dragStart.current = e.clientX;
    cardRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current == null) return;
    setDrag(Math.max(-140, Math.min(140, e.clientX - dragStart.current)));
  };
  const onPointerUp = () => {
    if (dragStart.current == null) return;
    dragStart.current = null;
    if (drag <= -SWIPE_COMMIT && leftChoice) {
      setDrag(-280);
      sign(leftChoice);
      return;
    }
    if (drag >= SWIPE_COMMIT && rightChoice) {
      setDrag(280);
      sign(rightChoice);
      return;
    }
    setDrag(0);
  };

  // Split briefing: first sentence stays visible, the rest folds away.
  const sentences = ev.briefing.match(/[^.!?]+[.!?]+["']?\s*/g) ?? [ev.briefing];
  const shortText = sentences[0];
  const restText = sentences.slice(1).join("").trim();

  const dragPct = Math.min(1, Math.abs(drag) / SWIPE_COMMIT);

  return (
    <div className="vcard-zone">
      {urgent && createPortal(<div className="urgency-vignette" aria-hidden="true" />, document.body)}

      {/* Swipe side cues */}
      {swipeable && (
        <>
          <div className="swipe-cue swipe-cue--left" style={{ opacity: drag < -18 ? dragPct : 0 }} aria-hidden>
            <span className="swipe-cue__arrow">◀</span>
            <span className="swipe-cue__label">{leftChoice!.label}</span>
          </div>
          <div className="swipe-cue swipe-cue--right" style={{ opacity: drag > 18 ? dragPct : 0 }} aria-hidden>
            <span className="swipe-cue__label">{rightChoice!.label}</span>
            <span className="swipe-cue__arrow">▶</span>
          </div>
        </>
      )}

      <article
        ref={cardRef}
        className={`card vcard sev-${severity} ${signing ? "vcard--signing" : ""} ${dragStart.current != null ? "vcard--dragging" : ""}`}
        key={ev.id}
        style={drag !== 0 ? { transform: `translateX(${drag}px) rotate(${drag / 22}deg)` } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* ── Illustrated scene banner ── */}
        <div className={`vcard__scene scene-${ev.category}`}>
          <Scene category={ev.category} />
          {severity === "critical" && <div className="vcard__flash">⚠ CRISIS</div>}
          <span className={`vcard__cat cat-${ev.category}`}>{CATEGORY_LABEL[ev.category]}</span>
          <div className="vcard__timer">
            <TimerRing
              key={ev.id}
              seconds={timerSeconds}
              paused={Boolean(signing)}
              onExpire={() => onChoose(DITHER_CHOICE.id)}
              onUrgent={setUrgent}
            />
          </div>
        </div>

        {/* ── Advisor presents the situation ── */}
        <div className="vcard__body">
          <div className="vcard__brief">
            {ev.source && (
              <div className="vcard__advisor">
                <Portrait name={ev.source} size={54} />
                <span className="vcard__advisor-name">{ev.source}</span>
              </div>
            )}
            <div className="bubble">
              <h1 className="vcard__title">{ev.title}</h1>
              <p className="vcard__short">
                {shortText}
                {restText && !expanded && (
                  <button className="bubble__more" onClick={() => setExpanded(true)}>
                    more…
                  </button>
                )}
              </p>
              {restText && expanded && <p className="vcard__rest">{restText}</p>}
            </div>
          </div>

          {/* ── Choices ── */}
          <div className="vcard__choices">
            {choices.map((c, i) => {
              const cost = c.cost ?? 0;
              const afford = cost <= game.capital;
              const dots = touchedStats(c);
              const side = swipeable ? (i === 0 ? "◀" : "▶") : null;
              return (
                <button
                  key={c.id}
                  className={`act ${c.bold ? "act--bold" : ""} ${afford ? "" : "act--locked"} ${signing === c.id ? "act--signed" : ""}`}
                  disabled={!afford || Boolean(signing)}
                  onClick={() => sign(c)}
                >
                  {side && <span className="act__side" aria-hidden>{side}</span>}
                  <span className="act__main">
                    <span className="act__label">{c.label}</span>
                    <span className="act__meta">
                      <span className="act__dots" title="Moves these meters">
                        {dots.map((k) => (
                          <i key={k} className={`dot dot-${k}`} />
                        ))}
                      </span>
                      {c.detail && <span className="act__detail">{c.detail}</span>}
                    </span>
                  </span>
                  {cost > 0 && (
                    <span className={`act__cost ${afford ? "" : "act__cost--locked"}`}>⚡{cost}</span>
                  )}
                  {signing === c.id && <span className="act__stamp">SIGNED</span>}
                </button>
              );
            })}
            {swipeable && <div className="vcard__hint">swipe the card — or tap a decision</div>}
          </div>
        </div>
      </article>
    </div>
  );
}
