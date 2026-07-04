import { useMemo, useState } from "react";
import type { HallOfFameEntry, Profile } from "../game/types";
import { loadLeaderboard } from "../game/storage";
import { PERSONA_BY_ID } from "../game/personas";
import { todaySeed } from "../game/rng";

export default function LeaderboardScreen({
  profile,
  onBack,
}: {
  profile: Profile;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<"all" | "daily">("all");
  const rows = useMemo(() => loadLeaderboard(), []);
  const seed = todaySeed();
  const daily = rows.filter((r) => r.dailySeed === seed);
  const shown = tab === "all" ? rows : daily;

  return (
    <div className="records">
      <div className="classbar">
        <button className="classbar__btn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <span>HALL OF RECORDS // ALL PERSONNEL</span>
      </div>

      <div className="records__tabs seg">
        <button className={`seg__opt ${tab === "all" ? "seg__opt--on" : ""}`} onClick={() => setTab("all")}>
          All time
        </button>
        <button className={`seg__opt ${tab === "daily" ? "seg__opt--on" : ""}`} onClick={() => setTab("daily")}>
          Today's Daily ({daily.length})
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="card records__empty">
          {tab === "daily"
            ? "No Daily Brief runs filed today. Be the first name on the board."
            : "No careers on file yet. History is unwritten."}
        </div>
      ) : (
        <ol className="records__list">
          {shown.map((r, i) => (
            <Row key={`${r.profileId}-${r.date}-${i}`} r={r} i={i} you={r.profileId === profile.id} />
          ))}
        </ol>
      )}

      <button className="btn btn--primary btn--block records__back" onClick={onBack}>
        Back to the desk
      </button>
    </div>
  );
}

function Row({ r, i, you }: { r: HallOfFameEntry; i: number; you: boolean }) {
  const medal = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : null;
  return (
    <li className={`record ${medal ? `record--${medal}` : ""} ${you ? "record--you" : ""}`}>
      <span className="record__rank">{String(i + 1).padStart(2, "0")}</span>
      <span className="record__avatar">{r.profileAvatar ?? PERSONA_BY_ID[r.personaId]?.emoji ?? "🏛️"}</span>
      <span className="record__body">
        <span className="record__name">
          {r.name}
          {you && <span className="record__you">YOU</span>}
          {r.dailySeed && <span className="record__daily">DAILY</span>}
        </span>
        <span className="record__meta">
          {r.rank.toUpperCase()} // {r.terms}T // {r.days.toLocaleString()}D
          {r.difficulty ? ` // ${r.difficulty.toUpperCase()}` : ""}
        </span>
      </span>
      <span className="ledger-dots" aria-hidden />
      <span className="record__score">{r.legacy.toLocaleString()}</span>
    </li>
  );
}
