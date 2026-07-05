# 🏛️ Presidential Fantasy

**Make the call. Move the needle. Read the headlines. Build a legacy.**

A free, browser-playable presidential decision simulator — inspired by *Fantasy President Career*, streamlined into a fast, satisfying loop you can pick up in seconds and lose an hour to. Run the country one tough call at a time, watch your approval rise and fall, get roasted (or praised) by four rival news outlets and the social feed, survive re-election, and try to carve your face into the mountain.

> **Everything is free.** Every "premium" feature — the social feed, covert ops, the full career mode, achievements, the Hall of Fame — is unlocked for everyone. No ads, no paywalls, no accounts. It runs entirely in your browser.

🎮 **Play in the browser** or **install it as an app** (it's a PWA — "Add to Home Screen" on mobile, or install from the address bar on desktop).

---

## How it works

1. **A situation hits your desk** — a crisis, a scandal, a bill, a foreign standoff. Your advisors lay out the dilemma.
2. **You make the call.** Each choice is a real trade-off; there's rarely a free win.
3. **Your four meters move:**
   - 🇺🇸 **Approval** — your "water." Keep it above zero or you're out.
   - 💵 **Economy** — jobs, markets, prices.
   - ⚖️ **Stability** — Congress, your party, the streets. Hit zero and the government collapses.
   - 🌐 **World Standing** — allies, rivals, the global stage.
4. **The country reacts.** Four ideologically distinct papers print headlines, the social feed lights up, and your Chief of Staff gives it to you straight.
5. **Time moves.** Days in office tick up. Survive a full term, win re-election, then chase a legacy big enough for the history books — across two terms and an escalating gauntlet of crises.

Spend **⚡ Political Capital** on your boldest moves, rack up **achievements**, and every finished presidency is ranked in your local **Hall of Fame** — so your career builds over time.

## Why it's engaging

- **84+ hand-tuned scenarios** spanning the economy, foreign policy, crises, scandals, tech, the environment, national security, and the daily grind of the office — with more appearing the deeper into a presidency you get.
- **Four rival outlets** (The National Beacon, The Liberty Ledger, The People's Tribune, and the gloriously unhinged Daily Buzz) spin *the same decision* four different ways.
- **A living social feed** of voters, wonks, and trolls reacting in real time.
- **Escalating stakes:** later terms hit harder, and election night is a genuine nail-biter.
- **Run your own Cabinet:** six generated officials whose traits bend every outcome in their field — fire anyone, pick replacements from competing nominees, and pay the price for empty seats.
- **Executive Orders:** spend political capital on raw power — prime-time addresses, emergency stimulus, diplomatic tours, or quietly defusing the next scandal before it lands.
- **Pick your origin story:** play as the Reformer, the Tycoon, the General, or the Professor — each with a different stat tilt and perk.
- **Buttery-smooth UI** with animated meters, staggered reveals, and a one-tap career dashboard with an approval sparkline and full timeline.

## Run it locally

```bash
npm install
npm run dev      # play at http://localhost:5188
```

Build the static site (deployable to any host):

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

Validate the scenario content:

```bash
node scripts/validate-content.mjs
```

## Tech

- **React + TypeScript + Vite** — a single static bundle, no backend, no API costs (which is exactly why it can be free forever).
- **PWA** — installable and playable offline via a service worker + web manifest.
- Game state and your Hall of Fame persist in **localStorage**.
- Scenario content lives as plain JSON in [`src/game/content/packs/`](src/game/content/packs/) — easy to extend. Add events to a pack (or drop in a new one) and they flow into rotation automatically.

## Project layout

```
src/
  game/
    types.ts            # the type system
    engine.ts           # rules: effects, time, elections, legacy, achievements
    storage.ts          # save / load / Hall of Fame
    outlets.ts          # the four news outlets
    personas.ts         # starting archetypes
    achievements.ts     # unlockables
    content/
      seed.ts           # hand-authored launch scenarios
      packs/*.json      # the generated scenario library (8 categories)
      index.ts          # merges + validates everything into rotation
  components/           # HUD, decision card, results, election night, end screen, dashboard…
```

## Deploying the website

The build is fully static, so any host works (Netlify, Vercel, Cloudflare Pages, S3…). This repo also ships a **GitHub Pages** workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) — push to `main` and it builds and publishes automatically. Enable it under **Settings → Pages → Build and deployment → GitHub Actions**.

## A note

This is a **fictional, nonpartisan** political sim. Real places and institutions appear as backdrop, but every person, company, outlet, and incident is invented — any resemblance to actual events or persons is coincidental, and no political party is depicted or endorsed.

## License

MIT — see [LICENSE](LICENSE).
