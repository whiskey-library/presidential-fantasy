export default function ForeignScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Embassy row at night: flag-lined avenue leading to a grand lit palace under a crescent moon"
    >
      <defs>
        <linearGradient id="foreignSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="foreignMoonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.25" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="foreignDoorGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#foreignSky)" />

      <circle cx="52" cy="30" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="110" cy="18" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="160" cy="34" r="1" fill="#e9edf5" opacity="0.45" />
      <circle cx="250" cy="20" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="298" cy="38" r="1" fill="#e9edf5" opacity="0.55" />
      <circle cx="352" cy="24" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="382" cy="46" r="1" fill="#e9edf5" opacity="0.45" />
      <circle cx="22" cy="52" r="1" fill="#e9edf5" opacity="0.3" />

      <circle cx="330" cy="34" r="26" fill="url(#foreignMoonGlow)" />
      <circle cx="330" cy="34" r="9" fill="#e9edf5" opacity="0.7" />
      <circle cx="334" cy="31" r="8" fill="#0d1526" />

      <rect x="0" y="96" width="70" height="44" fill="#16213a" />
      <rect x="330" y="94" width="70" height="46" fill="#16213a" />
      <rect x="12" y="104" width="5" height="4" fill="#c9a961" opacity="0.5" />
      <rect x="40" y="112" width="5" height="4" fill="#c9a961" opacity="0.4" />
      <rect x="352" y="102" width="5" height="4" fill="#c9a961" opacity="0.5" />
      <rect x="378" y="114" width="5" height="4" fill="#c9a961" opacity="0.35" />

      <rect x="120" y="70" width="160" height="70" fill="#1d2b4a" />
      <rect x="112" y="66" width="176" height="6" fill="#24365c" />
      <polygon points="160,66 240,66 200,40" fill="#24365c" />
      <rect x="196" y="28" width="8" height="14" fill="#24365c" />
      <rect x="188" y="52" width="24" height="14" fill="#1d2b4a" />

      <rect x="132" y="80" width="8" height="60" fill="#24365c" />
      <rect x="152" y="80" width="8" height="60" fill="#24365c" />
      <rect x="240" y="80" width="8" height="60" fill="#24365c" />
      <rect x="260" y="80" width="8" height="60" fill="#24365c" />

      <rect x="170" y="84" width="9" height="14" fill="#c9a961" opacity="0.85" />
      <rect x="221" y="84" width="9" height="14" fill="#c9a961" opacity="0.85" />
      <rect x="170" y="108" width="9" height="14" fill="#c9a961" opacity="0.55" />
      <rect x="221" y="108" width="9" height="14" fill="#ebce8b" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.15;0.8" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="138" y="94" width="6" height="9" fill="#c9a961" opacity="0.4" />
      <rect x="256" y="94" width="6" height="9" fill="#c9a961" opacity="0.4" />

      <circle cx="200" cy="126" r="24" fill="url(#foreignDoorGlow)" />
      <rect x="192" y="112" width="16" height="28" fill="#ebce8b" opacity="0.9" />
      <rect x="199" y="112" width="2" height="28" fill="#1d2b4a" />
      <rect x="184" y="108" width="32" height="4" fill="#24365c" />

      <rect x="86" y="70" width="2" height="70" fill="#3a4a66" />
      <polygon points="88,72 112,76 88,84" fill="#52658c" />
      <rect x="104" y="80" width="2" height="60" fill="#3a4a66" />
      <polygon points="106,82 126,86 106,92" fill="#c9a961" opacity="0.75" />

      <rect x="312" y="70" width="2" height="70" fill="#3a4a66" />
      <polygon points="312,72 288,76 312,84" fill="#52658c" />
      <rect x="294" y="80" width="2" height="60" fill="#3a4a66" />
      <polygon points="294,82 274,86 294,92" fill="#c9a961" opacity="0.75" />

      <rect x="64" y="60" width="2" height="80" fill="#3a4a66" />
      <polygon points="66,62 94,67 66,76" fill="#52658c">
        <animateTransform
          attributeName="transform"
          type="skewY"
          values="0;2;0;-1;0"
          dur="6s"
          repeatCount="indefinite"
        />
      </polygon>
      <rect x="334" y="60" width="2" height="80" fill="#3a4a66" />
      <polygon points="334,62 306,67 334,76" fill="#52658c" />

      <circle cx="65" cy="58" r="1.5" fill="#c9a961" opacity="0.6" />
      <circle cx="335" cy="58" r="1.5" fill="#c9a961" opacity="0.6" />
      <circle cx="87" cy="68" r="1.5" fill="#c9a961" opacity="0.5" />
      <circle cx="313" cy="68" r="1.5" fill="#c9a961" opacity="0.5" />

      <rect x="0" y="140" width="400" height="40" fill="#05070b" />
      <rect x="0" y="140" width="400" height="2" fill="#16213a" />
      <polygon points="150,142 250,142 300,180 100,180" fill="#0d1526" opacity="0.6" />
      <rect x="196" y="142" width="8" height="30" fill="#c9a961" opacity="0.18" />
      <rect x="170" y="146" width="6" height="22" fill="#c9a961" opacity="0.1" />
      <rect x="224" y="146" width="6" height="22" fill="#c9a961" opacity="0.1" />
      <rect x="64" y="142" width="3" height="16" fill="#3a4a66" opacity="0.3" />
      <rect x="334" y="142" width="3" height="16" fill="#3a4a66" opacity="0.3" />
      <rect x="120" y="150" width="60" height="1" fill="#16213a" opacity="0.7" />
      <rect x="230" y="156" width="70" height="1" fill="#16213a" opacity="0.7" />
      <rect x="40" y="164" width="90" height="1" fill="#16213a" opacity="0.5" />
      <rect x="280" y="168" width="80" height="1" fill="#16213a" opacity="0.5" />
    </svg>
  );
}
