export default function SecurityScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art situation room at night: a large radar panel with concentric rings and a moving blip, flanked by analyst desks glowing amber"
    >
      {/* room backdrop */}
      <rect x="0" y="0" width="400" height="140" fill="#0b1026" />
      {/* dithered mid band near horizon */}
      <rect x="0" y="124" width="400" height="4" fill="#141b3c" />
      <rect x="0" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="32" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="360" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="376" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="384" y="120" width="4" height="4" fill="#141b3c" />
      <rect x="392" y="120" width="4" height="4" fill="#141b3c" />

      {/* dotted world-map arc of steel pixels behind the panel */}
      <rect x="40" y="60" width="4" height="4" fill="#4a5a8a" />
      <rect x="56" y="48" width="4" height="4" fill="#4a5a8a" />
      <rect x="72" y="40" width="4" height="4" fill="#4a5a8a" />
      <rect x="92" y="32" width="4" height="4" fill="#4a5a8a" />
      <rect x="116" y="24" width="4" height="4" fill="#4a5a8a" />
      <rect x="140" y="20" width="4" height="4" fill="#4a5a8a" />
      <rect x="168" y="16" width="4" height="4" fill="#4a5a8a" />
      <rect x="196" y="12" width="4" height="4" fill="#e8ecf8" />
      <rect x="228" y="16" width="4" height="4" fill="#4a5a8a" />
      <rect x="256" y="20" width="4" height="4" fill="#4a5a8a" />
      <rect x="280" y="24" width="4" height="4" fill="#4a5a8a" />
      <rect x="304" y="32" width="4" height="4" fill="#4a5a8a" />
      <rect x="324" y="40" width="4" height="4" fill="#4a5a8a" />
      <rect x="340" y="48" width="4" height="4" fill="#4a5a8a" />
      <rect x="356" y="60" width="4" height="4" fill="#4a5a8a" />
      {/* second lower arc, dimmer */}
      <rect x="64" y="76" width="4" height="4" fill="#2a3a6e" />
      <rect x="88" y="64" width="4" height="4" fill="#2a3a6e" />
      <rect x="116" y="56" width="4" height="4" fill="#2a3a6e" />
      <rect x="284" y="56" width="4" height="4" fill="#2a3a6e" />
      <rect x="312" y="64" width="4" height="4" fill="#2a3a6e" />
      <rect x="336" y="76" width="4" height="4" fill="#2a3a6e" />

      {/* ===== central radar panel ===== */}
      {/* steel outer frame */}
      <rect x="148" y="24" width="104" height="96" fill="#4a5a8a" />
      {/* inner bezel */}
      <rect x="152" y="28" width="96" height="88" fill="#1e2a52" />
      {/* dark screen */}
      <rect x="156" y="32" width="88" height="80" fill="#08090f" />

      {/* outer ring — dim blocky octagon */}
      <rect x="180" y="36" width="40" height="4" fill="#1e2a52" />
      <rect x="172" y="40" width="8" height="4" fill="#1e2a52" />
      <rect x="220" y="40" width="8" height="4" fill="#1e2a52" />
      <rect x="164" y="44" width="8" height="4" fill="#1e2a52" />
      <rect x="228" y="44" width="8" height="4" fill="#1e2a52" />
      <rect x="160" y="48" width="4" height="8" fill="#1e2a52" />
      <rect x="236" y="48" width="4" height="8" fill="#1e2a52" />
      <rect x="156" y="56" width="4" height="32" fill="#1e2a52" />
      <rect x="240" y="56" width="4" height="32" fill="#1e2a52" />
      <rect x="160" y="88" width="4" height="8" fill="#1e2a52" />
      <rect x="236" y="88" width="4" height="8" fill="#1e2a52" />
      <rect x="164" y="96" width="8" height="4" fill="#1e2a52" />
      <rect x="228" y="96" width="8" height="4" fill="#1e2a52" />
      <rect x="172" y="100" width="8" height="4" fill="#1e2a52" />
      <rect x="220" y="100" width="8" height="4" fill="#1e2a52" />
      <rect x="180" y="104" width="40" height="4" fill="#1e2a52" />

      {/* middle ring — green */}
      <rect x="188" y="52" width="24" height="4" fill="#4ad98a" />
      <rect x="180" y="56" width="8" height="4" fill="#4ad98a" />
      <rect x="212" y="56" width="8" height="4" fill="#4ad98a" />
      <rect x="176" y="60" width="4" height="8" fill="#4ad98a" />
      <rect x="220" y="60" width="4" height="8" fill="#4ad98a" />
      <rect x="172" y="68" width="4" height="8" fill="#4ad98a" />
      <rect x="224" y="68" width="4" height="8" fill="#4ad98a" />
      <rect x="176" y="76" width="4" height="8" fill="#4ad98a" />
      <rect x="220" y="76" width="4" height="8" fill="#4ad98a" />
      <rect x="180" y="84" width="8" height="4" fill="#4ad98a" />
      <rect x="212" y="84" width="8" height="4" fill="#4ad98a" />
      <rect x="188" y="88" width="24" height="4" fill="#4ad98a" />

      {/* inner ring — green */}
      <rect x="192" y="64" width="16" height="4" fill="#4ad98a" />
      <rect x="188" y="68" width="4" height="8" fill="#4ad98a" />
      <rect x="208" y="68" width="4" height="8" fill="#4ad98a" />
      <rect x="192" y="76" width="16" height="4" fill="#4ad98a" />

      {/* center dot */}
      <rect x="196" y="68" width="8" height="8" fill="#4ad98a" />

      {/* crosshair ticks */}
      <rect x="198" y="40" width="4" height="8" fill="#2a3a6e" />
      <rect x="198" y="96" width="4" height="8" fill="#2a3a6e" />
      <rect x="160" y="70" width="8" height="4" fill="#2a3a6e" />
      <rect x="232" y="70" width="8" height="4" fill="#2a3a6e" />

      {/* radar blip — appears in 3 positions in sequence, discrete */}
      <g>
        <rect x="216" y="48" width="8" height="8" fill="#4ad98a">
          <animate
            attributeName="visibility"
            values="visible;hidden;hidden;visible"
            keyTimes="0;0.33;0.66;1"
            calcMode="discrete"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="176" y="88" width="8" height="8" fill="#4ad98a">
          <animate
            attributeName="visibility"
            values="hidden;visible;hidden;hidden"
            keyTimes="0;0.33;0.66;1"
            calcMode="discrete"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="224" y="80" width="8" height="8" fill="#4ad98a">
          <animate
            attributeName="visibility"
            values="hidden;hidden;visible;hidden"
            keyTimes="0;0.33;0.66;1"
            calcMode="discrete"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* panel mount legs */}
      <rect x="164" y="120" width="8" height="8" fill="#1e2a52" />
      <rect x="228" y="120" width="8" height="8" fill="#1e2a52" />
      <rect x="180" y="120" width="40" height="8" fill="#1e2a52" />

      {/* ===== left analyst desk ===== */}
      <rect x="48" y="84" width="40" height="28" fill="#2a3a6e" />
      <rect x="52" y="88" width="32" height="20" fill="#08090f" />
      {/* screen glow — flickering */}
      <rect x="56" y="92" width="24" height="12" fill="#f5b84f">
        <animate
          attributeName="fill"
          values="#f5b84f;#ffd98a;#f5b84f"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="64" y="112" width="8" height="8" fill="#1e2a52" />
      <rect x="32" y="120" width="80" height="8" fill="#1e2a52" />
      <rect x="36" y="128" width="8" height="12" fill="#10131f" />
      <rect x="100" y="128" width="8" height="12" fill="#10131f" />
      {/* desk glow spill */}
      <rect x="52" y="116" width="32" height="4" fill="#f5b84f" />
      {/* analyst silhouette */}
      <rect x="20" y="96" width="8" height="8" fill="#1e2a52" />
      <rect x="16" y="104" width="16" height="16" fill="#1e2a52" />
      <rect x="28" y="108" width="8" height="4" fill="#1e2a52" />

      {/* ===== right analyst desk ===== */}
      <rect x="312" y="84" width="40" height="28" fill="#2a3a6e" />
      <rect x="316" y="88" width="32" height="20" fill="#08090f" />
      {/* steady screen glow */}
      <rect x="320" y="92" width="24" height="12" fill="#ffd98a" />
      <rect x="328" y="112" width="8" height="8" fill="#1e2a52" />
      <rect x="288" y="120" width="80" height="8" fill="#1e2a52" />
      <rect x="292" y="128" width="8" height="12" fill="#10131f" />
      <rect x="356" y="128" width="8" height="12" fill="#10131f" />
      {/* desk glow spill */}
      <rect x="316" y="116" width="32" height="4" fill="#f5b84f" />
      {/* analyst silhouette */}
      <rect x="372" y="96" width="8" height="8" fill="#1e2a52" />
      <rect x="372" y="104" width="16" height="16" fill="#1e2a52" />
      <rect x="364" y="108" width="8" height="4" fill="#1e2a52" />

      {/* amber status lamps on the frame */}
      <rect x="152" y="116" width="4" height="4" fill="#f5b84f">
        <animate
          attributeName="fill"
          values="#f5b84f;#4a5a8a;#f5b84f"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="244" y="116" width="4" height="4" fill="#f5b84f" />

      {/* ===== floor ===== */}
      <rect x="0" y="140" width="400" height="40" fill="#10131f" />
      <rect x="0" y="140" width="400" height="4" fill="#1e2a52" />
      {/* floor seams */}
      <rect x="48" y="152" width="16" height="4" fill="#08090f" />
      <rect x="120" y="160" width="16" height="4" fill="#08090f" />
      <rect x="192" y="152" width="16" height="4" fill="#08090f" />
      <rect x="268" y="160" width="16" height="4" fill="#08090f" />
      <rect x="336" y="152" width="16" height="4" fill="#08090f" />
      {/* dim light pooling beneath desks */}
      <rect x="52" y="144" width="32" height="4" fill="#141b3c" />
      <rect x="316" y="144" width="32" height="4" fill="#141b3c" />
    </svg>
  );
}
