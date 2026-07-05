import { useState } from "react";
import type { GameState, PositionId } from "../game/types";
import { FIRE_COST, POSITIONS, POSITION_IDS, TRAITS } from "../game/cabinet";
import { sfxDecide, sfxNegative, sfxPositive } from "../game/sound";
import Portrait from "./Portrait";

export default function CabinetSheet({
  game,
  onFire,
  onAppoint,
  onClose,
}: {
  game: GameState;
  onFire: (position: PositionId) => void;
  onAppoint: (position: PositionId, index: number) => void;
  onClose: () => void;
}) {
  const [confirming, setConfirming] = useState<PositionId | null>(null);
  const canAffordFire = game.capital >= FIRE_COST.capital;

  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet cab" onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" aria-hidden />
        <h2 className="cab__title">THE CABINET ROOM</h2>
        <p className="cab__sub">
          Their traits shape every briefing in their field. Firing costs −{FIRE_COST.stability}{" "}
          Stability, −{FIRE_COST.capital}⚡ — and the seat stays cold until you fill it.
        </p>

        <div className="cab__list">
          {POSITION_IDS.map((pid) => {
            const pos = POSITIONS[pid];
            const member = game.cabinet[pid];
            const candidates = game.hiring[pid];

            if (!member && candidates) {
              return (
                <div key={pid} className="cab__vacant">
                  <div className="cab__vacant-head">
                    {pos.emoji} {pos.title.toUpperCase()} — CHOOSE A NOMINEE
                  </div>
                  <div className="cab__candidates">
                    {candidates.map((c, i) => (
                      <button
                        key={c.name}
                        className="cab__cand"
                        onClick={() => {
                          sfxPositive();
                          onAppoint(pid, i);
                        }}
                      >
                        <Portrait name={c.name} size={44} />
                        <span className="cab__cand-name">{c.name}</span>
                        <span className="cab__cand-trait">
                          {TRAITS[c.trait].emoji} {TRAITS[c.trait].name}
                        </span>
                        <span className="cab__cand-desc">{TRAITS[c.trait].desc}</span>
                        <span className="cab__cand-cta">APPOINT</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            if (!member) {
              return (
                <div key={pid} className="cab__row cab__row--empty">
                  <span className="cab__seat-emoji">{pos.emoji}</span>
                  <span className="cab__row-main">
                    <span className="cab__name">SEAT VACANT</span>
                    <span className="cab__pos">{pos.title} · −1 Stability per briefing in this field</span>
                  </span>
                </div>
              );
            }

            return (
              <div key={pid} className="cab__row">
                <Portrait name={member.name} size={46} />
                <span className="cab__row-main">
                  <span className="cab__name">{member.name}</span>
                  <span className="cab__pos">
                    {pos.emoji} {pos.title}
                  </span>
                  <span className="cab__trait" title={TRAITS[member.trait].desc}>
                    {TRAITS[member.trait].emoji} {TRAITS[member.trait].name} — {TRAITS[member.trait].desc}
                  </span>
                </span>
                {confirming === pid ? (
                  <span className="cab__confirm">
                    <button
                      className="cab__fire cab__fire--yes"
                      onClick={() => {
                        sfxNegative();
                        onFire(pid);
                        setConfirming(null);
                      }}
                    >
                      SURE?
                    </button>
                    <button className="cab__fire" onClick={() => setConfirming(null)}>
                      KEEP
                    </button>
                  </span>
                ) : (
                  <button
                    className="cab__fire"
                    disabled={!canAffordFire}
                    title={canAffordFire ? `Fire ${member.name}` : "Not enough ⚡"}
                    onClick={() => {
                      sfxDecide();
                      setConfirming(pid);
                    }}
                  >
                    FIRE
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn btn--primary btn--block sheet__done" onClick={onClose}>
          Back to the desk
        </button>
      </div>
    </div>
  );
}
