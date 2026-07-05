export default function ForeignScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art embassy summit at night: a domed palace with lit amber door and windows, flanked by rows of flagpoles with waving pennants over wet pavement"
    >
      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="400" height="120" fill="#0b1026" />
      {/* horizon band + dither rows */}
      <rect x="0" y="120" width="400" height="12" fill="#141b3c" />
      <rect x="0" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="32" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="352" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="360" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="376" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="384" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="392" y="116" width="4" height="4" fill="#141b3c" />

      {/* ===== MOON (top-left, blocky circle with bite) ===== */}
      <rect x="40" y="16" width="16" height="4" fill="#e8ecf8" />
      <rect x="36" y="20" width="24" height="4" fill="#e8ecf8" />
      <rect x="32" y="24" width="32" height="16" fill="#e8ecf8" />
      <rect x="36" y="40" width="24" height="4" fill="#e8ecf8" />
      <rect x="40" y="44" width="16" height="4" fill="#e8ecf8" />
      <rect x="52" y="20" width="8" height="8" fill="#0b1026" />
      <rect x="56" y="28" width="8" height="8" fill="#0b1026" />

      {/* ===== STARS ===== */}
      <rect x="100" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="164" y="28" width="4" height="4" fill="#4a5a8a" />
      <rect x="232" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="296" y="24" width="4" height="4" fill="#e8ecf8" />
      <rect x="344" y="8" width="4" height="4" fill="#4a5a8a" />
      <rect x="372" y="40" width="4" height="4" fill="#e8ecf8" />
      <rect x="16" y="60" width="4" height="4" fill="#4a5a8a" />
      <rect x="132" y="44" width="4" height="4" fill="#e8ecf8" />
      <rect x="268" y="40" width="4" height="4" fill="#4a5a8a" />
      <rect x="316" y="56" width="4" height="4" fill="#e8ecf8" />

      {/* ===== BACKGROUND CITY SILHOUETTE ===== */}
      <rect x="0" y="96" width="48" height="36" fill="#1e2a52" />
      <rect x="8" y="88" width="20" height="8" fill="#1e2a52" />
      <rect x="48" y="104" width="40" height="28" fill="#1e2a52" />
      <rect x="312" y="100" width="44" height="32" fill="#1e2a52" />
      <rect x="324" y="92" width="16" height="8" fill="#1e2a52" />
      <rect x="356" y="108" width="44" height="24" fill="#1e2a52" />

      {/* ===== PALACE — center ===== */}
      {/* dome: stacked rects */}
      <rect x="192" y="36" width="16" height="4" fill="#2a3a6e" />
      <rect x="184" y="40" width="32" height="4" fill="#2a3a6e" />
      <rect x="176" y="44" width="48" height="8" fill="#2a3a6e" />
      <rect x="172" y="52" width="56" height="8" fill="#2a3a6e" />
      {/* dome finial */}
      <rect x="196" y="28" width="4" height="8" fill="#4a5a8a" />
      {/* dome drum */}
      <rect x="180" y="60" width="40" height="8" fill="#1e2a52" />
      <rect x="184" y="60" width="4" height="8" fill="#f5b84f" />
      <rect x="198" y="60" width="4" height="8" fill="#f5b84f" />
      <rect x="212" y="60" width="4" height="8" fill="#f5b84f" />
      {/* upper block */}
      <rect x="168" y="68" width="64" height="12" fill="#2a3a6e" />
      {/* cornice */}
      <rect x="152" y="80" width="96" height="4" fill="#4a5a8a" />
      {/* main facade */}
      <rect x="156" y="84" width="88" height="48" fill="#1e2a52" />
      {/* side wings */}
      <rect x="120" y="96" width="36" height="36" fill="#2a3a6e" />
      <rect x="244" y="96" width="36" height="36" fill="#2a3a6e" />
      <rect x="120" y="92" width="36" height="4" fill="#4a5a8a" />
      <rect x="244" y="92" width="36" height="4" fill="#4a5a8a" />
      {/* columns on facade */}
      <rect x="164" y="88" width="4" height="36" fill="#4a5a8a" />
      <rect x="232" y="88" width="4" height="36" fill="#4a5a8a" />
      {/* facade windows, amber */}
      <rect x="172" y="92" width="8" height="8" fill="#f5b84f" />
      <rect x="220" y="92" width="8" height="8" fill="#f5b84f" />
      {/* blinking upper window */}
      <rect x="196" y="92" width="8" height="8" fill="#f5b84f">
        <animate
          attributeName="fill"
          values="#f5b84f;#ffd98a;#f5b84f"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>
      {/* wing windows */}
      <rect x="128" y="104" width="8" height="8" fill="#f5b84f" />
      <rect x="144" y="104" width="4" height="8" fill="#141b3c" />
      <rect x="264" y="104" width="8" height="8" fill="#f5b84f" />
      <rect x="252" y="104" width="4" height="8" fill="#141b3c" />
      {/* grand door: amber with bright core */}
      <rect x="188" y="104" width="24" height="28" fill="#f5b84f" />
      <rect x="192" y="108" width="16" height="24" fill="#ffd98a" />
      <rect x="184" y="100" width="32" height="4" fill="#4a5a8a" />
      {/* door guards: tiny silhouettes */}
      <rect x="176" y="116" width="4" height="4" fill="#08090f" />
      <rect x="176" y="120" width="4" height="12" fill="#08090f" />
      <rect x="220" y="116" width="4" height="4" fill="#08090f" />
      <rect x="220" y="120" width="4" height="12" fill="#08090f" />

      {/* ===== GROUND / WET PAVEMENT ===== */}
      <rect x="0" y="132" width="400" height="48" fill="#10131f" />
      {/* pavement seam highlight */}
      <rect x="0" y="132" width="400" height="4" fill="#1e2a52" />
      {/* central walkway leading to door */}
      <rect x="184" y="136" width="32" height="44" fill="#08090f" />
      <rect x="180" y="152" width="40" height="28" fill="#08090f" />

      {/* door light reflection on wet pavement */}
      <rect x="192" y="136" width="16" height="4" fill="#ffd98a" />
      <rect x="196" y="144" width="8" height="4" fill="#f5b84f" />
      <rect x="192" y="156" width="4" height="4" fill="#f5b84f" />
      <rect x="204" y="164" width="4" height="4" fill="#f5b84f">
        <animate
          attributeName="fill"
          values="#f5b84f;#10131f;#f5b84f"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </rect>
      {/* stray amber reflections under lamps/windows */}
      <rect x="128" y="140" width="8" height="4" fill="#f5b84f" />
      <rect x="264" y="140" width="8" height="4" fill="#f5b84f" />
      <rect x="88" y="160" width="4" height="4" fill="#f5b84f" />
      <rect x="308" y="160" width="4" height="4" fill="#f5b84f" />
      {/* dim wet sheen strips */}
      <rect x="24" y="148" width="24" height="4" fill="#1e2a52" />
      <rect x="336" y="148" width="28" height="4" fill="#1e2a52" />
      <rect x="60" y="168" width="32" height="4" fill="#1e2a52" />
      <rect x="300" y="168" width="36" height="4" fill="#1e2a52" />

      {/* ===== LEFT FLAGPOLE ROW ===== */}
      {/* far pole */}
      <rect x="52" y="84" width="4" height="64" fill="#4a5a8a" />
      <rect x="52" y="80" width="4" height="4" fill="#e8ecf8" />
      {/* pennant A — waving frame 1 */}
      <g>
        <rect x="56" y="88" width="32" height="16" fill="#4a5a8a" />
        <rect x="84" y="88" width="4" height="4" fill="#0b1026" />
        <rect x="84" y="100" width="4" height="4" fill="#0b1026" />
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.0s"
          repeatCount="indefinite"
        />
      </g>
      {/* pennant A — waving frame 2 */}
      <g visibility="hidden">
        <rect x="56" y="88" width="32" height="16" fill="#4a5a8a" />
        <rect x="80" y="88" width="8" height="4" fill="#0b1026" />
        <rect x="84" y="92" width="4" height="4" fill="#0b1026" />
        <rect x="80" y="100" width="8" height="4" fill="#0b1026" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.0s"
          repeatCount="indefinite"
        />
      </g>
      {/* near pole (static amber pennant) */}
      <rect x="104" y="92" width="4" height="56" fill="#4a5a8a" />
      <rect x="104" y="88" width="4" height="4" fill="#e8ecf8" />
      <rect x="108" y="96" width="32" height="16" fill="#f5b84f" />
      <rect x="136" y="96" width="4" height="4" fill="#0b1026" />
      <rect x="136" y="108" width="4" height="4" fill="#0b1026" />

      {/* ===== RIGHT FLAGPOLE ROW ===== */}
      {/* near pole (static steel pennant) */}
      <rect x="292" y="92" width="4" height="56" fill="#4a5a8a" />
      <rect x="292" y="88" width="4" height="4" fill="#e8ecf8" />
      <rect x="260" y="96" width="32" height="16" fill="#4a5a8a" />
      <rect x="260" y="96" width="4" height="4" fill="#0b1026" />
      <rect x="260" y="108" width="4" height="4" fill="#0b1026" />
      {/* far pole */}
      <rect x="344" y="84" width="4" height="64" fill="#4a5a8a" />
      <rect x="344" y="80" width="4" height="4" fill="#e8ecf8" />
      {/* pennant B — waving frame 1 (offset timing) */}
      <g>
        <rect x="312" y="88" width="32" height="16" fill="#f5b84f" />
        <rect x="312" y="88" width="4" height="4" fill="#0b1026" />
        <rect x="312" y="100" width="4" height="4" fill="#0b1026" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.45;1"
          calcMode="discrete"
          dur="1.3s"
          repeatCount="indefinite"
        />
      </g>
      {/* pennant B — waving frame 2 */}
      <g visibility="hidden">
        <rect x="312" y="88" width="32" height="16" fill="#f5b84f" />
        <rect x="312" y="88" width="8" height="4" fill="#0b1026" />
        <rect x="316" y="92" width="4" height="4" fill="#0b1026" />
        <rect x="312" y="100" width="8" height="4" fill="#0b1026" />
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.45;1"
          calcMode="discrete"
          dur="1.3s"
          repeatCount="indefinite"
        />
      </g>

      {/* ===== LAMPS flanking walkway ===== */}
      <rect x="160" y="120" width="4" height="28" fill="#08090f" />
      <rect x="156" y="112" width="12" height="8" fill="#f5b84f" />
      <rect x="236" y="120" width="4" height="28" fill="#08090f" />
      <rect x="232" y="112" width="12" height="8" fill="#f5b84f" />
    </svg>
  );
}
