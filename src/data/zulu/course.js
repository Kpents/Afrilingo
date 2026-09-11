import { zuluUnit1 } from "./unit1";
import { zuluUnit2 } from "./unit2";
import { zuluUnit3 } from "./unit3";
import { zuluUnit4 } from "./unit4";
import { zuluUnit5 } from "./unit5";
import { zuluUnit6 } from "./unit6";
import { zuluUnit7 } from "./unit7";
import { zuluExtendedUnits } from "./extendedUnits";
import { zuluSourceNotes } from "./sourceNotes";
import { findIconId, iconLibrary } from "../iconLibrary";

const zuluFoundationUnits = [zuluUnit1, zuluUnit2, zuluUnit3, zuluUnit4, zuluUnit5, zuluUnit6, zuluUnit7];
const rawZuluUnits = [...zuluFoundationUnits, ...zuluExtendedUnits];

function addVisualVocabulary(unit) {
  return {
    ...unit,
    lessons: unit.lessons.map(lesson => {
      const vocabulary = lesson.vocabulary.map(word => ({ ...word, iconId: word.iconId || findIconId(word.english) || undefined }));
      const visualWords = vocabulary.filter(word => word.iconId && iconLibrary[word.iconId]?.status === "ready");
      if (!visualWords.length) return { ...lesson, vocabulary };
      const target = visualWords[0];
      const category = iconLibrary[target.iconId].category;
      const distractors = Object.values(iconLibrary).filter(icon => icon.status === "ready" && icon.category === category && icon.id !== target.iconId).slice(0, 3);
      if (distractors.length < 3) return { ...lesson, vocabulary };
      const visualQuestion = {
        id: "q-visual",
        type: "image-choice",
        prompt: `Which image matches “${target.native}”?`,
        options: [iconLibrary[target.iconId], ...distractors].map(icon => ({ value: icon.id, label: icon.label, iconId: icon.id })),
        answer: target.iconId,
        explanation: `${target.native} means “${target.english}.”`
      };
      return { ...lesson, vocabulary, questions: [...lesson.questions, visualQuestion] };
    })
  };
}

export const zuluUnits = rawZuluUnits.map(addVisualVocabulary);

export const zuluCourse = {
  id: "zulu",
  language: "Zulu",
  nativeName: "isiZulu",
  flag: "🇿🇦",
  accent: "#4338CA",
  sourceNotes: zuluSourceNotes,
  phases: [
    { id: "foundations", title: "Foundations", units: zuluFoundationUnits },
    { id: "everyday-life", title: "Everyday Life", units: zuluExtendedUnits.slice(0, 7) },
    { id: "community-travel", title: "Community & Travel", units: zuluExtendedUnits.slice(7, 14) },
    { id: "practical-fluency", title: "Practical Fluency", units: zuluExtendedUnits.slice(14, 21) }
  ]
};
