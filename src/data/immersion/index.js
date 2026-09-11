import { zuluImmersion } from "./zulu";
import { gaImmersion } from "./ga";
import { twiImmersion } from "./twi";
import { eweImmersion } from "./ewe";
import { swahiliImmersion } from "./swahili";
import { ndebeleImmersion } from "./ndebele";
import { shonaImmersion } from "./shona";
import { hausaImmersion } from "./hausa";
import { igboImmersion } from "./igbo";
import { bembaImmersion } from "./bemba";
import { chichewaImmersion } from "./chichewa";
import { immersionFromCourse } from "./fromCourse";
import { languages } from "../languages";

export const immersionLibraries = { zulu: zuluImmersion, ga: gaImmersion, twi: twiImmersion, ewe: eweImmersion, swahili: swahiliImmersion, ndebele: ndebeleImmersion, shona: shonaImmersion, hausa: hausaImmersion, igbo: igboImmersion, bemba: bembaImmersion, chichewa: chichewaImmersion, yoruba: immersionFromCourse(languages.yoruba), kinyarwanda: immersionFromCourse(languages.kinyarwanda), kirundi: immersionFromCourse(languages.kirundi) };
