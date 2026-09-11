import { gaUnit1 } from "./unit1";
import { gaUnit2 } from "./unit2";
import { gaSourceNotes } from "./sourceNotes";
import { gaExtendedUnits } from "./extendedUnits";
import { gaAdvancedUnits } from "./advancedUnits";

export const gaCourse = {
  id: "ga",
  language: "Ga",
  nativeName: "Ga",
  flag: "🇬🇭",
  accent: "#C95D3A",
  sourceNotes: gaSourceNotes,

  phases: [
    {
      id: "foundations",
      title: "Foundations",

      units: [
        gaUnit1,
        gaUnit2,
        ...gaExtendedUnits,
        ...gaAdvancedUnits
      ]
    }
  ]
};

export const gaUnits = [
  gaUnit1,
  gaUnit2
  ,...gaExtendedUnits,
  ...gaAdvancedUnits
];
