import type { GameEvent } from "../types";

// Auto-generated scenario packs, one JSON file per category. The runtime
// validator in index.ts skips any malformed entry, so partial/odd packs are safe.
import economy from "./packs/economy.json";
import foreign from "./packs/foreign.json";
import domestic from "./packs/domestic.json";
import crisis from "./packs/crisis.json";
import scandal from "./packs/scandal.json";
import tech from "./packs/tech.json";
import environment from "./packs/environment.json";
import security from "./packs/security.json";
import personal from "./packs/personal.json";
import wildcard from "./packs/wildcard.json";
import longgame from "./packs/longgame.json";

export const GENERATED_EVENTS = [
  ...economy,
  ...foreign,
  ...domestic,
  ...crisis,
  ...scandal,
  ...tech,
  ...environment,
  ...security,
  ...personal,
  ...wildcard,
  ...longgame,
] as unknown as GameEvent[];
