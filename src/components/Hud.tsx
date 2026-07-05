import { useEffect, useRef, useState } from "react";
import type { GameState, StatKey } from "../game/types";
import { DECISIONS_PER_TERM, STAT_KEYS, moodMeta } from "../game/engine";
import { PERSONA_BY_ID } from "../game/personas";
import Ticker from "./Ticker";
import Orb from "./Orb";

const ORB_LABEL: Record<StatKey, string> = {
  approval: "Approval",
  economy: "Economy",
  stability: "Stability",
  world: "World",
};

export default function Hud({
  game,
  onOpenDashboard,
  onOpenCabinet,
  onOpenOrders,
}: {
  game: GameState;
  onOpenDashboard: () => void;
  onOpenCabinet: () => void;
  onOpenOrders: () => void;
}) {
  const persona = PERSONA_BY_ID[game.president.personaId];
  const termProgress = Math.min(100, (game.termDecisions / DECISIONS_PER_TERM) * 100);
  const mood = moodMeta(game.mood);
  const moodClass = game.mood >= 2 ? "calm" : game.mood > -4 ? "tense" : "crisis";
  const crisis = game.status === "playing" && Boolean(game.currentEventId && /crisis|security/.test(game.currentEventId));

  // Deltas: compare against the previous stats snapshot to float ±N off orbs.
  const prevStats = useRef(game.stats);
  const [deltas, setDeltas] = useState<Partial<Record<StatKey, number>>>({});
  useEffect(() => {
    const prev = prevStats.current;
    if (prev !== game.stats) {
      const fresh: Partial<Record<StatKey, number>> = {};
      for (const k of STAT_KEYS) {
        const d = game.stats[k] - prev[k];
        if (d !== 0) fresh[k] = d;
      }
      prevStats.current = game.stats;
      if (Object.keys(fresh).length) {
        setDeltas(fresh);
        const t = setTimeout(() => setDeltas({}), 1200);
        return () => clearTimeout(t);
      }
    }
  }, [game.stats]);

  return (
    <header className="hud">
      <div className={`topbar topbar--${moodClass}`}>
        <button className="topbar__id" onClick={onOpenDashboard} title="Career dossier">
          <span className="topbar__avatar">{persona?.emoji ?? "🏛️"}</span>
          <span className="topbar__who">
            <strong>{game.president.name}</strong>
            <small>
              Day {game.day.toLocaleString()} · Term {game.term}
            </small>
          </span>
        </button>
        <div className="topbar__right">
          <span className={`topbar__mood topbar__mood--${moodClass}`} title={`National mood: ${mood.label}`}>
            {mood.emoji} {mood.label}
          </span>
          <button
            className="topbar__tool"
            onClick={onOpenCabinet}
            title="The Cabinet Room — hire and fire"
            aria-label="Cabinet"
          >
            👥
          </button>
          <button
            className="topbar__tool"
            onClick={onOpenOrders}
            title="Executive Orders — spend capital on raw power"
            aria-label="Executive orders"
          >
            📜
          </button>
          <span className="topbar__capital" title="Political Capital — spend it on bold moves">
            ⚡{game.capital}
          </span>
        </div>
      </div>

      <div className="orbs">
        {STAT_KEYS.map((k) => (
          <Orb key={k} statKey={k} value={game.stats[k]} label={ORB_LABEL[k]} delta={deltas[k] ?? null} />
        ))}
      </div>

      <div className="hud__term" title="Progress toward the next election">
        <div className="hud__term-fill" style={{ width: `${termProgress}%` }} />
      </div>

      <Ticker game={game} crisis={crisis} />
    </header>
  );
}
