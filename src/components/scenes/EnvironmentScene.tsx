export default function EnvironmentScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A wild coastline at night: pine ridges descend to dark teal-crested water beneath a glowing moon, a lone wind turbine turning on the horizon"
    >
      <defs>
        <linearGradient id="envSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="envMoonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#e9edf5" stopOpacity="0.08" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="envLampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.5" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#envSky)" />

      <circle cx="24" cy="22" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="58" cy="40" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="96" cy="16" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="142" cy="34" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="188" cy="12" r="1" fill="#e9edf5" opacity="0.45" />
      <circle cx="238" cy="28" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="356" cy="18" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="386" cy="44" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="326" cy="52" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="170" cy="52" r="1" fill="#e9edf5" opacity="0.3" />

      <circle cx="310" cy="42" r="46" fill="url(#envMoonGlow)" />
      <circle cx="310" cy="42" r="16" fill="#e9edf5" opacity="0.85" />
      <circle cx="305" cy="38" r="3" fill="#0d1526" opacity="0.12" />
      <circle cx="315" cy="47" r="2" fill="#0d1526" opacity="0.1" />

      <path d="M0 92 L18 70 L36 88 L54 62 L74 86 L92 68 L110 92 L128 74 L146 92 L0 92 Z" fill="#16213a" />
      <path d="M0 104 L22 84 L44 100 L66 78 L88 100 L112 82 L134 102 L158 86 L180 104 L0 104 Z" fill="#1d2b4a" />

      <path d="M14 96 L20 78 L26 96 Z" fill="#101a30" />
      <path d="M18 88 L20 74 L22 88 Z" fill="#101a30" />
      <path d="M42 100 L48 82 L54 100 Z" fill="#16213a" />
      <path d="M46 92 L48 78 L50 92 Z" fill="#16213a" />
      <path d="M70 98 L77 78 L84 98 Z" fill="#101a30" />
      <path d="M74 90 L77 74 L80 90 Z" fill="#101a30" />
      <path d="M100 100 L106 84 L112 100 Z" fill="#16213a" />
      <path d="M126 102 L133 84 L140 102 Z" fill="#16213a" />
      <path d="M130 94 L133 80 L136 94 Z" fill="#16213a" />
      <path d="M156 104 L162 90 L168 104 Z" fill="#1d2b4a" />

      <rect x="88" y="88" width="10" height="8" fill="#101a30" />
      <path d="M86 88 L93 82 L100 88 Z" fill="#0b1222" />
      <rect x="91" y="90" width="3" height="3" fill="#c9a961" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.35;0.9" dur="5s" repeatCount="indefinite" />
      </rect>
      <circle cx="92.5" cy="91.5" r="7" fill="url(#envLampGlow)" />

      <rect x="0" y="104" width="400" height="52" fill="#0a101d" />

      <rect x="337" y="66" width="2" height="40" fill="#3a4a66" />
      <path d="M334 106 L338 66 L340 66 L344 106 Z" fill="#24365c" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 338 66" to="360 338 66" dur="8s" repeatCount="indefinite" />
        <path d="M338 66 L336.5 40 L339.5 40 Z" fill="#52658c" />
        <path d="M338 66 L360 79 L358.5 81.5 Z" fill="#52658c" />
        <path d="M338 66 L316 79 L317.5 81.5 Z" fill="#52658c" />
      </g>
      <circle cx="338" cy="66" r="2.5" fill="#3a4a66" />

      <path d="M296 106 L400 106 L400 100 L296 103 Z" fill="#e9edf5" opacity="0.06" />

      <path d="M0 112 L34 110 L70 113 L120 110 L170 113 L220 110 L270 113 L320 110 L370 113 L400 111 L400 116 L0 116 Z" fill="#45cdde" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.12;0.3" dur="6s" repeatCount="indefinite" />
      </path>
      <path d="M20 124 L60 122 L100 125 L150 122 L200 125 L250 122 L300 125 L350 122 L390 125 L390 127 L20 127 Z" fill="#45cdde" opacity="0.15" />
      <path d="M50 136 L110 134 L170 137 L240 134 L310 137 L370 135 L370 138 L50 138 Z" fill="#24365c" opacity="0.6" />
      <path d="M290 110 L330 110 L326 118 L294 118 Z" fill="#e9edf5" opacity="0.05" />
      <path d="M282 120 L338 120 L332 130 L288 130 Z" fill="#e9edf5" opacity="0.04" />

      <path d="M0 150 L30 144 L58 150 L92 142 L130 150 L166 145 L204 151 L246 144 L288 150 L330 145 L368 151 L400 146 L400 180 L0 180 Z" fill="#05070b" />
      <path d="M22 152 L40 146 L58 153 Z" fill="#101a30" />
      <path d="M120 154 L142 147 L162 155 Z" fill="#101a30" />
      <path d="M262 152 L282 146 L300 153 Z" fill="#101a30" />
      <path d="M348 154 L366 148 L384 156 Z" fill="#101a30" />
      <circle cx="76" cy="154" r="4" fill="#16213a" />
      <circle cx="212" cy="156" r="5" fill="#16213a" />
      <circle cx="322" cy="157" r="4" fill="#16213a" />
    </svg>
  );
}
