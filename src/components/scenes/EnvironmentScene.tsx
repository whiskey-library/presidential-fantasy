export default function EnvironmentScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art night coast with pine ridge, moon, wind turbine, and teal waves"
    >
      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="400" height="120" fill="#0b1026" />
      {/* horizon band with dither */}
      <rect x="0" y="120" width="400" height="8" fill="#141b3c" />
      <rect x="0" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="32" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="40" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="48" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="56" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="240" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="248" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="256" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="264" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="336" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="344" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="352" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="376" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="384" y="116" width="4" height="4" fill="#141b3c" />

      {/* ===== STARS ===== */}
      <rect x="24" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="72" y="28" width="4" height="4" fill="#4a5a8a" />
      <rect x="116" y="8" width="4" height="4" fill="#e8ecf8" />
      <rect x="160" y="24" width="4" height="4" fill="#4a5a8a" />
      <rect x="204" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="252" y="32" width="4" height="4" fill="#e8ecf8" />
      <rect x="296" y="8" width="4" height="4" fill="#4a5a8a" />
      <rect x="380" y="20" width="4" height="4" fill="#e8ecf8" />
      <rect x="352" y="48" width="4" height="4" fill="#4a5a8a" />
      <rect x="140" y="44" width="4" height="4" fill="#e8ecf8" />
      {/* twinkling star */}
      <rect x="188" y="40" width="4" height="4" fill="#e8ecf8">
        <animate
          attributeName="fill"
          values="#e8ecf8;#4a5a8a;#e8ecf8"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ===== MOON (blocky circle, upper right) ===== */}
      <rect x="320" y="16" width="24" height="4" fill="#e8ecf8" />
      <rect x="316" y="20" width="32" height="4" fill="#e8ecf8" />
      <rect x="312" y="24" width="40" height="16" fill="#e8ecf8" />
      <rect x="316" y="40" width="32" height="4" fill="#e8ecf8" />
      <rect x="320" y="44" width="24" height="4" fill="#e8ecf8" />
      {/* bite */}
      <rect x="336" y="24" width="16" height="12" fill="#0b1026" />
      <rect x="340" y="20" width="8" height="4" fill="#0b1026" />
      <rect x="340" y="36" width="8" height="8" fill="#0b1026" />

      {/* ===== PINE RIDGE — far layer ===== */}
      <rect x="0" y="88" width="176" height="40" fill="#1e2a52" />
      <rect x="0" y="80" width="120" height="8" fill="#1e2a52" />
      <rect x="0" y="72" width="72" height="8" fill="#1e2a52" />
      <rect x="8" y="64" width="40" height="8" fill="#1e2a52" />
      <rect x="88" y="72" width="24" height="8" fill="#1e2a52" />
      <rect x="128" y="84" width="32" height="4" fill="#1e2a52" />

      {/* ===== PINES — near layer (triangular stacks) ===== */}
      {/* pine 1 (tall) */}
      <rect x="24" y="52" width="8" height="4" fill="#2a3a6e" />
      <rect x="20" y="56" width="16" height="8" fill="#2a3a6e" />
      <rect x="16" y="64" width="24" height="8" fill="#2a3a6e" />
      <rect x="12" y="72" width="32" height="8" fill="#2a3a6e" />
      <rect x="8" y="80" width="40" height="12" fill="#2a3a6e" />
      {/* pine 2 */}
      <rect x="64" y="64" width="8" height="4" fill="#2a3a6e" />
      <rect x="60" y="68" width="16" height="8" fill="#2a3a6e" />
      <rect x="56" y="76" width="24" height="8" fill="#2a3a6e" />
      <rect x="52" y="84" width="32" height="8" fill="#2a3a6e" />
      {/* pine 3 */}
      <rect x="104" y="72" width="8" height="4" fill="#2a3a6e" />
      <rect x="100" y="76" width="16" height="8" fill="#2a3a6e" />
      <rect x="96" y="84" width="24" height="8" fill="#2a3a6e" />
      <rect x="92" y="92" width="32" height="8" fill="#2a3a6e" />
      {/* pine 4 (small) */}
      <rect x="144" y="84" width="8" height="4" fill="#2a3a6e" />
      <rect x="140" y="88" width="16" height="8" fill="#2a3a6e" />
      <rect x="136" y="96" width="24" height="8" fill="#2a3a6e" />
      {/* near-ridge base under pines */}
      <rect x="0" y="92" width="132" height="36" fill="#2a3a6e" />
      <rect x="132" y="100" width="44" height="28" fill="#2a3a6e" />

      {/* ===== CABIN in the pines ===== */}
      <rect x="56" y="96" width="32" height="20" fill="#08090f" />
      <rect x="52" y="92" width="40" height="4" fill="#08090f" />
      <rect x="60" y="88" width="24" height="4" fill="#08090f" />
      {/* chimney */}
      <rect x="76" y="80" width="8" height="8" fill="#08090f" />
      {/* amber window — flickering warm light */}
      <rect x="64" y="100" width="8" height="8" fill="#f5b84f">
        <animate
          attributeName="fill"
          values="#f5b84f;#ffd98a;#f5b84f"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>
      {/* stray glow pixel by window */}
      <rect x="72" y="104" width="4" height="4" fill="#f5b84f" />

      {/* ===== WIND TURBINE on horizon ===== */}
      {/* tower */}
      <rect x="296" y="76" width="4" height="52" fill="#4a5a8a" />
      <rect x="292" y="120" width="12" height="8" fill="#4a5a8a" />
      {/* hub */}
      <rect x="292" y="68" width="12" height="8" fill="#e8ecf8" />
      {/* blades frame A: one up, two lower diagonals */}
      <g>
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1s"
          repeatCount="indefinite"
        />
        <rect x="296" y="44" width="4" height="24" fill="#e8ecf8" />
        <rect x="296" y="40" width="4" height="4" fill="#4a5a8a" />
        <rect x="288" y="76" width="8" height="4" fill="#e8ecf8" />
        <rect x="280" y="80" width="8" height="4" fill="#e8ecf8" />
        <rect x="276" y="84" width="4" height="4" fill="#4a5a8a" />
        <rect x="304" y="76" width="8" height="4" fill="#e8ecf8" />
        <rect x="312" y="80" width="8" height="4" fill="#e8ecf8" />
        <rect x="320" y="84" width="4" height="4" fill="#4a5a8a" />
      </g>
      {/* blades frame B: two upper diagonals, one down */}
      <g visibility="hidden">
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1s"
          repeatCount="indefinite"
        />
        <rect x="288" y="64" width="8" height="4" fill="#e8ecf8" />
        <rect x="280" y="60" width="8" height="4" fill="#e8ecf8" />
        <rect x="276" y="56" width="4" height="4" fill="#4a5a8a" />
        <rect x="304" y="64" width="8" height="4" fill="#e8ecf8" />
        <rect x="312" y="60" width="8" height="4" fill="#e8ecf8" />
        <rect x="320" y="56" width="4" height="4" fill="#4a5a8a" />
        <rect x="296" y="76" width="4" height="20" fill="#e8ecf8" />
        <rect x="296" y="96" width="4" height="4" fill="#4a5a8a" />
      </g>

      {/* ===== WATER (right of shore, below horizon) ===== */}
      <rect x="176" y="128" width="224" height="24" fill="#141b3c" />
      <rect x="176" y="124" width="224" height="4" fill="#1e2a52" />
      {/* moon reflection column */}
      <rect x="324" y="128" width="8" height="4" fill="#4a5a8a" />
      <rect x="328" y="136" width="8" height="4" fill="#4a5a8a" />
      <rect x="320" y="144" width="8" height="4" fill="#4a5a8a" />
      {/* wave crests frame A */}
      <g>
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
        <rect x="192" y="132" width="12" height="4" fill="#4ac9d9" />
        <rect x="232" y="140" width="16" height="4" fill="#4ac9d9" />
        <rect x="276" y="132" width="12" height="4" fill="#4ac9d9" />
        <rect x="348" y="140" width="16" height="4" fill="#4ac9d9" />
        <rect x="380" y="132" width="12" height="4" fill="#4ac9d9" />
        <rect x="212" y="148" width="12" height="4" fill="#4ac9d9" />
      </g>
      {/* wave crests frame B (offset) */}
      <g visibility="hidden">
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
        <rect x="204" y="136" width="16" height="4" fill="#4ac9d9" />
        <rect x="248" y="132" width="12" height="4" fill="#4ac9d9" />
        <rect x="292" y="144" width="16" height="4" fill="#4ac9d9" />
        <rect x="336" y="132" width="12" height="4" fill="#4ac9d9" />
        <rect x="368" y="148" width="12" height="4" fill="#4ac9d9" />
        <rect x="224" y="152" width="12" height="4" fill="#4ac9d9" />
      </g>

      {/* ===== ROCKY GROUND BAND ===== */}
      <rect x="0" y="128" width="176" height="52" fill="#10131f" />
      <rect x="0" y="152" width="400" height="28" fill="#10131f" />
      {/* shoreline steps into the water */}
      <rect x="176" y="144" width="24" height="8" fill="#10131f" />
      <rect x="176" y="136" width="12" height="8" fill="#10131f" />
      {/* rocks */}
      <rect x="20" y="140" width="16" height="8" fill="#1e2a52" />
      <rect x="24" y="136" width="8" height="4" fill="#1e2a52" />
      <rect x="96" y="144" width="20" height="8" fill="#1e2a52" />
      <rect x="100" y="140" width="12" height="4" fill="#1e2a52" />
      <rect x="148" y="136" width="12" height="8" fill="#1e2a52" />
      <rect x="228" y="160" width="16" height="8" fill="#1e2a52" />
      <rect x="300" y="164" width="20" height="8" fill="#1e2a52" />
      <rect x="60" y="164" width="24" height="8" fill="#1e2a52" />
      <rect x="66" y="160" width="12" height="4" fill="#1e2a52" />
      <rect x="356" y="160" width="12" height="8" fill="#1e2a52" />
      {/* shadow rock details */}
      <rect x="128" y="160" width="16" height="8" fill="#08090f" />
      <rect x="188" y="168" width="20" height="8" fill="#08090f" />
      <rect x="264" y="164" width="12" height="8" fill="#08090f" />
      <rect x="40" y="172" width="20" height="4" fill="#08090f" />
    </svg>
  );
}
