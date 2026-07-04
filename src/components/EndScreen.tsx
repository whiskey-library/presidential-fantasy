import { useEffect, useMemo, useState } from "react";
import type { GameState } from "../game/types";
import { STAT_KEYS, STAT_META, legacyRank } from "../game/engine";
import { ACHIEVEMENT_BY_ID } from "../game/achievements";
import { PERSONA_BY_ID } from "../game/personas";
import { sfxDefeat, sfxFanfare } from "../game/sound";
import Confetti from "./Confetti";

function corrections(game: GameState): string[] {
  const lines: string[] = [];
  const titles = game.log.map((l) => l.eventTitle);
  if (titles.includes("Recession Declared") || game.achievements.includes("underwater"))
    lines.push("The administration regrets the economy.");
  const dithers = game.log.filter((l) => l.choiceLabel === "You let the clock run out").length;
  if (dithers > 0)
    lines.push(`The administration regrets ${dithers === 1 ? "a certain silence" : `${dithers} certain silences`}.`);
  if (game.flags["weathered_scandal"]) lines.push("The administration maintains it was transparent, eventually.");
  if (game.achievements.includes("deer_in_headlights") && dithers === 0)
    lines.push("The administration regrets the delay in regretting.");
  if (lines.length === 0) lines.push("The administration regrets nothing. History may differ.");
  return lines.slice(0, 3);
}

export default function EndScreen({
  game,
  onNewCareer,
  onLeaderboard,
}: {
  game: GameState;
  onNewCareer: () => void;
  onLeaderboard: () => void;
}) {
  const victory = game.status === "victory";
  const rank = legacyRank(game.legacy);
  const persona = PERSONA_BY_ID[game.president.personaId];
  const [copied, setCopied] = useState(false);
  const [peeled, setPeeled] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => (victory ? sfxFanfare() : sfxDefeat()), 400);
    return () => clearTimeout(t);
  }, [victory]);

  const secrets = useMemo(() => {
    const best = [...game.log].sort((a, b) => b.approvalAfter - a.approvalAfter)[0];
    const worst = [...game.log].sort((a, b) => a.approvalAfter - b.approvalAfter)[0];
    const out: string[] = [];
    if (best) out.push(`Finest hour: "${best.eventTitle}" — approval touched ${best.approvalAfter}%.`);
    if (worst) out.push(`Darkest day: "${worst.eventTitle}" — approval fell to ${worst.approvalAfter}%.`);
    out.push(`Peak approval across the presidency: ${game.peakApproval}%.`);
    return out;
  }, [game.log, game.peakApproval]);

  const share = async () => {
    const mode = game.dailySeed ? ` in the ${game.dailySeed} Daily Brief` : "";
    const text = `My presidency${mode}: "${rank.title}" — ${game.legacy.toLocaleString()} legacy over ${game.term} term(s) and ${game.day.toLocaleString()} days. Presidential Fantasy is free in the browser — think you can out-govern me?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Presidential Fantasy", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* dismissed */
    }
  };

  const earned = game.achievements.map((id) => ACHIEVEMENT_BY_ID[id]).filter(Boolean);

  return (
    <div className={`card legacy ${victory ? "legacy--win" : "legacy--loss"}`}>
      {victory && <Confetti />}
      <div className="legacy__seal" aria-hidden>
        ★
      </div>
      <div className="legacy__slug">
        FINAL ASSESSMENT // DECLASSIFIED{game.dailySeed ? ` // DAILY BRIEF ${game.dailySeed}` : ""}
      </div>
      <h1 className="legacy__name">
        {persona?.emoji} {game.president.name}
      </h1>
      <p className="legacy__reason">{game.endReason}</p>

      <div className="legacy__verdict">
        <div className="woodtype woodtype--rank">{rank.title.toUpperCase()}</div>
        <div className="legacy__score">
          {game.legacy.toLocaleString()}
          <small> LEGACY</small>
        </div>
        <p className="legacy__note">{rank.note}</p>
        <span className={`verdict-stamp verdict-stamp--grade ${victory ? "verdict-stamp--mandate" : "verdict-stamp--rebuke"}`}>
          {victory ? "SERVED IN FULL" : "FILE CLOSED"}
        </span>
      </div>

      <div className="legacy__ledger">
        <LedgerRow label="DAYS IN OFFICE" value={game.day.toLocaleString()} />
        <LedgerRow label="TERMS" value={String(game.term)} />
        <LedgerRow label="DECISIONS SIGNED" value={String(game.decisions)} />
        <LedgerRow label="PEAK APPROVAL" value={`${game.peakApproval}%`} />
        {STAT_KEYS.map((k) => (
          <LedgerRow key={k} label={STAT_META[k].label.toUpperCase()} value={String(game.stats[k])} tone={game.stats[k] >= 50 ? "up" : "down"} />
        ))}
      </div>

      <div className="legacy__secrets">
        <div className="section-label">DECLASSIFY ON TAP</div>
        {secrets.map((s, i) => (
          <button
            key={i}
            className={`redacted ${peeled[i] ? "redacted--open" : ""}`}
            onClick={() => setPeeled((p) => ({ ...p, [i]: true }))}
          >
            {peeled[i] ? s : "█████████████████████████████"}
          </button>
        ))}
      </div>

      {earned.length > 0 && (
        <div className="legacy__section">
          <div className="section-label">
            COMMENDATIONS ({earned.length}/{Object.keys(ACHIEVEMENT_BY_ID).length})
          </div>
          <div className="legacy__badges">
            {earned.map((a) => (
              <span key={a.id} className="badge" title={a.desc}>
                {a.emoji} {a.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="legacy__corrections">
        <div className="legacy__corrections-head">CORRECTIONS</div>
        {corrections(game).map((c, i) => (
          <p key={i}>{c}</p>
        ))}
      </div>

      <div className="legacy__actions">
        <button className="btn btn--ghost" onClick={share}>
          {copied ? "Copied!" : "Share the record"}
        </button>
        <button className="btn btn--ghost" onClick={onLeaderboard}>
          Hall of Records
        </button>
        <button className="btn btn--primary" onClick={onNewCareer}>
          Run again →
        </button>
      </div>
    </div>
  );
}

function LedgerRow({ label, value, tone }: { label: string; value: string; tone?: "up" | "down" }) {
  return (
    <div className="ledger-row">
      <span>{label}</span>
      <span className="ledger-dots" aria-hidden />
      <span className={`ledger-val ${tone ?? ""}`}>{value}</span>
    </div>
  );
}
