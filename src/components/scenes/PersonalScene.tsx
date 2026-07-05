export default function PersonalScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="The Oval Office at 2 AM: moonlit arched windows behind a silhouetted desk lit by a single brass lamp beside a steaming coffee cup"
    >
      <defs>
        <linearGradient id="personalSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="personalLampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#c9a961" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="personalMoonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.25" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#personalSky)" />

      <circle cx="60" cy="8" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="140" cy="5" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="250" cy="7" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="330" cy="4" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="385" cy="10" r="1" fill="#e9edf5" opacity="0.3" />

      <rect x="0" y="14" width="400" height="150" fill="#0b1220" />

      <path d="M0 14 Q200 2 400 14 L400 26 Q200 15 0 26 Z" fill="#16213a" />
      <path d="M0 26 Q200 15 400 26 L400 32 Q200 21 0 32 Z" fill="#1d2b4a" opacity="0.7" />

      <g>
        <path d="M56 128 L56 52 Q76 34 96 52 L96 128 Z" fill="#101a30" />
        <path d="M60 128 L60 54 Q76 39 92 54 L92 128 Z" fill="#1d2b4a" />
        <path d="M62 128 L62 55 Q76 42 90 55 L90 128 Z" fill="#24365c" opacity="0.8" />
        <rect x="75" y="44" width="2" height="84" fill="#101a30" />
        <rect x="62" y="70" width="28" height="2" fill="#101a30" />
        <rect x="62" y="96" width="28" height="2" fill="#101a30" />
        <path d="M64 57 L74 68 L74 80 L64 80 Z" fill="#e9edf5" opacity="0.12" />
        <path d="M52 128 L54 48 L58 128 Z" fill="#0a111f" />
        <path d="M100 128 L98 48 L94 128 Z" fill="#0a111f" />
      </g>

      <g>
        <circle cx="200" cy="72" r="52" fill="url(#personalMoonGlow)" />
        <path d="M172 128 L172 44 Q200 20 228 44 L228 128 Z" fill="#101a30" />
        <path d="M177 128 L177 46 Q200 26 223 46 L223 128 Z" fill="#1d2b4a" />
        <path d="M180 128 L180 47 Q200 30 220 47 L220 128 Z" fill="#24365c" />
        <rect x="199" y="31" width="2" height="97" fill="#101a30" />
        <rect x="180" y="62" width="40" height="2" fill="#101a30" />
        <rect x="180" y="90" width="40" height="2" fill="#101a30" />
        <path d="M182 50 L197 64 L197 88 L182 88 Z" fill="#e9edf5" opacity="0.16" />
        <path d="M203 40 L214 47 L214 60 L203 60 Z" fill="#e9edf5" opacity="0.1" />
        <path d="M167 128 L170 40 L174 128 Z" fill="#0a111f" />
        <path d="M233 128 L230 40 L226 128 Z" fill="#0a111f" />
      </g>

      <g>
        <path d="M304 128 L304 52 Q324 34 344 52 L344 128 Z" fill="#101a30" />
        <path d="M308 128 L308 54 Q324 39 340 54 L340 128 Z" fill="#1d2b4a" />
        <path d="M310 128 L310 55 Q324 42 338 55 L338 128 Z" fill="#24365c" opacity="0.8" />
        <rect x="323" y="44" width="2" height="84" fill="#101a30" />
        <rect x="310" y="70" width="28" height="2" fill="#101a30" />
        <rect x="310" y="96" width="28" height="2" fill="#101a30" />
        <path d="M326 57 L336 68 L336 80 L326 80 Z" fill="#e9edf5" opacity="0.12" />
        <path d="M300 128 L302 48 L306 128 Z" fill="#0a111f" />
        <path d="M348 128 L346 48 L342 128 Z" fill="#0a111f" />
      </g>

      <rect x="0" y="126" width="400" height="6" fill="#16213a" />

      <ellipse cx="238" cy="102" rx="60" ry="42" fill="url(#personalLampGlow)">
        <animate attributeName="opacity" values="1;0.65;1" dur="5s" repeatCount="indefinite" />
      </ellipse>

      <g>
        <path d="M130 156 L138 108 L282 108 L290 156 Z" fill="#0a111f" />
        <rect x="136" y="104" width="148" height="6" rx="2" fill="#101a30" />
        <rect x="140" y="110" width="140" height="4" fill="#1d2b4a" opacity="0.6" />
        <rect x="146" y="118" width="26" height="30" rx="2" fill="#101a30" />
        <rect x="248" y="118" width="26" height="30" rx="2" fill="#101a30" />
        <rect x="150" y="124" width="18" height="2" fill="#24365c" />
        <rect x="150" y="134" width="18" height="2" fill="#24365c" />
        <rect x="252" y="124" width="18" height="2" fill="#24365c" />
        <rect x="252" y="134" width="18" height="2" fill="#24365c" />
        <ellipse cx="210" cy="132" rx="22" ry="14" fill="#0d1526" opacity="0.9" />
      </g>

      <g>
        <path d="M226 84 L250 84 L244 96 L232 96 Z" fill="#c9a961" />
        <path d="M228 86 L248 86 L243 94 L233 94 Z" fill="#ebce8b" opacity="0.7" />
        <rect x="236.5" y="96" width="3" height="8" fill="#3a4a66" />
        <ellipse cx="238" cy="105" rx="8" ry="2" fill="#3a4a66" />
        <ellipse cx="238" cy="99" rx="3" ry="2" fill="#ebce8b" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.55;0.9" dur="5s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <g>
        <rect x="196" y="96" width="12" height="9" rx="1.5" fill="#3a4a66" />
        <path d="M208 98 Q213 98 212 102 Q211 104 208 103" fill="none" stroke="#3a4a66" strokeWidth="1.5" />
        <rect x="197" y="97" width="10" height="2" fill="#c9a961" opacity="0.5" />
        <path d="M201 92 Q199 88 202 84 Q204 81 202 78" fill="none" stroke="#e9edf5" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 1 -3; 0 0" dur="4s" repeatCount="indefinite" />
        </path>
      </g>

      <g>
        <rect x="158" y="98" width="22" height="3" fill="#1d2b4a" />
        <rect x="160" y="94" width="18" height="3" fill="#24365c" />
        <rect x="162" y="90" width="14" height="3" fill="#1d2b4a" />
        <rect x="262" y="98" width="16" height="6" rx="1" fill="#16213a" />
        <rect x="264" y="96" width="12" height="2" fill="#24365c" />
      </g>

      <rect x="0" y="150" width="400" height="30" fill="#05070b" />
      <path d="M0 150 Q200 144 400 150 L400 156 Q200 150 0 156 Z" fill="#0a111f" />
      <ellipse cx="210" cy="158" rx="90" ry="6" fill="#16213a" opacity="0.35" />
      <ellipse cx="210" cy="158" rx="60" ry="4" fill="#c9a961" opacity="0.08" />
    </svg>
  );
}
