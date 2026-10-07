export function normalizeAnswer(question, value) {
  if (["sentence-builder", "word-bank"].includes(question.type)) return (value || []).join(" ");
  if (["match", "matching"].includes(question.type)) return [...(value || [])].map(match => typeof match === "object" ? `${match.native}::${match.english}` : match).sort().join("|");
  if (question.type === "listen-and-type") return String(value || "").trim().toLocaleLowerCase();
  return value;
}

export function expectedAnswer(question) {
  if (["match", "matching"].includes(question.type)) return (question.pairs || []).map(pair => `${pair.native}::${pair.english}`).sort().join("|");
  if (question.type === "listen-and-type") return String(question.answer || "").trim().toLocaleLowerCase();
  return question.answer;
}

export function isAnswerComplete(question, value) {
  if (value == null) return false;
  if (["match", "matching"].includes(question.type)) return Array.isArray(value) && value.length === (question.pairs || []).length;
  if (Array.isArray(value)) return value.length > 0;
  if (question.type === "listen-and-type") return Boolean(String(value).trim());
  return true;
}
