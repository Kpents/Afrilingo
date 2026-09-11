import { shonaUnit1 } from "./unit1";
import { shonaUnits2to28 } from "./units2to28";
import { shonaSourceNotes } from "./sourceNotes";
export const shonaUnits=[shonaUnit1,...shonaUnits2to28];

export const shonaCourse = {
  id: "shona",
  language: "Shona",
  nativeName: "chiShona",
  flag: "🇿🇼",
  accent: "#F6C445",
  sourceNotes: shonaSourceNotes,
  phases:[{id:"foundations",title:"Foundations",units:shonaUnits.slice(0,7)},{id:"everyday-shona",title:"Everyday chiShona",units:shonaUnits.slice(7,14)},{id:"independent-speaker",title:"Independent Speaker",units:shonaUnits.slice(14,21)},{id:"advanced-communication",title:"Advanced Communication",units:shonaUnits.slice(21,28)}]
};
