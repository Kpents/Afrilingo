import { yorubaUnit1 } from "./unit1";
import { yorubaUnit2 } from "./unit2";
import { yorubaSourceNotes } from "./sourceNotes";
import { yorubaExtendedUnits } from "./extendedUnits";

const allUnits = [yorubaUnit1, yorubaUnit2, ...yorubaExtendedUnits];

export const yorubaCourse = {
  id: "yoruba",
  language: "Yoruba",
  nativeName: "Yorùbá",
  flag: "🇳🇬",
  accent: "#4338CA",
  sourceNotes: yorubaSourceNotes,
  phases: [{ id: "foundations", title: "Foundations", units: allUnits.slice(0, 7) }, { id: "everyday", title: "Everyday Communication", units: allUnits.slice(7, 20) }, { id: "independence", title: "Independent Use", units: allUnits.slice(20) }]
};

export const yorubaUnits = allUnits;
