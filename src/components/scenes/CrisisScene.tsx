export default function CrisisScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art storm coast at night: gabled houses, one lit window, bent palms, falling rain, a flashing red tower beacon over churning water"
    >
      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="400" height="120" fill="#0b1026" />
      {/* horizon band */}
      <rect x="0" y="112" width="400" height="8" fill="#141b3c" />
      {/* dithered row above band */}
      <rect x="0" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="36" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="48" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="60" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="76" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="180" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="196" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="212" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="224" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="236" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="248" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="332" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="344" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="356" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="108" width="4" height="4" fill="#141b3c" />
      <rect x="380" y="108" width="4" height="4" fill="#141b3c" />

      {/* ===== STARS (storm-thinned) ===== */}
      <rect x="24" y="16" width="4" height="4" fill="#e8ecf8" />
      <rect x="88" y="28" width="4" height="4" fill="#4a5a8a" />
      <rect x="148" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="236" y="20" width="4" height="4" fill="#4a5a8a" />
      <rect x="308" y="8" width="4" height="4" fill="#e8ecf8" />
      <rect x="372" y="24" width="4" height="4" fill="#4a5a8a" />
      <rect x="196" y="36" width="4" height="4" fill="#4a5a8a" />

      {/* ===== MOON (blocky, storm-bitten) ===== */}
      <rect x="316" y="28" width="16" height="4" fill="#e8ecf8" />
      <rect x="312" y="32" width="24" height="4" fill="#e8ecf8" />
      <rect x="308" y="36" width="28" height="12" fill="#e8ecf8" />
      <rect x="312" y="48" width="24" height="4" fill="#e8ecf8" />
      <rect x="316" y="52" width="16" height="4" fill="#e8ecf8" />
      <rect x="324" y="32" width="12" height="8" fill="#0b1026" />
      <rect x="328" y="40" width="8" height="4" fill="#0b1026" />

      {/* ===== DISTANT TOWER (right) ===== */}
      <rect x="336" y="64" width="8" height="56" fill="#1e2a52" />
      <rect x="332" y="76" width="16" height="4" fill="#1e2a52" />
      <rect x="332" y="100" width="16" height="4" fill="#1e2a52" />
      <rect x="332" y="60" width="16" height="4" fill="#2a3a6e" />
      {/* beacon head */}
      <rect x="336" y="52" width="8" height="8" fill="#2a3a6e" />
      {/* beacon light: 2-frame flash */}
      <rect x="336" y="44" width="8" height="8" fill="#e04858">
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="328" y="48" width="4" height="4" fill="#e04858">
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="348" y="48" width="4" height="4" fill="#e04858">
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ===== HOUSES ON HORIZON (left cluster) ===== */}
      {/* house 1 — low gable */}
      <rect x="36" y="92" width="8" height="4" fill="#1e2a52" />
      <rect x="32" y="96" width="16" height="4" fill="#1e2a52" />
      <rect x="28" y="100" width="24" height="20" fill="#1e2a52" />
      {/* house 2 — taller gable, THE lit window */}
      <rect x="68" y="80" width="8" height="4" fill="#2a3a6e" />
      <rect x="64" y="84" width="16" height="4" fill="#2a3a6e" />
      <rect x="60" y="88" width="24" height="4" fill="#2a3a6e" />
      <rect x="60" y="92" width="24" height="28" fill="#1e2a52" />
      <rect x="68" y="100" width="8" height="8" fill="#f5b84f" />
      <rect x="68" y="100" width="4" height="4" fill="#ffd98a" />
      {/* house 3 — long low roof with chimney */}
      <rect x="96" y="96" width="20" height="4" fill="#1e2a52" />
      <rect x="92" y="100" width="28" height="20" fill="#1e2a52" />
      <rect x="108" y="88" width="4" height="8" fill="#1e2a52" />
      {/* house 4 — small gable mid */}
      <rect x="136" y="100" width="8" height="4" fill="#1e2a52" />
      <rect x="132" y="104" width="16" height="16" fill="#1e2a52" />

      {/* ===== BENT PALMS ===== */}
      {/* palm A — far left, bending right */}
      <rect x="8" y="112" width="4" height="8" fill="#1e2a52" />
      <rect x="12" y="104" width="4" height="8" fill="#1e2a52" />
      <rect x="16" y="96" width="4" height="8" fill="#1e2a52" />
      <rect x="20" y="92" width="4" height="4" fill="#1e2a52" />
      <rect x="20" y="84" width="4" height="8" fill="#2a3a6e" />
      <rect x="24" y="88" width="12" height="4" fill="#2a3a6e" />
      <rect x="24" y="80" width="8" height="4" fill="#2a3a6e" />
      <rect x="12" y="88" width="8" height="4" fill="#2a3a6e" />
      <rect x="28" y="92" width="8" height="4" fill="#1e2a52" />
      {/* palm B — mid, bending harder */}
      <rect x="160" y="112" width="4" height="8" fill="#1e2a52" />
      <rect x="164" y="104" width="4" height="8" fill="#1e2a52" />
      <rect x="168" y="96" width="4" height="8" fill="#1e2a52" />
      <rect x="172" y="88" width="4" height="8" fill="#1e2a52" />
      <rect x="176" y="84" width="4" height="4" fill="#1e2a52" />
      <rect x="176" y="76" width="4" height="8" fill="#2a3a6e" />
      <rect x="180" y="80" width="16" height="4" fill="#2a3a6e" />
      <rect x="180" y="72" width="8" height="4" fill="#2a3a6e" />
      <rect x="168" y="80" width="8" height="4" fill="#2a3a6e" />
      <rect x="184" y="84" width="12" height="4" fill="#1e2a52" />
      {/* palm C — small, near tower */}
      <rect x="288" y="108" width="4" height="12" fill="#1e2a52" />
      <rect x="292" y="100" width="4" height="8" fill="#1e2a52" />
      <rect x="292" y="92" width="4" height="8" fill="#2a3a6e" />
      <rect x="296" y="96" width="12" height="4" fill="#2a3a6e" />
      <rect x="284" y="96" width="8" height="4" fill="#2a3a6e" />

      {/* ===== RAIN — 3 columns of 4x8 steel rects, discrete step-down ===== */}
      <g fill="#4a5a8a">
        <rect x="52" y="8" width="4" height="8" />
        <rect x="56" y="44" width="4" height="8" />
        <rect x="48" y="76" width="4" height="8" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 12;0 24;0 0"
          keyTimes="0;0.33;0.66;1"
          calcMode="discrete"
          dur="0.7s"
          repeatCount="indefinite"
        />
      </g>
      <g fill="#4a5a8a">
        <rect x="208" y="16" width="4" height="8" />
        <rect x="216" y="52" width="4" height="8" />
        <rect x="204" y="84" width="4" height="8" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 12;0 24;0 0"
          keyTimes="0;0.33;0.66;1"
          calcMode="discrete"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </g>
      <g fill="#4a5a8a">
        <rect x="264" y="4" width="4" height="8" />
        <rect x="256" y="40" width="4" height="8" />
        <rect x="268" y="72" width="4" height="8" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 12;0 24;0 0"
          keyTimes="0;0.33;0.66;1"
          calcMode="discrete"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </g>

      {/* ===== CHURNING WATER BAND ===== */}
      <rect x="0" y="120" width="400" height="24" fill="#141b3c" />
      <rect x="0" y="120" width="400" height="4" fill="#1e2a52" />
      {/* wave crests — frame A */}
      <g fill="#4ac9d9">
        <rect x="12" y="124" width="12" height="4" />
        <rect x="56" y="132" width="8" height="4" />
        <rect x="100" y="124" width="16" height="4" />
        <rect x="152" y="136" width="12" height="4" />
        <rect x="200" y="128" width="8" height="4" />
        <rect x="244" y="124" width="16" height="4" />
        <rect x="300" y="132" width="12" height="4" />
        <rect x="352" y="124" width="12" height="4" />
        <rect x="384" y="136" width="8" height="4" />
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1s"
          repeatCount="indefinite"
        />
      </g>
      {/* wave crests — frame B */}
      <g fill="#4ac9d9">
        <rect x="32" y="128" width="12" height="4" />
        <rect x="76" y="124" width="12" height="4" />
        <rect x="128" y="132" width="8" height="4" />
        <rect x="176" y="124" width="16" height="4" />
        <rect x="224" y="136" width="12" height="4" />
        <rect x="272" y="128" width="12" height="4" />
        <rect x="324" y="124" width="8" height="4" />
        <rect x="368" y="132" width="12" height="4" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1s"
          repeatCount="indefinite"
        />
      </g>
      {/* steel foam flecks */}
      <rect x="44" y="140" width="4" height="4" fill="#4a5a8a" />
      <rect x="140" y="140" width="4" height="4" fill="#4a5a8a" />
      <rect x="236" y="140" width="4" height="4" fill="#4a5a8a" />
      <rect x="340" y="140" width="4" height="4" fill="#4a5a8a" />

      {/* ===== GROUND / SHORE ===== */}
      <rect x="0" y="144" width="400" height="36" fill="#10131f" />
      <rect x="0" y="144" width="400" height="4" fill="#08090f" />
      {/* shore rocks */}
      <rect x="20" y="148" width="16" height="8" fill="#08090f" />
      <rect x="112" y="152" width="24" height="8" fill="#08090f" />
      <rect x="208" y="148" width="12" height="8" fill="#08090f" />
      <rect x="296" y="152" width="20" height="8" fill="#08090f" />
      <rect x="368" y="148" width="16" height="8" fill="#08090f" />
    </svg>
  );
}
