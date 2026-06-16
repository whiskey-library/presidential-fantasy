import type { NewsReaction } from "../game/types";
import { LEAN_LABEL, OUTLET_BY_ID } from "../game/outlets";

export default function NewsWire({ items }: { items?: NewsReaction[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="newswire">
      <div className="section-label">📰 The Press Reacts</div>
      <div className="newswire__grid">
        {items.map((n, i) => {
          const o = OUTLET_BY_ID[n.outlet];
          const lean = o?.lean ?? "center";
          return (
            <article key={i} className={`news-card lean-${lean} tone-${n.tone ?? "neutral"}`} style={{ animationDelay: `${i * 70}ms` }}>
              <header className="news-card__head">
                <span className="news-card__name">{o?.name ?? n.outlet}</span>
                <span className="news-card__lean">{LEAN_LABEL[lean]}</span>
              </header>
              <p className="news-card__headline">“{n.headline}”</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
