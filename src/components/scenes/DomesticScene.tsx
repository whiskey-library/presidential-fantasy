export default function DomesticScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art of the Capitol dome at night under a blocky moon, amber portico windows glowing, bare trees on a moonlit lawn with a lit walkway"
    >
      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="400" height="124" fill="#0b1026" />
      {/* horizon band */}
      <rect x="0" y="116" width="400" height="8" fill="#141b3c" />
      {/* dithered rows above band (2 rows max) */}
      <rect x="0" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="12" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="36" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="52" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="68" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="84" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="100" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="316" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="332" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="348" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="364" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="380" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="392" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="32" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="64" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="340" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="372" y="108" width="4" height="4" fill="#141b3c" />

      {/* ===== STARS ===== */}
      <rect x="20" y="16" width="4" height="4" fill="#e8ecf8" />
      <rect x="148" y="12" width="4" height="4" fill="#4a5a8a" />
      <rect x="184" y="28" width="4" height="4" fill="#e8ecf8" />
      <rect x="232" y="8" width="4" height="4" fill="#e8ecf8" />
      <rect x="280" y="24" width="4" height="4" fill="#4a5a8a" />
      <rect x="332" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="368" y="36" width="4" height="4" fill="#4a5a8a" />
      <rect x="388" y="16" width="4" height="4" fill="#e8ecf8" />
      <rect x="12" y="60" width="4" height="4" fill="#4a5a8a" />
      <rect x="352" y="64" width="4" height="4" fill="#e8ecf8" />
      <rect x="308" y="44" width="4" height="4" fill="#4a5a8a" />

      {/* ===== MOON upper-left (blocky circle with bite) ===== */}
      <rect x="64" y="16" width="24" height="4" fill="#e8ecf8" />
      <rect x="56" y="20" width="40" height="4" fill="#e8ecf8" />
      <rect x="52" y="24" width="48" height="8" fill="#e8ecf8" />
      <rect x="48" y="32" width="56" height="16" fill="#e8ecf8" />
      <rect x="52" y="48" width="48" height="8" fill="#e8ecf8" />
      <rect x="56" y="56" width="40" height="4" fill="#e8ecf8" />
      <rect x="64" y="60" width="24" height="4" fill="#e8ecf8" />
      {/* bite / craters */}
      <rect x="84" y="24" width="16" height="8" fill="#0b1026" />
      <rect x="92" y="32" width="12" height="8" fill="#0b1026" />
      <rect x="64" y="36" width="8" height="8" fill="#141b3c" />
      <rect x="76" y="48" width="8" height="4" fill="#141b3c" />

      {/* twinkling star beside moon — 2 discrete frames */}
      <g>
        <rect x="120" y="36" width="4" height="4" fill="#e8ecf8" />
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <rect x="120" y="28" width="4" height="4" fill="#e8ecf8" />
        <rect x="120" y="44" width="4" height="4" fill="#e8ecf8" />
        <rect x="112" y="36" width="4" height="4" fill="#e8ecf8" />
        <rect x="128" y="36" width="4" height="4" fill="#e8ecf8" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </g>

      {/* ===== CAPITOL (center-right) ===== */}
      {/* statue tip */}
      <rect x="256" y="24" width="4" height="8" fill="#2a3a6e" />
      <rect x="252" y="32" width="12" height="4" fill="#2a3a6e" />
      {/* lantern / tholos */}
      <rect x="248" y="36" width="20" height="8" fill="#1e2a52" />
      <rect x="252" y="38" width="4" height="4" fill="#f5b84f" />
      <rect x="260" y="38" width="4" height="4" fill="#f5b84f" />
      {/* dome — stacked shrinking rects */}
      <rect x="244" y="44" width="28" height="4" fill="#2a3a6e" />
      <rect x="240" y="48" width="36" height="4" fill="#2a3a6e" />
      <rect x="236" y="52" width="44" height="8" fill="#1e2a52" />
      <rect x="232" y="60" width="52" height="8" fill="#1e2a52" />
      <rect x="228" y="68" width="60" height="8" fill="#1e2a52" />
      {/* dome rib highlights */}
      <rect x="256" y="52" width="4" height="24" fill="#2a3a6e" />
      <rect x="240" y="60" width="4" height="16" fill="#2a3a6e" />
      <rect x="272" y="60" width="4" height="16" fill="#2a3a6e" />
      {/* drum with lit slit windows */}
      <rect x="228" y="76" width="60" height="12" fill="#2a3a6e" />
      <rect x="236" y="80" width="4" height="8" fill="#f5b84f" />
      <rect x="248" y="80" width="4" height="8" fill="#f5b84f" />
      <rect x="260" y="80" width="4" height="8" fill="#f5b84f" />
      <rect x="272" y="80" width="4" height="8" fill="#f5b84f" />
      {/* dome base ledge */}
      <rect x="220" y="88" width="76" height="4" fill="#1e2a52" />
      {/* main block */}
      <rect x="212" y="92" width="92" height="36" fill="#1e2a52" />
      {/* portico pediment + columns */}
      <rect x="232" y="92" width="52" height="4" fill="#2a3a6e" />
      <rect x="228" y="96" width="60" height="4" fill="#2a3a6e" />
      <rect x="232" y="100" width="4" height="24" fill="#4a5a8a" />
      <rect x="244" y="100" width="4" height="24" fill="#4a5a8a" />
      <rect x="256" y="100" width="4" height="24" fill="#4a5a8a" />
      <rect x="268" y="100" width="4" height="24" fill="#4a5a8a" />
      <rect x="280" y="100" width="4" height="24" fill="#4a5a8a" />
      {/* amber portico windows between columns */}
      <rect x="236" y="104" width="8" height="12" fill="#f5b84f" />
      <rect x="248" y="104" width="8" height="12" fill="#f5b84f" />
      <rect x="260" y="104" width="8" height="12" fill="#f5b84f" />
      <rect x="272" y="104" width="8" height="12" fill="#f5b84f" />
      {/* doorway — pulses between amber tones */}
      <rect x="252" y="116" width="12" height="12" fill="#ffd98a">
        <animate
          attributeName="fill"
          values="#ffd98a;#f5b84f;#ffd98a"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </rect>
      {/* wings */}
      <rect x="188" y="100" width="24" height="28" fill="#1e2a52" />
      <rect x="304" y="100" width="24" height="28" fill="#1e2a52" />
      <rect x="188" y="100" width="24" height="4" fill="#2a3a6e" />
      <rect x="304" y="100" width="24" height="4" fill="#2a3a6e" />
      {/* wing windows */}
      <rect x="192" y="108" width="4" height="8" fill="#f5b84f" />
      <rect x="200" y="108" width="4" height="8" fill="#f5b84f" />
      <rect x="308" y="108" width="4" height="8" fill="#f5b84f" />
      <rect x="316" y="108" width="4" height="8" fill="#f5b84f" />
      <rect x="192" y="120" width="4" height="8" fill="#f5b84f" />
      <rect x="316" y="120" width="4" height="8" fill="#f5b84f" />
      {/* one wing window flickering off and on */}
      <rect x="200" y="120" width="4" height="8" fill="#f5b84f">
        <animate
          attributeName="fill"
          values="#f5b84f;#1e2a52;#f5b84f"
          keyTimes="0;0.55;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="308" y="120" width="4" height="8" fill="#1e2a52" />
      {/* front steps */}
      <rect x="240" y="128" width="36" height="4" fill="#2a3a6e" />
      <rect x="236" y="132" width="44" height="4" fill="#4a5a8a" />

      {/* ===== BARE TREES ===== */}
      {/* left tree */}
      <rect x="40" y="96" width="4" height="40" fill="#1e2a52" />
      <rect x="28" y="92" width="12" height="4" fill="#1e2a52" />
      <rect x="24" y="84" width="4" height="8" fill="#1e2a52" />
      <rect x="44" y="88" width="16" height="4" fill="#1e2a52" />
      <rect x="56" y="80" width="4" height="8" fill="#1e2a52" />
      <rect x="36" y="80" width="4" height="12" fill="#1e2a52" />
      <rect x="36" y="76" width="12" height="4" fill="#1e2a52" />
      {/* mid-left small tree */}
      <rect x="120" y="108" width="4" height="28" fill="#1e2a52" />
      <rect x="108" y="104" width="12" height="4" fill="#1e2a52" />
      <rect x="104" y="96" width="4" height="8" fill="#1e2a52" />
      <rect x="124" y="100" width="12" height="4" fill="#1e2a52" />
      <rect x="132" y="92" width="4" height="8" fill="#1e2a52" />
      {/* right tree */}
      <rect x="356" y="92" width="4" height="44" fill="#1e2a52" />
      <rect x="344" y="88" width="12" height="4" fill="#1e2a52" />
      <rect x="340" y="80" width="4" height="8" fill="#1e2a52" />
      <rect x="360" y="84" width="16" height="4" fill="#1e2a52" />
      <rect x="372" y="76" width="4" height="8" fill="#1e2a52" />
      <rect x="352" y="76" width="4" height="12" fill="#1e2a52" />

      {/* ===== GROUND / LAWN ===== */}
      <rect x="0" y="124" width="400" height="12" fill="#1e2a52" />
      <rect x="0" y="136" width="400" height="44" fill="#10131f" />
      {/* lawn texture flecks */}
      <rect x="16" y="128" width="8" height="4" fill="#2a3a6e" />
      <rect x="76" y="132" width="8" height="4" fill="#2a3a6e" />
      <rect x="148" y="128" width="8" height="4" fill="#2a3a6e" />
      <rect x="336" y="128" width="8" height="4" fill="#2a3a6e" />
      <rect x="380" y="132" width="8" height="4" fill="#2a3a6e" />

      {/* ===== LIT WALKWAY ===== */}
      <rect x="0" y="148" width="400" height="8" fill="#1e2a52" />
      <rect x="8" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="48" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="88" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="128" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="168" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="208" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="248" y="152" width="12" height="4" fill="#ffd98a" />
      <rect x="288" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="328" y="152" width="12" height="4" fill="#f5b84f" />
      <rect x="368" y="152" width="12" height="4" fill="#f5b84f" />
      {/* soft walkway glow row */}
      <rect x="8" y="156" width="12" height="4" fill="#2a3a6e" />
      <rect x="88" y="156" width="12" height="4" fill="#2a3a6e" />
      <rect x="168" y="156" width="12" height="4" fill="#2a3a6e" />
      <rect x="248" y="156" width="12" height="4" fill="#2a3a6e" />
      <rect x="328" y="156" width="12" height="4" fill="#2a3a6e" />
    </svg>
  );
}
