import { swahiliUnit1 } from "./unit1";
import { swahiliUnit2 } from "./unit2";
import { swahiliUnits3to20 } from "./extendedUnits";
import { swahiliAdvancedUnits } from "./advancedUnits";
import { swahiliSourceNotes } from "./sourceNotes";

export const swahiliUnits = [swahiliUnit1, swahiliUnit2, ...swahiliUnits3to20, ...swahiliAdvancedUnits];

export const swahiliCourse = {
  id: "swahili",
  language: "Swahili",
  nativeName: "Kiswahili",
  flag: "🇰🇪",
  accent: "#C95D3A",
  sourceNotes: swahiliSourceNotes,
  phases: [
    { id: "foundations", title: "Foundations", units: swahiliUnits.slice(0, 7) },
    { id: "everyday-swahili", title: "Everyday Swahili", units: swahiliUnits.slice(7, 14) },
    { id: "independent-speaker", title: "Independent Speaker", units: swahiliUnits.slice(14, 21) },
    { id: "advanced-communication", title: "Advanced Communication", units: swahiliUnits.slice(21, 28) }
  ]
};
