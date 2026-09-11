// Copy this template when verified content for a new language is ready.
export const courseTemplate = {
  id: "language-id",
  language: "Language name",
  nativeName: "Native name",
  flag: "🏳️",
  units: [
    {
      id: "language-unit-1",
      title: "Greetings",
      subtitle: "",
      lessons: [
        {
          id: "language-saying-hello",
          title: "Saying Hello",
          emoji: "👋",
          xp: 40,
          vocabulary: [{ native: "", english: "", audio: "" }],
          conversation: [{ speaker: "", avatar: "🙂", native: "", english: "", audio: "" }],
          questions: [{ id: "q1", type: "multiple-choice", prompt: "", options: [], answer: "", explanation: "" }],
          cultureCard: { id: "", title: "", category: "", emoji: "🌍", text: "" }
        }
      ]
    }
  ]
};
