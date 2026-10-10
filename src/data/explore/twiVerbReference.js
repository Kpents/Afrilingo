const source = "Learn Akan · Twi Action Verbs · https://learnakan.com/twi-action-verbs/";

const verbs = [
  ["ba", "come"], ["bisa", "ask"], ["boe", "stoop or bend"], ["boa", "help"], ["bo", "beat, hit, or strike"],
  ["bɔ", "create; kick; or play music or a game"], ["bɔ mmɔden", "try or do your best"], ["bue", "open"], ["bu", "break or respect"],
  ["da", "sleep"], ["dae", "dream"], ["di", "eat"], ["di nkunim", "win"], ["di agorɔ", "play"], ["dɔ", "love or weed"],
  ["du", "reach or arrive"], ["dwane", "run or flee"], ["fa", "take"], ["fɛre", "be shy or ashamed"], ["fe", "vomit"],
  ["fi", "leave or come from"], ["frɛ", "call"], ["fuw", "grow or flourish"], ["gyae", "stop or quit"],
  ["gye", "receive, take, or accept"], ["gu", "pour or scatter"], ["guan", "run away or escape"], ["ha", "worry or hurt"],
  ["hia", "need"], ["hohoro", "wash lightly or rinse"], ["home", "rest; breathe; or blow the nose"], ["hori", "float"],
  ["hu", "see or fear"], ["huri", "jump"], ["hwɛ", "look, watch, or see"], ["hyɛ", "wear or put on"], ["hyia", "meet"],
  ["ka", "say or bite"], ["kae", "remember"], ["kan", "count or read"], ["kasa", "speak or talk"], ["ko", "fight"],
  ["kɔ", "go"], ["kɔma", "send"], ["kum", "kill"], ["kuta", "hold"], ["kyerɛ", "show or teach"], ["ma", "give"],
  ["mene", "swallow"], ["nim", "know"], ["noa", "cook"], ["nom", "drink"], ["nyane", "wake up"], ["nyina", "stand"],
  ["pae", "break or burst"], ["pagya", "lift"], ["pasa", "tear"], ["pɛ", "like or want"], ["pia", "push"],
  ["pue", "exit or come out"], ["sa", "dance or fetch water"], ["saka", "chew"], ["sene", "pass or surpass"],
  ["sɛe", "spoil or destroy"], ["sere", "laugh"], ["se", "say"], ["si", "wash clothes; build; or descend"], ["sisi", "cheat"],
  ["so", "catch, hold, or be big"], ["soa", "carry on the head or shoulders"], ["soma", "send someone"],
  ["sɔ", "catch, hold, or light a fire or lamp"], ["sɔre", "stand up or rise"], ["sua", "learn"], ["susu", "measure or think"],
  ["ta", "fart"], ["taa", "follow or chase"], ["te", "hear, feel, or tear"], ["tena", "sit"],
  ["to", "throw, place, or sing"], ["tɔ", "buy or fall"], ["tɔn", "sell"], ["tu", "dig, fly, or pull out"], ["tua", "pay"],
  ["twa", "cut"], ["twe", "pull"], ["twerɛ", "write"], ["tie", "listen or hear"], ["wae", "grind or crush"],
  ["ware", "marry or be tall"], ["we", "chew"], ["wo", "give birth or be born"], ["wɔ", "pound or have"], ["wu", "die"],
  ["yare", "be or become sick"], ["yɛ", "do or make"], ["yi", "remove or take out"], ["yira", "bless"], ["yow", "yawn"],
  ["yubu", "cover"]
];

const beginner = new Set(["ba","bisa","boa","bue","da","di","du","fa","fi","frɛ","gyae","hia","hu","hwɛ","hyɛ","hyia","ka","kae","kan","kasa","kɔ","kuta","kyerɛ","ma","nim","noa","nom","nyane","pɛ","sere","sɔre","sua","tena","tɔ","tua","twerɛ","tie","yɛ"]);
const advanced = new Set(["boe","dae","fɛre","fe","fuw","guan","hori","kɔma","kum","mene","pae","pasa","sene","sɛe","sisi","soma","ta","taa","tu","wae","ware","wo","wɔ","wu","yira","yow","yubu"]);

function themeFor(english) {
  if (/eat|drink|cook|swallow|chew|grind|vomit/.test(english)) return "food-drinks";
  if (/buy|sell|pay|receive|take|pour|measure/.test(english)) return "market-shopping";
  if (/go|come|reach|arrive|leave|run|escape|exit|follow|fly/.test(english)) return "transport";
  if (/sleep|dream|wake|rest|sit|stand|open|wash|build|cover/.test(english)) return "home";
  if (/sick|hurt|breathe|fear|yawn|fart|die/.test(english)) return "health";
  if (/wear|put on|tear|remove/.test(english)) return "clothing";
  if (/ask|read|write|learn|teach|know|remember|count|think/.test(english)) return "school";
  if (/create|help|work|send|carry|lift|push|pull|cut|dig/.test(english)) return "work";
  if (/play|win|kick|jump|fight|dance|chase/.test(english)) return "sports";
  if (/love|marry|meet|call|say|speak|talk|laugh|shy|respect|bless|give birth/.test(english)) return "relationships";
  return "places-directions";
}

export const twiVerbReferenceEntries = verbs.map(([native, english], index) => {
  const senses = english.split(/;| or /).map(value => value.trim()).filter(Boolean);
  const multipleSenses = senses.length > 1;
  return {
    id: `twi-verb-reference-${String(index + 1).padStart(3, "0")}`,
    native,
    english,
    audio: "",
    exampleNative: native,
    exampleEnglish: english,
    exampleStatus: "pending-native-review",
    level: beginner.has(native) ? "beginner" : advanced.has(native) ? "advanced" : "intermediate",
    wordType: "verbs",
    theme: themeFor(english),
    source,
    verificationStatus: "source-aligned-headword; example-pending-native-review",
    contextNote: multipleSenses
      ? "This verb has multiple context-dependent senses. A native-speaker-reviewed example and recording are still required for each sense."
      : "Headword and gloss are source-aligned. A native-speaker-reviewed example sentence and recording are still required.",
    linguistic: { verbStem: native, senses }
  };
});
