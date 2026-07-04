import type { Settings } from "../game/types";

const TIMER_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Auto", value: null },
  { label: "Off", value: 0 },
  { label: "30s", value: 30 },
  { label: "45s", value: 45 },
  { label: "60s", value: 60 },
];

export default function SettingsSheet({
  settings,
  onChange,
  onSignOut,
  onClose,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
  onSignOut: () => void;
  onClose: () => void;
}) {
  const Toggle = ({
    label,
    hint,
    value,
    onToggle,
  }: {
    label: string;
    hint: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <button className="setrow" onClick={onToggle} role="switch" aria-checked={value}>
      <span className="setrow__text">
        <span className="setrow__label">{label}</span>
        <span className="setrow__hint">{hint}</span>
      </span>
      <span className={`switch ${value ? "switch--on" : ""}`}>
        <span className="switch__thumb">{value ? "✓" : "✕"}</span>
      </span>
    </button>
  );

  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" aria-hidden />
        <div className="section-label">AUDIO</div>
        <Toggle
          label="Sound"
          hint="Synthesized cues — stingers, fanfares, the clock."
          value={settings.sound}
          onToggle={() => onChange({ ...settings, sound: !settings.sound })}
        />

        <div className="section-label">THE CLOCK</div>
        <div className="setrow setrow--static">
          <span className="setrow__text">
            <span className="setrow__label">Decision timer</span>
            <span className="setrow__hint">Auto follows difficulty. Off removes the pressure.</span>
          </span>
        </div>
        <div className="seg">
          {TIMER_OPTIONS.map((o) => (
            <button
              key={o.label}
              className={`seg__opt ${settings.timerOverride === o.value ? "seg__opt--on" : ""}`}
              onClick={() => onChange({ ...settings, timerOverride: o.value })}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="section-label">MOTION</div>
        <Toggle
          label="Fast briefings"
          hint="Skip redaction reveals and ceremonial beats."
          value={settings.fastBriefings}
          onToggle={() => onChange({ ...settings, fastBriefings: !settings.fastBriefings })}
        />
        <Toggle
          label="Reduce motion"
          hint="Minimal animation everywhere."
          value={settings.reducedMotion}
          onToggle={() => onChange({ ...settings, reducedMotion: !settings.reducedMotion })}
        />

        <div className="section-label">SESSION</div>
        <button className="btn btn--ghost btn--block" onClick={onSignOut}>
          Sign out of this badge
        </button>
        <button className="btn btn--primary btn--block sheet__done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
