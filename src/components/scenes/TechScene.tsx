export default function TechScene() {
  return (
    <svg
      viewBox="0 0 400 180"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art server hall at night with blinking rack lights and a flickering teal wall screen"
    >
      {/* hall interior background */}
      <rect x="0" y="0" width="400" height="136" fill="#0b1026" />
      {/* horizon glow band + dither rows */}
      <rect x="0" y="120" width="400" height="16" fill="#141b3c" />
      <rect x="0" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="8" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="16" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="24" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="32" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="360" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="368" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="376" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="384" y="116" width="4" height="4" fill="#141b3c" />
      <rect x="392" y="116" width="4" height="4" fill="#141b3c" />

      {/* ceiling structure */}
      <rect x="0" y="0" width="400" height="8" fill="#1e2a52" />
      {/* cable trays across ceiling */}
      <rect x="0" y="12" width="400" height="4" fill="#2a3a6e" />
      <rect x="0" y="24" width="400" height="4" fill="#1e2a52" />
      {/* cable drops */}
      <rect x="48" y="8" width="4" height="16" fill="#2a3a6e" />
      <rect x="148" y="8" width="4" height="16" fill="#2a3a6e" />
      <rect x="248" y="8" width="4" height="16" fill="#2a3a6e" />
      <rect x="348" y="8" width="4" height="16" fill="#2a3a6e" />
      {/* cable sag pixels */}
      <rect x="88" y="16" width="24" height="4" fill="#4a5a8a" />
      <rect x="288" y="16" width="24" height="4" fill="#4a5a8a" />

      {/* ===== BIG CENTER WALL SCREEN ===== */}
      {/* bezel */}
      <rect x="152" y="36" width="96" height="68" fill="#08090f" />
      {/* screen face */}
      <rect x="156" y="40" width="88" height="60" fill="#141b3c" />
      {/* screen frame highlight */}
      <rect x="152" y="32" width="96" height="4" fill="#2a3a6e" />
      <rect x="152" y="104" width="96" height="4" fill="#2a3a6e" />
      {/* mount */}
      <rect x="196" y="108" width="8" height="8" fill="#1e2a52" />

      {/* screen polyline — frame A */}
      <g>
        <animate attributeName="visibility" values="visible;hidden;visible" keyTimes="0;0.5;1" calcMode="discrete" dur="0.8s" repeatCount="indefinite" />
        <rect x="160" y="84" width="8" height="4" fill="#4ac9d9" />
        <rect x="168" y="76" width="8" height="4" fill="#4ac9d9" />
        <rect x="176" y="68" width="8" height="4" fill="#4ac9d9" />
        <rect x="184" y="76" width="8" height="4" fill="#4ac9d9" />
        <rect x="192" y="64" width="8" height="4" fill="#4ac9d9" />
        <rect x="200" y="56" width="8" height="4" fill="#4ac9d9" />
        <rect x="208" y="64" width="8" height="4" fill="#4ac9d9" />
        <rect x="216" y="56" width="8" height="4" fill="#4ac9d9" />
        <rect x="224" y="48" width="8" height="4" fill="#4ac9d9" />
        <rect x="232" y="52" width="8" height="4" fill="#4ac9d9" />
      </g>
      {/* screen polyline — frame B */}
      <g>
        <animate attributeName="visibility" values="hidden;visible;hidden" keyTimes="0;0.5;1" calcMode="discrete" dur="0.8s" repeatCount="indefinite" />
        <rect x="160" y="88" width="8" height="4" fill="#4ac9d9" />
        <rect x="168" y="80" width="8" height="4" fill="#4ac9d9" />
        <rect x="176" y="72" width="8" height="4" fill="#4ac9d9" />
        <rect x="184" y="64" width="8" height="4" fill="#4ac9d9" />
        <rect x="192" y="72" width="8" height="4" fill="#4ac9d9" />
        <rect x="200" y="60" width="8" height="4" fill="#4ac9d9" />
        <rect x="208" y="52" width="8" height="4" fill="#4ac9d9" />
        <rect x="216" y="60" width="8" height="4" fill="#4ac9d9" />
        <rect x="224" y="52" width="8" height="4" fill="#4ac9d9" />
        <rect x="232" y="44" width="8" height="4" fill="#4ac9d9" />
      </g>
      {/* screen baseline */}
      <rect x="160" y="92" width="80" height="4" fill="#2a3a6e" />

      {/* ===== LEFT RACK ROW ===== */}
      {/* rack 1 */}
      <rect x="16" y="48" width="28" height="88" fill="#1e2a52" />
      <rect x="16" y="48" width="28" height="4" fill="#2a3a6e" />
      <rect x="20" y="60" width="20" height="4" fill="#08090f" />
      <rect x="20" y="76" width="20" height="4" fill="#08090f" />
      <rect x="20" y="92" width="20" height="4" fill="#08090f" />
      <rect x="20" y="108" width="20" height="4" fill="#08090f" />
      <rect x="20" y="124" width="20" height="4" fill="#08090f" />
      <rect x="20" y="60" width="4" height="4" fill="#f5b84f" />
      <rect x="20" y="92" width="4" height="4" fill="#4ac9d9" />
      <rect x="36" y="76" width="4" height="4" fill="#f5b84f">
        <animate attributeName="fill" values="#f5b84f;#08090f;#f5b84f" keyTimes="0;0.5;1" calcMode="discrete" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="124" width="4" height="4" fill="#4ac9d9" />

      {/* rack 2 */}
      <rect x="56" y="56" width="28" height="80" fill="#1e2a52" />
      <rect x="56" y="56" width="28" height="4" fill="#2a3a6e" />
      <rect x="60" y="68" width="20" height="4" fill="#08090f" />
      <rect x="60" y="84" width="20" height="4" fill="#08090f" />
      <rect x="60" y="100" width="20" height="4" fill="#08090f" />
      <rect x="60" y="116" width="20" height="4" fill="#08090f" />
      <rect x="60" y="68" width="4" height="4" fill="#4ac9d9" />
      <rect x="76" y="100" width="4" height="4" fill="#f5b84f" />
      <rect x="60" y="116" width="4" height="4" fill="#4ac9d9">
        <animate attributeName="fill" values="#4ac9d9;#08090f;#4ac9d9" keyTimes="0;0.5;1" calcMode="discrete" dur="0.7s" repeatCount="indefinite" />
      </rect>

      {/* rack 3 */}
      <rect x="96" y="64" width="28" height="72" fill="#1e2a52" />
      <rect x="96" y="64" width="28" height="4" fill="#2a3a6e" />
      <rect x="100" y="76" width="20" height="4" fill="#08090f" />
      <rect x="100" y="92" width="20" height="4" fill="#08090f" />
      <rect x="100" y="108" width="20" height="4" fill="#08090f" />
      <rect x="100" y="124" width="20" height="4" fill="#08090f" />
      <rect x="100" y="76" width="4" height="4" fill="#f5b84f" />
      <rect x="116" y="92" width="4" height="4" fill="#4ac9d9" />
      <rect x="100" y="108" width="4" height="4" fill="#f5b84f" />

      {/* ===== RIGHT RACK ROW (mirrored) ===== */}
      {/* rack 4 */}
      <rect x="276" y="64" width="28" height="72" fill="#1e2a52" />
      <rect x="276" y="64" width="28" height="4" fill="#2a3a6e" />
      <rect x="280" y="76" width="20" height="4" fill="#08090f" />
      <rect x="280" y="92" width="20" height="4" fill="#08090f" />
      <rect x="280" y="108" width="20" height="4" fill="#08090f" />
      <rect x="280" y="124" width="20" height="4" fill="#08090f" />
      <rect x="296" y="76" width="4" height="4" fill="#4ac9d9" />
      <rect x="280" y="92" width="4" height="4" fill="#f5b84f" />
      <rect x="296" y="108" width="4" height="4" fill="#f5b84f">
        <animate attributeName="fill" values="#f5b84f;#08090f;#f5b84f" keyTimes="0;0.5;1" calcMode="discrete" dur="1.5s" repeatCount="indefinite" />
      </rect>

      {/* rack 5 */}
      <rect x="316" y="56" width="28" height="80" fill="#1e2a52" />
      <rect x="316" y="56" width="28" height="4" fill="#2a3a6e" />
      <rect x="320" y="68" width="20" height="4" fill="#08090f" />
      <rect x="320" y="84" width="20" height="4" fill="#08090f" />
      <rect x="320" y="100" width="20" height="4" fill="#08090f" />
      <rect x="320" y="116" width="20" height="4" fill="#08090f" />
      <rect x="336" y="68" width="4" height="4" fill="#f5b84f" />
      <rect x="320" y="84" width="4" height="4" fill="#4ac9d9" />
      <rect x="336" y="116" width="4" height="4" fill="#4ac9d9" />

      {/* rack 6 */}
      <rect x="356" y="48" width="28" height="88" fill="#1e2a52" />
      <rect x="356" y="48" width="28" height="4" fill="#2a3a6e" />
      <rect x="360" y="60" width="20" height="4" fill="#08090f" />
      <rect x="360" y="76" width="20" height="4" fill="#08090f" />
      <rect x="360" y="92" width="20" height="4" fill="#08090f" />
      <rect x="360" y="108" width="20" height="4" fill="#08090f" />
      <rect x="360" y="124" width="20" height="4" fill="#08090f" />
      <rect x="376" y="60" width="4" height="4" fill="#4ac9d9" />
      <rect x="360" y="76" width="4" height="4" fill="#f5b84f" />
      <rect x="376" y="92" width="4" height="4" fill="#f5b84f" />
      <rect x="360" y="124" width="4" height="4" fill="#4ac9d9" />

      {/* tiny operator silhouette in front of screen */}
      <rect x="188" y="120" width="8" height="4" fill="#08090f" />
      <rect x="188" y="124" width="8" height="12" fill="#08090f" />

      {/* ===== RAISED FLOOR ===== */}
      <rect x="0" y="136" width="400" height="4" fill="#2a3a6e" />
      {/* teal reflection row under the screen */}
      <rect x="156" y="140" width="88" height="4" fill="#4ac9d9">
        <animate attributeName="fill" values="#4ac9d9;#141b3c;#4ac9d9" keyTimes="0;0.5;1" calcMode="discrete" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <rect x="0" y="140" width="156" height="4" fill="#10131f" />
      <rect x="244" y="140" width="156" height="4" fill="#10131f" />
      {/* ground band */}
      <rect x="0" y="144" width="400" height="36" fill="#10131f" />
      {/* floor tile seams */}
      <rect x="0" y="156" width="400" height="4" fill="#08090f" />
      <rect x="40" y="144" width="4" height="12" fill="#08090f" />
      <rect x="120" y="144" width="4" height="12" fill="#08090f" />
      <rect x="200" y="144" width="4" height="12" fill="#08090f" />
      <rect x="280" y="144" width="4" height="12" fill="#08090f" />
      <rect x="360" y="144" width="4" height="12" fill="#08090f" />
      {/* dim glints on the floor under rack lights */}
      <rect x="24" y="148" width="4" height="4" fill="#1e2a52" />
      <rect x="76" y="148" width="4" height="4" fill="#1e2a52" />
      <rect x="296" y="148" width="4" height="4" fill="#1e2a52" />
      <rect x="336" y="148" width="4" height="4" fill="#1e2a52" />
    </svg>
  );
}
