import { igboUnit1 } from "./unit1";
import { igboUnits2to28 } from "./units2to28";
import { igboSourceNotes } from "./sourceNotes";
export const igboUnits=[igboUnit1,...igboUnits2to28];

export const igboCourse = {
  id: "igbo",
  language: "Igbo",
  nativeName: "Asụsụ Igbo",
  flag: "🇳🇬",
  accent: "#F28C28",
  sourceNotes: igboSourceNotes,
  phases:[{id:"foundations",title:"Foundations",units:igboUnits.slice(0,7)},{id:"everyday-igbo",title:"Everyday Igbo",units:igboUnits.slice(7,14)},{id:"independent-speaker",title:"Independent Speaker",units:igboUnits.slice(14,21)},{id:"advanced-communication",title:"Advanced Communication",units:igboUnits.slice(21,28)}]
};
