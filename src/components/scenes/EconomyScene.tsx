export default function EconomyScene() {
  return (
    <svg viewBox="0 0 400 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A financial district skyline at night with brass-lit windows and a green market ticker crowning one tower">
      <defs>
        <linearGradient id="econSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="econMoonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.25" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="econTickerGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#46de96" stopOpacity="0.18" />
          <stop offset="1" stopColor="#46de96" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#econSky)" />

      <circle cx="30" cy="18" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="72" cy="30" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="118" cy="14" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="160" cy="26" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="238" cy="12" r="1" fill="#e9edf5" opacity="0.45" />
      <circle cx="286" cy="24" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="356" cy="16" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="386" cy="34" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="196" cy="8" r="1" fill="#e9edf5" opacity="0.6" />

      <circle cx="338" cy="34" r="26" fill="url(#econMoonGlow)" />
      <path d="M344 22 A13 13 0 1 0 344 46 A10 10 0 1 1 344 22 Z" fill="#e9edf5" opacity="0.75" />

      <rect x="0" y="96" width="34" height="64" fill="#16213a" />
      <rect x="36" y="82" width="30" height="78" fill="#16213a" />
      <rect x="120" y="90" width="26" height="70" fill="#16213a" />
      <rect x="212" y="86" width="30" height="74" fill="#16213a" />
      <rect x="300" y="92" width="28" height="68" fill="#16213a" />
      <rect x="360" y="84" width="40" height="76" fill="#16213a" />
      <rect x="70" y="98" width="20" height="62" fill="#16213a" />

      <rect x="14" y="72" width="36" height="88" fill="#1d2b4a" />
      <rect x="96" y="60" width="34" height="100" fill="#1d2b4a" />
      <rect x="106" y="52" width="14" height="8" fill="#1d2b4a" />
      <rect x="236" y="66" width="36" height="94" fill="#1d2b4a" />
      <rect x="330" y="70" width="34" height="90" fill="#1d2b4a" />
      <rect x="278" y="78" width="26" height="82" fill="#1d2b4a" />

      <polygon points="176,160 176,44 196,30 216,44 216,160" fill="#24365c" />
      <rect x="194" y="20" width="4" height="12" fill="#3a4a66" />
      <rect x="152" y="76" width="30" height="84" fill="#24365c" />
      <rect x="56" y="88" width="26" height="72" fill="#24365c" />
      <rect x="252" y="80" width="30" height="80" fill="#24365c" />

      <rect x="20" y="80" width="4" height="4" fill="#c9a961" />
      <rect x="32" y="92" width="4" height="4" fill="#c9a961" />
      <rect x="40" y="104" width="4" height="4" fill="#c9a961" opacity="0.8" />
      <rect x="26" y="118" width="4" height="4" fill="#c9a961" opacity="0.6" />
      <rect x="62" y="96" width="4" height="4" fill="#c9a961" />
      <rect x="72" y="110" width="4" height="4" fill="#c9a961" opacity="0.7" />
      <rect x="102" y="68" width="4" height="4" fill="#ebce8b" />
      <rect x="114" y="80" width="4" height="4" fill="#c9a961" />
      <rect x="106" y="96" width="4" height="4" fill="#c9a961" opacity="0.7" />
      <rect x="120" y="112" width="4" height="4" fill="#c9a961" opacity="0.5" />
      <rect x="158" y="84" width="4" height="4" fill="#c9a961" />
      <rect x="170" y="98" width="4" height="4" fill="#c9a961" opacity="0.7" />
      <rect x="184" y="56" width="4" height="4" fill="#ebce8b" />
      <rect x="196" y="68" width="4" height="4" fill="#c9a961" />
      <rect x="188" y="84" width="4" height="4" fill="#c9a961" opacity="0.8" />
      <rect x="202" y="100" width="4" height="4" fill="#c9a961" opacity="0.6" />
      <rect x="192" y="118" width="4" height="4" fill="#c9a961" opacity="0.5" />
      <rect x="244" y="74" width="4" height="4" fill="#c9a961" />
      <rect x="258" y="90" width="4" height="4" fill="#c9a961" opacity="0.8" />
      <rect x="268" y="106" width="4" height="4" fill="#c9a961" opacity="0.6" />
      <rect x="286" y="86" width="4" height="4" fill="#c9a961" />
      <rect x="294" y="102" width="4" height="4" fill="#c9a961" opacity="0.7" />
      <rect x="338" y="78" width="4" height="4" fill="#ebce8b" />
      <rect x="348" y="92" width="4" height="4" fill="#c9a961" />
      <rect x="340" y="108" width="4" height="4" fill="#c9a961" opacity="0.6" />
      <rect x="370" y="94" width="4" height="4" fill="#c9a961" opacity="0.8" />
      <rect x="382" y="110" width="4" height="4" fill="#c9a961" opacity="0.6" />
      <rect x="308" y="100" width="4" height="4" fill="#c9a961" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
      </rect>

      <ellipse cx="196" cy="42" rx="34" ry="16" fill="url(#econTickerGlow)" />
      <polyline points="178,48 184,42 189,46 195,36 201,44 207,38 214,46" fill="none" stroke="#46de96" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="6s" repeatCount="indefinite" />
      </polyline>

      <rect x="0" y="152" width="400" height="28" fill="#05070b" />
      <rect x="0" y="150" width="400" height="3" fill="#3a4a66" opacity="0.5" />
      <rect x="60" y="158" width="10" height="2" fill="#52658c" opacity="0.4" />
      <rect x="150" y="164" width="14" height="2" fill="#52658c" opacity="0.3" />
      <rect x="250" y="160" width="12" height="2" fill="#52658c" opacity="0.4" />
      <rect x="330" y="166" width="10" height="2" fill="#52658c" opacity="0.3" />
      <rect x="192" y="156" width="8" height="10" fill="#16213a" />
      <rect x="195" y="158" width="2" height="3" fill="#c9a961" opacity="0.7" />
    </svg>
  );
}
