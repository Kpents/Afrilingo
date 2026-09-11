import { zuluExploreLibrary } from "./zulu";
import { gaExploreLibrary } from "./ga";
import { twiExploreLibrary } from "./twi";
import { eweExploreLibrary } from "./ewe";
import { swahiliExploreLibrary } from "./swahili";
import { ndebeleExploreLibrary } from "./ndebele";
import { shonaExploreLibrary } from "./shona";
import { hausaExploreLibrary } from "./hausa";
import { igboExploreLibrary } from "./igbo";
import { bembaExploreLibrary } from "./bemba";
import { chichewaExploreLibrary } from "./chichewa";
import { exploreFromCourse } from "./fromCourse";
import { languages } from "../languages";

export const exploreLibraries = {
  zulu: zuluExploreLibrary,
  ga: gaExploreLibrary
  ,twi: twiExploreLibrary
  ,ewe: eweExploreLibrary
  ,swahili: swahiliExploreLibrary
  ,ndebele: ndebeleExploreLibrary
  ,shona: shonaExploreLibrary
  ,hausa: hausaExploreLibrary
  ,igbo: igboExploreLibrary
  ,bemba: bembaExploreLibrary
  ,chichewa: chichewaExploreLibrary
  ,yoruba: exploreFromCourse(languages.yoruba)
  ,kinyarwanda: exploreFromCourse(languages.kinyarwanda)
  ,kirundi: exploreFromCourse(languages.kirundi)
};
