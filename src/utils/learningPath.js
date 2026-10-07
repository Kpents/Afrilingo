const activityTemplates = [
  { type: "practice", title: "Personalized practice", subtitle: "Strengthen weak and stale concepts", emoji: "💪", target: "practice" },
  { type: "story", title: "Story moment", subtitle: "Meet the language in context", emoji: "📖", target: "immersion", requiresImmersion: true },
  { type: "listening", title: "Listening focus", subtitle: "Train recognition and recall", emoji: "🎧", target: "practice" },
  { type: "speaking", title: "Speaking studio", subtitle: "Record, listen back, and build confidence", emoji: "🎙️", target: "practice" }
];

export function buildUnitPathNodes(unit, { hasImmersion = false } = {}) {
  const lessons = unit?.lessons || [];
  const finalIndex = lessons.length - 1;
  const nodes = [];
  lessons.forEach((lesson, index) => {
    nodes.push({ id: lesson.id, type: "lesson", lesson, lessonIndex: index });
    if (index >= finalIndex) return;
    const activity = activityTemplates[index % activityTemplates.length];
    if (!activity.requiresImmersion || hasImmersion) nodes.push({ ...activity, id: `${unit.id}:path:${activity.type}:${index}`, afterLessonIndex: index });
    if (index === finalIndex - 1) nodes.push({ id: `${unit.id}:path:review`, type: "review", title: "Unit review", subtitle: "Revisit mistakes before the challenge", emoji: "🔁", target: "review", afterLessonIndex: index });
  });
  return nodes;
}
