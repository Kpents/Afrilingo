import { findIconId } from "../iconLibrary";

const source = "Learn Akan · The Twi Names of Some Animals (Mmoa) · https://learnakan.com/twi-animal-names/";

const animals = [
  ["aboa","animal",["mmoa"]], ["tɛtea","ant",["ntɛtea"]], ["adowa","antelope"], ["kontromfi","baboon",["okontromfi"]],
  ["apan","bat"], ["sisire","bear"], ["nsonkuronsuo","bedbug"], ["wowa","bee"], ["ɔbankuo","beetle"],
  ["ntakraboa","feathered animal or bird"], ["anomaa","bird"], ["akokɔ","chicken"], ["akokɔba","chick"],
  ["akokɔnini","cock or rooster"], ["akokɔbedeɛ","hen"], ["kraman","dog"], ["kraman bedeɛ","female dog"],
  ["nanka","boa constrictor"], ["prako","pig"], ["prakonini","boar"], ["prakobedeɛ","sow"], ["trɔmo","bongo"],
  ["apatuprɛ","bulbul"], ["kɔkɔte","bush pig"], ["wansane","bushbuck",["ɔwansane"]], ["afofantɔ","butterfly"],
  ["yoma","camel"], ["ɔkra","cat",["agyinamoa"]], ["nantwie","cow or cattle"], ["nantwieba","calf"],
  ["nantwinini","bull"], ["nantwibedeɛ","female cow"], ["sakasaka","centipede"], ["kankabi","millipede"],
  ["kankane","civet"], ["tɛfrɛ","cockroach"], ["kɔtɔ","crab",["ɔkɔtɔ"]], ["katakyire","cricket"],
  ["dɛnkyɛm","crocodile",["ɔdɛnkyɛm"]], ["anene","crow",["kwaakwaadabi"]], ["ɔforoteɛ","deer"], ["afunumu","donkey"],
  ["nkrane","driver ants"], ["nhohoa","red ants"], ["hahini","soldier ant"], ["asisirapɛ","flying ant"],
  ["dabodabo","duck"], ["ɔtwe","duiker"], ["kɔdeɛ","eagle",["ɔkɔdeɛ"]], ["sonsono","earthworm"], ["oyoyo","eel"],
  ["ɔsono","elephant"], ["susono","hippopotamus"], ["nankwaasere","flying fox"], ["opuro","squirrel"],
  ["opurohemaa","forest squirrel"], ["amoakua","ground squirrel"], ["apɔnkyerɛne","frog",["apɔtorɔ"]],
  ["apɔnkye","goat",["abirekyie"]], ["akranteɛ","grasscutter"], ["abɛbɛ","grasshopper"], ["akɔmfɛm","guinea fowl"],
  ["akorɔma","hawk"], ["apɛsɛ","African brush-tailed porcupine"], ["sukɔnkɔn","heron"], ["pɔnkɔ","horse"],
  ["pɔnkɔ ba","foal"], ["akyenkyena","hornbill"], ["asɔkwaa","white-crested hornbill"], ["nwansena","housefly"],
  ["ofui","hyena",["pataku"]], ["edwie","louse"], ["gyata","lion"], ["sebɔ","tiger",["ɔsebɔ","kurotwiamansa"]],
  ["etwie","leopard",["sebɔ","ɔsebɔ"]], ["koterɛ","lizard"], ["abosomakoterɛ","chameleon"],
  ["mampam","monitor lizard",["ɔmampam"]], ["kyekye","alligator",["ɔkyekye"]], ["ntutummɛ","locust"],
  ["adoe","monkey"], ["ntontom","mosquito"], ["akura","mouse"], ["santrofi anomaa","nightjar"],
  ["patuo","owl",["ɔpatuo"]], ["aprawa","pangolin"], ["kɔtɔkɔ","porcupine"], ["akokromfi","praying mantis"],
  ["adanko","rabbit"], ["odwan","sheep"], ["odwannini","ram"], ["odwan bedeɛ","ewe"], ["kusie","rat",["okusie"]],
  ["nyanyankyerɛ","scorpion"], ["bonsu","whale"], ["oboodede","shark"], ["ɔwɔ","snake"], ["ananse","spider"],
  ["aserewa","sunbird"], ["konkontiba","tadpole"], ["mfɔteɛ","termite",["nkanka"]], ["sommorɔ","tick"],
  ["huruiɛ","tsetse fly"], ["akyekyedeɛ","tortoise"], ["sudanna","turtle",["osudanna","supurupu","nsuom akyekyedeɛ"]],
  ["pɛtɛ","vulture",["kɔkɔsakyi"]], ["kotokurodu","wasp"], ["sakraman","jackal, wild dog, or fox"],
  ["ako","parrot"], ["abobɔnnua","woodpecker"]
];

const beginnerAnimals = new Set(["aboa","tɛtea","anomaa","akokɔ","akokɔba","akokɔnini","akokɔbedeɛ","kraman","prako","afofantɔ","ɔkra","nantwie","nantwieba","nantwinini","dabodabo","ɔsono","opuro","apɔnkyerɛne","apɔnkye","pɔnkɔ","gyata","koterɛ","adoe","ntontom","akura","patuo","adanko","odwan","odwannini","odwan bedeɛ","kusie","ɔwɔ","ananse"]);
const advancedAnimals = new Set(["nsonkuronsuo","ɔbankuo","trɔmo","apatuprɛ","kɔkɔte","wansane","sakasaka","kankabi","kankane","nkrane","nhohoa","hahini","asisirapɛ","ɔtwe","oyoyo","nankwaasere","opurohemaa","amoakua","apɛsɛ","sukɔnkɔn","akyenkyena","asɔkwaa","ofui","edwie","ntutummɛ","santrofi anomaa","aprawa","akokromfi","nyanyankyerɛ","aserewa","konkontiba","sommorɔ","huruiɛ","sudanna","kotokurodu","abobɔnnua"]);

export const twiAnimalReferenceEntries = animals.map(([native, english, variants = []], index) => ({
  id: `twi-animal-reference-${String(index + 1).padStart(3, "0")}`,
  native,
  english,
  audio: "",
  iconId: findIconId(english.split(/,| or /)[0]),
  exampleNative: native,
  exampleEnglish: english,
  exampleStatus: "pending-native-review",
  level: beginnerAnimals.has(native) ? "beginner" : advancedAnimals.has(native) ? "advanced" : "intermediate",
  wordType: "nouns",
  theme: "animals",
  source,
  verificationStatus: "source-aligned-headword; example-pending-native-review",
  contextNote: variants.length
    ? "Learn Akan records additional Twi forms for this animal. Open Language details to compare them; pronunciation and sentence review remain pending."
    : "Headword and meaning are source-aligned. A native-speaker-reviewed sentence and pronunciation recording are still required.",
  linguistic: {
    ...(native === "aboa" ? { plural: "mmoa" } : {}),
    ...(native === "tɛtea" ? { plural: "ntɛtea" } : {}),
    ...(variants.length ? { variants } : {})
  }
}));
