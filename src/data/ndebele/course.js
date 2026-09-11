import { ndebeleUnit1 } from "./unit1";
import { ndebeleUnits2to28 } from "./units2to28";
import { ndebeleSourceNotes } from "./sourceNotes";
export const ndebeleUnits = [ndebeleUnit1, ...ndebeleUnits2to28];

export const ndebeleCourse = {
  id: "ndebele",
  language: "Ndebele",
  nativeName: "isiNdebele",
  flag: "🇿🇼",
  accent: "#C95D3A",
  sourceNotes: ndebeleSourceNotes,
  phases: [
    { id:"foundations", title:"Foundations", units:ndebeleUnits.slice(0,7) },
    { id:"everyday-ndebele", title:"Everyday isiNdebele", units:ndebeleUnits.slice(7,14) },
    { id:"independent-speaker", title:"Independent Speaker", units:ndebeleUnits.slice(14,21) },
    { id:"advanced-communication", title:"Advanced Communication", units:ndebeleUnits.slice(21,28) }
  ]
};
