// Verifies a prose-only rewrite: every mechanical field in the content packs
// must be byte-identical to git HEAD. Rewrites may touch words, never numbers.
import { execSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const dir = join(root, "src", "game", "content", "packs");

let problems = 0;
const warn = (m) => {
  console.log("  ✗ " + m);
  problems++;
};

const mech = (ev) => ({
  id: ev.id,
  category: ev.category,
  weight: ev.weight ?? null,
  minDay: ev.minDay ?? null,
  once: ev.once ?? null,
  requireFlags: ev.requireFlags ?? null,
  forbidFlags: ev.forbidFlags ?? null,
  requireStat: ev.requireStat ?? null,
  source: ev.source ?? null,
  choices: (ev.choices ?? []).map((c) => ({
    id: c.id,
    cost: c.cost ?? null,
    bold: c.bold ?? null,
    effects: c.effects,
    setFlags: c.setFlags ?? null,
    clearFlags: c.clearFlags ?? null,
    unlock: c.unlock ?? null,
    news: (c.news ?? []).map((n) => ({ outlet: n.outlet, tone: n.tone ?? null })),
    social: (c.social ?? []).map((s) => ({ sentiment: s.sentiment ?? null })),
    echo: c.echo
      ? { delay: c.echo.delay, effects: c.echo.effects, tone: c.echo.tone ?? null }
      : null,
  })),
});

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const rel = `src/game/content/packs/${file}`;
  let oldRaw;
  try {
    oldRaw = execSync(`git -C "${root}" show HEAD:"${rel}"`, { encoding: "utf8" });
  } catch {
    console.log(`${file}: not in HEAD, skipping`);
    continue;
  }
  let oldData, newData;
  try {
    oldData = JSON.parse(oldRaw);
  } catch {
    warn(`${file}: HEAD version unparsable?!`);
    continue;
  }
  try {
    newData = JSON.parse(readFileSync(join(dir, file), "utf8"));
  } catch (e) {
    warn(`${file}: NEW version is invalid JSON — ${e.message}`);
    continue;
  }
  if (oldData.length !== newData.length) {
    warn(`${file}: event count changed ${oldData.length} → ${newData.length}`);
    continue;
  }
  let ok = 0;
  for (let i = 0; i < oldData.length; i++) {
    const a = JSON.stringify(mech(oldData[i]));
    const b = JSON.stringify(mech(newData[i]));
    if (a !== b) {
      warn(`${file}[${i}] (${oldData[i].id}): mechanics drifted`);
      // show first divergence for debugging
      for (let j = 0; j < Math.min(a.length, b.length); j++) {
        if (a[j] !== b[j]) {
          console.log(`      at char ${j}: …${a.slice(Math.max(0, j - 30), j + 30)}…`);
          console.log(`               vs …${b.slice(Math.max(0, j - 30), j + 30)}…`);
          break;
        }
      }
    } else ok++;
  }
  console.log(`${file}: ${ok}/${oldData.length} events mechanically identical`);
}

console.log(problems ? `\n✗ ${problems} invariance problem(s)` : "\n✓ All mechanics invariant");
process.exit(problems ? 1 : 0);
