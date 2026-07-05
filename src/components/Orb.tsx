import type { StatKey } from "../game/types";

// ── Liquid meter orbs ───────────────────────────────────────────────────────
// The four national meters as literal water levels: a glass orb that fills,
// sloshes, and drains as the country reacts. Glanceable from across the room.

const STAT_COLOR: Record<StatKey, string> = {
  approval: "#6fa6ff",
  economy: "#46de96",
  stability: "#f5b84f",
  world: "#45cdde",
};

const STAT_ICON: Record<StatKey, JSX.Element> = {
  // tiny inline glyphs drawn at 12x12, rendered above the waterline
  approval: (
    <path d="M6 1.5 L7.2 4.4 L10.4 4.6 L8 6.6 L8.8 9.7 L6 8 L3.2 9.7 L4 6.6 L1.6 4.6 L4.8 4.4 Z" />
  ),
  economy: <path d="M2 10 L2 6.5 L4.5 6.5 L4.5 10 Z M5.5 10 L5.5 4 L8 4 L8 10 Z M9 10 L9 1.8 L11.5 1.8 L11.5 10 Z" />,
  stability: <path d="M6 1.2 L10.8 3.4 L10.8 4.6 L1.2 4.6 L1.2 3.4 Z M2.4 5.4 L3.8 5.4 L3.8 9 L2.4 9 Z M5.3 5.4 L6.7 5.4 L6.7 9 L5.3 9 Z M8.2 5.4 L9.6 5.4 L9.6 9 L8.2 9 Z M1.2 9.8 L10.8 9.8 L10.8 11 L1.2 11 Z" />,
  world: (
    <path d="M6 0.8 A5.2 5.2 0 1 0 6 11.2 A5.2 5.2 0 1 0 6 0.8 Z M6 2 A4 4 0 0 1 6 10 A9 9 0 0 1 6 2 Z M1.5 5.4 L10.5 5.4 L10.5 6.6 L1.5 6.6 Z" fillRule="evenodd" />
  ),
};

export default function Orb({
  statKey,
  value,
  label,
  size = 64,
  delta,
}: {
  statKey: StatKey;
  value: number;
  label: string;
  size?: number;
  delta?: number | null;
}) {
  const color = STAT_COLOR[statKey];
  const danger = value < 22;
  const warn = !danger && value < 40;
  // Waterline: value 0 → y 64 (empty), 100 → y 8 (full), inside a r=28 orb.
  const level = 64 - (value / 100) * 56;
  const uid = `orb-${statKey}-${size}`;

  return (
    <div className={`orb ${danger ? "orb--danger" : warn ? "orb--warn" : ""}`}>
      <div className="orb__glass" style={{ width: size, height: size }}>
        <svg viewBox="0 0 72 72" width={size} height={size} role="img" aria-label={`${label} ${value} of 100`}>
          <defs>
            <clipPath id={uid}>
              <circle cx="36" cy="36" r="28" />
            </clipPath>
          </defs>
          {/* glass */}
          <circle cx="36" cy="36" r="28" fill="#0a0e15" />
          <g clipPath={`url(#${uid})`}>
            {/* liquid body */}
            <rect x="0" y={level} width="72" height="72" fill={color} opacity="0.28" />
            {/* rolling wave surface: two-hump path, translated for a seamless loop */}
            <g>
              <path
                d={`M-72 ${level} Q -54 ${level - 4} -36 ${level} T 0 ${level} T 36 ${level} T 72 ${level} T 108 ${level} V 80 H -72 Z`}
                fill={color}
                opacity="0.5"
              >
                <animateTransform attributeName="transform" type="translate" from="0 0" to="72 0" dur="3.2s" repeatCount="indefinite" />
              </path>
              <path
                d={`M-72 ${level + 1.5} Q -54 ${level - 2.5} -36 ${level + 1.5} T 0 ${level + 1.5} T 36 ${level + 1.5} T 72 ${level + 1.5} T 108 ${level + 1.5} V 80 H -72 Z`}
                fill={color}
                opacity="0.35"
              >
                <animateTransform attributeName="transform" type="translate" from="72 0" to="0 0" dur="4.1s" repeatCount="indefinite" />
              </path>
            </g>
            {/* glass shine */}
            <ellipse cx="27" cy="20" rx="10" ry="5" fill="#e9edf5" opacity="0.08" transform="rotate(-20 27 20)" />
          </g>
          {/* icon watermark */}
          <g transform="translate(30 12) scale(1)" fill={color} opacity="0.9">
            {STAT_ICON[statKey]}
          </g>
          {/* rim */}
          <circle cx="36" cy="36" r="28" fill="none" stroke={danger ? "#d8394a" : "rgba(150,168,196,0.35)"} strokeWidth="2.5" className="orb__rim" />
          {/* value */}
          <text x="36" y="44" textAnchor="middle" fontSize="19" fontWeight="700" fill="#e9edf5" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
            {value}
          </text>
        </svg>
        {delta != null && delta !== 0 && (
          <span key={`${statKey}-${delta}-${value}`} className={`orb__delta ${delta > 0 ? "up" : "down"}`}>
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        )}
      </div>
      <span className="orb__label">{label}</span>
    </div>
  );
}
