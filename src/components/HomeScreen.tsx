import { useState } from "react";
import type { Difficulty, GameState, Profile } from "../game/types";
import { PERSONAS, PERSONA_BY_ID } from "../game/personas";
import { DIFFICULTIES } from "../game/engine";
import { ACHIEVEMENTS } from "../game/achievements";
import { todaySeed } from "../game/rng";
import { hashSeed } from "../game/rng";

export default function HomeScreen({
  profile,
  savedGame,
  onResume,
  onStart,
  onStartDaily,
  onLeaderboard,
  onSettings,
  eventCount,
}: {
  profile: Profile;
  savedGame: GameState | null;
  onResume: () => void;
  onStart: (name: string, personaId: string, difficulty: Difficulty) => void;
  onStartDaily: () => void;
  onLeaderboard: () => void;
  onSettings: () => void;
  eventCount: number;
}) {
  const [configuring, setConfiguring] = useState(false);
  const [name, setName] = useState(profile.name);
  const [personaId, setPersonaId] = useState(PERSONAS[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  const seed = todaySeed();
  const dailyBest = profile.daily[seed];
  const dailyPersona = PERSONAS[hashSeed(`PF-${seed}`) % PERSONAS.length];
  const achieved = profile.achievements.length;

  return (
    <div className="home">
      <div className="classbar">
        <span>
          TOP SECRET // {profile.avatar} {profile.name.toUpperCase()}
        </span>
        <button className="classbar__btn" onClick={onSettings} aria-label="Settings">
          ⚙
        </button>
      </div>

      <header className="home__head">
        <div className="seal" aria-hidden>★</div>
        <h1 className="home__title">Presidential&nbsp;Fantasy</h1>
        <p className="home__tag">The desk is yours. The clock is running.</p>
      </header>

      {savedGame && !configuring && (
        <button className="resume" onClick={onResume}>
          <span className="resume__icon">{PERSONA_BY_ID[savedGame.president.personaId]?.emoji ?? "▶"}</span>
          <span className="resume__body">
            <strong>Resume your presidency</strong>
            <small>
              {savedGame.president.name} · TERM {savedGame.term} · DAY {savedGame.day.toLocaleString()} ·{" "}
              {savedGame.stats.approval}% APPROVAL
              {savedGame.dailySeed ? " · DAILY" : ""}
            </small>
          </span>
          <span className="resume__go">→</span>
        </button>
      )}

      {!configuring && (
        <div className="home__grid">
          <button className="home__tile home__tile--primary" onClick={() => setConfiguring(true)}>
            <span className="home__tile-emoji">🏛️</span>
            <strong>New Career</strong>
            <small>Pick your path to power</small>
          </button>
          <button className="home__tile" onClick={onStartDaily}>
            <span className="daily-seal" aria-hidden>
              DAILY
            </span>
            <span className="home__tile-emoji">{dailyPersona.emoji}</span>
            <strong>Daily Brief</strong>
            <small>
              {dailyBest != null ? `Best today: ${dailyBest.toLocaleString()}` : `Same crises for everyone · ${seed}`}
            </small>
          </button>
          <button className="home__tile" onClick={onLeaderboard}>
            <span className="home__tile-emoji">🏆</span>
            <strong>Hall of Records</strong>
            <small>
              {profile.totals.careers > 0
                ? `${profile.totals.careers} career${profile.totals.careers === 1 ? "" : "s"} on file`
                : "No careers on file yet"}
            </small>
          </button>
          <div className="home__tile home__tile--static">
            <span className="home__tile-emoji">🏅</span>
            <strong>
              {achieved}/{ACHIEVEMENTS.length}
            </strong>
            <small>Achievements earned</small>
          </div>
        </div>
      )}

      {configuring && (
        <div className="card home__setup">
          <div className="section-label">CANDIDATE FILE</div>
          <label className="field">
            <span className="field__label">Name on the ballot</span>
            <input
              className="field__input"
              value={name}
              maxLength={28}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="section-label">How you rose to power</div>
          <div className="personas">
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                className={`persona ${personaId === p.id ? "persona--active" : ""}`}
                onClick={() => setPersonaId(p.id)}
              >
                <span className="persona__emoji">{p.emoji}</span>
                <span className="persona__name">{p.name}</span>
                <span className="persona__title">{p.title}</span>
                <span className="persona__blurb">{p.blurb}</span>
                <span className="persona__perk">⚡ {p.perk}</span>
              </button>
            ))}
          </div>

          <div className="section-label">Difficulty</div>
          <div className="diffs">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                className={`diff ${difficulty === d.id ? "diff--active" : ""}`}
                onClick={() => setDifficulty(d.id)}
              >
                <span className="diff__emoji">{d.emoji}</span>
                <span className="diff__name">{d.name}</span>
                <span className="diff__blurb">{d.blurb}</span>
              </button>
            ))}
          </div>

          <button className="btn btn--primary btn--block btn--lg" onClick={() => onStart(name, personaId, difficulty)}>
            Take the Oath of Office →
          </button>
          <button className="btn btn--ghost btn--block signin__back" onClick={() => setConfiguring(false)}>
            Back
          </button>
        </div>
      )}

      <footer className="home__foot">
        {eventCount} scenarios in rotation · plays in the browser · installs as an app · free forever
      </footer>
    </div>
  );
}
