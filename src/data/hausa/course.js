import { hausaUnit1 } from "./unit1";
import { hausaUnit2 } from "./unit2";
import { hausaUnits3to28 } from "./units3to28";
import { hausaSourceNotes } from "./sourceNotes";
export const hausaUnits=[hausaUnit1,hausaUnit2,...hausaUnits3to28];

export const hausaCourse = {
  id: "hausa",
  language: "Hausa",
  nativeName: "Hausa",
  flag: "🇳🇬",
  accent: "#24745B",
  sourceNotes: hausaSourceNotes,
  phases:[{id:"foundations",title:"Foundations",units:hausaUnits.slice(0,7)},{id:"everyday-hausa",title:"Everyday Hausa",units:hausaUnits.slice(7,14)},{id:"independent-speaker",title:"Independent Speaker",units:hausaUnits.slice(14,21)},{id:"advanced-communication",title:"Advanced Communication",units:hausaUnits.slice(21,28)}]
};
