import type { StatKey } from "../game/types";
import { STAT_META } from "../game/engine";

export default function Meter({
  statKey,
  value,
  compact,
}: {
  statKey: StatKey;
  value: number;
  compact?: boolean;
}) {
  const meta = STAT_META[statKey];
  const cls = value < 22 ? "meter--danger" : value < 40 ? "meter--warn" : "";
  return (
    <div className={`meter stat-${statKey} ${cls}`}>
      <div className="meter__top">
        <span className="meter__label">
          <span className="meter__emoji">{meta.emoji}</span>
          {compact ? meta.short : meta.label}
        </span>
        <span className="meter__value">{value}</span>
      </div>
      <div className="meter__track">
        <div className="meter__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
