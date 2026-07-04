import { useEffect, useState } from "react";

const LINES = [
  "ESTABLISHING SECURE CHANNEL…",
  "CLEARANCE: EYES ONLY",
  "GOOD EVENING, MR. PRESIDENT.",
];

/** Once-per-session typed intro. Tap anywhere to skip. */
export default function ColdOpen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 500 : 620);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  return (
    <div className="coldopen" onClick={onDone} role="button" aria-label="Skip intro">
      <div className="coldopen__lines">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="coldopen__line">
            {l}
          </div>
        ))}
        <span className="coldopen__cursor" />
      </div>
      <div className="coldopen__skip">TAP TO SKIP</div>
    </div>
  );
}
