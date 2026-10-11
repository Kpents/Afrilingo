import { gaUnit1 } from "./unit1";
import { gaUnit2 } from "./unit2";
import { gaSourceNotes } from "./sourceNotes";
import { gaExtendedUnits } from "./extendedUnits";
import { gaAdvancedUnits } from "./advancedUnits";
import { deepenCourse } from "../twi/courseDepth";
import { polishGaCultureCards } from "./cultureCards";
import { alignGaCourseToGuide, gaGuideCoverage } from "./guideAlignment";

const rawGaUnits = [
  gaUnit1,
  gaUnit2,
  ...gaExtendedUnits,
  ...gaAdvancedUnits
];

export const gaUnits = alignGaCourseToGuide(polishGaCultureCards(deepenCourse(rawGaUnits, "Ga")));

export const gaCourse = {
  id: "ga",
  language: "Ga",
  nativeName: "Ga",
  flag: "🇬🇭",
  accent: "#C95D3A",
  sourceNotes: gaSourceNotes,
  guideCoverage: gaGuideCoverage,

  phases: [
    {
      id: "foundations",
      title: "Foundations",
      outcome: "Greet people, introduce yourself, count, and manage essential everyday exchanges.",
      units: gaUnits.slice(0, 9)
    },
    {
      id: "everyday-life",
      title: "Everyday Life",
      outcome: "Navigate time, markets, school, travel, health, and practical life in Ga.",
      units: gaUnits.slice(9, 20)
    },
    {
      id: "communication-culture",
      title: "Communication & Culture",
      outcome: "Sustain connected conversations and apply Ga across realistic cultural contexts.",
      units: gaUnits.slice(20)
    }
  ]
};
