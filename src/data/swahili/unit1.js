export const swahiliUnit1 = {
  id: "swahili-unit-1",
  title: "Greetings",
  subtitle: "Start warm, respectful conversations in Kiswahili.",
  lessons: [
    {
      id: "swahili-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Hujambo?", english: "Hello / How are you?", audioPlaceholder: "/audio/swahili/hujambo.mp3" },
        { native: "Sijambo.", english: "I am fine.", audioPlaceholder: "/audio/swahili/sijambo.mp3" },
        { native: "Habari?", english: "Hello / How are things?", audioPlaceholder: "/audio/swahili/habari.mp3" },
        { native: "Nzuri.", english: "Good / Fine.", audioPlaceholder: "/audio/swahili/nzuri.mp3" }
      ],
      cultureCard: {
        id: "swahili-greetings-take-time",
        title: "Greetings Take Time",
        emoji: "🤝",
        category: "Etiquette",
        text: "In Swahili-speaking communities, greetings are an important part of social life. An exchange may continue through several questions before the main conversation begins."
      },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Hujambo?", english: "Hello, how are you?", audioPlaceholder: "/audio/swahili/hujambo.mp3" },
        { speaker: "Juma", avatar: "👨🏾", native: "Sijambo. Habari?", english: "I am fine. How are things?", audioPlaceholder: "/audio/swahili/sijambo-habari.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Nzuri.", english: "Good.", audioPlaceholder: "/audio/swahili/nzuri.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Hujambo?” mean here?", options: ["Hello / How are you?", "What is your name?", "Thank you", "Goodbye"], answer: "Hello / How are you?", explanation: "Hujambo? is a greeting addressed to one person." },
        { id: "q2", type: "english-to-native", prompt: "Choose the response meaning “I am fine.”", options: ["Sijambo.", "Habari?", "Asante.", "Kwaheri."], answer: "Sijambo.", explanation: "Sijambo is the conventional response to Hujambo?" },
        { id: "q3", type: "conversation", prompt: "Amina says “Hujambo?” Choose the fitting response.", options: ["Sijambo.", "Tafadhali.", "Kwaheri.", "Jina langu ni Juma."], answer: "Sijambo.", explanation: "Hujambo? and Sijambo form a common greeting exchange." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the exchange: Habari? — ___.", options: ["Nzuri", "Kwaheri", "Tafadhali", "Shikamoo"], answer: "Nzuri", explanation: "Nzuri, meaning good or fine, is a common short response to Habari?" }
      ]
    },
    {
      id: "swahili-time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Habari za asubuhi?", english: "Good morning / How is the morning?", audioPlaceholder: "/audio/swahili/habari-za-asubuhi.mp3" },
        { native: "Habari za mchana?", english: "Good afternoon / How is the day?", audioPlaceholder: "/audio/swahili/habari-za-mchana.mp3" },
        { native: "Habari za jioni?", english: "Good evening / How is the evening?", audioPlaceholder: "/audio/swahili/habari-za-jioni.mp3" }
      ],
      cultureCard: {
        id: "swahili-contextual-greetings",
        title: "The Moment Shapes the Greeting",
        emoji: "☀️",
        category: "Daily Life",
        text: "Habari can be paired with the time or situation: asubuhi for morning, mchana for daytime, and jioni for evening. Everyday preferences differ across regions and speakers."
      },
      conversation: [
        { speaker: "Neema", avatar: "👩🏾", native: "Habari za asubuhi?", english: "Good morning. How is the morning?", audioPlaceholder: "/audio/swahili/habari-za-asubuhi.mp3" },
        { speaker: "Baraka", avatar: "👨🏾", native: "Nzuri, asante.", english: "Good, thank you.", audioPlaceholder: "/audio/swahili/nzuri-asante.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which word refers to morning?", options: ["asubuhi", "mchana", "jioni", "jina"], answer: "asubuhi", explanation: "Asubuhi means morning." },
        { id: "q2", type: "matching", prompt: "Match each time word with its meaning.", pairs: [{ native: "asubuhi", english: "morning" }, { native: "mchana", english: "day / afternoon" }, { native: "jioni", english: "evening" }], explanation: "These time words make Habari greetings more specific." },
        { id: "q3", type: "english-to-native", prompt: "Choose the evening greeting.", options: ["Habari za jioni?", "Habari za asubuhi?", "Sijambo.", "Kwaheri."], answer: "Habari za jioni?", explanation: "Jioni refers to evening." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the morning greeting: Habari za __?", options: ["asubuhi", "jioni", "mchana", "jina"], answer: "asubuhi", explanation: "Habari za asubuhi? is a morning greeting." }
      ]
    },
    {
      id: "swahili-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Jina lako ni nani?", english: "What is your name?", audioPlaceholder: "/audio/swahili/jina-lako-ni-nani.mp3" },
        { native: "Jina langu ni Amina.", english: "My name is Amina.", audioPlaceholder: "/audio/swahili/jina-langu-ni-amina.mp3" },
        { native: "Nimefurahi kukufahamu.", english: "I am pleased to meet you.", audioPlaceholder: "/audio/swahili/nimefurahi-kukufahamu.mp3" }
      ],
      cultureCard: {
        id: "swahili-names-and-connection",
        title: "A Name Opens the Conversation",
        emoji: "🪪",
        category: "Identity",
        text: "Introductions usually follow a greeting rather than replacing it. Learning someone's name is one step in a broader exchange that acknowledges the person and the relationship."
      },
      conversation: [
        { speaker: "Juma", avatar: "👨🏾", native: "Jina lako ni nani?", english: "What is your name?", audioPlaceholder: "/audio/swahili/jina-lako-ni-nani.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Jina langu ni Amina.", english: "My name is Amina.", audioPlaceholder: "/audio/swahili/jina-langu-ni-amina.mp3" },
        { speaker: "Juma", avatar: "👨🏾", native: "Nimefurahi kukufahamu.", english: "I am pleased to meet you.", audioPlaceholder: "/audio/swahili/nimefurahi-kukufahamu.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Jina lako ni nani?” ask?", options: ["What is your name?", "How are you?", "Where are you from?", "What time is it?"], answer: "What is your name?", explanation: "Jina lako ni nani? asks for one person's name." },
        { id: "q2", type: "sentence-builder", prompt: "Build the sentence: My name is Amina.", tiles: ["Jina", "langu", "ni", "Amina."], answer: "Jina langu ni Amina.", explanation: "Jina langu ni … introduces your name." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Jina lako ni nani?” Choose the fitting reply.", options: ["Jina langu ni Amina.", "Sijambo.", "Habari za jioni?", "Kwaheri."], answer: "Jina langu ni Amina.", explanation: "This response states your name." },
        { id: "q4", type: "english-to-native", prompt: "Choose “I am pleased to meet you.”", options: ["Nimefurahi kukufahamu.", "Jina lako ni nani?", "Asante sana.", "Karibu."], answer: "Nimefurahi kukufahamu.", explanation: "Nimefurahi kukufahamu expresses pleasure at meeting someone." }
      ]
    },
    {
      id: "swahili-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Asante.", english: "Thank you.", audioPlaceholder: "/audio/swahili/asante.mp3" },
        { native: "Asante sana.", english: "Thank you very much.", audioPlaceholder: "/audio/swahili/asante-sana.mp3" },
        { native: "Tafadhali.", english: "Please.", audioPlaceholder: "/audio/swahili/tafadhali.mp3" },
        { native: "Karibu.", english: "Welcome / You're welcome.", audioPlaceholder: "/audio/swahili/karibu.mp3" },
        { native: "Kwaheri.", english: "Goodbye.", audioPlaceholder: "/audio/swahili/kwaheri.mp3" }
      ],
      cultureCard: {
        id: "swahili-karibu-hospitality",
        title: "The Warmth of Karibu",
        emoji: "🏠",
        category: "Hospitality",
        text: "Karibu welcomes a person in and can also answer thanks in many contexts. Its meaning comes from the exchange, making it a small but powerful expression of hospitality."
      },
      conversation: [
        { speaker: "Neema", avatar: "👩🏾", native: "Tafadhali, karibu.", english: "Please, welcome.", audioPlaceholder: "/audio/swahili/tafadhali-karibu.mp3" },
        { speaker: "Baraka", avatar: "👨🏾", native: "Asante sana.", english: "Thank you very much.", audioPlaceholder: "/audio/swahili/asante-sana.mp3" },
        { speaker: "Neema", avatar: "👩🏾", native: "Karibu.", english: "You're welcome.", audioPlaceholder: "/audio/swahili/karibu.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Asante", "Tafadhali", "Kwaheri", "Habari"], answer: "Asante", explanation: "Asante expresses thanks." },
        { id: "q2", type: "english-to-native", prompt: "Choose the word for “Please.”", options: ["Tafadhali", "Karibu", "Nzuri", "Sijambo"], answer: "Tafadhali", explanation: "Tafadhali is used to make a polite request." },
        { id: "q3", type: "matching", prompt: "Match each expression with its meaning.", pairs: [{ native: "Asante", english: "Thank you" }, { native: "Tafadhali", english: "Please" }, { native: "Kwaheri", english: "Goodbye" }], explanation: "These expressions help open and close polite exchanges." },
        { id: "q4", type: "conversation", prompt: "Someone says “Asante sana.” What can you reply?", options: ["Karibu.", "Hujambo?", "Jina langu ni…", "Habari za asubuhi?"], answer: "Karibu.", explanation: "Karibu can mean “You're welcome” in this context." }
      ]
    },
    {
      id: "swahili-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "swahili-respectful-greetings",
        title: "Respect in a Single Greeting",
        emoji: "🌍",
        category: "Respect",
        text: "A younger person may greet an elder with Shikamoo, answered with Marahaba. It reflects how age and social relationship can shape the greeting you choose."
      },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Habari za asubuhi?", english: "Good morning. How is the morning?", audioPlaceholder: "/audio/swahili/habari-za-asubuhi.mp3" },
        { speaker: "Juma", avatar: "👨🏾", native: "Nzuri, asante. Jina lako ni nani?", english: "Good, thank you. What is your name?", audioPlaceholder: "/audio/swahili/nzuri-asante-jina.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Jina langu ni Amina.", english: "My name is Amina.", audioPlaceholder: "/audio/swahili/jina-langu-ni-amina.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "Choose the respectful greeting traditionally used by a younger person toward an elder.", options: ["Shikamoo.", "Sijambo.", "Kwaheri.", "Nzuri."], answer: "Shikamoo.", explanation: "Shikamoo is a respectful greeting to an elder; the traditional response is Marahaba." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Asante sana.”", options: ["Thank you very much.", "Good evening.", "I am fine.", "What is your name?"], answer: "Thank you very much.", explanation: "Asante sana strengthens Asante to mean “Thank you very much.”" },
        { id: "q3", type: "sentence-builder", prompt: "Build: What is your name?", tiles: ["Jina", "lako", "ni", "nani?"], answer: "Jina lako ni nani?", explanation: "Jina lako ni nani? asks one person for their name." },
        { id: "q4", type: "matching", prompt: "Match the greeting expressions.", pairs: [{ native: "Hujambo?", english: "Hello / How are you?" }, { native: "Sijambo.", english: "I am fine." }, { native: "Kwaheri.", english: "Goodbye." }], explanation: "These expressions open, answer, and close a basic exchange." },
        { id: "q5", type: "conversation", prompt: "An elder replies “Marahaba.” What greeting likely came first?", options: ["Shikamoo.", "Tafadhali.", "Asante.", "Kwaheri."], answer: "Shikamoo.", explanation: "Marahaba is the traditional response to Shikamoo." }
      ]
    }
  ]
};
