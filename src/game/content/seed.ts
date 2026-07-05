import type { GameEvent } from "../types";

// Hand-authored launch pack. The bulk of the scenario library lives in
// generated.ts; these establish the tone and guarantee a playable game.
export const SEED_EVENTS: GameEvent[] = [
  {
    id: "seed_inauguration",
    category: "personal",
    title: "The First Hundred Hours",
    source: "Chief of Staff",
    minDay: 0,
    weight: 3,
    briefing:
      "The inaugural stands are coming down on Pennsylvania Avenue and the Resolute Desk is yours. Your team needs a signal: what's the message of the opening act? You start at 53 percent approval — every camera on earth is watching.",
    choices: [
      {
        id: "ambition",
        label: "Go big — a sweeping reform agenda",
        detail: "Spend the honeymoon on bold promises.",
        effects: { approval: 6, stability: -4, capital: 1, legacy: 6 },
        result:
          "You roll out a 100-day blueprint touching taxes, chips, and childcare. The base is electrified; the opposition books every cable hit in Washington.",
        news: [
          { outlet: "tribune", headline: "A NEW DAWN: Boldest working-family agenda in a generation", tone: "positive" },
          { outlet: "beacon", headline: "White House unveils sweeping 100-day agenda; analysts question $2 trillion price tag", tone: "neutral" },
          { outlet: "ledger", headline: "Day-one overreach: markets brace for the bill", tone: "negative" },
          { outlet: "buzz", headline: "POTUS comes out SWINGING — Washington in CHAOS already", tone: "neutral" },
        ],
        social: [
          { handle: "@newdawn_dc", text: "FINALLY someone who means it 🙌", sentiment: "positive", clout: "44k" },
          { handle: "@fiscal_hawk", text: "and who exactly is paying for all this", sentiment: "negative" },
        ],
        advisor: "Bold. The honeymoon won't last past Easter — let's bank that approval before it cools.",
      },
      {
        id: "steady",
        label: "Project calm competence",
        detail: "Unity, stability, no sudden moves.",
        effects: { approval: 2, stability: 6, world: 3, legacy: 2 },
        result:
          "You strike a measured, unifying tone from the East Room. The Dow adds 400 points, allies from Ottawa to Berlin exhale — and the base wonders where the fireworks went.",
        news: [
          { outlet: "beacon", headline: "President opens with a steady hand, calls for unity", tone: "positive" },
          { outlet: "ledger", headline: "Futures rise on a reassuringly grown-up start", tone: "positive" },
          { outlet: "tribune", headline: "Where's the urgency? Supporters wanted a fighter", tone: "negative" },
          { outlet: "buzz", headline: "SNOOZE? POTUS plays it SAFE on day one", tone: "neutral" },
        ],
        social: [
          { handle: "@market_watch", text: "boring is good. futures up.", sentiment: "positive" },
          { handle: "@wheres_the_fight", text: "we didn't elect you to keep things the same", sentiment: "negative" },
        ],
        advisor: "Safe and solid. The grown-ups in the room approve. Don't let it read as timid.",
      },
    ],
  },

  {
    id: "seed_econ_stimulus",
    category: "economy",
    title: "The Jobs Report Craters",
    source: "Treasury Secretary",
    briefing:
      "The economy added just 18,000 jobs last month and the S&P shed 3 percent by lunch. Treasury wants a $1.1 trillion jobs package on your desk by Friday. The deficit hawks are already circling.",
    choices: [
      {
        id: "spend",
        label: "Sign the full stimulus",
        effects: { economy: 9, approval: 4, stability: -3, legacy: 3 },
        result:
          "Money pours into bridges in Pittsburgh and battery plants outside Reno. Payrolls jump 210,000 within the quarter — but the debt clock spins faster.",
        news: [
          { outlet: "tribune", headline: "President delivers: $1.1 trillion for workers becomes law", tone: "positive" },
          { outlet: "beacon", headline: "Stimulus passes; economists split on long-term cost", tone: "neutral" },
          { outlet: "ledger", headline: "Trillion-dollar spending spree mortgages the future", tone: "negative" },
          { outlet: "buzz", headline: "POTUS opens the MONEY FAUCET 🚰💸", tone: "neutral" },
        ],
        social: [
          { handle: "@ohiosteeldad", text: "my plant in Youngstown is hiring again. thank you.", sentiment: "positive", clout: "12k" },
          { handle: "@deficit_doom", text: "your grandkids will pay for this", sentiment: "negative" },
        ],
        advisor: "The economy needed the jolt. Be ready when Fed Chair Diane Okafor starts talking rate hikes.",
      },
      {
        id: "targeted",
        label: "Trim it to a lean, targeted bill",
        cost: 1,
        effects: { economy: 4, stability: 4, approval: 1 },
        result:
          "You negotiate a $400 billion surgical package aimed at chips and childcare. Both sides grumble but sign. Growth is modest; fiscal credibility intact.",
        news: [
          { outlet: "beacon", headline: "Pared-down $400 billion stimulus clears Congress in rare bipartisan vote", tone: "positive" },
          { outlet: "ledger", headline: "Restraint, at last — a responsible compromise", tone: "positive" },
          { outlet: "tribune", headline: "Half-measure leaves millions still struggling", tone: "negative" },
          { outlet: "buzz", headline: "POTUS plays MONEYBALL with the economy", tone: "neutral" },
        ],
        social: [
          { handle: "@small_biz_sam", text: "finally a bill that doesn't blow up the deficit", sentiment: "positive" },
          { handle: "@laidoff_in_toledo", text: "targeted means it's not targeting ME", sentiment: "negative" },
        ],
        advisor: "Fiscally tidy. The dealmaker framing plays well in the suburbs.",
      },
      {
        id: "austere",
        label: "Reject it — let the market correct",
        bold: true,
        effects: { economy: -6, approval: -7, stability: 3, legacy: -2 },
        result:
          "You hold the line on spending. The deficit steadies; unemployment sticks at 6.2 percent. The pain is real and it's got your name on it.",
        news: [
          { outlet: "ledger", headline: "A president with spine: no blank checks", tone: "positive" },
          { outlet: "beacon", headline: "President rejects stimulus; recession fears mount", tone: "negative" },
          { outlet: "tribune", headline: "OUT OF TOUCH: POTUS turns back on the unemployed", tone: "negative" },
          { outlet: "buzz", headline: "POTUS to struggling Americans: TOUGH LUCK?!", tone: "negative" },
        ],
        social: [
          { handle: "@austrian_andy", text: "let the market clear. respect.", sentiment: "positive" },
          { handle: "@single_mom_3", text: "i needed that help. you said no.", sentiment: "negative", clout: "88k" },
        ],
        advisor: "Principled — and politically expensive. Pray the recovery beats the midterms.",
      },
    ],
  },

  {
    id: "seed_foreign_ally",
    category: "foreign",
    title: "Estonia Asks for Missiles",
    source: "Secretary of State",
    briefing:
      "Estonia is quietly requesting long-range missile systems as Russian armor masses outside Narva. Send them, and you provoke Moscow. Refuse, and every ally from Warsaw to Tokyo watches you blink.",
    choices: [
      {
        id: "arm",
        label: "Approve the arms package",
        effects: { world: 6, stability: -2, approval: 2, legacy: 4 },
        result:
          "The shipment goes through. Tallinn is grateful and emboldened; the Kremlin summons your ambassador and moves two divisions closer to the border.",
        news: [
          { outlet: "ledger", headline: "Peace through strength: America arms the Baltic front", tone: "positive" },
          { outlet: "beacon", headline: "Missile package for Estonia approved; Moscow vows response", tone: "neutral" },
          { outlet: "tribune", headline: "Are we sliding toward another forever war?", tone: "negative" },
          { outlet: "buzz", headline: "POTUS pokes the BEAR 🐻 — what could go wrong?!", tone: "neutral" },
        ],
        social: [
          { handle: "@natsec_nerd", text: "deterrence works when it's credible. good call.", sentiment: "positive" },
          { handle: "@peace_now", text: "weapons never de-escalate anything", sentiment: "negative" },
        ],
        advisor: "NATO will trust you more after this. Keep a back-channel open to Moscow.",
      },
      {
        id: "diplomacy",
        label: "Push a diplomatic off-ramp instead",
        cost: 2,
        effects: { world: 3, stability: 3, approval: 1, legacy: 2 },
        result:
          "You convene emergency talks in Geneva and broker a fragile pullback-for-now. No one's thrilled, but no one's shooting either.",
        news: [
          { outlet: "beacon", headline: "President brokers tense de-escalation talks in Geneva", tone: "positive" },
          { outlet: "tribune", headline: "Diplomacy first: a welcome change of pace", tone: "positive" },
          { outlet: "ledger", headline: "Weakness dressed as wisdom, hawks charge", tone: "negative" },
          { outlet: "buzz", headline: "POTUS talks it out — will the bad guys LISTEN?", tone: "neutral" },
        ],
        social: [
          { handle: "@diplo_dana", text: "jaw-jaw beats war-war. every time.", sentiment: "positive" },
          { handle: "@hawk_harry", text: "our enemies are laughing at this", sentiment: "negative" },
        ],
        advisor: "A win for the patient approach. Fragile, though — one border incident could undo it.",
      },
    ],
  },

  {
    id: "seed_crisis_hurricane",
    category: "crisis",
    title: "Category 5 Hits Biloxi",
    source: "FEMA Director",
    weight: 2,
    briefing:
      "Hurricane Odette has flattened the Mississippi coast from Biloxi to Pascagoula. Power is out for 1.8 million people, the death toll passed 40 overnight, and Gov. Dale Prewitt — from the opposing party — is begging for federal help on live TV.",
    choices: [
      {
        id: "allhands",
        label: "Mobilize everything, fly there tonight",
        effects: { approval: 8, economy: -3, world: 1, legacy: 5 },
        result:
          "You declare a major disaster, surge FEMA and the National Guard, and land in Gulfport by morning in shirtsleeves. The images define your presidency for a week.",
        news: [
          { outlet: "beacon", headline: "President leads massive relief effort, visits shattered Mississippi coast", tone: "positive" },
          { outlet: "tribune", headline: "Leadership in the storm: this is the job", tone: "positive" },
          { outlet: "ledger", headline: "Strong federal response, even rivals concede", tone: "positive" },
          { outlet: "buzz", headline: "POTUS WADES into the floodwaters — HERO or PHOTO-OP?", tone: "neutral" },
        ],
        social: [
          { handle: "@biloxi_born", text: "the trucks actually came. i'm crying.", sentiment: "positive", clout: "210k" },
          { handle: "@waste_watch", text: "watch the relief money 'disappear' now", sentiment: "negative" },
        ],
        advisor: "Textbook. Crisis leadership is the fastest way to win the middle. Stay until it's handled.",
        unlock: undefined,
      },
      {
        id: "measured",
        label: "Coordinate from D.C., delegate the optics",
        effects: { approval: -2, economy: -1, stability: 2 },
        result:
          "You run a tight operation from the Situation Room and let FEMA do its job. It's efficient. It's also invisible, and Gov. Prewitt notes the absence loudly.",
        news: [
          { outlet: "ledger", headline: "President manages crisis without the grandstanding", tone: "positive" },
          { outlet: "beacon", headline: "Relief underway; some ask why president stayed in Washington", tone: "neutral" },
          { outlet: "tribune", headline: "Where is the president while Mississippi drowns?", tone: "negative" },
          { outlet: "buzz", headline: "POTUS GHOSTS the disaster zone?!", tone: "negative" },
        ],
        social: [
          { handle: "@ops_efficiency", text: "presidents shouldn't get in responders' way. correct call.", sentiment: "positive" },
          { handle: "@gulfport_gina", text: "would've been nice to see you care", sentiment: "negative" },
        ],
        advisor: "Operationally sound, optically rough. In a crisis, showing up IS the policy.",
      },
    ],
  },

  {
    id: "seed_scandal_leak",
    category: "scandal",
    title: "The Meridian Contract Leaks",
    source: "White House Counsel",
    minDay: 120,
    weight: 2,
    briefing:
      "Leaked memos show your Energy Secretary, Carl Duquesne, steered a $340 million grid contract to a college friend's firm, Meridian Dynamics. It's not you — but it's your administration, and the press smells blood.",
    choices: [
      {
        id: "transparent",
        label: "Get ahead of it — full transparency",
        detail: "Release everything, fire if needed.",
        effects: { approval: 3, stability: -2, world: 1, legacy: 3 },
        result:
          "You release the memos, accept Duquesne's resignation, and order an independent review. The story burns hot for 48 hours, then starves.",
        news: [
          { outlet: "beacon", headline: "President releases documents, accepts Energy Secretary's resignation", tone: "positive" },
          { outlet: "tribune", headline: "Accountability in action — a refreshing standard", tone: "positive" },
          { outlet: "ledger", headline: "Swift housecleaning blunts the scandal", tone: "neutral" },
          { outlet: "buzz", headline: "POTUS throws Duquesne UNDER THE BUS — savage!", tone: "neutral" },
        ],
        social: [
          { handle: "@ethics_first", text: "this is how you handle it. no cover-up.", sentiment: "positive" },
          { handle: "@cynical_cyn", text: "one resignation = problem solved, sure", sentiment: "negative" },
        ],
        advisor: "Painful but clean. Sunlight starves a scandal. We weathered it.",
        setFlags: ["weathered_scandal"],
      },
      {
        id: "stonewall",
        label: "Deny, downplay, and stonewall",
        bold: true,
        effects: { approval: -8, stability: -4, legacy: -5 },
        result:
          "You call it a partisan witch hunt and refuse comment. The leaks keep coming — travel logs, a second contract. The story metastasizes into a weeks-long siege.",
        news: [
          { outlet: "tribune", headline: "COVER-UP? White House stonewalls as questions mount", tone: "negative" },
          { outlet: "beacon", headline: "President declines to address Meridian allegations; pressure builds", tone: "negative" },
          { outlet: "ledger", headline: "Stonewalling is never a strategy, allies warn", tone: "negative" },
          { outlet: "buzz", headline: "WHAT ARE THEY HIDING?! POTUS goes SILENT 🤐", tone: "negative" },
        ],
        social: [
          { handle: "@subpoena_szn", text: "the cover-up is always worse than the crime", sentiment: "negative", clout: "390k" },
          { handle: "@base_loyalist", text: "it's a hit job, don't give them an inch", sentiment: "positive" },
        ],
        advisor: "This is bleeding. Every day we don't answer, the story writes itself — badly.",
      },
    ],
  },

  {
    id: "seed_tech_ai",
    category: "tech",
    title: "The AI Reckoning",
    source: "Science Advisor",
    minDay: 90,
    briefing:
      "Cortica Labs' new Atlas-9 model is automating white-collar work overnight — 400,000 claims and call-center jobs gone in a quarter. Labor wants a freeze; the tech sector says regulation hands the decade to Beijing. Everyone wants an answer today.",
    choices: [
      {
        id: "regulate",
        label: "Impose guardrails and a retraining fund",
        effects: { stability: 5, approval: 4, economy: -2, legacy: 4 },
        result:
          "You sign sweeping AI safety rules and a $60 billion worker-transition fund. Unions cheer; Silicon Valley threatens to decamp to Singapore.",
        news: [
          { outlet: "tribune", headline: "President puts people over algorithms with landmark AI law", tone: "positive" },
          { outlet: "beacon", headline: "First major AI regulation signed; industry pushes back", tone: "neutral" },
          { outlet: "ledger", headline: "Heavy-handed rules risk ceding the AI race to Beijing", tone: "negative" },
          { outlet: "buzz", headline: "POTUS vs the ROBOTS 🤖 — who wins?!", tone: "neutral" },
        ],
        social: [
          { handle: "@laid_off_dev", text: "the retraining fund just saved my family", sentiment: "positive" },
          { handle: "@vc_visionary", text: "innovation just booked a one-way flight to Singapore", sentiment: "negative" },
        ],
        advisor: "Protective and popular. Watch the brain-drain talk — it could spook investment.",
      },
      {
        id: "accelerate",
        label: "Go all-in to win the AI race",
        effects: { economy: 8, world: 4, stability: -5, approval: -2, legacy: 3 },
        result:
          "You pour $80 billion into compute and slash red tape. Investment floods in and the Nasdaq soars — as a wave of layoffs rolls from Columbus to Wichita.",
        news: [
          { outlet: "ledger", headline: "President bets the future on AI dominance", tone: "positive" },
          { outlet: "beacon", headline: "Pro-AI push fuels markets and anxiety in equal measure", tone: "neutral" },
          { outlet: "tribune", headline: "Workers sacrificed on the altar of the algorithm", tone: "negative" },
          { outlet: "buzz", headline: "POTUS goes FULL TERMINATOR on the economy", tone: "neutral" },
        ],
        social: [
          { handle: "@quant_queen", text: "we're going to win this decade. all in.", sentiment: "positive", clout: "1.1M" },
          { handle: "@rust_belt_ray", text: "the future doesn't have a job for me in it", sentiment: "negative" },
        ],
        advisor: "Huge upside, real human cost. The displaced workers vote too — don't forget them.",
      },
    ],
  },

  {
    id: "seed_security_threat",
    category: "security",
    title: "Credible Threat to the Homeland",
    source: "DNI",
    minDay: 60,
    weight: 2,
    briefing:
      "Intelligence flags a credible plot against Chicago's transit system, run from a compound outside Tripoli. You can authorize a risky covert strike on the planner — or roll up the network with Interpol and the courts. The clock is short.",
    choices: [
      {
        id: "strike",
        label: "Authorize the covert strike",
        bold: true,
        cost: 2,
        effects: { stability: 5, world: -3, approval: 4, legacy: 2 },
        result:
          "The operation succeeds; the planner is dead and the plot collapses. You address the nation. Civil-liberties groups and two NATO allies want to know exactly what you authorized.",
        news: [
          { outlet: "ledger", headline: "Decisive: President orders strike, eliminates threat", tone: "positive" },
          { outlet: "beacon", headline: "Covert strike in Libya neutralizes plot; legality debated", tone: "neutral" },
          { outlet: "tribune", headline: "Another strike in the shadows — where's the oversight?", tone: "negative" },
          { outlet: "buzz", headline: "POTUS goes FULL ACTION MOVIE — caught the bad guy!", tone: "positive" },
        ],
        social: [
          { handle: "@vet_voice", text: "kept us safe. that's the job.", sentiment: "positive", clout: "76k" },
          { handle: "@civ_liberty", text: "due process died in the dark again", sentiment: "negative" },
        ],
        advisor: "Threat's gone and you look strong. Keep the oversight committees in the loop — quietly.",
      },
      {
        id: "lawful",
        label: "Work it through allies and the courts",
        effects: { world: 4, stability: 2, approval: -2 },
        result:
          "A coordinated sweep with Interpol and Italian intelligence rolls up the cell over six days. Slower, cleaner, easier to defend — if nothing slips through the cracks first.",
        news: [
          { outlet: "tribune", headline: "By the book: President opts for lawful counterterror op", tone: "positive" },
          { outlet: "beacon", headline: "Multinational operation disrupts Tripoli plot through proper channels", tone: "positive" },
          { outlet: "ledger", headline: "Dithering with lives at stake, hawks charge", tone: "negative" },
          { outlet: "buzz", headline: "POTUS LAWYERS UP instead of taking the shot?!", tone: "neutral" },
        ],
        social: [
          { handle: "@rule_of_law", text: "this is how a democracy does it", sentiment: "positive" },
          { handle: "@impatient_ed", text: "hope the 'process' is faster than the threat", sentiment: "negative" },
        ],
        advisor: "Defensible and allied-friendly. The risk is time — pray nothing goes loud before it's done.",
      },
    ],
  },

  {
    id: "seed_env_pipeline",
    category: "environment",
    title: "The Cimarron Pipeline Decision",
    source: "Interior Secretary",
    briefing:
      "The 1,100-mile Cimarron Ridge pipeline — Bakken crude to Gulf refineries — awaits your signature. It promises 28,000 jobs and cheaper gas, over the objections of tribal nations, Nebraska farmers, and climate scientists camped at the Missouri River crossing.",
    choices: [
      {
        id: "approve",
        label: "Approve it — jobs and cheap energy",
        effects: { economy: 7, approval: 2, world: -3, stability: -2 },
        result:
          "Construction begins within weeks. Gas eases toward $2.90 and hard-hats cheer; the river camps swell and the lawsuits pile up in Omaha.",
        news: [
          { outlet: "ledger", headline: "Energy independence advances as president greenlights Cimarron Ridge", tone: "positive" },
          { outlet: "beacon", headline: "Pipeline approved; legal and environmental fights loom", tone: "neutral" },
          { outlet: "tribune", headline: "Betrayal: president sides with oil over the planet", tone: "negative" },
          { outlet: "buzz", headline: "POTUS turns on the TAPS 🛢️ — greens FURIOUS", tone: "neutral" },
        ],
        social: [
          { handle: "@pipefitter_pat", text: "good union jobs for 10 years. thank you.", sentiment: "positive" },
          { handle: "@earth_guardian", text: "you just sold our future for a quarterly report", sentiment: "negative", clout: "520k" },
        ],
        advisor: "Pocketbook win, base-eroding loss. Cheap gas is the most persuasive thing in politics.",
      },
      {
        id: "reject",
        label: "Kill it — invest in clean energy instead",
        effects: { world: 6, stability: 3, economy: -4, approval: -1, legacy: 4 },
        result:
          "You kill the permit and redirect $12 billion to Plains wind and solar. The camps go home celebrating — as pump prices tick up and the building trades feel abandoned.",
        news: [
          { outlet: "tribune", headline: "Historic: president halts Cimarron Ridge, pivots to clean energy", tone: "positive" },
          { outlet: "beacon", headline: "Pipeline rejected; energy costs and job losses in focus", tone: "neutral" },
          { outlet: "ledger", headline: "Ideology over jobs: president kills 28,000 paychecks", tone: "negative" },
          { outlet: "buzz", headline: "POTUS pulls the PLUG on the pipeline — gas to SPIKE?!", tone: "neutral" },
        ],
        social: [
          { handle: "@climate_kid", text: "a president who can do math on the climate. finally.", sentiment: "positive" },
          { handle: "@trucker_tom", text: "tell my diesel bill about your green dream", sentiment: "negative" },
        ],
        advisor: "Legacy-building and globally popular. Brace for the price-at-the-pump attack ads.",
      },
    ],
  },

  {
    id: "seed_domestic_healthcare",
    category: "domestic",
    title: "The Healthcare Showdown",
    source: "Domestic Policy Council",
    minDay: 150,
    briefing:
      "Your signature healthcare bill is one vote short in the Senate. Sen. Ruth Calloway of Montana will flip — for a $2.1 billion hospital earmark in Billings. Take the deal, or hold the line on principle?",
    choices: [
      {
        id: "deal",
        label: "Cut the deal, pass the bill",
        cost: 1,
        effects: { approval: 6, stability: 2, economy: -2, legacy: 5 },
        result:
          "The Billings earmark seals Calloway's vote and your bill becomes law. Twelve million gain coverage. The opposition gleefully reads the pork line-item aloud on cable.",
        news: [
          { outlet: "tribune", headline: "Landmark healthcare law expands coverage to 12 million", tone: "positive" },
          { outlet: "beacon", headline: "Healthcare bill passes after last-minute deal with Calloway", tone: "neutral" },
          { outlet: "ledger", headline: "Bought with pork: the price of the president's bill", tone: "negative" },
          { outlet: "buzz", headline: "POTUS WHEELS AND DEALS to ram bill through!", tone: "neutral" },
        ],
        social: [
          { handle: "@nurse_nadia", text: "my patients can finally afford their meds", sentiment: "positive", clout: "61k" },
          { handle: "@watchdog_w", text: "another earmark, another 'historic' bill", sentiment: "negative" },
        ],
        advisor: "Results trump purity. The earmark sting fades; the coverage numbers don't.",
      },
      {
        id: "principle",
        label: "Refuse — no backroom earmarks",
        bold: true,
        effects: { approval: -4, stability: 1, legacy: 1 },
        result:
          "You won't trade pork for the vote. The bill dies one short on the Senate floor. You keep your hands clean and your signature achievement on the shelf.",
        news: [
          { outlet: "ledger", headline: "President refuses to deal; clean hands, dead bill", tone: "neutral" },
          { outlet: "beacon", headline: "Healthcare push collapses one vote short in Senate", tone: "negative" },
          { outlet: "tribune", headline: "So close — purity costs millions their coverage", tone: "negative" },
          { outlet: "buzz", headline: "POTUS lets the bill DIE over PRINCIPLE?!", tone: "negative" },
        ],
        social: [
          { handle: "@clean_gov", text: "respect for not playing the earmark game", sentiment: "positive" },
          { handle: "@uninsured_u", text: "your principles don't cover my insulin", sentiment: "negative", clout: "140k" },
        ],
        advisor: "Noble. But in this town, a dead bill is a dead bill — nobody remembers the moral stand.",
      },
    ],
  },

  {
    id: "seed_wildcard_ufo",
    category: "wildcard",
    title: "Something's in the Sky",
    source: "Pentagon Liaison",
    minDay: 200,
    weight: 1,
    briefing:
      "The Pentagon confirms an unidentified craft has hovered at 60,000 feet over the Potomac for six hours, ignoring every signal. The footage leaked an hour ago. The world is waiting for you to say something.",
    choices: [
      {
        id: "calm",
        label: "Address the nation calmly, urge patience",
        effects: { stability: 4, approval: 3, world: 2, legacy: 4 },
        result:
          "You go on air from the Oval, steady and serious, promising transparency and no panic. The craft drifts off by dawn. Your composure becomes the story.",
        news: [
          { outlet: "beacon", headline: "President urges calm amid unexplained object over Washington", tone: "positive" },
          { outlet: "tribune", headline: "A steady hand in a surreal moment", tone: "positive" },
          { outlet: "ledger", headline: "President strikes right tone on mystery craft", tone: "positive" },
          { outlet: "buzz", headline: "ALIENS?! And POTUS stays COOL AS ICE 🛸", tone: "neutral" },
        ],
        social: [
          { handle: "@skywatcher", text: "presidential, genuinely. didn't panic us.", sentiment: "positive" },
          { handle: "@truth_seeker99", text: "calm = they're HIDING something", sentiment: "negative", clout: "303k" },
        ],
        advisor: "However weird this gets, calm is always the right altitude. Well played.",
      },
      {
        id: "scramble",
        label: "Scramble jets, project total strength",
        bold: true,
        effects: { stability: -3, world: -2, approval: 2 },
        result:
          "Fighters off Joint Base Andrews streak across the capital on live TV. The craft vanishes — but so does the calm. NATO allies want to know why you nearly started a shooting war with the unknown.",
        news: [
          { outlet: "ledger", headline: "President answers mystery with force, jets scrambled from Andrews", tone: "neutral" },
          { outlet: "beacon", headline: "Military response to aerial object rattles Washington", tone: "neutral" },
          { outlet: "tribune", headline: "Shoot first? President's instinct alarms allies", tone: "negative" },
          { outlet: "buzz", headline: "POTUS goes TOP GUN on the UFO 🛩️🛸!!!", tone: "neutral" },
        ],
        social: [
          { handle: "@flag_n_eagle", text: "don't tread on US, even from space 🇺🇸", sentiment: "positive" },
          { handle: "@de_escalate", text: "we nearly shot at something we don't understand", sentiment: "negative" },
        ],
        advisor: "Strong look, reckless substance. Force against the unknown is a coin flip we didn't need.",
      },
    ],
  },

  // ── Evergreen fillers (can recur so the game never stalls) ───────────────
  {
    id: "seed_filler_presser",
    category: "personal",
    title: "The Press Wants a Word",
    source: "Press Secretary",
    once: false,
    weight: 1,
    briefing:
      "It's been a quiet stretch, and the Brady Briefing Room is getting restless. The press corps wants a sit-down. How do you spend the spotlight?",
    choices: [
      {
        id: "tout",
        label: "Tout your record with confidence",
        effects: { approval: 3, capital: 1 },
        result:
          "You command the room for 50 minutes, rattle off wins, and dodge the curveballs with a grin. The clips play well on the evening news.",
        news: [
          { outlet: "beacon", headline: "President holds confident press conference, touts agenda", tone: "neutral" },
          { outlet: "buzz", headline: "POTUS works the room like a PRO 🎤", tone: "positive" },
        ],
        social: [{ handle: "@msg_discipline", text: "on message, on offense. good day.", sentiment: "positive" }],
        advisor: "Clean presser. We bank a little goodwill and momentum.",
      },
      {
        id: "candid",
        label: "Get unusually candid about the hard parts",
        effects: { approval: 1, stability: 2, legacy: 2 },
        result:
          "You level with the country about what's hard and what's unfinished. Pundits call it refreshing; rivals clip it for attack ads.",
        news: [
          { outlet: "tribune", headline: "A rare moment of candor from the podium", tone: "positive" },
          { outlet: "ledger", headline: "President admits struggles — weakness or honesty?", tone: "neutral" },
        ],
        social: [{ handle: "@real_talk_r", text: "an honest politician? pinch me.", sentiment: "positive" }],
        advisor: "Authentic and a touch risky. The honesty builds long-term trust.",
      },
    ],
  },

  {
    id: "seed_filler_summit",
    category: "foreign",
    title: "A Handshake at the UN",
    source: "Protocol Office",
    once: false,
    weight: 1,
    minDay: 100,
    briefing:
      "You're in New York for UN General Assembly week. Venezuela's President Rafael Osorio extends a hand for the cameras. The whole world is watching the body language.",
    choices: [
      {
        id: "shake",
        label: "Shake hands, keep diplomacy open",
        effects: { world: 4, approval: -1 },
        result:
          "You shake firmly and say little. Channels to Caracas stay open; critics back home circulate the photo within minutes.",
        news: [
          { outlet: "beacon", headline: "President shakes hands with Venezuela's Osorio at UN", tone: "neutral" },
          { outlet: "ledger", headline: "Pragmatic diplomacy or naive handshake?", tone: "neutral" },
        ],
        social: [{ handle: "@realpolitik", text: "you talk to adversaries. that's diplomacy.", sentiment: "positive" }],
        advisor: "Diplomatically sound. The photo will sting for a news cycle, no more.",
      },
      {
        id: "snub",
        label: "Decline the handshake on principle",
        effects: { world: -3, approval: 4, stability: 1 },
        result:
          "You offer a curt nod and move on. The base roars approval; Caracas issues an icy statement by nightfall.",
        news: [
          { outlet: "tribune", headline: "President refuses to legitimize Caracas strongman", tone: "positive" },
          { outlet: "buzz", headline: "ICE COLD: POTUS leaves Osorio HANGING 🥶", tone: "positive" },
        ],
        social: [{ handle: "@values_voter", text: "some hands you don't shake. proud today.", sentiment: "positive" }],
        advisor: "Crowd-pleaser at home, friction abroad. Diplomacy just got a little harder.",
      },
    ],
  },
];
