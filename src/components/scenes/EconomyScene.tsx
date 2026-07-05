export default function EconomyScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art financial district at night with stepped towers, blinking amber windows, a green ticker crown, and a crescent moon"
    >
      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="400" height="128" fill="#0b1026" />
      {/* horizon band */}
      <rect x="0" y="120" width="400" height="8" fill="#141b3c" />
      {/* dithered rows above band (2 rows max) */}
      <rect x="0" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="28" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="40" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="352" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="364" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="372" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="384" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="392" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="4" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="20" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="388" y="112" width="4" height="4" fill="#141b3c" />

      {/* ===== STARS ===== */}
      <rect x="16" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="60" y="28" width="4" height="4" fill="#4a5a8a" />
      <rect x="96" y="8" width="4" height="4" fill="#e8ecf8" />
      <rect x="140" y="20" width="4" height="4" fill="#4a5a8a" />
      <rect x="188" y="6" width="4" height="4" fill="#e8ecf8" />
      <rect x="232" y="16" width="4" height="4" fill="#4a5a8a" />
      <rect x="268" y="10" width="4" height="4" fill="#e8ecf8" />
      <rect x="300" y="30" width="4" height="4" fill="#4a5a8a" />
      <rect x="36" y="48" width="4" height="4" fill="#4a5a8a" />
      <rect x="256" y="44" width="4" height="4" fill="#e8ecf8" />

      {/* ===== CRESCENT MOON (top-right) ===== */}
      <rect x="352" y="16" width="16" height="4" fill="#e8ecf8" />
      <rect x="348" y="20" width="12" height="4" fill="#e8ecf8" />
      <rect x="344" y="24" width="8" height="8" fill="#e8ecf8" />
      <rect x="344" y="32" width="12" height="4" fill="#e8ecf8" />
      <rect x="348" y="36" width="16" height="4" fill="#e8ecf8" />
      <rect x="356" y="40" width="16" height="4" fill="#e8ecf8" />
      <rect x="364" y="20" width="8" height="4" fill="#0b1026" />
      <rect x="368" y="24" width="8" height="8" fill="#0b1026" />
      <rect x="364" y="32" width="8" height="4" fill="#0b1026" />

      {/* ===== TOWER 1 — far left, dark ===== */}
      <rect x="8" y="68" width="32" height="60" fill="#1e2a52" />
      <rect x="16" y="60" width="16" height="8" fill="#1e2a52" />
      {/* windows */}
      <rect x="12" y="76" width="4" height="4" fill="#f5b84f" />
      <rect x="28" y="88" width="4" height="4" fill="#f5b84f" />
      <rect x="16" y="104" width="4" height="4" fill="#ffd98a" />
      {/* blinking window A */}
      <rect x="28" y="112" width="4" height="4" fill="#f5b84f">
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ===== TOWER 2 — stepped, lighter ===== */}
      <rect x="52" y="48" width="12" height="80" fill="#2a3a6e" />
      <rect x="64" y="60" width="20" height="68" fill="#2a3a6e" />
      <rect x="84" y="76" width="8" height="52" fill="#2a3a6e" />
      {/* windows */}
      <rect x="56" y="56" width="4" height="4" fill="#f5b84f" />
      <rect x="68" y="68" width="4" height="4" fill="#ffd98a" />
      <rect x="76" y="84" width="4" height="4" fill="#f5b84f" />
      <rect x="56" y="92" width="4" height="4" fill="#f5b84f" />
      <rect x="68" y="104" width="4" height="4" fill="#f5b84f" />
      <rect x="84" y="96" width="4" height="4" fill="#ffd98a" />

      {/* ===== TOWER 3 — TALLEST, center-left, with ticker crown ===== */}
      <rect x="116" y="44" width="8" height="8" fill="#1e2a52" />
      <rect x="108" y="52" width="24" height="8" fill="#1e2a52" />
      <rect x="104" y="60" width="32" height="68" fill="#1e2a52" />
      {/* ticker panel on crown */}
      <rect x="104" y="32" width="32" height="12" fill="#08090f" />
      {/* ticker frame posts */}
      <rect x="104" y="44" width="4" height="8" fill="#4a5a8a" />
      <rect x="132" y="44" width="4" height="8" fill="#4a5a8a" />
      {/* ticker zig-zag: frame A (up-trend steps) */}
      <g>
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
        <rect x="108" y="40" width="8" height="4" fill="#4ad98a" />
        <rect x="116" y="36" width="8" height="4" fill="#4ad98a" />
        <rect x="124" y="40" width="4" height="4" fill="#4ad98a" />
        <rect x="128" y="36" width="4" height="4" fill="#4ad98a" />
      </g>
      {/* ticker zig-zag: frame B (shifted pattern) */}
      <g>
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
        <rect x="108" y="36" width="4" height="4" fill="#4ad98a" />
        <rect x="112" y="40" width="8" height="4" fill="#4ad98a" />
        <rect x="120" y="36" width="8" height="4" fill="#4ad98a" />
        <rect x="128" y="40" width="4" height="4" fill="#4ad98a" />
      </g>
      {/* tower 3 windows */}
      <rect x="112" y="68" width="4" height="4" fill="#f5b84f" />
      <rect x="124" y="68" width="4" height="4" fill="#ffd98a" />
      <rect x="108" y="80" width="4" height="4" fill="#f5b84f" />
      <rect x="120" y="88" width="4" height="4" fill="#f5b84f" />
      <rect x="128" y="100" width="4" height="4" fill="#ffd98a" />
      <rect x="112" y="112" width="4" height="4" fill="#f5b84f" />
      {/* blinking window B (different period) */}
      <rect x="124" y="104" width="4" height="4" fill="#ffd98a">
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ===== TOWER 4 — mid, lighter, wide ===== */}
      <rect x="152" y="72" width="40" height="56" fill="#2a3a6e" />
      <rect x="160" y="64" width="24" height="8" fill="#2a3a6e" />
      <rect x="168" y="56" width="8" height="8" fill="#2a3a6e" />
      {/* windows */}
      <rect x="156" y="80" width="4" height="4" fill="#f5b84f" />
      <rect x="172" y="80" width="4" height="4" fill="#ffd98a" />
      <rect x="184" y="88" width="4" height="4" fill="#f5b84f" />
      <rect x="160" y="96" width="4" height="4" fill="#f5b84f" />
      <rect x="176" y="104" width="4" height="4" fill="#ffd98a" />
      <rect x="164" y="112" width="4" height="4" fill="#f5b84f" />
      <rect x="184" y="116" width="4" height="4" fill="#f5b84f" />

      {/* ===== TOWER 5 — gap then dark slab ===== */}
      <rect x="212" y="56" width="28" height="72" fill="#1e2a52" />
      <rect x="220" y="48" width="12" height="8" fill="#1e2a52" />
      {/* antenna */}
      <rect x="224" y="40" width="4" height="8" fill="#4a5a8a" />
      {/* windows */}
      <rect x="216" y="64" width="4" height="4" fill="#f5b84f" />
      <rect x="228" y="72" width="4" height="4" fill="#ffd98a" />
      <rect x="220" y="84" width="4" height="4" fill="#f5b84f" />
      <rect x="232" y="96" width="4" height="4" fill="#f5b84f" />
      <rect x="216" y="108" width="4" height="4" fill="#ffd98a" />
      {/* blinking window C (third period) */}
      <rect x="228" y="116" width="4" height="4" fill="#f5b84f">
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ===== TOWER 6 — stepped, lighter ===== */}
      <rect x="256" y="80" width="12" height="48" fill="#2a3a6e" />
      <rect x="268" y="68" width="24" height="60" fill="#2a3a6e" />
      <rect x="292" y="88" width="12" height="40" fill="#2a3a6e" />
      {/* windows */}
      <rect x="260" y="88" width="4" height="4" fill="#f5b84f" />
      <rect x="272" y="76" width="4" height="4" fill="#ffd98a" />
      <rect x="284" y="84" width="4" height="4" fill="#f5b84f" />
      <rect x="276" y="96" width="4" height="4" fill="#f5b84f" />
      <rect x="296" y="96" width="4" height="4" fill="#ffd98a" />
      <rect x="272" y="108" width="4" height="4" fill="#f5b84f" />
      <rect x="288" y="116" width="4" height="4" fill="#f5b84f" />

      {/* ===== TOWER 7 — far right, dark ===== */}
      <rect x="320" y="64" width="36" height="64" fill="#1e2a52" />
      <rect x="328" y="56" width="20" height="8" fill="#1e2a52" />
      {/* windows */}
      <rect x="324" y="72" width="4" height="4" fill="#f5b84f" />
      <rect x="340" y="72" width="4" height="4" fill="#ffd98a" />
      <rect x="332" y="84" width="4" height="4" fill="#f5b84f" />
      <rect x="348" y="92" width="4" height="4" fill="#f5b84f" />
      <rect x="324" y="100" width="4" height="4" fill="#ffd98a" />
      <rect x="340" y="108" width="4" height="4" fill="#f5b84f" />
      <rect x="348" y="116" width="4" height="4" fill="#f5b84f" />

      {/* short building far right edge */}
      <rect x="364" y="96" width="36" height="32" fill="#2a3a6e" />
      <rect x="372" y="104" width="4" height="4" fill="#f5b84f" />
      <rect x="388" y="112" width="4" height="4" fill="#ffd98a" />

      {/* ===== PLAZA GROUND BAND ===== */}
      <rect x="0" y="128" width="400" height="52" fill="#10131f" />
      {/* plaza edge highlight */}
      <rect x="0" y="128" width="400" height="4" fill="#1e2a52" />
      {/* plaza paving hints */}
      <rect x="32" y="144" width="16" height="4" fill="#08090f" />
      <rect x="120" y="156" width="20" height="4" fill="#08090f" />
      <rect x="216" y="148" width="16" height="4" fill="#08090f" />
      <rect x="316" y="160" width="20" height="4" fill="#08090f" />
      <rect x="68" y="164" width="16" height="4" fill="#08090f" />
      <rect x="260" y="168" width="16" height="4" fill="#08090f" />

      {/* ===== STREET LAMPS ===== */}
      <rect x="88" y="136" width="4" height="16" fill="#4a5a8a" />
      <rect x="84" y="132" width="12" height="4" fill="#4a5a8a" />
      <rect x="88" y="128" width="4" height="4" fill="#ffd98a" />
      <rect x="296" y="136" width="4" height="16" fill="#4a5a8a" />
      <rect x="292" y="132" width="12" height="4" fill="#4a5a8a" />
      <rect x="296" y="128" width="4" height="4" fill="#ffd98a" />
      {/* lamp glow pools */}
      <rect x="84" y="152" width="12" height="4" fill="#1e2a52" />
      <rect x="292" y="152" width="12" height="4" fill="#1e2a52" />

      {/* tiny pedestrian silhouette */}
      <rect x="180" y="140" width="4" height="4" fill="#08090f" />
      <rect x="176" y="144" width="12" height="8" fill="#08090f" />
    </svg>
  );
}
