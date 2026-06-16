import { useState } from "react";
import type { GameState, HallOfFameEntry } from "../game/types";
import { STAT_KEYS, STAT_META, legacyRank } from "../game/engine";
import { ACHIEVEMENT_BY_ID } from "../game/achievements";
import { PERSONA_BY_ID } from "../game/personas";

export default function EndScreen({
  game,
  hallOfFame,
  onNewCareer,
}: {
  game: GameState;
  hallOfFame: HallOfFameEntry[];
  onNewCareer: () => void;
}) {
  const victory = game.status === "victory";
  const rank = legacyRank(game.legacy);
  const persona = PERSONA_BY_ID[game.president.personaId];
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = `I governed as ${game.president.name} in Presidential Fantasy — legacy "${rank.title}" (${game.legacy} pts) across ${game.term} term(s) and ${game.day.toLocaleString()} days in office. Think you can do better?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Presidential Fantasy", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user dismissed share sheet */
    }
  };

  const earned = game.achievements.map((id) => ACHIEVEMENT_BY_ID[id]).filter(Boolean);

  return (
    <div className={`card end ${victory ? "end--win" : "end--loss"}`}>
      <div className="end__kicker">{victory ? "🦅 A PRESIDENCY FOR THE AGES" : "📜 THE FINAL CHAPTER"}</div>
      <h1 className="end__name">
        {persona?.emoji} {game.president.name}
      </h1>
      <p className="end__reason">{game.endReason}</p>

      <div className="end__legacy">
        <div className="end__rank">{rank.title}</div>
        <div className="end__score">{game.legacy.toLocaleString()}<small> legacy</small></div>
        <p className="end__note">{rank.note}</p>
      </div>

      <div className="end__recap">
        <Stat label="Days in office" value={game.day.toLocaleString()} />
        <Stat label="Terms" value={String(game.term)} />
        <Stat label="Decisions" value={String(game.decisions)} />
        <Stat label="Peak approval" value={`${game.peakApproval}%`} />
      </div>

      <div className="end__finalstats">
        {STAT_KEYS.map((k) => (
          <div key={k} className="end__finalstat">
            <span>{STAT_META[k].emoji}</span>
            <strong>{game.stats[k]}</strong>
            <small>{STAT_META[k].label}</small>
          </div>
        ))}
      </div>

      {earned.length > 0 && (
        <div className="end__section">
          <div className="section-label">🏅 Achievements ({earned.length}/{Object.keys(ACHIEVEMENT_BY_ID).length})</div>
          <div className="end__badges">
            {earned.map((a) => (
              <span key={a.id} className="badge" title={a.desc}>
                {a.emoji} {a.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {hallOfFame.length > 0 && (
        <div className="end__section">
          <div className="section-label">🏛️ Hall of Fame</div>
          <ol className="hof">
            {hallOfFame.slice(0, 6).map((h, i) => (
              <li key={i} className="hof__row">
                <span className="hof__rank">#{i + 1}</span>
                <span className="hof__name">{h.name}</span>
                <span className="hof__title">{h.rank}</span>
                <span className="hof__legacy">{h.legacy.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="end__actions">
        <button className="btn btn--ghost" onClick={share}>
          {copied ? "Copied!" : "Share your legacy"}
        </button>
        <button className="btn btn--primary" onClick={onNewCareer}>
          Run again →
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="end__stat">
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}
