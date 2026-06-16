import type { Outlet } from "./types";

// Fictional outlets with distinct slants so the same decision lands four ways.
export const OUTLETS: Outlet[] = [
  { id: "beacon", name: "The National Beacon", lean: "center", tag: "Just the facts. Mostly." },
  { id: "ledger", name: "The Liberty Ledger", lean: "right", tag: "Free markets, strong borders." },
  { id: "tribune", name: "The People's Tribune", lean: "left", tag: "For the many." },
  { id: "buzz", name: "The Daily Buzz", lean: "tabloid", tag: "You won't BELIEVE what POTUS did." },
];

export const OUTLET_BY_ID: Record<string, Outlet> = Object.fromEntries(
  OUTLETS.map((o) => [o.id, o])
);

export const LEAN_LABEL: Record<Outlet["lean"], string> = {
  left: "LEFT",
  center: "CENTER",
  right: "RIGHT",
  tabloid: "TABLOID",
};
