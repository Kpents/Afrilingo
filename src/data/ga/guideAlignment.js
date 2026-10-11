const GUIDE_URL = "https://pages.mtu.edu/~rlstrick/rsvtxt/gaguide.pdf";

const unitDomains = {
  1: ["greetings-and-responses", "pronunciation-and-tone"],
  2: ["numerals", "currency", "market-quantities"],
  3: ["pronouns", "common-expressions"],
  4: ["common-expressions", "in-the-house"],
  5: ["family-relations"],
  6: ["food-and-drink", "in-the-market"],
  7: ["in-the-house"],
  8: ["colours", "description"],
  9: ["pronouns", "common-expressions"],
  10: ["asking-for-directions"],
  11: ["days", "months", "time"],
  12: ["currency", "in-the-shop", "in-the-market"],
  13: ["greetings-and-responses", "common-expressions"],
  14: ["at-school", "work"],
  15: ["travelling", "asking-for-directions"],
  16: ["common-expressions", "wellbeing"],
  17: ["parts-of-the-body", "some-sicknesses"],
  18: ["the-weather", "environment"],
  19: ["days", "time", "common-expressions"],
  20: ["common-expressions", "integrated-conversation"],
  21: ["common-expressions", "integrated-conversation"],
  22: ["pronouns", "sentence-patterns"],
  23: ["in-the-house", "at-school", "in-the-market"],
  24: ["travelling", "asking-for-directions", "currency"],
  25: ["parts-of-the-body", "some-sicknesses"],
  26: ["greetings-and-responses", "common-expressions"],
  27: ["integrated-conversation", "reading"],
  28: ["integrated-conversation", "assessment"]
};

const skillsByUnit = number => {
  if (number <= 4) return ["vocabulary", "matching", "translation", "speaking"];
  if (number <= 9) return ["vocabulary", "reading", "translation", "conversation"];
  if (number <= 15) return ["conversation", "matching", "translation", "scenario-practice"];
  if (number <= 20) return ["reading", "conversation", "grammar-in-context", "review"];
  return ["integrated-conversation", "reading", "translation", "assessment"];
};

const cefrByUnit = number => number <= 9 ? "Pre-A1" : number <= 20 ? "A1" : "A1 consolidation";

const toneNote = "Ga is tonal, and vowel length can also distinguish forms. Written prompts support recognition, but tone and pronunciation require native-speaker audio before release.";

export function alignGaCourseToGuide(units) {
  return units.map((unit, index) => {
    const number = index + 1;
    const checkpoint = number % 4 === 0 || number === units.length;
    return {
      ...unit,
      curriculum: {
        framework: "AfriLingo Ga v1",
        level: cefrByUnit(number),
        guideDomains: unitDomains[number] || ["common-expressions"],
        skills: skillsByUnit(number),
        source: GUIDE_URL,
        sourceStatus: "source-aligned-native-review-pending",
        checkpoint
      },
      lessons: unit.lessons.map((lesson, lessonIndex) => ({
        ...lesson,
        learningObjective: lessonIndex === unit.lessons.length - 1
          ? `Demonstrate practical control of the language from ${unit.title}.`
          : `${unit.description || unit.subtitle || `Use Ga confidently in ${unit.title.toLowerCase()}.`}`,
        skills: skillsByUnit(number),
        editorialStatus: "source-aligned-native-review-pending",
        pronunciationNote: toneNote,
        vocabulary: (lesson.vocabulary || []).map(word => ({
          audio: "",
          verificationStatus: "source-aligned-native-review-pending",
          ...word,
          linguistic: {
            toneSensitive: true,
            audioRequired: true,
            ...(word.linguistic || {})
          }
        }))
      }))
    };
  });
}

export const gaGuideCoverage = {
  source: GUIDE_URL,
  coveredDomains: [...new Set(Object.values(unitDomains).flat())],
  deferredForVerifiedExpansion: [
    "in-the-chiefs-house",
    "at-the-post-office",
    "birds",
    "insects",
    "fishes"
  ],
  note: "Deferred domains stay out of scored lessons until their individual forms receive native-speaker editorial review."
};
