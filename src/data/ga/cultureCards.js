const sourceTitle = "Bureau of Ghana Languages — Language Guide (Ga Version)";
const sourceUrl = "https://pages.mtu.edu/~rlstrick/rsvtxt/gaguide.pdf";

function phrasePreview(lesson) {
  const items = (lesson.vocabulary || []).slice(0, 2).map(item => `“${item.native}” (${item.english})`);
  return items.length ? items.join(" and ") : "the lesson’s source-aligned expressions";
}

export function polishGaCultureCards(units) {
  return units.map((unit, unitIndex) => ({
    ...unit,
    lessons: unit.lessons.map((lesson, lessonIndex) => {
      const card = lesson.cultureCard;
      const challenge = lessonIndex === unit.lessons.length - 1;
      const focus = phrasePreview(lesson);
      return {
        ...lesson,
        cultureCard: {
          ...card,
          title: challenge ? `${unit.title} · Course Stamp` : `${card.title} · ${lesson.title}`,
          text: challenge
            ? `${card.text} This unit stamp records your ability to connect the expressions from ${unit.title} in context; it is a learning milestone, not a claim that every Ga-speaking community follows one identical practice.`
            : `${card.text} In “${lesson.title},” notice ${focus}. The card links the language to this lesson’s context while leaving household, regional, and personal variation visible.`,
          language: "Ga",
          region: "Ghana · Greater Accra and Ga communities",
          unitNumber: unitIndex + 1,
          unitTitle: unit.title,
          lessonTitle: lesson.title,
          provenance: "Source-aligned Ga course context · final speaker review pending",
          sourceTitle,
          sourceUrl
        }
      };
    })
  }));
}
