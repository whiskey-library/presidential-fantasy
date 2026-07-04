import { useState } from "react";
import type { Profile } from "../game/types";
import { AVATARS, createProfile } from "../auth/local";
import { sfxDecide, sfxPositive } from "../game/sound";

export default function SignInScreen({
  profiles,
  onSignIn,
  onDelete,
}: {
  profiles: Profile[];
  onSignIn: (profileId: string) => void;
  onDelete: (profileId: string) => void;
}) {
  const [creating, setCreating] = useState(profiles.length === 0);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [managing, setManaging] = useState(false);
  const [clearing, setClearing] = useState<string | null>(null);
  const [storageError, setStorageError] = useState(false);

  const create = () => {
    if (!name.trim()) return;
    const p = createProfile(name, avatar);
    if (!p) {
      setStorageError(true);
      return;
    }
    sfxPositive();
    onSignIn(p.id);
  };

  const pick = (p: Profile) => {
    if (managing) return;
    setClearing(p.id);
    sfxDecide();
    setTimeout(() => onSignIn(p.id), 420);
  };

  return (
    <div className="signin">
      <div className="classbar">
        <span>PERSONNEL // AUTHORIZED ACCESS ONLY</span>
      </div>

      <header className="signin__head">
        <div className="seal seal--sm" aria-hidden>
          ★
        </div>
        <h1 className="signin__title">Presidential Fantasy</h1>
        <p className="signin__sub">Select your credentials to enter the building.</p>
        <div className="signin__free">FREE FOREVER · EVERY FEATURE UNLOCKED · NO ADS</div>
      </header>

      {!creating && (
        <>
          <div className="badges">
            {profiles.map((p) => (
              <div key={p.id} className="badge-wrap">
                <button
                  className={`badge-card ${clearing === p.id ? "badge-card--cleared" : ""}`}
                  onClick={() => pick(p)}
                >
                  <span className="badge-card__hole" aria-hidden />
                  <span className="badge-card__photo">
                    <span className="badge-card__corner tl" aria-hidden />
                    <span className="badge-card__corner tr" aria-hidden />
                    <span className="badge-card__corner bl" aria-hidden />
                    <span className="badge-card__corner br" aria-hidden />
                    {p.avatar}
                  </span>
                  <span className="badge-card__name">{p.name}</span>
                  <span className="badge-card__meta">
                    {p.totals.careers > 0
                      ? `CAREERS ${p.totals.careers} // BEST ${p.totals.bestLegacy.toLocaleString()}`
                      : "NEW APPOINTEE"}
                  </span>
                  {clearing === p.id && <span className="badge-card__stamp">CLEARED</span>}
                </button>
                {managing && (
                  <button
                    type="button"
                    className="badge-card__delete"
                    aria-label={`Delete ${p.name}`}
                    onClick={() => {
                      if (window.confirm(`Shred ${p.name}'s file? Careers and records are erased.`)) onDelete(p.id);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button className="badge-card badge-card--new" onClick={() => setCreating(true)}>
              <span className="badge-card__plus">+</span>
              <span className="badge-card__name">New Credentials</span>
              <span className="badge-card__meta">REGISTER A PRESIDENT</span>
            </button>
          </div>
          {profiles.length > 0 && (
            <button className="signin__manage" onClick={() => setManaging((m) => !m)}>
              {managing ? "Done" : "Manage credentials"}
            </button>
          )}
        </>
      )}

      {creating && (
        <div className="card signin__form">
          <div className="section-label">REGISTER NEW PERSONNEL</div>
          <label className="field">
            <span className="field__label">Name on the ballot</span>
            <input
              className="field__input"
              value={name}
              maxLength={24}
              autoFocus
              placeholder="e.g. Jordan Vale"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
            />
          </label>
          <div className="section-label">Badge photo</div>
          <div className="avatar-grid">
            {AVATARS.map((a) => (
              <button
                key={a}
                className={`avatar-pick ${avatar === a ? "avatar-pick--on" : ""}`}
                onClick={() => setAvatar(a)}
                aria-label={`Avatar ${a}`}
              >
                {a}
              </button>
            ))}
          </div>
          <button className="btn btn--primary btn--block" disabled={!name.trim()} onClick={create}>
            Issue credentials →
          </button>
          {storageError && (
            <p className="signin__error" role="alert">
              Couldn't save credentials on this device — storage is full or blocked. Free up space or
              allow site data, then retry.
            </p>
          )}
          {profiles.length > 0 && (
            <button className="btn btn--ghost btn--block signin__back" onClick={() => setCreating(false)}>
              Back to personnel
            </button>
          )}
        </div>
      )}

      <footer className="signin__foot">
        Credentials live on this device only. A fictional, nonpartisan political sim.
      </footer>
    </div>
  );
}
