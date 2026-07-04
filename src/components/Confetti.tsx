import { useEffect, useState } from "react";

const COLORS = ["#C9A961", "#E9EDF5", "#A9B4C6"];

/** ≤80 transform-only nodes, torn down after 2.5s. */
export default function Confetti() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2500);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;

  const pieces = Array.from({ length: 72 }, (_, i) => {
    const left = (i * 137.5) % 100; // golden-angle spread
    const delay = (i % 12) * 0.09;
    const dur = 1.6 + ((i * 7) % 10) * 0.06;
    const color = COLORS[i % COLORS.length];
    const drift = ((i % 7) - 3) * 14;
    return (
      <span
        key={i}
        className="confetti__bit"
        style={{
          left: `${left}%`,
          background: color,
          animationDelay: `${delay}s`,
          animationDuration: `${dur}s`,
          // @ts-expect-error custom property
          "--drift": `${drift}px`,
        }}
      />
    );
  });

  return (
    <div className="confetti" aria-hidden>
      {pieces}
    </div>
  );
}
