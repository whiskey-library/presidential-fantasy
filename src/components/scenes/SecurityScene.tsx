export default function SecurityScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Situation-room radar wall with a rotating brass sweep, dotted map arcs, and silhouetted analyst desks at night"
    >
      <defs>
        <linearGradient id="secSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="secGlow">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#c9a961" stopOpacity="0.08" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#secSky)" />

      <g fill="#e9edf5">
        <circle cx="30" cy="12" r="1" opacity="0.5" />
        <circle cx="70" cy="20" r="1" opacity="0.35" />
        <circle cx="120" cy="8" r="1" opacity="0.5" />
        <circle cx="255" cy="14" r="1" opacity="0.35" />
        <circle cx="300" cy="10" r="1" opacity="0.45" />
        <circle cx="345" cy="18" r="1" opacity="0.3" />
        <circle cx="375" cy="7" r="1" opacity="0.55" />
      </g>

      <g fill="#3a4a66" fillOpacity="0.55">
        <circle cx="20" cy="34" r="1.5" />
        <circle cx="44" cy="31" r="1.5" />
        <circle cx="68" cy="29" r="1.5" />
        <circle cx="92" cy="27" r="1.5" />
        <circle cx="116" cy="26" r="1.5" />
        <circle cx="140" cy="26" r="1.5" />
        <circle cx="164" cy="27" r="1.5" />
        <circle cx="188" cy="28" r="1.5" />
        <circle cx="212" cy="28" r="1.5" />
        <circle cx="236" cy="27" r="1.5" />
        <circle cx="260" cy="26" r="1.5" />
        <circle cx="284" cy="26" r="1.5" />
        <circle cx="308" cy="27" r="1.5" />
        <circle cx="332" cy="29" r="1.5" />
        <circle cx="356" cy="31" r="1.5" />
        <circle cx="380" cy="34" r="1.5" />
        <circle cx="32" cy="58" r="1.5" />
        <circle cx="56" cy="55" r="1.5" />
        <circle cx="80" cy="53" r="1.5" />
        <circle cx="104" cy="52" r="1.5" />
        <circle cx="128" cy="51" r="1.5" />
        <circle cx="152" cy="51" r="1.5" />
        <circle cx="248" cy="51" r="1.5" />
        <circle cx="272" cy="51" r="1.5" />
        <circle cx="296" cy="52" r="1.5" />
        <circle cx="320" cy="53" r="1.5" />
        <circle cx="344" cy="55" r="1.5" />
        <circle cx="368" cy="58" r="1.5" />
        <circle cx="16" cy="88" r="1.5" />
        <circle cx="38" cy="92" r="1.5" />
        <circle cx="60" cy="95" r="1.5" />
        <circle cx="82" cy="97" r="1.5" />
        <circle cx="104" cy="98" r="1.5" />
        <circle cx="296" cy="98" r="1.5" />
        <circle cx="318" cy="97" r="1.5" />
        <circle cx="340" cy="95" r="1.5" />
        <circle cx="362" cy="92" r="1.5" />
        <circle cx="384" cy="88" r="1.5" />
      </g>

      <circle cx="200" cy="82" r="75" fill="url(#secGlow)" />
      <circle cx="200" cy="82" r="58" fill="#0d1526" stroke="#24365c" strokeWidth="1.5" />

      <circle cx="200" cy="82" r="54" fill="none" stroke="#52658c" strokeWidth="1" strokeOpacity="0.8" />
      <circle cx="200" cy="82" r="40" fill="none" stroke="#3a4a66" strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="200" cy="82" r="26" fill="none" stroke="#3a4a66" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="200" cy="82" r="12" fill="none" stroke="#3a4a66" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="146" y1="82" x2="254" y2="82" stroke="#24365c" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="200" y1="28" x2="200" y2="136" stroke="#24365c" strokeWidth="1" strokeOpacity="0.6" />

      <g stroke="#52658c" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8">
        <line x1="254" y1="82" x2="258" y2="82" />
        <line x1="238" y1="120" x2="241" y2="123" />
        <line x1="200" y1="136" x2="200" y2="140" />
        <line x1="162" y1="120" x2="159" y2="123" />
        <line x1="146" y1="82" x2="142" y2="82" />
        <line x1="162" y1="44" x2="159" y2="41" />
        <line x1="200" y1="28" x2="200" y2="24" />
        <line x1="238" y1="44" x2="241" y2="41" />
      </g>

      <g>
        <path d="M200 82 L200 28 A54 54 0 0 1 235 40.5 Z" fill="#c9a961" fillOpacity="0.2" />
        <line x1="200" y1="82" x2="200" y2="28" stroke="#ebce8b" strokeWidth="1.5" strokeOpacity="0.9" strokeLinecap="round" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 200 82"
          to="360 200 82"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>

      <circle cx="178" cy="66" r="2" fill="#c9a961" fillOpacity="0.8" />
      <circle cx="222" cy="98" r="2" fill="#c9a961" fillOpacity="0.7" />
      <circle cx="188" cy="102" r="2.5" fill="#ebce8b">
        <animate attributeName="opacity" values="1;0.15;1" dur="4s" repeatCount="indefinite" />
      </circle>

      <g>
        <rect x="28" y="134" width="64" height="5" fill="#16213a" />
        <line x1="34" y1="139" x2="34" y2="151" stroke="#16213a" strokeWidth="2" />
        <line x1="86" y1="139" x2="86" y2="151" stroke="#16213a" strokeWidth="2" />
        <rect x="38" y="127" width="9" height="7" fill="#c9a961" fillOpacity="0.7" />
        <rect x="70" y="127" width="9" height="7" fill="#c9a961" fillOpacity="0.55" />
        <circle cx="57" cy="127" r="3" fill="#05070b" />
        <path d="M51 140 Q51 131 57 131 Q63 131 63 140 Z" fill="#05070b" />
      </g>

      <g>
        <rect x="168" y="134" width="64" height="5" fill="#16213a" />
        <line x1="174" y1="139" x2="174" y2="151" stroke="#16213a" strokeWidth="2" />
        <line x1="226" y1="139" x2="226" y2="151" stroke="#16213a" strokeWidth="2" />
        <rect x="178" y="127" width="9" height="7" fill="#c9a961" fillOpacity="0.7" />
        <rect x="210" y="127" width="9" height="7" fill="#ebce8b" fillOpacity="0.6" />
        <circle cx="199" cy="127" r="3" fill="#05070b" />
        <path d="M193 140 Q193 131 199 131 Q205 131 205 140 Z" fill="#05070b" />
      </g>

      <g>
        <rect x="308" y="134" width="64" height="5" fill="#16213a" />
        <line x1="314" y1="139" x2="314" y2="151" stroke="#16213a" strokeWidth="2" />
        <line x1="366" y1="139" x2="366" y2="151" stroke="#16213a" strokeWidth="2" />
        <rect x="318" y="127" width="9" height="7" fill="#c9a961" fillOpacity="0.55" />
        <rect x="350" y="127" width="9" height="7" fill="#c9a961" fillOpacity="0.7" />
        <circle cx="337" cy="127" r="3" fill="#05070b" />
        <path d="M331 140 Q331 131 337 131 Q343 131 343 140 Z" fill="#05070b" />
      </g>

      <rect x="0" y="151" width="400" height="29" fill="#05070b" />
      <line x1="0" y1="151" x2="400" y2="151" stroke="#16213a" strokeWidth="1" strokeOpacity="0.8" />
    </svg>
  );
}
