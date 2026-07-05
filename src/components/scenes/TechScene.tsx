export default function TechScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A dark server hall at 2 AM: rows of racks with blinking indicator lights beneath a glowing teal wall screen"
    >
      <defs>
        <linearGradient id="techSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="techScreenGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#45cdde" stopOpacity="0.22" />
          <stop offset="1" stopColor="#45cdde" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="techLampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.3" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#techSky)" />

      <line x1="0" y1="14" x2="400" y2="14" stroke="#16213a" strokeWidth="4" />
      <line x1="0" y1="24" x2="400" y2="24" stroke="#1d2b4a" strokeWidth="2" />
      <line x1="40" y1="14" x2="40" y2="26" stroke="#16213a" strokeWidth="2" />
      <line x1="120" y1="14" x2="120" y2="26" stroke="#16213a" strokeWidth="2" />
      <line x1="200" y1="14" x2="200" y2="26" stroke="#16213a" strokeWidth="2" />
      <line x1="280" y1="14" x2="280" y2="26" stroke="#16213a" strokeWidth="2" />
      <line x1="360" y1="14" x2="360" y2="26" stroke="#16213a" strokeWidth="2" />

      <circle cx="18" cy="8" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="96" cy="6" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="238" cy="7" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="332" cy="5" r="1" fill="#e9edf5" opacity="0.3" />

      <rect x="80" y="34" width="4" height="10" fill="#c9a961" opacity="0.8" />
      <circle cx="82" cy="44" r="16" fill="url(#techLampGlow)" />
      <rect x="316" y="34" width="4" height="10" fill="#c9a961" opacity="0.8" />
      <circle cx="318" cy="44" r="16" fill="url(#techLampGlow)" />

      <ellipse cx="200" cy="72" rx="120" ry="52" fill="url(#techScreenGlow)" />
      <rect x="128" y="40" width="144" height="66" rx="3" fill="#0a1220" stroke="#24365c" strokeWidth="2" />
      <rect x="134" y="46" width="132" height="54" fill="#0e1c2c" />
      <line x1="134" y1="64" x2="266" y2="64" stroke="#24365c" strokeWidth="1" opacity="0.6" />
      <line x1="134" y1="82" x2="266" y2="82" stroke="#24365c" strokeWidth="1" opacity="0.6" />
      <line x1="167" y1="46" x2="167" y2="100" stroke="#24365c" strokeWidth="1" opacity="0.4" />
      <line x1="200" y1="46" x2="200" y2="100" stroke="#24365c" strokeWidth="1" opacity="0.4" />
      <line x1="233" y1="46" x2="233" y2="100" stroke="#24365c" strokeWidth="1" opacity="0.4" />
      <polyline
        points="138,88 158,80 176,84 196,66 214,72 234,56 250,62 262,52"
        fill="none"
        stroke="#45cdde"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
      </polyline>
      <circle cx="262" cy="52" r="2.5" fill="#45cdde" />
      <rect x="188" y="106" width="24" height="6" fill="#0a1220" />

      <g fill="#1d2b4a">
        <rect x="10" y="62" width="30" height="90" />
        <rect x="46" y="62" width="30" height="90" />
        <rect x="82" y="70" width="28" height="82" />
        <rect x="290" y="70" width="28" height="82" />
        <rect x="324" y="62" width="30" height="90" />
        <rect x="360" y="62" width="30" height="90" />
      </g>
      <g fill="#16213a">
        <rect x="118" y="92" width="26" height="60" />
        <rect x="150" y="98" width="24" height="54" />
        <rect x="226" y="98" width="24" height="54" />
        <rect x="256" y="92" width="26" height="60" />
      </g>

      <g stroke="#3a4a66" strokeWidth="1" opacity="0.7">
        <line x1="12" y1="76" x2="38" y2="76" />
        <line x1="12" y1="94" x2="38" y2="94" />
        <line x1="12" y1="112" x2="38" y2="112" />
        <line x1="12" y1="130" x2="38" y2="130" />
        <line x1="48" y1="76" x2="74" y2="76" />
        <line x1="48" y1="94" x2="74" y2="94" />
        <line x1="48" y1="112" x2="74" y2="112" />
        <line x1="48" y1="130" x2="74" y2="130" />
        <line x1="84" y1="86" x2="108" y2="86" />
        <line x1="84" y1="104" x2="108" y2="104" />
        <line x1="84" y1="122" x2="108" y2="122" />
        <line x1="292" y1="86" x2="316" y2="86" />
        <line x1="292" y1="104" x2="316" y2="104" />
        <line x1="292" y1="122" x2="316" y2="122" />
        <line x1="326" y1="76" x2="352" y2="76" />
        <line x1="326" y1="94" x2="352" y2="94" />
        <line x1="326" y1="112" x2="352" y2="112" />
        <line x1="326" y1="130" x2="352" y2="130" />
        <line x1="362" y1="76" x2="388" y2="76" />
        <line x1="362" y1="94" x2="388" y2="94" />
        <line x1="362" y1="112" x2="388" y2="112" />
        <line x1="362" y1="130" x2="388" y2="130" />
      </g>

      <g fill="#c9a961">
        <circle cx="16" cy="70" r="1.5" />
        <circle cx="52" cy="88" r="1.5" />
        <circle cx="88" cy="98" r="1.5" />
        <circle cx="330" cy="70" r="1.5" />
        <circle cx="366" cy="106" r="1.5" />
        <circle cx="122" cy="104" r="1.5" />
        <circle cx="262" cy="104" r="1.5" />
      </g>
      <g fill="#45cdde">
        <circle cx="22" cy="106" r="1.5" />
        <circle cx="58" cy="124" r="1.5" />
        <circle cx="94" cy="116" r="1.5" />
        <circle cx="298" cy="98" r="1.5" />
        <circle cx="336" cy="124" r="1.5" />
        <circle cx="372" cy="88" r="1.5" />
        <circle cx="156" cy="110" r="1.5" />
      </g>
      <circle cx="34" cy="88" r="1.5" fill="#c9a961">
        <animate attributeName="opacity" values="1;0.15;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="348" cy="106" r="1.5" fill="#45cdde">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="5s" repeatCount="indefinite" />
      </circle>

      <rect x="0" y="152" width="400" height="28" fill="#05070b" />
      <line x1="0" y1="152" x2="400" y2="152" stroke="#16213a" strokeWidth="1.5" />
      <g stroke="#0e1626" strokeWidth="1">
        <line x1="50" y1="152" x2="30" y2="180" />
        <line x1="130" y1="152" x2="118" y2="180" />
        <line x1="200" y1="152" x2="200" y2="180" />
        <line x1="270" y1="152" x2="282" y2="180" />
        <line x1="350" y1="152" x2="370" y2="180" />
      </g>
      <rect x="176" y="152" width="48" height="3" fill="#45cdde" opacity="0.25" />
    </svg>
  );
}
