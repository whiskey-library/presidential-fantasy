import { useState } from "react";
import type { GameState, HallOfFameEntry } from "../game/types";
import { PERSONAS, PERSONA_BY_ID } from "../game/personas";

export default function StartScreen({
  savedGame,
  hallOfFame,
  onStart,
  onResume,
  eventCount,
}: {
  savedGame: GameState | null;
  hallOfFame: HallOfFameEntry[];
  onStart: (name: string, personaId: string) => void;
  onResume: () => void;
  eventCount: number;
}) {
  const [name, setName] = useState("");
  const [personaId, setPersonaId] = useState(PERSONAS[0].id);

  const begin = () => onStart(name, personaId);

  return (
    <div className="start">
      <div className="start__hero">
        <div className="start__seal">★</div>
        <h1 className="start__title">Presidential&nbsp;Fantasy</h1>
        <p className="start__tag">
          Make the call. Move the needle. Read the headlines. Build a legacy.
        </p>
        <div className="start__free">✓ Free forever · every feature unlocked · no ads</div>
      </div>

      {savedGame && (
        <button className="resume" onClick={onResume}>
          <span className="resume__icon">{PERSONA_BY_ID[savedGame.president.personaId]?.emoji ?? "▶"}</span>
          <span className="resume__body">
            <strong>Continue your presidency</strong>
            <small>
              {savedGame.president.name} · Term {savedGame.term} · Day {savedGame.day.toLocaleString()} ·
              {" "}
              {savedGame.stats.approval}% approval
            </small>
          </span>
          <span className="resume__go">→</span>
        </button>
      )}

      <div className="card start__setup">
        <label className="field">
          <span className="field__label">Your name, Mr./Madam President</span>
          <input
            className="field__input"
            value={name}
            maxLength={28}
            placeholder="President…"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && begin()}
          />
        </label>

        <div className="section-label">Choose how you rose to power</div>
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

        <button className="btn btn--primary btn--block btn--lg" onClick={begin}>
          Take the Oath of Office →
        </button>
      </div>

      <div className="start__how">
        <div className="section-label">How it works</div>
        <ol>
          <li>A crisis hits your desk. You pick how to respond.</li>
          <li>Your four meters swing — <strong>Approval</strong> is the one that keeps you in office.</li>
          <li>Four rival news outlets and the social feed react to every call.</li>
          <li>Survive your term, win re-election, and build the biggest legacy you can.</li>
        </ol>
        <p className="start__count">{eventCount} scenarios in rotation · play in your browser or install as an app</p>
      </div>

      {hallOfFame.length > 0 && (
        <div className="card start__hof">
          <div className="section-label">🏛️ Your Hall of Fame</div>
          <ol className="hof">
            {hallOfFame.slice(0, 5).map((h, i) => (
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

      <footer className="start__footer">
        A fictional, nonpartisan political sim. Any resemblance to real events is for fun.
      </footer>
    </div>
  );
}
