import type { StatKey } from "../game/types";

// ── Pixel water tanks ───────────────────────────────────────────────────────
// The four national meters as 8-bit water tanks: chunky pixel vessels whose
// level rises and falls, with a classic 2-frame animated surface row.

const STAT_COLOR: Record<StatKey, { main: string; light: string }> = {
  approval: { main: "#4a7de0", light: "#7da6ff" },
  economy: { main: "#2fae6e", light: "#4ad98a" },
  stability: { main: "#d99a2f", light: "#f5b84f" },
  world: { main: "#2fa9b8", light: "#4ac9d9" },
};

// 16×16 logical pixels, 1 px = 4 svg units.
const P = 4;
const GRID = 16;
const INNER_TOP = 2; // rows 2..14 hold water (12 rows of range)
const INNER_BOTTOM = 14;

export default function Orb({
  statKey,
  value,
  label,
  size = 64,
  delta,
}: {
  statKey: StatKey;
  value: number;
  label: string;
  size?: number;
  delta?: number | null;
}) {
  const c = STAT_COLOR[statKey];
  const danger = value < 22;
  const warn = !danger && value < 40;

  // Quantize the waterline to whole pixel rows — that's the 8-bit charm.
  const range = INNER_BOTTOM - INNER_TOP; // 12 rows
  const filledRows = Math.max(value > 0 ? 1 : 0, Math.round((value / 100) * range));
  const surfaceY = INNER_BOTTOM - filledRows; // top row of water

  return (
    <div className={`orb ${danger ? "orb--danger" : warn ? "orb--warn" : ""}`}>
      <div className="orb__glass" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${GRID * P} ${GRID * P}`}
          width={size}
          height={size}
          role="img"
          aria-label={`${label} ${value} of 100`}
          shapeRendering="crispEdges"
        >
          {/* tank body */}
          <rect x={P} y={P} width={(GRID - 2) * P} height={(GRID - 2) * P} fill="#08090f" />
          {/* water body */}
          {filledRows > 0 && (
            <rect
              x={2 * P}
              y={surfaceY * P}
              width={(GRID - 4) * P}
              height={(INNER_BOTTOM - surfaceY) * P}
              fill={c.main}
            />
          )}
          {/* 2-frame surface row: alternating light pixels swap phase */}
          {filledRows > 0 && (
            <g>
              <g>
                {[2, 4, 6, 8, 10, 12].map((x) => (
                  <rect key={x} x={x * P} y={surfaceY * P} width={P} height={P} fill={c.light} />
                ))}
                <animate
                  attributeName="visibility"
                  values="visible;hidden;visible"
                  keyTimes="0;0.5;1"
                  calcMode="discrete"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </g>
              <g visibility="hidden">
                {[3, 5, 7, 9, 11].map((x) => (
                  <rect key={x} x={x * P} y={surfaceY * P} width={P} height={P} fill={c.light} />
                ))}
                <animate
                  attributeName="visibility"
                  values="hidden;visible;hidden"
                  keyTimes="0;0.5;1"
                  calcMode="discrete"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          )}
          {/* glass shine pixels */}
          <rect x={3 * P} y={3 * P} width={P} height={2 * P} fill="#e8ecf8" opacity="0.18" />
          {/* chunky frame */}
          <g fill={danger ? "#e04858" : "#4a5a8a"}>
            <rect x={P} y={0} width={(GRID - 2) * P} height={P} />
            <rect x={P} y={(GRID - 1) * P} width={(GRID - 2) * P} height={P} />
            <rect x={0} y={P} width={P} height={(GRID - 2) * P} />
            <rect x={(GRID - 1) * P} y={P} width={P} height={(GRID - 2) * P} />
            {/* corner nubs */}
            <rect x={P} y={P} width={P} height={P} />
            <rect x={(GRID - 2) * P} y={P} width={P} height={P} />
            <rect x={P} y={(GRID - 2) * P} width={P} height={P} />
            <rect x={(GRID - 2) * P} y={(GRID - 2) * P} width={P} height={P} />
          </g>
          {danger && (
            <animate
              attributeName="opacity"
              values="1;0.55;1"
              keyTimes="0;0.5;1"
              calcMode="discrete"
              dur="0.8s"
              repeatCount="indefinite"
            />
          )}
        </svg>
        <span className="orb__value">{value}</span>
        {delta != null && delta !== 0 && (
          <span key={`${statKey}-${delta}-${value}`} className={`orb__delta ${delta > 0 ? "up" : "down"}`}>
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        )}
      </div>
      <span className="orb__label">{label}</span>
    </div>
  );
}
