import type { EventCategory } from "../../game/types";
import EconomyScene from "./EconomyScene";
import ForeignScene from "./ForeignScene";
import DomesticScene from "./DomesticScene";
import CrisisScene from "./CrisisScene";
import ScandalScene from "./ScandalScene";
import TechScene from "./TechScene";
import EnvironmentScene from "./EnvironmentScene";
import SecurityScene from "./SecurityScene";
import PersonalScene from "./PersonalScene";
import WildcardScene from "./WildcardScene";

// Every event category gets an illustrated night scene. Longgame events reuse
// their host category's art, so all 113 scenarios are covered by ten scenes.
const SCENES: Record<EventCategory, () => JSX.Element> = {
  economy: EconomyScene,
  foreign: ForeignScene,
  domestic: DomesticScene,
  crisis: CrisisScene,
  scandal: ScandalScene,
  tech: TechScene,
  environment: EnvironmentScene,
  security: SecurityScene,
  personal: PersonalScene,
  wildcard: WildcardScene,
};

export default function Scene({ category }: { category: EventCategory }) {
  const Comp = SCENES[category] ?? PersonalScene;
  return <Comp />;
}
