import { useMemo } from "react";
import { hashSeed } from "../game/rng";

// ── The recurring cast, 8-bit edition ───────────────────────────────────────
// Every event `source` maps deterministically to the same pixel-sprite bust,
// drawn on an 18×18 pixel grid (1 px = 4 svg units) with a 2-frame idle blink.

const SKINS = ["#f2d3b3", "#e0b48f", "#c8946b", "#a9744f", "#8a5a3b", "#6e4630"];
const HAIRS = ["#1c2333", "#3a3f4a", "#6b4a2f", "#8a8f9c", "#e0c890"];
const SUITS = ["#1e2a52", "#2a3a6e", "#3b2f4a", "#263c33"];
const TIES = ["#e04858", "#f5b84f", "#4ac9d9", "#4ad98a", "#9a78e0"];

interface Look {
  skin: string;
  hair: string;
  suit: string;
  tie: string;
  hairStyle: number; // 0..5
  glasses: boolean;
}

function lookFor(name: string): Look {
  const h = hashSeed(name.trim().toLowerCase() || "aide");
  return {
    skin: SKINS[h % SKINS.length],
    hair: HAIRS[(h >> 3) % HAIRS.length],
    suit: SUITS[(h >> 6) % SUITS.length],
    tie: TIES[(h >> 9) % TIES.length],
    hairStyle: (h >> 12) % 6,
    glasses: ((h >> 15) & 3) === 0,
  };
}

/** px helper: one logical pixel = 4 svg units on the 18×18 grid. */
const P = 4;
function Px({ x, y, w = 1, h = 1, f }: { x: number; y: number; w?: number; h?: number; f: string }) {
  return <rect x={x * P} y={y * P} width={w * P} height={h * P} fill={f} />;
}

function HairPixels({ style, color }: { style: number; color: string }) {
  switch (style) {
    case 0: // crop
      return (
        <g>
          <Px x={5} y={2} w={8} h={2} f={color} />
          <Px x={4} y={3} w={1} h={3} f={color} />
          <Px x={13} y={3} w={1} h={3} f={color} />
        </g>
      );
    case 1: // side part
      return (
        <g>
          <Px x={4} y={2} w={9} h={2} f={color} />
          <Px x={4} y={4} w={3} h={1} f={color} />
          <Px x={13} y={3} w={1} h={4} f={color} />
        </g>
      );
    case 2: // curly
      return (
        <g>
          <Px x={4} y={1} w={10} h={2} f={color} />
          <Px x={3} y={2} w={2} h={3} f={color} />
          <Px x={13} y={2} w={2} h={3} f={color} />
          <Px x={5} y={3} w={2} h={1} f={color} />
          <Px x={11} y={3} w={2} h={1} f={color} />
        </g>
      );
    case 3: // bun
      return (
        <g>
          <Px x={5} y={2} w={8} h={2} f={color} />
          <Px x={4} y={3} w={1} h={3} f={color} />
          <Px x={13} y={3} w={1} h={3} f={color} />
          <Px x={14} y={1} w={2} h={2} f={color} />
        </g>
      );
    case 4: // bob
      return (
        <g>
          <Px x={4} y={1} w={10} h={3} f={color} />
          <Px x={3} y={3} w={2} h={6} f={color} />
          <Px x={13} y={3} w={2} h={6} f={color} />
        </g>
      );
    default: // balding
      return (
        <g>
          <Px x={4} y={4} w={1} h={2} f={color} />
          <Px x={13} y={4} w={1} h={2} f={color} />
          <Px x={6} y={2} w={2} h={1} f={color} />
        </g>
      );
  }
}

export default function Portrait({
  name,
  size = 56,
  ring = true,
}: {
  name: string;
  size?: number;
  ring?: boolean;
}) {
  const look = useMemo(() => lookFor(name), [name]);
  const blinkDur = 3.2 + (hashSeed(name) % 5) * 0.45; // desync blinks across the cast

  return (
    <svg
      viewBox="0 0 72 72"
      width={size}
      height={size}
      role="img"
      aria-label={name}
      className="portrait"
      shapeRendering="crispEdges"
    >
      {/* badge frame */}
      <rect x="0" y="0" width="72" height="72" fill="#0b1026" />
      {ring && (
        <g>
          <rect x="0" y="0" width="72" height="4" fill="#f5b84f" />
          <rect x="0" y="68" width="72" height="4" fill="#f5b84f" />
          <rect x="0" y="0" width="4" height="72" fill="#f5b84f" />
          <rect x="68" y="0" width="4" height="72" fill="#f5b84f" />
        </g>
      )}
      {/* suit shoulders */}
      <Px x={3} y={14} w={12} h={4} f={look.suit} />
      <Px x={2} y={15} w={14} h={3} f={look.suit} />
      {/* shirt + tie */}
      <Px x={8} y={14} w={2} h={2} f="#e8ecf8" />
      <Px x={8.5} y={15} w={1} h={3} f={look.tie} />
      {/* neck */}
      <Px x={7} y={12} w={4} h={2} f={look.skin} />
      {/* head */}
      <Px x={5} y={3} w={8} h={9} f={look.skin} />
      <Px x={4} y={5} w={1} h={5} f={look.skin} />
      <Px x={13} y={5} w={1} h={5} f={look.skin} />
      {/* hair */}
      <HairPixels style={look.hairStyle} color={look.hair} />
      {/* brows */}
      <Px x={6} y={6} w={2} h={0.5} f="#08090f" />
      <Px x={10} y={6} w={2} h={0.5} f="#08090f" />
      {/* eyes — 2-frame blink */}
      {look.glasses ? (
        <g>
          <Px x={5.5} y={6.5} w={3} h={2} f="#4a5a8a" />
          <Px x={9.5} y={6.5} w={3} h={2} f="#4a5a8a" />
          <Px x={8.5} y={7} w={1} h={0.5} f="#4a5a8a" />
          <g>
            <Px x={6.5} y={7} w={1} h={1} f="#08090f" />
            <Px x={10.5} y={7} w={1} h={1} f="#08090f" />
            <animate
              attributeName="visibility"
              values="visible;hidden;visible"
              keyTimes="0;0.93;1"
              calcMode="discrete"
              dur={`${blinkDur}s`}
              repeatCount="indefinite"
            />
          </g>
        </g>
      ) : (
        <g>
          <g>
            <Px x={6} y={7} w={1} h={1} f="#08090f" />
            <Px x={11} y={7} w={1} h={1} f="#08090f" />
            <animate
              attributeName="visibility"
              values="visible;hidden;visible"
              keyTimes="0;0.93;1"
              calcMode="discrete"
              dur={`${blinkDur}s`}
              repeatCount="indefinite"
            />
          </g>
          {/* closed-eye frame */}
          <g visibility="hidden">
            <Px x={6} y={7.5} w={1.5} h={0.5} f="#08090f" />
            <Px x={10.5} y={7.5} w={1.5} h={0.5} f="#08090f" />
            <animate
              attributeName="visibility"
              values="hidden;visible;hidden"
              keyTimes="0;0.93;1"
              calcMode="discrete"
              dur={`${blinkDur}s`}
              repeatCount="indefinite"
            />
          </g>
        </g>
      )}
      {/* nose + mouth */}
      <Px x={8.5} y={8.5} w={1} h={1} f="rgba(8,9,15,0.25)" />
      <Px x={7} y={10.5} w={4} h={0.7} f="rgba(8,9,15,0.4)" />
    </svg>
  );
}
