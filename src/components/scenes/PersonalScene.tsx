export default function PersonalScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art Oval Office at 2AM: three arched windows with moonlight, a presidential desk with a pulsing amber lamp and a steaming coffee cup"
    >
      {/* ===== Wall base (deep night interior) ===== */}
      <rect x="0" y="0" width="400" height="144" fill="#0b1026" />

      {/* Curved wall suggestion: stepped lighter bands top corners */}
      <rect x="0" y="0" width="400" height="8" fill="#1e2a52" />
      <rect x="0" y="8" width="56" height="4" fill="#1e2a52" />
      <rect x="344" y="8" width="56" height="4" fill="#1e2a52" />
      <rect x="0" y="12" width="32" height="4" fill="#1e2a52" />
      <rect x="368" y="12" width="32" height="4" fill="#1e2a52" />
      <rect x="0" y="16" width="16" height="8" fill="#1e2a52" />
      <rect x="384" y="16" width="16" height="8" fill="#1e2a52" />
      <rect x="0" y="24" width="8" height="16" fill="#1e2a52" />
      <rect x="392" y="24" width="8" height="16" fill="#1e2a52" />

      {/* Wall panel mid tone band behind windows */}
      <rect x="0" y="8" width="400" height="4" fill="#141b3c" />

      {/* ===== Window 1 (left) arched, x=48..104 ===== */}
      <rect x="60" y="20" width="32" height="4" fill="#141b3c" />
      <rect x="56" y="24" width="40" height="4" fill="#141b3c" />
      <rect x="52" y="28" width="48" height="4" fill="#141b3c" />
      <rect x="52" y="32" width="48" height="72" fill="#141b3c" />
      <rect x="64" y="24" width="24" height="4" fill="#2a3a6e" />
      <rect x="60" y="28" width="32" height="4" fill="#2a3a6e" />
      <rect x="56" y="32" width="40" height="68" fill="#2a3a6e" />
      <rect x="72" y="28" width="8" height="72" fill="#1e2a52" />
      <rect x="56" y="60" width="40" height="4" fill="#1e2a52" />
      <rect x="60" y="36" width="12" height="20" fill="#4a5a8a" />
      <rect x="84" y="68" width="12" height="24" fill="#4a5a8a" />
      <rect x="48" y="104" width="56" height="4" fill="#1e2a52" />

      {/* ===== Window 2 (center) arched, x=172..228 ===== */}
      <rect x="184" y="16" width="32" height="4" fill="#141b3c" />
      <rect x="180" y="20" width="40" height="4" fill="#141b3c" />
      <rect x="176" y="24" width="48" height="4" fill="#141b3c" />
      <rect x="176" y="28" width="48" height="76" fill="#141b3c" />
      <rect x="188" y="20" width="24" height="4" fill="#2a3a6e" />
      <rect x="184" y="24" width="32" height="4" fill="#2a3a6e" />
      <rect x="180" y="28" width="40" height="72" fill="#2a3a6e" />
      {/* moon visible through center window, blocky with bite */}
      <rect x="192" y="32" width="16" height="4" fill="#e8ecf8" />
      <rect x="188" y="36" width="20" height="4" fill="#e8ecf8" />
      <rect x="188" y="40" width="16" height="4" fill="#e8ecf8" />
      <rect x="188" y="44" width="20" height="4" fill="#e8ecf8" />
      <rect x="192" y="48" width="16" height="4" fill="#e8ecf8" />
      <rect x="204" y="40" width="8" height="4" fill="#2a3a6e" />
      {/* mullions */}
      <rect x="196" y="24" width="8" height="80" fill="#1e2a52" />
      <rect x="180" y="60" width="40" height="4" fill="#1e2a52" />
      {/* pale light streaks */}
      <rect x="184" y="68" width="12" height="28" fill="#4a5a8a" />
      <rect x="208" y="72" width="8" height="20" fill="#4a5a8a" />
      <rect x="172" y="104" width="56" height="4" fill="#1e2a52" />

      {/* ===== Window 3 (right) arched, x=296..352 ===== */}
      <rect x="308" y="20" width="32" height="4" fill="#141b3c" />
      <rect x="304" y="24" width="40" height="4" fill="#141b3c" />
      <rect x="300" y="28" width="48" height="4" fill="#141b3c" />
      <rect x="300" y="32" width="48" height="72" fill="#141b3c" />
      <rect x="312" y="24" width="24" height="4" fill="#2a3a6e" />
      <rect x="308" y="28" width="32" height="4" fill="#2a3a6e" />
      <rect x="304" y="32" width="40" height="68" fill="#2a3a6e" />
      <rect x="320" y="28" width="8" height="72" fill="#1e2a52" />
      <rect x="304" y="60" width="40" height="4" fill="#1e2a52" />
      <rect x="308" y="40" width="8" height="24" fill="#4a5a8a" />
      <rect x="332" y="64" width="12" height="28" fill="#4a5a8a" />
      <rect x="296" y="104" width="56" height="4" fill="#1e2a52" />

      {/* Stars in left and right windows */}
      <rect x="64" y="40" width="4" height="4" fill="#e8ecf8" />
      <rect x="88" y="48" width="4" height="4" fill="#4a5a8a" />
      <rect x="312" y="44" width="4" height="4" fill="#e8ecf8" />
      <rect x="336" y="36" width="4" height="4" fill="#4a5a8a" />

      {/* Wall pilasters between windows */}
      <rect x="128" y="20" width="8" height="88" fill="#1e2a52" />
      <rect x="264" y="20" width="8" height="88" fill="#1e2a52" />

      {/* Moonlight pools on floor below windows */}
      <rect x="56" y="108" width="40" height="4" fill="#2a3a6e" />
      <rect x="180" y="108" width="40" height="4" fill="#2a3a6e" />
      <rect x="304" y="108" width="40" height="4" fill="#2a3a6e" />

      {/* ===== Floor / carpet band ===== */}
      <rect x="0" y="140" width="400" height="4" fill="#08090f" />
      <rect x="0" y="144" width="400" height="36" fill="#10131f" />
      {/* rug with pixel border */}
      <rect x="96" y="152" width="208" height="24" fill="#1e2a52" />
      <rect x="96" y="152" width="208" height="4" fill="#2a3a6e" />
      <rect x="96" y="172" width="208" height="4" fill="#2a3a6e" />
      <rect x="96" y="156" width="4" height="16" fill="#2a3a6e" />
      <rect x="300" y="156" width="4" height="16" fill="#2a3a6e" />
      {/* rug inner border dashes */}
      <rect x="116" y="160" width="8" height="4" fill="#4a5a8a" />
      <rect x="148" y="164" width="8" height="4" fill="#4a5a8a" />
      <rect x="244" y="164" width="8" height="4" fill="#4a5a8a" />
      <rect x="276" y="160" width="8" height="4" fill="#4a5a8a" />

      {/* ===== Presidential desk silhouette (center) ===== */}
      {/* chair behind desk */}
      <rect x="188" y="84" width="24" height="28" fill="#08090f" />
      <rect x="192" y="80" width="16" height="4" fill="#08090f" />
      {/* desk top */}
      <rect x="144" y="112" width="112" height="8" fill="#08090f" />
      {/* desk body */}
      <rect x="148" y="120" width="104" height="28" fill="#08090f" />
      {/* desk panel details */}
      <rect x="156" y="128" width="20" height="12" fill="#1e2a52" />
      <rect x="224" y="128" width="20" height="12" fill="#1e2a52" />
      <rect x="192" y="124" width="16" height="20" fill="#1e2a52" />
      {/* desk feet */}
      <rect x="148" y="148" width="12" height="4" fill="#08090f" />
      <rect x="240" y="148" width="12" height="4" fill="#08090f" />

      {/* ===== Desk lamp (left side of desk top) ===== */}
      <rect x="160" y="108" width="16" height="4" fill="#08090f" />
      <rect x="164" y="96" width="4" height="12" fill="#08090f" />
      <rect x="156" y="88" width="20" height="8" fill="#1e2a52" />
      <rect x="160" y="84" width="12" height="4" fill="#1e2a52" />
      <rect x="160" y="96" width="12" height="4" fill="#ffd98a" />

      {/* Lamp glow frame A: small cozy glow */}
      <g>
        <rect x="152" y="96" width="8" height="12" fill="#f5b84f" />
        <rect x="172" y="96" width="8" height="12" fill="#f5b84f" />
        <rect x="156" y="108" width="24" height="4" fill="#f5b84f" />
        <animate
          attributeName="visibility"
          values="visible;hidden;visible"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </g>
      {/* Lamp glow frame B: bigger pulse */}
      <g visibility="hidden">
        <rect x="144" y="92" width="12" height="16" fill="#f5b84f" />
        <rect x="176" y="92" width="12" height="16" fill="#f5b84f" />
        <rect x="148" y="108" width="40" height="4" fill="#f5b84f" />
        <rect x="152" y="112" width="32" height="4" fill="#f5b84f" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </g>

      {/* Warm light spill on desk from lamp (steady) */}
      <rect x="156" y="112" width="28" height="4" fill="#ffd98a" />

      {/* ===== Coffee cup (right side of desk top) ===== */}
      <rect x="228" y="104" width="12" height="8" fill="#e8ecf8" />
      <rect x="240" y="104" width="4" height="4" fill="#e8ecf8" />
      <rect x="232" y="100" width="4" height="4" fill="#08090f" />

      {/* Steam: 3 discrete frames of rising pixels */}
      <g>
        <rect x="232" y="96" width="4" height="4" fill="#4a5a8a" />
        <animate
          attributeName="visibility"
          values="visible;hidden;hidden;visible"
          keyTimes="0;0.33;0.66;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </g>
      <g visibility="hidden">
        <rect x="236" y="88" width="4" height="4" fill="#4a5a8a" />
        <rect x="232" y="92" width="4" height="4" fill="#4a5a8a" />
        <animate
          attributeName="visibility"
          values="hidden;visible;hidden;hidden"
          keyTimes="0;0.33;0.66;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </g>
      <g visibility="hidden">
        <rect x="232" y="80" width="4" height="4" fill="#4a5a8a" />
        <rect x="236" y="84" width="4" height="4" fill="#4a5a8a" />
        <animate
          attributeName="visibility"
          values="hidden;hidden;visible;hidden"
          keyTimes="0;0.33;0.66;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </g>

      {/* Paper stack on desk (moon-pale) */}
      <rect x="204" y="108" width="16" height="4" fill="#e8ecf8" />
    </svg>
  );
}
