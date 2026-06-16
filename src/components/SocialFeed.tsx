import type { SocialReaction } from "../game/types";

function initials(handle: string): string {
  const clean = handle.replace(/[^a-zA-Z0-9]/g, "");
  return (clean.slice(0, 2) || "??").toUpperCase();
}

export default function SocialFeed({ items }: { items?: SocialReaction[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="social">
      <div className="section-label">💬 On the Feed</div>
      <div className="social__list">
        {items.map((s, i) => (
          <div key={i} className={`chirp sentiment-${s.sentiment ?? "neutral"}`} style={{ animationDelay: `${i * 90}ms` }}>
            <div className="chirp__avatar">{initials(s.handle)}</div>
            <div className="chirp__body">
              <div className="chirp__meta">
                <span className="chirp__handle">{s.handle}</span>
                {s.clout && <span className="chirp__clout">{s.clout}</span>}
              </div>
              <div className="chirp__text">{s.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
