export default function WildcardScene() {
  return (
    <svg viewBox="0 0 400 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A glowing disc hovers over a moonlit farm with a barn and water tower">
      <defs>
        <linearGradient id="wildSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="wildOrbGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#45cdde" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#45cdde" stopOpacity="0.12" />
          <stop offset="1" stopColor="#45cdde" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wildMoonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.18" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#wildSky)" />

      <circle cx="345" cy="30" r="26" fill="url(#wildMoonGlow)" />
      <circle cx="345" cy="30" r="9" fill="#e9edf5" fillOpacity="0.5" />

      <circle cx="22" cy="18" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="48" cy="40" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="75" cy="12" r="1" fill="#e9edf5" opacity="0.6" />
      <circle cx="103" cy="30" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="140" cy="14" r="1" fill="#e9edf5" opacity="0.55" />
      <circle cx="168" cy="38" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="205" cy="10" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="236" cy="26" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="262" cy="48" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="290" cy="14" r="1" fill="#e9edf5" opacity="0.55" />
      <circle cx="311" cy="52" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="378" cy="60" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="12" cy="58" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="60" cy="70" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="130" cy="55" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="222" cy="60" r="1" fill="#e9edf5" opacity="0.35" />

      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -4; 0 0" dur="6s" repeatCount="indefinite" />
        <circle cx="150" cy="58" r="46" fill="url(#wildOrbGlow)" />
        <polygon points="128,66 172,66 196,150 104,150" fill="#45cdde" opacity="0.1">
          <animate attributeName="opacity" values="0.06;0.16;0.06" dur="6s" repeatCount="indefinite" />
        </polygon>
        <ellipse cx="150" cy="62" rx="30" ry="8" fill="#1d2b4a" />
        <ellipse cx="150" cy="60" rx="30" ry="8" fill="#3a4a66" />
        <path d="M132 56 Q150 42 168 56 Q150 62 132 56" fill="#52658c" />
        <ellipse cx="150" cy="50" rx="9" ry="5" fill="#45cdde" opacity="0.7" />
        <circle cx="132" cy="63" r="1.5" fill="#ebce8b" />
        <circle cx="141" cy="65" r="1.5" fill="#c9a961" />
        <circle cx="150" cy="66" r="1.5" fill="#ebce8b" />
        <circle cx="159" cy="65" r="1.5" fill="#c9a961" />
        <circle cx="168" cy="63" r="1.5" fill="#ebce8b" />
      </g>

      <path d="M0 132 Q70 118 150 128 Q240 138 320 124 Q370 118 400 126 L400 180 L0 180 Z" fill="#16213a" />

      <g fill="#1d2b4a">
        <rect x="238" y="94" width="52" height="36" />
        <polygon points="232,96 264,76 296,96" />
        <rect x="228" y="118" width="14" height="12" />
      </g>
      <rect x="250" y="104" width="9" height="9" fill="#c9a961" />
      <rect x="269" y="104" width="9" height="9" fill="#ebce8b" opacity="0.85" />
      <rect x="259" y="116" width="10" height="14" fill="#0d1526" />

      <g fill="#1d2b4a">
        <rect x="330" y="72" width="4" height="52" />
        <rect x="352" y="72" width="4" height="52" />
        <rect x="328" y="98" width="30" height="3" />
        <path d="M326 58 L360 58 L356 78 L330 78 Z" />
        <path d="M326 58 Q343 48 360 58 Z" />
        <rect x="341" y="118" width="4" height="10" />
      </g>
      <circle cx="343" cy="68" r="2" fill="#ebce8b">
        <animate attributeName="opacity" values="1;0.25;1" dur="4s" repeatCount="indefinite" />
      </circle>

      <g fill="#1d2b4a">
        <rect x="52" y="106" width="7" height="22" />
        <path d="M44 106 L67 106 L61 92 L50 92 Z" />
      </g>
      <rect x="20" y="120" width="2" height="12" fill="#1d2b4a" />
      <rect x="88" y="122" width="2" height="10" fill="#1d2b4a" />
      <rect x="19" y="122" width="71" height="2" fill="#1d2b4a" />

      <path d="M0 148 Q60 138 130 146 Q210 154 290 144 Q350 138 400 146 L400 180 L0 180 Z" fill="#0a101d" />
      <path d="M0 162 Q100 154 200 160 Q300 166 400 158 L400 180 L0 180 Z" fill="#05070b" />

      <g stroke="#16213a" strokeWidth="1.5" strokeLinecap="round">
        <path d="M30 160 L28 170" />
        <path d="M55 158 L54 169" />
        <path d="M82 161 L81 171" />
        <path d="M112 158 L110 168" />
        <path d="M148 162 L147 172" />
        <path d="M188 159 L187 170" />
        <path d="M228 162 L227 172" />
        <path d="M268 158 L266 169" />
        <path d="M308 160 L307 171" />
        <path d="M348 158 L347 169" />
        <path d="M380 161 L379 171" />
      </g>
    </svg>
  );
}
