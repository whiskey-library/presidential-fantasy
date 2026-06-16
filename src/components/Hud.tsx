import type { GameState } from "../game/types";
import { DECISIONS_PER_TERM, STAT_KEYS } from "../game/engine";
import { PERSONA_BY_ID } from "../game/personas";
import Meter from "./Meter";

export default function Hud({
  game,
  onOpenDashboard,
}: {
  game: GameState;
  onOpenDashboard: () => void;
}) {
  const persona = PERSONA_BY_ID[game.president.personaId];
  const termProgress = Math.min(100, (game.termDecisions / DECISIONS_PER_TERM) * 100);

  return (
    <header className="hud">
      <div className="hud__bar">
        <button className="hud__id" onClick={onOpenDashboard} title="Open your career dashboard">
          <span className="hud__emoji">{persona?.emoji ?? "🏛️"}</span>
          <span className="hud__name">
            <strong>{game.president.name}</strong>
            <small>
              Term {game.term} · Day {game.day.toLocaleString()}
            </small>
          </span>
          <span className="hud__dash">▤</span>
        </button>
        <div className="hud__capital" title="Political Capital — fuel for your boldest moves">
          <span className="hud__capital-num">{game.capital}</span>
          <span className="hud__capital-label">⚡&nbsp;Capital</span>
        </div>
      </div>

      <div className="hud__meters">
        {STAT_KEYS.map((k) => (
          <Meter key={k} statKey={k} value={game.stats[k]} compact />
        ))}
      </div>

      <div className="hud__term" title="Progress toward the next election">
        <div className="hud__term-fill" style={{ width: `${termProgress}%` }} />
      </div>
    </header>
  );
}
