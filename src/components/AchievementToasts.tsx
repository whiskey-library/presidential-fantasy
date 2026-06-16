import { ACHIEVEMENT_BY_ID } from "../game/achievements";

export default function AchievementToasts({ ids }: { ids: string[] }) {
  if (!ids.length) return null;
  return (
    <div className="toast-stack">
      {ids.map((id) => {
        const a = ACHIEVEMENT_BY_ID[id];
        if (!a) return null;
        return (
          <div key={id} className="toast">
            <span className="toast__emoji">{a.emoji}</span>
            <div className="toast__body">
              <div className="toast__title">Achievement unlocked</div>
              <div className="toast__name">{a.name}</div>
              <div className="toast__desc">{a.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
