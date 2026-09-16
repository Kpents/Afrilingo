import { unit1 } from "./unit1";
import { unit2 } from "./unit2";
import { unit3 } from "./unit3";
import { unit4 } from "./unit4";
import { twiExtendedUnits } from "./extendedUnits";
import { twiSourceNotes } from "./sourceNotes";
import { twiAdvancedUnits } from "./advancedUnits";
import { deepenTwiCourse } from "./courseDepth";

const rawTwiUnits = [
  unit1,
  unit2,
  unit3,
  unit4,
  ...twiExtendedUnits,
  ...twiAdvancedUnits
];

export const twiUnits = deepenTwiCourse(rawTwiUnits);

export const twiCourse = {
  id: "twi",
  language: "Twi",
  nativeName: "Twi",
  flag: "🇬🇭",
  accent: "#F28C28",
  sourceNotes: twiSourceNotes,

  phases: [
    {
      id: "foundations",
      title: "Foundations",

      units: twiUnits
    }
  ]
};
