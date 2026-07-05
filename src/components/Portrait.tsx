import { useMemo } from "react";
import { hashSeed } from "../game/rng";

// ── The recurring cast ──────────────────────────────────────────────────────
// Every event `source` (Chief of Staff, Treasury Secretary, DNI…) maps
// deterministically to the same generated face, so the player learns the
// characters. Zero image assets: parameterized flat-vector busts.

const SKINS = ["#f2d3b3", "#e0b48f", "#c8946b", "#a9744f", "#8a5a3b", "#6e4630"];
const HAIRS = ["#1d232e", "#3a3f4a", "#6b4a2f", "#8a8f9c", "#d9c9a3"];
const SUITS = ["#1d2b4a", "#2a2f3c", "#3b2f4a", "#263c33"];
const TIES = ["#d8394a", "#c9a961", "#45cdde", "#6fa6ff", "#46de96"];

interface Look {
  skin: string;
  hair: string;
  suit: string;
  tie: string;
  hairStyle: number; // 0..5
  glasses: boolean;
  hasTie: boolean;
}

function lookFor(name: string): Look {
  const h = hashSeed(name.trim().toLowerCase() || "aide");
  return {
    skin: SKINS[h % SKINS.length],
    hair: HAIRS[(h >> 3) % HAIRS.length],
    suit: SUITS[(h >> 6) % SUITS.length],
    tie: TIES[(h >> 9) % TIES.length],
    hairStyle: (h >> 12) % 6,
    glasses: ((h >> 15) & 3) === 0,
    hasTie: ((h >> 17) & 3) !== 0,
  };
}

function Hair({ style, color }: { style: number; color: string }) {
  switch (style) {
    case 0: // close crop
      return <path d="M26 30 Q26 16 40 16 Q54 16 54 30 L54 33 Q52 24 40 24 Q28 24 26 33 Z" fill={color} />;
    case 1: // side part
      return (
        <path d="M26 31 Q25 15 41 15 Q55 16 54 30 L53 34 Q53 25 46 23 L31 26 Q28 27 27 34 Z" fill={color} />
      );
    case 2: // curly
      return (
        <g fill={color}>
          <circle cx="30" cy="24" r="7" />
          <circle cx="40" cy="20" r="8" />
          <circle cx="50" cy="24" r="7" />
        </g>
      );
    case 3: // bun
      return (
        <g fill={color}>
          <path d="M26 31 Q26 16 40 16 Q54 16 54 31 L54 33 Q52 24 40 24 Q28 24 26 33 Z" />
          <circle cx="54" cy="18" r="5" />
        </g>
      );
    case 4: // bob
      return (
        <path d="M25 44 Q23 14 40 14 Q57 14 55 44 L51 44 Q53 26 40 24 Q27 26 29 44 Z" fill={color} />
      );
    default: // bald with side fuzz
      return (
        <g fill={color}>
          <path d="M26 32 Q26 28 28 26 L28 33 Z" />
          <path d="M54 32 Q54 28 52 26 L52 33 Z" />
        </g>
      );
  }
}

export default function Portrait({
  name,
  size = 56,
  ring = true,
}: {
  name: string;
  size?: number;
  ring?: boolean;
}) {
  const look = useMemo(() => lookFor(name), [name]);
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      role="img"
      aria-label={name}
      className="portrait"
    >
      <defs>
        <clipPath id={`pclip-${size}-${hashSeed(name)}`}>
          <circle cx="40" cy="40" r="37" />
        </clipPath>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#0a0e15" />
      <g clipPath={`url(#pclip-${size}-${hashSeed(name)})`}>
        {/* suit shoulders */}
        <path d="M12 80 Q13 56 28 53 L52 53 Q67 56 68 80 Z" fill={look.suit} />
        {/* shirt */}
        <path d="M34 54 L40 66 L46 54 L44 52 L36 52 Z" fill="#dfe5f0" />
        {/* tie or crew neck */}
        {look.hasTie ? (
          <path d="M38.5 55 L41.5 55 L43 62 L40 70 L37 62 Z" fill={look.tie} />
        ) : (
          <path d="M33 52 Q40 58 47 52 L47 55 Q40 61 33 55 Z" fill={look.tie} />
        )}
        {/* neck */}
        <rect x="35" y="42" width="10" height="12" rx="3" fill={look.skin} />
        <rect x="35" y="42" width="10" height="5" fill="rgba(0,0,0,0.14)" />
        {/* ears */}
        <circle cx="25.5" cy="34" r="3" fill={look.skin} />
        <circle cx="54.5" cy="34" r="3" fill={look.skin} />
        {/* head */}
        <rect x="26" y="18" width="28" height="30" rx="13" fill={look.skin} />
        {/* hair */}
        <Hair style={look.hairStyle} color={look.hair} />
        {/* brows */}
        <rect x="31" y="31" width="6" height="1.6" rx="0.8" fill="rgba(0,0,0,0.45)" />
        <rect x="43" y="31" width="6" height="1.6" rx="0.8" fill="rgba(0,0,0,0.45)" />
        {/* eyes or glasses */}
        {look.glasses ? (
          <g stroke="#9aa7be" strokeWidth="1.4" fill="none">
            <circle cx="34" cy="35" r="4.2" />
            <circle cx="46" cy="35" r="4.2" />
            <path d="M38.2 35 L41.8 35" />
            <circle cx="34" cy="35.4" r="1.1" fill="#10161f" stroke="none" />
            <circle cx="46" cy="35.4" r="1.1" fill="#10161f" stroke="none" />
          </g>
        ) : (
          <g fill="#141a24">
            <circle cx="34" cy="35" r="1.7" />
            <circle cx="46" cy="35" r="1.7" />
          </g>
        )}
        {/* nose + mouth, kept minimal */}
        <path d="M40 36 L39 40.5 L41.5 40.5" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M36 44 Q40 46 44 44" stroke="rgba(0,0,0,0.35)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
      {ring && <circle cx="40" cy="40" r="37.5" fill="none" stroke="#c9a961" strokeOpacity="0.55" strokeWidth="2" />}
    </svg>
  );
}
