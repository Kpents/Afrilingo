import {
  twiCourse,
  twiUnits
} from "./twi/course";

import {
  gaCourse,
  gaUnits
} from "./ga/course";
import { prepareCourse, validateCourse } from "../utils/courseValidation";
import { eweCourse, eweUnits } from "./ewe/course";
import { swahiliCourse, swahiliUnits } from "./swahili/course";
import { yorubaCourse, yorubaUnits } from "./yoruba/course";
import { hausaCourse, hausaUnits } from "./hausa/course";
import { igboCourse, igboUnits } from "./igbo/course";
import { shonaCourse, shonaUnits } from "./shona/course";
import { ndebeleCourse, ndebeleUnits } from "./ndebele/course";
import { zuluCourse, zuluUnits } from "./zulu/course";
import { bembaCourse, bembaUnits } from "./bemba/course";
import { chichewaCourse, chichewaUnits } from "./chichewa/course";
import { kinyarwandaCourse, kinyarwandaUnits } from "./kinyarwanda/course";
import { kirundiCourse, kirundiUnits } from "./kirundi/course";
import { withMasterCurriculum } from "../utils/curriculumMigration";

const prepareLanguage = (id, course, units, region) =>
  withMasterCurriculum(prepareCourse(course, units, region), id);

export const languages = {
  twi: prepareLanguage("twi", twiCourse, twiUnits, "Ghana · Akan regions"),
  ga: prepareLanguage("ga", gaCourse, gaUnits, "Ghana · Greater Accra"),
  ewe: prepareLanguage("ewe", eweCourse, eweUnits, "Ghana · Volta Region and southern Togo"),
  swahili: prepareLanguage("swahili", swahiliCourse, swahiliUnits, "East Africa · Kenya, Tanzania and the Swahili coast"),
  yoruba: prepareLanguage("yoruba", yorubaCourse, yorubaUnits, "West Africa · Southwestern Nigeria and neighboring regions"),
  hausa: prepareLanguage("hausa", hausaCourse, hausaUnits, "West Africa · Northern Nigeria, Niger and neighboring regions"),
  igbo: prepareLanguage("igbo", igboCourse, igboUnits, "West Africa · Southeastern Nigeria and neighboring communities"),
  shona: prepareLanguage("shona", shonaCourse, shonaUnits, "Southern Africa · Zimbabwe and neighboring communities"),
  ndebele: prepareLanguage("ndebele", ndebeleCourse, ndebeleUnits, "Southern Africa · Zimbabwean Matabeleland and neighboring communities"),
  zulu: prepareLanguage("zulu", zuluCourse, zuluUnits, "Southern Africa · South Africa, especially KwaZulu-Natal"),
  bemba: prepareLanguage("bemba", bembaCourse, bembaUnits, "Southern Africa · Zambia and neighboring communities"),
  chichewa: prepareLanguage("chichewa", chichewaCourse, chichewaUnits, "Southern Africa · Malawi and neighboring communities"),
  kinyarwanda: prepareLanguage("kinyarwanda", kinyarwandaCourse, kinyarwandaUnits, "East Africa · Rwanda and neighboring communities"),
  kirundi: prepareLanguage("kirundi", kirundiCourse, kirundiUnits, "East Africa · Burundi and neighboring communities")
};

export const courseValidationErrors = Object.values(languages).flatMap(course =>
  validateCourse(course).map(error => `${course.language}: ${error}`)
);

if (import.meta.env?.DEV && courseValidationErrors.length) {
  console.error("AfriLingo course validation failed:\n" + courseValidationErrors.join("\n"));
}

export const languageList = [
  { ...languages.twi, available: true },
  { ...languages.ga, available: true },
  { ...languages.ewe, available: true },
  { ...languages.swahili, available: true },
  { ...languages.yoruba, available: true },
  { ...languages.ndebele, available: true },
  { ...languages.shona, available: true },
  { ...languages.hausa, available: true },
  { ...languages.igbo, available: true },
  { ...languages.zulu, available: true },
  { ...languages.bemba, available: true },
  { ...languages.chichewa, available: true },
  { ...languages.kinyarwanda, available: true },
  { ...languages.kirundi, available: true },
];

export const availableLanguageList = languageList.filter(language => language.available);
