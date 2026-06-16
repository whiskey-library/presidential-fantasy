import type { EventCategory, GameState, GameEvent } from "../game/types";
import { getEvent } from "../game/engine";

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

export default function EventCard({
  game,
  pool,
  onChoose,
}: {
  game: GameState;
  pool: GameEvent[];
  onChoose: (choiceId: string) => void;
}) {
  const ev = getEvent(pool, game.currentEventId);
  if (!ev) {
    return (
      <article className="card event">
        <h1 className="event__title">A quiet day in the West Wing</h1>
        <p className="event__briefing">No briefings on the desk right now.</p>
      </article>
    );
  }

  return (
    <article className="card event" key={ev.id}>
      <div className="event__tags">
        <span className={`chip cat-${ev.category}`}>{CATEGORY_LABEL[ev.category]}</span>
        {ev.source && <span className="chip chip--ghost">{ev.source}</span>}
      </div>
      <h1 className="event__title">{ev.title}</h1>
      <p className="event__briefing">{ev.briefing}</p>

      <div className="event__choices">
        <div className="section-label">What's your call?</div>
        {ev.choices.map((c) => {
          const cost = c.cost ?? 0;
          const afford = cost <= game.capital;
          return (
            <button
              key={c.id}
              className={`choice ${c.bold ? "choice--bold" : ""} ${afford ? "" : "choice--locked"}`}
              disabled={!afford}
              onClick={() => onChoose(c.id)}
            >
              <span className="choice__main">
                <span className="choice__label">{c.label}</span>
                {c.detail && <span className="choice__detail">{c.detail}</span>}
              </span>
              {cost > 0 && (
                <span className={`choice__cost ${afford ? "" : "choice__cost--locked"}`}>
                  ⚡{cost}
                  {!afford && <em> need capital</em>}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </article>
  );
}
