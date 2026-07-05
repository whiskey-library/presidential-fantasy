export default function ScandalScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art night scene of a press ambush: reporters with boom mics facing an empty podium on steps under an amber lamp, with a camera flash and paper shreds falling"
    >
      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="400" height="128" fill="#0b1026" />
      {/* horizon band */}
      <rect x="0" y="116" width="400" height="12" fill="#141b3c" />
      {/* dither rows at band top */}
      <rect x="0" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="32" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="40" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="48" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="336" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="344" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="352" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="360" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="376" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="384" y="112" width="4" height="4" fill="#141b3c" />
      <rect x="392" y="112" width="4" height="4" fill="#141b3c" />

      {/* ===== STARS ===== */}
      <rect x="24" y="16" width="4" height="4" fill="#e8ecf8" />
      <rect x="76" y="36" width="4" height="4" fill="#4a5a8a" />
      <rect x="120" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="172" y="28" width="4" height="4" fill="#4a5a8a" />
      <rect x="212" y="8" width="4" height="4" fill="#e8ecf8" />
      <rect x="260" y="24" width="4" height="4" fill="#4a5a8a" />
      <rect x="308" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="372" y="32" width="4" height="4" fill="#e8ecf8" />
      <rect x="44" y="52" width="4" height="4" fill="#4a5a8a" />

      {/* ===== MOON (blocky, top-right, with bite) ===== */}
      <rect x="340" y="44" width="16" height="4" fill="#e8ecf8" />
      <rect x="336" y="48" width="24" height="4" fill="#e8ecf8" />
      <rect x="332" y="52" width="28" height="12" fill="#e8ecf8" />
      <rect x="336" y="64" width="24" height="4" fill="#e8ecf8" />
      <rect x="340" y="68" width="16" height="4" fill="#e8ecf8" />
      <rect x="348" y="52" width="8" height="8" fill="#0b1026" />

      {/* ===== SKYLINE SILHOUETTE (government facades far back) ===== */}
      <rect x="0" y="88" width="72" height="40" fill="#1e2a52" />
      <rect x="12" y="80" width="48" height="8" fill="#1e2a52" />
      <rect x="88" y="96" width="56" height="32" fill="#1e2a52" />
      <rect x="256" y="96" width="60" height="32" fill="#1e2a52" />
      <rect x="332" y="88" width="68" height="40" fill="#1e2a52" />
      <rect x="344" y="80" width="44" height="8" fill="#1e2a52" />
      {/* faint columns on facades */}
      <rect x="16" y="92" width="4" height="32" fill="#2a3a6e" />
      <rect x="32" y="92" width="4" height="32" fill="#2a3a6e" />
      <rect x="48" y="92" width="4" height="32" fill="#2a3a6e" />
      <rect x="352" y="92" width="4" height="32" fill="#2a3a6e" />
      <rect x="368" y="92" width="4" height="32" fill="#2a3a6e" />
      <rect x="384" y="92" width="4" height="32" fill="#2a3a6e" />
      {/* dim amber windows in far buildings */}
      <rect x="100" y="104" width="4" height="4" fill="#f5b84f" />
      <rect x="120" y="104" width="4" height="4" fill="#f5b84f" />
      <rect x="268" y="104" width="4" height="4" fill="#f5b84f" />
      <rect x="296" y="104" width="4" height="4" fill="#f5b84f" />

      {/* ===== GROUND: dark marble ===== */}
      <rect x="0" y="128" width="400" height="52" fill="#10131f" />
      {/* marble seams */}
      <rect x="0" y="144" width="400" height="4" fill="#08090f" />
      <rect x="0" y="164" width="400" height="4" fill="#08090f" />
      <rect x="56" y="148" width="4" height="16" fill="#08090f" />
      <rect x="140" y="148" width="4" height="16" fill="#08090f" />
      <rect x="300" y="148" width="4" height="16" fill="#08090f" />
      <rect x="368" y="148" width="4" height="16" fill="#08090f" />

      {/* ===== THREE PIXEL STEPS (right side) ===== */}
      <rect x="216" y="152" width="152" height="8" fill="#2a3a6e" />
      <rect x="216" y="160" width="152" height="4" fill="#1e2a52" />
      <rect x="232" y="144" width="120" height="8" fill="#2a3a6e" />
      <rect x="232" y="148" width="120" height="4" fill="#1e2a52" />
      <rect x="248" y="136" width="88" height="8" fill="#2a3a6e" />
      <rect x="248" y="140" width="88" height="4" fill="#1e2a52" />
      {/* top platform lip */}
      <rect x="256" y="132" width="72" height="4" fill="#4a5a8a" />

      {/* ===== EMPTY PODIUM on top step ===== */}
      <rect x="280" y="100" width="24" height="4" fill="#4a5a8a" />
      <rect x="284" y="104" width="16" height="28" fill="#1e2a52" />
      <rect x="284" y="104" width="16" height="4" fill="#2a3a6e" />
      <rect x="288" y="112" width="8" height="4" fill="#2a3a6e" />
      {/* amber wash on podium top from lamp */}
      <rect x="280" y="96" width="24" height="4" fill="#f5b84f" />

      {/* ===== AMBER LAMP over podium ===== */}
      <rect x="288" y="52" width="8" height="4" fill="#4a5a8a" />
      <rect x="290" y="56" width="4" height="12" fill="#4a5a8a" />
      <rect x="284" y="68" width="16" height="4" fill="#4a5a8a" />
      <rect x="288" y="80" width="8" height="4" fill="#f5b84f" />
      {/* light pool on steps */}
      <rect x="272" y="132" width="40" height="4" fill="#f5b84f" />
      <rect x="264" y="136" width="8" height="4" fill="#f5b84f" />
      <rect x="312" y="136" width="8" height="4" fill="#f5b84f" />
      {/* lamp glass — flickers between two ambers */}
      <rect x="284" y="72" width="16" height="8" fill="#ffd98a">
        <animate
          attributeName="fill"
          values="#ffd98a;#f5b84f;#ffd98a"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ===== REPORTER ROW (left, aimed right at podium) ===== */}
      {/* Reporter 1 */}
      <rect x="40" y="104" width="8" height="8" fill="#08090f" />
      <rect x="36" y="112" width="16" height="20" fill="#1e2a52" />
      <rect x="36" y="132" width="4" height="20" fill="#08090f" />
      <rect x="44" y="132" width="4" height="20" fill="#08090f" />
      {/* boom mic 1 */}
      <rect x="52" y="116" width="4" height="4" fill="#1e2a52" />
      <rect x="52" y="112" width="44" height="4" fill="#4a5a8a" />
      <rect x="96" y="108" width="8" height="8" fill="#08090f" />

      {/* Reporter 2 */}
      <rect x="76" y="108" width="8" height="8" fill="#08090f" />
      <rect x="72" y="116" width="16" height="20" fill="#1e2a52" />
      <rect x="72" y="136" width="4" height="20" fill="#08090f" />
      <rect x="80" y="136" width="4" height="20" fill="#08090f" />
      {/* long boom 2 reaching for the podium */}
      <rect x="88" y="120" width="4" height="4" fill="#1e2a52" />
      <rect x="88" y="116" width="36" height="4" fill="#4a5a8a" />
      <rect x="124" y="108" width="40" height="4" fill="#4a5a8a" />
      <rect x="164" y="104" width="8" height="8" fill="#08090f" />

      {/* Reporter 3 with shoulder camera */}
      <rect x="112" y="112" width="8" height="8" fill="#08090f" />
      <rect x="108" y="120" width="16" height="20" fill="#1e2a52" />
      <rect x="108" y="140" width="4" height="16" fill="#08090f" />
      <rect x="116" y="140" width="4" height="16" fill="#08090f" />
      <rect x="120" y="108" width="16" height="8" fill="#08090f" />
      <rect x="136" y="108" width="4" height="4" fill="#4a5a8a" />

      {/* Reporter 4 (closest to steps) */}
      <rect x="152" y="112" width="8" height="8" fill="#08090f" />
      <rect x="148" y="120" width="16" height="20" fill="#1e2a52" />
      <rect x="148" y="140" width="4" height="16" fill="#08090f" />
      <rect x="156" y="140" width="4" height="16" fill="#08090f" />
      {/* boom mic 4 */}
      <rect x="164" y="124" width="4" height="4" fill="#1e2a52" />
      <rect x="164" y="120" width="52" height="4" fill="#4a5a8a" />
      <rect x="216" y="116" width="8" height="8" fill="#08090f" />
      <rect x="216" y="112" width="4" height="4" fill="#4a5a8a" />

      {/* Reporter 5 back row */}
      <rect x="16" y="112" width="8" height="8" fill="#08090f" />
      <rect x="12" y="120" width="16" height="16" fill="#1e2a52" />
      <rect x="12" y="136" width="4" height="16" fill="#08090f" />
      <rect x="20" y="136" width="4" height="16" fill="#08090f" />

      {/* ===== CAMERA FLASH (irregular: short pops, long dark) ===== */}
      <g>
        <rect x="128" y="96" width="8" height="8" fill="#e8ecf8" />
        <rect x="124" y="100" width="4" height="4" fill="#e8ecf8" />
        <rect x="136" y="100" width="4" height="4" fill="#e8ecf8" />
        <rect x="128" y="92" width="4" height="4" fill="#e8ecf8" />
        <rect x="132" y="104" width="4" height="4" fill="#e8ecf8" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden;hidden;visible;hidden"
          keyTimes="0;0.08;0.16;0.55;0.62;0.7"
          calcMode="discrete"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </g>

      {/* ===== PAPER SHREDS mid-air, flipping between two fall frames ===== */}
      <g>
        <rect x="240" y="84" width="4" height="4" fill="#e8ecf8" />
        <rect x="260" y="64" width="4" height="4" fill="#e8ecf8" />
        <rect x="312" y="92" width="4" height="4" fill="#e8ecf8" />
        <rect x="228" y="108" width="4" height="4" fill="#e8ecf8" />
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
        <rect x="236" y="92" width="4" height="4" fill="#e8ecf8" />
        <rect x="264" y="72" width="4" height="4" fill="#e8ecf8" />
        <rect x="308" y="100" width="4" height="4" fill="#e8ecf8" />
        <rect x="232" y="116" width="4" height="4" fill="#e8ecf8" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
