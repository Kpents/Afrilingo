export const skillDefinitions = {
  vocabulary: { label: "Vocabulary", emoji: "📚" },
  listening: { label: "Listening", emoji: "🎧" },
  sentences: { label: "Sentence building", emoji: "🧩" },
  matching: { label: "Word matching", emoji: "🔗" },
  conversation: { label: "Conversation", emoji: "💬" },
  visual: { label: "Visual recall", emoji: "🖼️" }
};

export function skillForQuestion(question = {}) {
  if (["listening", "listen-and-select"].includes(question.type)) return "listening";
  if (question.type === "sentence-builder") return "sentences";
  if (["match", "matching"].includes(question.type)) return "matching";
  if (["conversation", "mini-conversation"].includes(question.type)) return "conversation";
  if (["image-choice", "image-to-word"].includes(question.type) || question.visualOptions) return "visual";
  return "vocabulary";
}

export function masteryLevel(correct, attempts) {
  const accuracy = attempts ? correct / attempts : 0;
  if (attempts < 3) return "learning";
  if (attempts < 8 || accuracy < .7) return "familiar";
  if (attempts < 15 || accuracy < .9) return "strong";
  return "mastered";
}

export function summarizeSkillEvidence(results = []) {
  return Object.values(results.reduce((summary, result) => {
    const skill = result.skill || "vocabulary";
    summary[skill] ||= { skill, correct: 0, attempts: 0 };
    summary[skill].attempts += 1;
    summary[skill].correct += result.correct ? 1 : 0;
    return summary;
  }, {}));
}

export function updateLearnerMastery(mastery = {}, evidence = [], now = Date.now()) {
  const skills = { ...(mastery.skills || {}) };
  evidence.forEach(item => {
    if (!skillDefinitions[item.skill] || !item.attempts) return;
    const previous = skills[item.skill] || { correct: 0, attempts: 0 };
    const correct = previous.correct + item.correct;
    const attempts = previous.attempts + item.attempts;
    skills[item.skill] = {
      correct,
      attempts,
      accuracy: Math.round(correct / attempts * 100),
      level: masteryLevel(correct, attempts),
      updatedAt: now
    };
  });
  return { ...mastery, skills };
}

export function masteryInsights(mastery = {}) {
  const ranked = Object.entries(mastery.skills || {}).filter(([, value]) => value.attempts > 0).sort((a, b) => b[1].accuracy - a[1].accuracy || b[1].attempts - a[1].attempts);
  return { strongest: ranked[0] || null, weakest: ranked.length > 1 ? ranked.at(-1) : null };
}
