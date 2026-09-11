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

export const languages = {
  twi: prepareCourse(twiCourse, twiUnits, "Ghana · Akan regions"),
  ga: prepareCourse(gaCourse, gaUnits, "Ghana · Greater Accra"),
  ewe: prepareCourse(eweCourse, eweUnits, "Ghana · Volta Region and southern Togo"),
  swahili: prepareCourse(swahiliCourse, swahiliUnits, "East Africa · Kenya, Tanzania and the Swahili coast"),
  yoruba: prepareCourse(yorubaCourse, yorubaUnits, "West Africa · Southwestern Nigeria and neighboring regions"),
  hausa: prepareCourse(hausaCourse, hausaUnits, "West Africa · Northern Nigeria, Niger and neighboring regions"),
  igbo: prepareCourse(igboCourse, igboUnits, "West Africa · Southeastern Nigeria and neighboring communities"),
  shona: prepareCourse(shonaCourse, shonaUnits, "Southern Africa · Zimbabwe and neighboring communities"),
  ndebele: prepareCourse(ndebeleCourse, ndebeleUnits, "Southern Africa · Zimbabwean Matabeleland and neighboring communities"),
  zulu: prepareCourse(zuluCourse, zuluUnits, "Southern Africa · South Africa, especially KwaZulu-Natal"),
  bemba: prepareCourse(bembaCourse, bembaUnits, "Southern Africa · Zambia and neighboring communities"),
  chichewa: prepareCourse(chichewaCourse, chichewaUnits, "Southern Africa · Malawi and neighboring communities"),
  kinyarwanda: prepareCourse(kinyarwandaCourse, kinyarwandaUnits, "East Africa · Rwanda and neighboring communities"),
  kirundi: prepareCourse(kirundiCourse, kirundiUnits, "East Africa · Burundi and neighboring communities")
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
