import { findIconId } from "../iconLibrary";

const source = "Learn Akan · List of Jobs and Occupations in Twi · https://learnakan.com/occupations-in-twi/";

const occupations = [
  ["ɔtomfoɔ", "blacksmith"],
  ["akuturukubɔfoɔ", "boxer"],
  ["nankwaseni", "butcher"],
  ["sikakorabea dwumayɛni", "banker"],
  ["dua dwomfoɔ", "woodworker or carpenter", ["kapenta (borrowed)"]],
  ["aduanenoafoɔ", "cook or chef"],
  ["ɔyaresafoɔ", "doctor", ["dɔkota (borrowed)"]],
  ["ofidikafoɔ", "driver", ["drɔbani"]],
  ["okuani", "farmer"],
  ["ɔfareni", "fisherman"],
  ["bɔɔlobɔfoɔ", "footballer"],
  ["nsɛntwerɛni", "journalist"],
  ["otemmuafoɔ", "judge or magistrate"],
  ["apamfoɔ", "jury"],
  ["mmaranimfoɔ", "lawyer", ["lɔya (borrowed)"]],
  ["ɔbotoni", "mason", ["ɔdansifoɔ", "meesin (borrowed)"]],
  ["ayarehwɛdwuma mu boafoɔ", "nurse", ["nɛɛse (borrowed)"]],
  ["mmarahyɛ badwani", "parliamentarian"],
  ["ɔsɔfoɔ", "pastor"],
  ["oduyɛfoɔ", "pharmacist or maker of medicines"],
  ["wiemhyɛnkafoɔ", "pilot"],
  ["opolisini", "police officer"],
  ["amanyɔni", "politician"],
  ["ɔsɛmpakani", "preacher"],
  ["ɔmanpanin", "president"],
  ["ɔkɔmhyɛni", "prophet"],
  ["ɔbaa depamni", "seamstress", ["adepamni (general)"]],
  ["ɔtwerɛtwerɛni", "secretary"],
  ["ɔwɛmfoɔ", "security guard or watchman"],
  ["dwontoni", "singer or musician"],
  ["ɔsraani", "soldier"],
  ["barima depamni", "tailor", ["adepamni (general)"]],
  ["ɔkyerɛkyerɛni", "teacher", ["tikya (borrowed)"]],
  ["odwadini", "trader"]
];

const beginnerOccupations = new Set([
  "aduanenoafoɔ", "ɔyaresafoɔ", "ofidikafoɔ", "okuani", "ɔfareni", "bɔɔlobɔfoɔ",
  "ɔsɔfoɔ", "wiemhyɛnkafoɔ", "opolisini", "ɔsraani", "ɔkyerɛkyerɛni", "odwadini"
]);
const advancedOccupations = new Set([
  "sikakorabea dwumayɛni", "nsɛntwerɛni", "otemmuafoɔ", "apamfoɔ", "mmaranimfoɔ",
  "ayarehwɛdwuma mu boafoɔ", "mmarahyɛ badwani", "oduyɛfoɔ", "amanyɔni", "ɔkɔmhyɛni"
]);
const occupationIcons = {
  banker: "bank", "cook or chef": "cook", doctor: "hospital", driver: "drive", farmer: "farm",
  fisherman: "fish", footballer: "football", pilot: "airplane", teacher: "teacher"
};

export const twiOccupationReferenceEntries = occupations.map(([native, english, variants = []], index) => ({
  id: `twi-occupation-reference-${String(index + 1).padStart(2, "0")}`,
  native,
  english,
  audio: "",
  iconId: occupationIcons[english] || findIconId(english),
  exampleNative: native,
  exampleEnglish: english,
  exampleStatus: "pending-native-review",
  level: beginnerOccupations.has(native) ? "beginner" : advancedOccupations.has(native) ? "advanced" : "intermediate",
  wordType: "nouns",
  theme: "work",
  source,
  verificationStatus: "source-aligned-headword; example-pending-native-review",
  contextNote: variants.length
    ? "Learn Akan records another Twi form for this occupation. Open Language details to compare it; pronunciation and sentence review remain pending."
    : "Headword and meaning are source-aligned. A native-speaker-reviewed sentence and pronunciation recording are still required.",
  linguistic: variants.length ? { variants } : {}
}));
