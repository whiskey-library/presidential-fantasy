export default function ScandalScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A night press ambush: boom microphones and camera flashes aimed at an empty brass-lit podium on marble steps as shredded paper falls"
    >
      <defs>
        <linearGradient id="scandalSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="scandalPodiumGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="scandalFlashGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#e9edf5" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#scandalSky)" />

      <circle cx="24" cy="18" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="61" cy="30" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="103" cy="14" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="152" cy="24" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="238" cy="12" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="287" cy="27" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="331" cy="16" r="1" fill="#e9edf5" opacity="0.6" />
      <circle cx="371" cy="33" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="196" cy="9" r="1" fill="#e9edf5" opacity="0.35" />

      <rect x="286" y="30" width="114" height="82" fill="#16213a" />
      <rect x="298" y="42" width="7" height="10" fill="#c9a961" opacity="0.5" />
      <rect x="316" y="42" width="7" height="10" fill="#1d2b4a" />
      <rect x="334" y="42" width="7" height="10" fill="#c9a961" opacity="0.3" />
      <rect x="298" y="64" width="7" height="10" fill="#1d2b4a" />
      <rect x="316" y="64" width="7" height="10" fill="#c9a961" opacity="0.4" />
      <rect x="334" y="64" width="7" height="10" fill="#1d2b4a" />
      <rect x="0" y="44" width="86" height="68" fill="#16213a" />
      <rect x="10" y="56" width="6" height="9" fill="#c9a961" opacity="0.4" />
      <rect x="26" y="56" width="6" height="9" fill="#1d2b4a" />
      <rect x="42" y="56" width="6" height="9" fill="#c9a961" opacity="0.3" />
      <rect x="10" y="76" width="6" height="9" fill="#1d2b4a" />
      <rect x="26" y="76" width="6" height="9" fill="#c9a961" opacity="0.5" />

      <ellipse cx="228" cy="86" rx="70" ry="44" fill="url(#scandalPodiumGlow)" />

      <rect x="140" y="112" width="176" height="6" fill="#1d2b4a" />
      <rect x="148" y="118" width="160" height="6" fill="#16213a" />
      <rect x="156" y="124" width="144" height="6" fill="#101a30" />

      <rect x="216" y="76" width="26" height="36" fill="#24365c" />
      <rect x="213" y="72" width="32" height="6" fill="#3a4a66" />
      <rect x="219" y="79" width="20" height="3" fill="#c9a961" opacity="0.8" />
      <rect x="227" y="60" width="2" height="12" fill="#3a4a66" />
      <rect x="224" y="56" width="8" height="5" rx="2" fill="#52658c" />

      <g fill="#0a1120">
        <rect x="96" y="96" width="12" height="34" rx="4" />
        <rect x="112" y="90" width="12" height="40" rx="4" />
        <rect x="128" y="98" width="12" height="32" rx="4" />
        <rect x="146" y="92" width="12" height="38" rx="4" />
        <rect x="163" y="99" width="11" height="31" rx="4" />
        <circle cx="102" cy="92" r="6" />
        <circle cx="118" cy="86" r="6" />
        <circle cx="134" cy="94" r="6" />
        <circle cx="152" cy="88" r="6" />
        <circle cx="168" cy="95" r="6" />
      </g>

      <g stroke="#3a4a66" strokeWidth="2" strokeLinecap="round">
        <line x1="104" y1="90" x2="176" y2="66" />
        <line x1="120" y1="84" x2="188" y2="70" />
        <line x1="136" y1="92" x2="196" y2="78" />
        <line x1="152" y1="86" x2="204" y2="82" />
      </g>
      <g fill="#52658c">
        <rect x="174" y="62" width="10" height="6" rx="3" />
        <rect x="186" y="66" width="10" height="6" rx="3" />
        <rect x="194" y="74" width="10" height="6" rx="3" />
        <rect x="202" y="78" width="10" height="6" rx="3" />
      </g>

      <rect x="108" y="76" width="14" height="9" rx="2" fill="#24365c" />
      <rect x="122" y="78" width="4" height="5" fill="#3a4a66" />
      <rect x="140" y="70" width="14" height="9" rx="2" fill="#24365c" />
      <rect x="154" y="72" width="4" height="5" fill="#3a4a66" />

      <circle cx="126" cy="72" r="16" fill="url(#scandalFlashGlow)">
        <animate
          attributeName="opacity"
          values="0;1;0;0;0.7;0;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="158" cy="66" r="12" fill="url(#scandalFlashGlow)">
        <animate
          attributeName="opacity"
          values="0;0;0.9;0;0;0;0"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      <g fill="#e9edf5" opacity="0.5">
        <rect x="248" y="44" width="2" height="8" transform="rotate(14 249 48)" />
        <rect x="262" y="62" width="2" height="7" transform="rotate(-18 263 65)" />
        <rect x="254" y="84" width="2" height="8" transform="rotate(10 255 88)" />
        <rect x="272" y="50" width="2" height="7" transform="rotate(-8 273 53)" />
        <rect x="268" y="96" width="2" height="8" transform="rotate(20 269 100)" />
        <rect x="242" y="70" width="2" height="7" transform="rotate(-14 243 73)" />
      </g>

      <rect x="0" y="130" width="400" height="50" fill="#05070b" />
      <rect x="0" y="130" width="400" height="3" fill="#16213a" />
      <rect x="60" y="140" width="120" height="1.5" fill="#1d2b4a" />
      <rect x="220" y="152" width="140" height="1.5" fill="#1d2b4a" />
      <rect x="30" y="162" width="90" height="1.5" fill="#101a30" />
      <ellipse cx="228" cy="134" rx="60" ry="4" fill="#c9a961" opacity="0.12" />
    </svg>
  );
}
