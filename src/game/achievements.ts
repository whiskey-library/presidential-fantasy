import type { Achievement } from "./types";

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_call", name: "Day One", desc: "Make your first presidential decision.", emoji: "🏛️" },
  { id: "landslide", name: "Landslide", desc: "Push Approval to 80 or higher.", emoji: "📈" },
  { id: "underwater", name: "Underwater", desc: "Survive a decision with Approval below 20.", emoji: "🌊" },
  { id: "reelected", name: "Four More Years", desc: "Win re-election.", emoji: "🗳️" },
  { id: "two_terms", name: "The Full Eight", desc: "Complete two full terms in office.", emoji: "🦅" },
  { id: "boom", name: "It's the Economy", desc: "Push Economy to 85 or higher.", emoji: "💹" },
  { id: "peacemaker", name: "Peacemaker", desc: "Push World Standing to 85 or higher.", emoji: "🕊️" },
  { id: "iron_grip", name: "Iron Grip", desc: "Push Stability to 85 or higher.", emoji: "⚖️" },
  { id: "survivor", name: "Survivor", desc: "Stay in office past 1,000 days.", emoji: "📅" },
  { id: "scandal", name: "Teflon", desc: "Weather a full-blown scandal and keep your job.", emoji: "🧯" },
  { id: "rushmore", name: "Mount Rushmore", desc: "Finish a career with a legacy of 800+.", emoji: "🗻" },
  { id: "disgraced", name: "History Will Judge", desc: "Get removed from office. It happens.", emoji: "📉" },
  { id: "centrist", name: "The Tightrope", desc: "Keep all four meters between 45 and 55 at once.", emoji: "🎯" },
  { id: "veteran", name: "Career Politician", desc: "Make 50 decisions across your career.", emoji: "🎩" },
  { id: "comes_around", name: "What Goes Around", desc: "Feel a past decision come back as a consequence.", emoji: "🪃" },
  { id: "deer_in_headlights", name: "Deer in Headlights", desc: "Let the decision clock run out on you.", emoji: "⏰" },
  { id: "daily_donein", name: "Republic of Routine", desc: "Finish a Daily Challenge run.", emoji: "📆" },
];

export const ACHIEVEMENT_BY_ID: Record<string, Achievement> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a])
);
