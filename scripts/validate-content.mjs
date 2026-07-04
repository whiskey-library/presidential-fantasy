// Deep-validates the generated scenario packs against the game schema so a
// malformed event is caught here rather than silently skipped at runtime.
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..", "src", "game", "content", "packs");

const OUTLETS = new Set(["beacon", "ledger", "tribune", "buzz"]);
const CATEGORIES = new Set([
  "economy", "foreign", "domestic", "crisis", "scandal",
  "tech", "environment", "security", "personal", "wildcard",
]);
const STAT_KEYS = new Set(["approval", "economy", "stability", "world", "capital", "legacy"]);
const TONES = new Set(["positive", "negative", "neutral", undefined]);

let total = 0;
let problems = 0;
const ids = new Set();
const warn = (m) => { console.log("  ⚠ " + m); problems++; };

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const data = JSON.parse(readFileSync(join(dir, file), "utf8"));
  if (!Array.isArray(data)) { warn(`${file}: not an array`); continue; }
  let ok = 0;
  for (const ev of data) {
    total++;
    const tag = `${file}:${ev.id ?? "?"}`;
    if (typeof ev.id !== "string") warn(`${tag}: missing id`);
    if (ids.has(ev.id)) warn(`${tag}: duplicate id`);
    ids.add(ev.id);
    if (!CATEGORIES.has(ev.category)) warn(`${tag}: bad category "${ev.category}"`);
    if (typeof ev.title !== "string" || ev.title.length > 60) warn(`${tag}: bad title`);
    if (typeof ev.briefing !== "string" || ev.briefing.length < 20) warn(`${tag}: thin briefing`);
    if (!Array.isArray(ev.choices) || ev.choices.length < 2) { warn(`${tag}: <2 choices`); continue; }
    for (const c of ev.choices) {
      if (typeof c.label !== "string") warn(`${tag}: choice missing label`);
      if (typeof c.result !== "string") warn(`${tag}/${c.id}: missing result`);
      if (!c.effects || typeof c.effects !== "object") warn(`${tag}/${c.id}: missing effects`);
      else {
        const keys = Object.keys(c.effects);
        if (keys.length === 0) warn(`${tag}/${c.id}: empty effects`);
        for (const k of keys) {
          if (!STAT_KEYS.has(k)) warn(`${tag}/${c.id}: bad effect key "${k}"`);
          if (!Number.isInteger(c.effects[k])) warn(`${tag}/${c.id}: non-integer ${k}`);
          if (Math.abs(c.effects[k]) > 20) warn(`${tag}/${c.id}: huge ${k}=${c.effects[k]}`);
        }
      }
      if (c.news) for (const n of c.news) {
        if (!OUTLETS.has(n.outlet)) warn(`${tag}/${c.id}: bad outlet "${n.outlet}"`);
        if (typeof n.headline !== "string") warn(`${tag}/${c.id}: bad headline`);
        if (!TONES.has(n.tone)) warn(`${tag}/${c.id}: bad tone "${n.tone}"`);
      }
      if (c.echo) {
        if (!Number.isInteger(c.echo.delay) || c.echo.delay < 1 || c.echo.delay > 12)
          warn(`${tag}/${c.id}: echo delay must be int 1..12`);
        if (typeof c.echo.title !== "string" || typeof c.echo.text !== "string")
          warn(`${tag}/${c.id}: echo needs title+text`);
        if (!c.echo.effects || typeof c.echo.effects !== "object") warn(`${tag}/${c.id}: echo missing effects`);
        else for (const k of Object.keys(c.echo.effects)) {
          if (!STAT_KEYS.has(k)) warn(`${tag}/${c.id}: echo bad effect key "${k}"`);
          if (!Number.isInteger(c.echo.effects[k])) warn(`${tag}/${c.id}: echo non-integer ${k}`);
          if (Math.abs(c.echo.effects[k]) > 20) warn(`${tag}/${c.id}: echo huge ${k}=${c.echo.effects[k]}`);
        }
        if (!TONES.has(c.echo.tone)) warn(`${tag}/${c.id}: echo bad tone "${c.echo.tone}"`);
      }
    }
    ok++;
  }
  console.log(`${file}: ${ok}/${data.length} events ok`);
}

console.log(`\nTotal events: ${total} · Problems: ${problems}`);
process.exit(problems > 0 ? 1 : 0);
