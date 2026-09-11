import { eweUnit1 } from "./unit1";
import { eweUnit2 } from "./unit2";
import { eweSourceNotes } from "./sourceNotes";
import { eweExtendedUnits } from "./extendedUnits";
import { eweAdvancedUnits } from "./advancedUnits";

export const eweCourse = {
  id: "ewe",
  language: "Ewe",
  nativeName: "Eʋegbe",
  flag: "🇬🇭",
  accent: "#24745B",
  sourceNotes: eweSourceNotes,
  phases: [{ id: "foundations", title: "Foundations", units: [eweUnit1, eweUnit2, ...eweExtendedUnits, ...eweAdvancedUnits] }]
};

export const eweUnits = [eweUnit1, eweUnit2, ...eweExtendedUnits, ...eweAdvancedUnits];
