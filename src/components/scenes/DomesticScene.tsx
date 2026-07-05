export default function DomesticScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="The Capitol dome at 2 AM under a full moon, brass-lit portico windows, bare winter trees, long dark lawn"
    >
      <defs>
        <linearGradient id="domSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
        <radialGradient id="domMoonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9edf5" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#e9edf5" stopOpacity="0.08" />
          <stop offset="1" stopColor="#e9edf5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="domPorchGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9a961" stopOpacity="0.22" />
          <stop offset="1" stopColor="#c9a961" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="180" fill="url(#domSky)" />

      <circle cx="34" cy="22" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="72" cy="41" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="118" cy="15" r="1" fill="#e9edf5" opacity="0.55" />
      <circle cx="153" cy="34" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="196" cy="10" r="1" fill="#e9edf5" opacity="0.45" />
      <circle cx="341" cy="14" r="1" fill="#e9edf5" opacity="0.5" />
      <circle cx="376" cy="38" r="1" fill="#e9edf5" opacity="0.35" />
      <circle cx="21" cy="62" r="1" fill="#e9edf5" opacity="0.3" />
      <circle cx="386" cy="70" r="1" fill="#e9edf5" opacity="0.4" />
      <circle cx="98" cy="55" r="1" fill="#e9edf5" opacity="0.4" />

      <circle cx="255" cy="38" r="42" fill="url(#domMoonGlow)" />
      <circle cx="255" cy="38" r="16" fill="#e9edf5" opacity="0.85" />
      <circle cx="250" cy="34" r="3" fill="#0d1526" opacity="0.12" />
      <circle cx="260" cy="42" r="2" fill="#0d1526" opacity="0.1" />

      <g opacity="0.5">
        <rect x="-90" y="33" width="58" height="5" rx="2.5" fill="#1d2b4a">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="480 0"
            dur="8s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      <ellipse cx="258" cy="126" rx="60" ry="26" fill="url(#domPorchGlow)" />

      <g fill="#16213a">
        <rect x="253" y="42" width="4" height="10" />
        <circle cx="255" cy="42" r="2.5" />
        <path d="M240 72 Q255 50 270 72 Z" />
        <rect x="238" y="70" width="34" height="5" />
        <rect x="242" y="75" width="26" height="9" />
        <rect x="236" y="84" width="38" height="4" />
        <rect x="240" y="88" width="30" height="12" />
        <rect x="230" y="100" width="50" height="5" />
        <rect x="196" y="105" width="118" height="25" />
        <rect x="188" y="122" width="134" height="8" />
        <rect x="148" y="110" width="48" height="20" />
        <rect x="314" y="110" width="48" height="20" />
      </g>

      <g fill="#1d2b4a">
        <rect x="243" y="77" width="2" height="7" />
        <rect x="249" y="77" width="2" height="7" />
        <rect x="255" y="77" width="2" height="7" />
        <rect x="261" y="77" width="2" height="7" />
        <rect x="267" y="77" width="2" height="7" />
        <rect x="243" y="90" width="2.5" height="10" />
        <rect x="250" y="90" width="2.5" height="10" />
        <rect x="257" y="90" width="2.5" height="10" />
        <rect x="264" y="90" width="2.5" height="10" />
      </g>

      <g fill="#24365c">
        <rect x="222" y="107" width="3" height="15" />
        <rect x="230" y="107" width="3" height="15" />
        <rect x="238" y="107" width="3" height="15" />
        <rect x="246" y="107" width="3" height="15" />
        <rect x="254" y="107" width="3" height="15" />
        <rect x="262" y="107" width="3" height="15" />
        <rect x="270" y="107" width="3" height="15" />
        <rect x="278" y="107" width="3" height="15" />
        <rect x="286" y="107" width="3" height="15" />
      </g>

      <g fill="#c9a961">
        <rect x="226" y="111" width="2.5" height="6" opacity="0.9" />
        <rect x="234" y="111" width="2.5" height="6" opacity="0.7" />
        <rect x="250" y="111" width="2.5" height="6" opacity="0.9">
          <animate
            attributeName="opacity"
            values="0.9;0.35;0.9"
            dur="5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="258" y="111" width="2.5" height="6" opacity="0.8" />
        <rect x="274" y="111" width="2.5" height="6" opacity="0.65" />
        <rect x="282" y="111" width="2.5" height="6" opacity="0.9" />
        <rect x="154" y="114" width="3" height="5" opacity="0.6" />
        <rect x="166" y="114" width="3" height="5" opacity="0.8" />
        <rect x="178" y="114" width="3" height="5" opacity="0.5" />
        <rect x="322" y="114" width="3" height="5" opacity="0.7" />
        <rect x="334" y="114" width="3" height="5" opacity="0.5" />
        <rect x="346" y="114" width="3" height="5" opacity="0.8" />
      </g>
      <rect x="253.5" y="45" width="3" height="4" fill="#ebce8b" opacity="0.85" />

      <g stroke="#16213a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M52 130 L52 92" />
        <path d="M52 104 L38 88" strokeWidth="2" />
        <path d="M52 100 L66 84" strokeWidth="2" />
        <path d="M52 112 L42 102" strokeWidth="1.5" />
        <path d="M38 88 L32 78" strokeWidth="1" />
        <path d="M66 84 L72 74" strokeWidth="1" />
        <path d="M52 92 L48 80" strokeWidth="1.5" />
      </g>
      <g stroke="#16213a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M110 130 L110 98" />
        <path d="M110 110 L98 96" strokeWidth="2" />
        <path d="M110 106 L122 92" strokeWidth="2" />
        <path d="M98 96 L92 86" strokeWidth="1" />
        <path d="M122 92 L128 84" strokeWidth="1" />
        <path d="M110 98 L114 86" strokeWidth="1.5" />
      </g>
      <g stroke="#16213a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M348 130 L348 94" />
        <path d="M348 106 L336 92" strokeWidth="2" />
        <path d="M348 102 L360 88" strokeWidth="2" />
        <path d="M336 92 L330 82" strokeWidth="1" />
        <path d="M360 88 L368 80" strokeWidth="1" />
        <path d="M348 94 L344 82" strokeWidth="1.5" />
      </g>
      <g stroke="#16213a" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M20 130 L20 104" />
        <path d="M20 114 L11 104" strokeWidth="1.5" />
        <path d="M20 110 L29 100" strokeWidth="1.5" />
      </g>
      <g stroke="#16213a" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M385 130 L385 102" />
        <path d="M385 112 L376 102" strokeWidth="1.5" />
        <path d="M385 108 L394 98" strokeWidth="1.5" />
      </g>

      <rect x="0" y="128" width="400" height="52" fill="#05070b" />
      <rect x="0" y="128" width="400" height="3" fill="#16213a" />
      <path d="M180 131 L230 131 L262 180 L148 180 Z" fill="#0d1526" opacity="0.6" />
      <rect x="0" y="150" width="400" height="1" fill="#16213a" opacity="0.5" />
      <ellipse cx="255" cy="133" rx="40" ry="3" fill="#c9a961" opacity="0.1" />
    </svg>
  );
}
