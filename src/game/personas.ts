import type { Persona } from "./types";

// Starting archetypes. Each is a different way to play — a stat tilt plus a perk.
export const PERSONAS: Persona[] = [
  {
    id: "reformer",
    name: "The Reformer",
    title: "Idealist firebrand",
    blurb: "Swept in on a wave of hope and hashtags. The base adores you; the establishment is nervous.",
    perk: "+10 Approval to start. Bold choices hit a little harder.",
    startStats: { approval: 62, economy: 50, stability: 46, world: 50 },
    startCapital: 3,
    emoji: "🔥",
  },
  {
    id: "tycoon",
    name: "The Tycoon",
    title: "Business outsider",
    blurb: "You ran the country like a balance sheet on the campaign trail. Wall Street is thrilled. Everyone else is watching.",
    perk: "Strong Economy and extra Political Capital. The markets love you — for now.",
    startStats: { approval: 50, economy: 64, stability: 48, world: 48 },
    startCapital: 5,
    emoji: "💼",
  },
  {
    id: "general",
    name: "The General",
    title: "Steady hand",
    blurb: "Four stars, no nonsense. Allies trust you, rivals respect you, and Congress is afraid to cross you.",
    perk: "High Stability and World Standing. Crises rattle you less.",
    startStats: { approval: 52, economy: 48, stability: 60, world: 60 },
    startCapital: 4,
    emoji: "🎖️",
  },
  {
    id: "professor",
    name: "The Professor",
    title: "Wonk-in-chief",
    blurb: "You have a 40-point plan for everything and the footnotes to prove it. The experts cheer; the cable hosts roll their eyes.",
    perk: "Balanced across the board with bonus Political Capital to spend wisely.",
    startStats: { approval: 50, economy: 54, stability: 54, world: 54 },
    startCapital: 6,
    emoji: "🎓",
  },
];

export const PERSONA_BY_ID: Record<string, Persona> = Object.fromEntries(
  PERSONAS.map((p) => [p.id, p])
);
