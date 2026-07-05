import { useMemo } from "react";
import type { GameState } from "../game/types";

const AMBIENT = [
  "Dow futures flat as traders watch the West Wing",
  "Gas averages $3.61 nationwide, AAA reports",
  "Senate floor vote on the highway bill slips to Thursday",
  "Motorcade spotted leaving the South Lawn",
  "Gallup has a fresh approval poll in the field",
  "Press corps camped outside the Brady Briefing Room",
  "NATO ministers convene in Brussels next week",
  "Ohio and Pennsylvania report strong factory orders",
  "Amtrak funding fight stalls in committee",
  "Late-night hosts sharpen their monologues",
  "Treasury auctions $58B in 10-year notes at 1 p.m.",
  "Wildfire season outlook briefing due from FEMA",
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
