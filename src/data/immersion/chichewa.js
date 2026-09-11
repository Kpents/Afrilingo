const pending = { slow: "", normal: "", natural: "", status: "pending" };

export const chichewaImmersion = {
  languageId: "chichewa",
  languageName: "Chichewa",
  capabilities: { voiceRecognition: "adapter-required", generatedFeedback: "adapter-required", nativeAudio: "pending", textFallback: "ready" },
  conversations: [{
    id: "meet", title: "Meet Someone", emoji: "👋", level: "beginner", context: "You meet someone.",
    turns: [{ speaker: "Chichewa speaker", native: "Dzina lanu ndani?", english: "What is your name?", answer: "Dzina langa ndi Thoko.", choices: ["Dzina langa ndi Thoko.", "Ndi ndalama zingati?", "Mvula ikugwa."], feedback: "This introduces your name." }]
  }],
  variations: [{ id: "name", common: "Chichewa", alternative: "Chinyanja", meaning: "Related language labels", region: "Malawi and neighboring regions", formality: "contextual", context: "Language identity", explanation: "Use the label and forms preferred by the community." }],
  speakers: [{ id: "malawi", label: "Malawian contributor", region: "Contributor pending", ageRange: "Not supplied", style: "Recording pending", phrase: "Muli bwanji?", transcription: "Muli bwanji?", english: "How are you?", audio: pending }],
  pronunciation: { intro: "Chichewa is tonal, but ordinary spelling normally leaves tone unmarked. Verified recordings remain pending.", items: [{ id: "tone", focus: "Tone", native: "Chichewa", english: "Tone contributes to words and grammar", audio: "", note: "Learn tone through audio and context." }] },
  grammar: [{ id: "habit", title: "Habitual action", level: "beginner", intro: "Use the habitual marker.", before: "Ndikudya.", after: "Ndimadya.", highlightBefore: "-ku-", highlightAfter: "-ma-", explanation: "The ma marker commonly marks habitual action.", question: { prompt: "Which means I habitually eat?", options: ["Ndimadya.", "Ndikudya.", "Ndinadya."], answer: "Ndimadya.", explanation: "The ma marker marks habitual action." } }],
  missions: [{ id: "greet", title: "Greet First", emoji: "🤝", level: "beginner", context: "You meet someone.", prompt: "Choose the opening.", choices: [{ text: "Muli bwanji?", correct: true, feedback: "This opens with wellbeing." }, { text: "Ndi ndalama zingati?", correct: false, feedback: "That asks a price." }], culture: "Greetings matter in everyday encounters.", xp: 15 }],
  stories: [{ id: "thoko", title: "Thoko ku Lilongwe", englishTitle: "Thoko in Lilongwe", emoji: "👋", level: "beginner", origin: "Original AfriLingo learning story", audio: "", sentences: [{ native: "Dzina langa ndi Thoko.", english: "My name is Thoko." }, { native: "Ndimakhala ku Lilongwe.", english: "I live in Lilongwe." }], vocabulary: { dzina: "name", kukhala: "live" }, question: { prompt: "Where does Thoko live?", options: ["Lilongwe", "The market", "The station"], answer: "Lilongwe", explanation: "Thoko lives in Lilongwe." } }],
  dailyPhrases: [{ id: "hello", native: "Muli bwanji?", english: "How are you?", literal: "How are you?", when: "Greeting", context: "Greeting", exampleNative: "Muli bwanji?", exampleEnglish: "How are you?", audio: "" }, { id: "thanks", native: "Zikomo.", english: "Thank you.", literal: "Thank you.", when: "Gratitude", context: "Gratitude", exampleNative: "Zikomo.", exampleEnglish: "Thank you.", audio: "" }]
};
