import { useEffect, useRef, useState } from "react";
import { sfxTick } from "../game/sound";

/**
 * Real-time decision countdown, 8-bit edition: a chunky square badge whose
 * fill drains in whole-pixel steps. Pauses when the tab is hidden.
 * Calls onExpire exactly once when it hits zero.
 */
export default function TimerRing({
  seconds,
  paused,
  onExpire,
  onUrgent,
}: {
  seconds: number;
  paused: boolean;
  onExpire: () => void;
  onUrgent: (urgent: boolean) => void;
}) {
  const [left, setLeft] = useState(seconds);
  const expired = useRef(false);
  const onExpireRef = useRef(onExpire);
  const onUrgentRef = useRef(onUrgent);
  onExpireRef.current = onExpire;
  onUrgentRef.current = onUrgent;

  // Reset when a new decision arrives.
  useEffect(() => {
    setLeft(seconds);
    expired.current = false;
  }, [seconds]);

  useEffect(() => {
    if (paused || seconds <= 0) return;
    const iv = setInterval(() => {
      if (document.hidden) return; // real-time, but only while you're looking
      setLeft((l) => {
        const next = l - 1;
        if (next <= 10 && next > 0) sfxTick(next <= 5);
        if (next <= 0 && !expired.current) {
          expired.current = true;
          clearInterval(iv);
          setTimeout(() => onExpireRef.current(), 30);
          return 0;
        }
        return Math.max(0, next);
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [seconds, paused]);

  const urgent = seconds > 0 && left <= 10;
  const critical = seconds > 0 && left <= 5;
  useEffect(() => {
    onUrgentRef.current(urgent);
  }, [urgent]);

  if (seconds <= 0) return null;

  // Drain quantized to 10 pixel rows — it empties one chunky row at a time.
  const rows = Math.ceil((left / seconds) * 10);
  const tone = left > 30 ? "brass" : left > 10 ? "warn" : "stamp";

  return (
    <div
      className={`ptimer ptimer--${tone} ${critical ? "ptimer--critical" : ""}`}
      aria-label={`${left} seconds to decide`}
    >
      <svg viewBox="0 0 48 48" width="46" height="46" shapeRendering="crispEdges" aria-hidden>
        {/* backing */}
        <rect x="4" y="4" width="40" height="40" fill="#08090f" />
        {/* drain fill, bottom-up in whole rows (4px each) */}
        <rect x="4" y={4 + (10 - rows) * 4} width="40" height={rows * 4} className="ptimer__fill" />
        {/* chunky frame */}
        <g className="ptimer__frame">
          <rect x="4" y="0" width="40" height="4" />
          <rect x="4" y="44" width="40" height="4" />
          <rect x="0" y="4" width="4" height="40" />
          <rect x="44" y="4" width="4" height="40" />
          <rect x="4" y="4" width="4" height="4" />
          <rect x="40" y="4" width="4" height="4" />
          <rect x="4" y="40" width="4" height="4" />
          <rect x="40" y="40" width="4" height="4" />
        </g>
      </svg>
      <span className="ptimer__num">{left}</span>
    </div>
  );
}
