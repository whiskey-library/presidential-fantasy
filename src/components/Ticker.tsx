import { useMemo } from "react";
import type { GameState } from "../game/types";

const AMBIENT = [
  "Markets open mixed as capital watches the West Wing",
  "Pundits split on the administration's next move",
  "Motorcade spotted leaving the South Lawn",
  "Approval polls in the field this week",
  "Press corps camped outside the briefing room",
  "Allies request clarity on administration policy",
  "Congressional leaders trade barbs on cable",
  "First Family declines comment on palace intrigue",
  "Late-night hosts sharpen their monologues",
  "Federal agencies await executive guidance",
];

export default function Ticker({ game, crisis }: { game: GameState; crisis: boolean }) {
  const items = useMemo(() => {
    const recent = [...game.log]
      .slice(-4)
      .reverse()
      .map((l) => `${l.eventTitle.toUpperCase()} — administration ${l.approvalAfter >= 50 ? "holds" : "slips"} at ${l.approvalAfter}%`);
    const flash = game.lastEchoes.map((e) => `FLASH // ${e.title.toUpperCase()}`);
    const ambient = AMBIENT.slice(0, 6);
    const mix = [...flash, ...recent, ...ambient];
    return mix.length ? mix : AMBIENT;
  }, [game.log, game.lastEchoes]);

  if (crisis) {
    return (
      <div className="ticker ticker--crisis" aria-live="off">
        <span className="ticker__slug ticker__slug--crisis">WIRE</span>
        <div className="ticker__crisis-text">•• DECISION PENDING •• DECISION PENDING •• DECISION PENDING ••</div>
      </div>
    );
  }

  const strip = items.map((t, i) => (
    <span key={i} className={`ticker__item ${t.startsWith("FLASH") ? "ticker__item--flash" : ""}`}>
      {t}
      <span className="ticker__sep" aria-hidden>
        ◆
      </span>
    </span>
  ));

  return (
    <div className="ticker" aria-live="off">
      <span className="ticker__slug">WIRE</span>
      <div className="ticker__viewport">
        <div className="ticker__strip">
          {strip}
          {strip.map((el, i) => (
            <span key={`dup-${i}`} aria-hidden>
              {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
