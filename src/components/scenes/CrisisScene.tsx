export default function CrisisScene() {
  return (
    <svg viewBox="0 0 400 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A storm-lashed coastal town at night with rain, bent palms, one lit window, and a pulsing red beacon on a distant tower">
      <defs>
        <linearGradient id="crisisSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="crisisBeaconGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d8394a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#d8394a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="crisisWindowGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.4" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#crisisSky)" />

      <circle cx="52" cy="24" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="118" cy="15" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="205" cy="28" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="352" cy="20" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="290" cy="12" r="1" fill="#e9edf5" opacity="0.3" />

      <path d="M-10 42 L70 36 L150 44 L240 34 L330 42 L410 36 L410 60 L-10 60 Z" fill="#16213a" opacity="0.6" />
      <path d="M-10 30 L90 26 L190 34 L300 24 L410 32 L410 48 L-10 48 Z" fill="#1d2b4a" opacity="0.4">
        <animateTransform attributeName="transform" type="translate" values="0 0; -14 0; 0 0" dur="8s" repeatCount="indefinite" />
      </path>

      <circle cx="318" cy="54" r="26" fill="url(#crisisBeaconGlow)">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x="315" y="60" width="6" height="52" fill="#16213a" />
      <path d="M312 60 L324 60 L321 48 L315 48 Z" fill="#1d2b4a" />
      <rect x="316" y="50" width="4" height="5" fill="#d8394a">
        <animate attributeName="opacity" values="0.25;1;0.25" dur="3s" repeatCount="indefinite" />
      </rect>
      <line x1="304" y1="112" x2="332" y2="112" stroke="#16213a" strokeWidth="3" />

      <circle cx="120" cy="112" r="20" fill="url(#crisisWindowGlow)" />

      <path d="M20 122 L20 100 L38 90 L56 100 L56 122 Z" fill="#111a2e" />
      <path d="M64 122 L64 104 L80 95 L96 104 L96 122 Z" fill="#0e1626" />
      <path d="M104 122 L104 98 L124 87 L144 98 L144 122 Z" fill="#131d33" />
      <rect x="115" y="105" width="9" height="10" fill="#c9a961" />
      <rect x="119" y="105" width="1" height="10" fill="#05070b" opacity="0.5" />
      <path d="M152 122 L152 106 L166 98 L180 106 L180 122 Z" fill="#0e1626" />
      <path d="M188 122 L188 102 L206 92 L224 102 L224 122 Z" fill="#111a2e" />
      <path d="M232 122 L232 108 L245 100 L258 108 L258 122 Z" fill="#0e1626" />
      <rect x="127" y="80" width="3" height="8" fill="#111a2e" />
      <rect x="209" y="85" width="3" height="8" fill="#0e1626" />

      <path d="M270 122 Q272 96 288 82 Q276 98 279 122 Z" fill="#111a2e" />
      <path d="M288 82 Q296 74 310 74 Q297 78 290 85 Z" fill="#111a2e" />
      <path d="M288 82 Q298 80 306 86 Q296 83 289 86 Z" fill="#0e1626" />
      <path d="M288 82 Q282 70 272 66 Q281 73 285 83 Z" fill="#111a2e" />
      <path d="M288 82 Q292 68 302 62 Q292 71 289 82 Z" fill="#0e1626" />

      <path d="M356 122 Q357 102 370 90 Q361 104 363 122 Z" fill="#0e1626" />
      <path d="M370 90 Q378 84 390 85 Q379 88 372 93 Z" fill="#0e1626" />
      <path d="M370 90 Q366 79 357 76 Q365 82 368 91 Z" fill="#111a2e" />
      <path d="M370 90 Q376 80 386 78 Q377 84 371 91 Z" fill="#111a2e" />

      <path d="M2 122 Q3 108 12 100 Q6 110 8 122 Z" fill="#0e1626" />
      <path d="M12 100 Q18 94 28 95 Q19 98 13 103 Z" fill="#0e1626" />
      <path d="M12 100 Q9 91 2 88 Q8 94 10 101 Z" fill="#111a2e" />

      <g stroke="#52658c" strokeWidth="1" strokeLinecap="round" opacity="0.4">
        <line x1="40" y1="10" x2="32" y2="34" />
        <line x1="95" y1="24" x2="87" y2="48" />
        <line x1="160" y1="6" x2="152" y2="30" />
        <line x1="215" y1="30" x2="207" y2="54" />
        <line x1="262" y1="12" x2="254" y2="36" />
        <line x1="335" y1="18" x2="327" y2="42" />
        <line x1="385" y1="8" x2="377" y2="32" />
        <line x1="65" y1="52" x2="57" y2="76" />
        <line x1="190" y1="58" x2="182" y2="82" />
        <line x1="300" y1="66" x2="292" y2="90" />
        <animateTransform attributeName="transform" type="translate" values="10 -18; -10 18; 10 -18" dur="4s" repeatCount="indefinite" />
      </g>

      <path d="M0 122 Q30 116 60 121 Q95 126 130 120 Q170 115 205 121 Q245 127 280 120 Q320 114 355 120 Q380 124 400 120 L400 180 L0 180 Z" fill="#0a111f" />
      <path d="M0 130 Q35 124 70 129 Q110 134 145 128 Q185 122 220 129 Q260 135 295 128 Q335 122 370 128 Q388 131 400 128 L400 180 L0 180 Z" fill="#07101c" />

      <path d="M18 129 Q26 125 34 128" stroke="#45cdde" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M92 136 Q101 132 110 135" stroke="#45cdde" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M168 128 Q177 124 186 127" stroke="#45cdde" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M248 137 Q257 133 266 136" stroke="#45cdde" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M328 129 Q337 125 346 128" stroke="#45cdde" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M370 140 Q379 136 388 139" stroke="#45cdde" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M52 146 Q62 142 72 145" stroke="#3a4a66" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M200 150 Q210 146 220 149" stroke="#3a4a66" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M300 156 Q311 152 322 155" stroke="#3a4a66" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

      <rect x="0" y="158" width="400" height="22" fill="#05070b" />
      <path d="M0 158 Q40 154 80 158 Q125 162 165 157 Q210 153 250 158 Q295 163 335 157 Q370 153 400 158 L400 162 L0 162 Z" fill="#0a111f" />

      <path d="M112 126 Q118 123 125 125 L123 129 Q117 127 112 129 Z" fill="#c9a961" opacity="0.15" />
    </svg>
  );
}
