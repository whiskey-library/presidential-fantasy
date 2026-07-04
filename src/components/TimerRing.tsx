import { useEffect, useRef, useState } from "react";
import { sfxTick } from "../game/sound";

const R = 18;
const CIRC = 2 * Math.PI * R;

/**
 * Real-time decision countdown. Pauses when the tab is hidden.
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

  // Reset when a new decision (new `seconds` identity) arrives.
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
          // Defer: never fire a state transition mid-render.
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

  const frac = Math.max(0, left / seconds);
  const tone = left > 30 ? "brass" : left > 10 ? "warn" : "stamp";

  return (
    <div className={`timer timer--${tone} ${critical ? "timer--critical" : ""}`} aria-label={`${left} seconds to decide`}>
      <svg viewBox="0 0 44 44" width="44" height="44">
        <circle className="timer__track" cx="22" cy="22" r={R} fill="none" strokeWidth="3" />
        <circle
          className="timer__arc"
          cx="22"
          cy="22"
          r={R}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - frac)}
          transform="rotate(-90 22 22)"
        />
        {urgent && (
          <circle
            className="timer__pulse"
            cx="22"
            cy="22"
            r={R}
            fill="none"
            strokeWidth="2"
            strokeDasharray={CIRC}
            transform="rotate(-90 22 22)"
          />
        )}
      </svg>
      <span className="timer__num">{left}</span>
    </div>
  );
}
