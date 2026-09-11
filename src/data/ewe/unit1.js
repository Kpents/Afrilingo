export const eweUnit1 = {
  id: "ewe-unit-1",
  title: "Greetings",
  subtitle: "Begin respectful everyday exchanges in Eʋegbe.",
  lessons: [
    {
      id: "ewe-wellbeing-greetings",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Ɛfɔa?", english: "How are you?", audioPlaceholder: "/audio/ewe/efoa.mp3" },
        { native: "Mefɔ nyuie.", english: "I am fine.", audioPlaceholder: "/audio/ewe/mefo-nyuie.mp3" },
        { native: "Woezɔ.", english: "Welcome.", audioPlaceholder: "/audio/ewe/woezo.mp3" }
      ],
      cultureCard: {
        id: "ewe-greeting-before-conversation",
        title: "Greeting Comes First",
        emoji: "🤝",
        category: "Etiquette",
        text: "In Ewe communities, greeting before discussing other matters is an important social obligation and a sign of respect. A greeting also shows interest in another person's wellbeing."
      },
      conversation: [
        { speaker: "Esi", avatar: "👩🏾", native: "Ɛfɔa?", english: "How are you?", audioPlaceholder: "/audio/ewe/efoa.mp3" },
        { speaker: "Kofi", avatar: "👨🏾", native: "Mefɔ nyuie.", english: "I am fine.", audioPlaceholder: "/audio/ewe/mefo-nyuie.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Ɛfɔa?” ask?", options: ["How are you?", "What is your name?", "Good evening", "Thank you"], answer: "How are you?", explanation: "Ɛfɔa? is a common wellbeing greeting meaning “How are you?”" },
        { id: "q2", type: "english-to-native", prompt: "Choose the Ewe response meaning “I am fine.”", options: ["Mefɔ nyuie.", "Woezɔ.", "Akpe.", "Fiẽ."], answer: "Mefɔ nyuie.", explanation: "Mefɔ nyuie means “I am fine.”" },
        { id: "q3", type: "conversation", prompt: "Esi asks “Ɛfɔa?” Choose the fitting response.", options: ["Mefɔ nyuie.", "Ŋkɔwò ɖe?", "Meɖe kuku.", "Ŋdɔ."], answer: "Mefɔ nyuie.", explanation: "A wellbeing question is naturally answered with Mefɔ nyuie." },
        { id: "q4", type: "multiple-choice", prompt: "Which phrase asks about someone's wellbeing?", options: ["Ɛfɔa?", "Akpe.", "Ŋdi.", "Fiẽ."], answer: "Ɛfɔa?", explanation: "Ɛfɔa? asks “How are you?” A reviewed native-speaker recording is still pending." }
      ]
    },
    {
      id: "ewe-time-greetings",
      title: "Morning, Day & Evening",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Ŋdi", english: "Good morning", audioPlaceholder: "/audio/ewe/ndi.mp3" },
        { native: "Ŋdɔ", english: "Good day / midday greeting", audioPlaceholder: "/audio/ewe/ndo.mp3" },
        { native: "Woale", english: "Good afternoon", audioPlaceholder: "/audio/ewe/woale.mp3" },
        { native: "Fiẽ", english: "Good evening", audioPlaceholder: "/audio/ewe/fie.mp3" }
      ],
      cultureCard: {
        id: "ewe-time-shapes-greetings",
        title: "The Time Shapes the Greeting",
        emoji: "☀️",
        category: "Daily Life",
        text: "Ewe greeting forms can follow the time of day. The Peace Corps course distinguishes morning, midday, afternoon, and evening greetings; local preferences and boundaries can vary."
      },
      conversation: [
        { speaker: "Ama", avatar: "👩🏾", native: "Ŋdi.", english: "Good morning.", audioPlaceholder: "/audio/ewe/ndi.mp3" },
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Ŋdi.", english: "Good morning.", audioPlaceholder: "/audio/ewe/ndi.mp3" },
        { speaker: "Ama", avatar: "👩🏾", native: "Mefɔ nyuie.", english: "I am fine.", audioPlaceholder: "/audio/ewe/mefo-nyuie.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which greeting is used in the morning?", options: ["Ŋdi", "Ŋdɔ", "Woale", "Fiẽ"], answer: "Ŋdi", explanation: "Ŋdi is the morning greeting in the source course." },
        { id: "q2", type: "fill-in-the-blank", prompt: "Complete the evening greeting: Fi__", options: ["ẽ", "di", "dɔ", "ale"], answer: "ẽ", explanation: "Fiẽ is the evening greeting." },
        { id: "q3", type: "matching", prompt: "Match each greeting with its period of the day.", pairs: [{ native: "Ŋdi", english: "Morning" }, { native: "Ŋdɔ", english: "Midday" }, { native: "Fiẽ", english: "Evening" }], explanation: "These greetings distinguish major periods of the day." },
        { id: "q4", type: "english-to-native", prompt: "Choose the Ewe greeting for “Good afternoon.”", options: ["Woale", "Ŋdi", "Fiẽ", "Akpe"], answer: "Woale", explanation: "Woale is listed as a good-afternoon greeting in the Peace Corps workbook." }
      ]
    },
    {
      id: "ewe-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Ŋkɔwò ɖe?", english: "What is your name?", audioPlaceholder: "/audio/ewe/nkowo-de.mp3" },
        { native: "Ŋkɔnye enye Ama.", english: "My name is Ama.", audioPlaceholder: "/audio/ewe/nkonye-enye-ama.mp3" }
      ],
      cultureCard: {
        id: "ewe-names-and-respect",
        title: "Names and Respectful Address",
        emoji: "🪪",
        category: "Identity",
        text: "The Peace Corps course notes that respectful titles may precede a person's name, especially when addressing elders. It also describes Ewe day names connected to the day of birth."
      },
      conversation: [
        { speaker: "Yawa", avatar: "👩🏾", native: "Meɖe kuku, ŋkɔwò ɖe?", english: "Please, what is your name?", audioPlaceholder: "/audio/ewe/nkowo-de.mp3" },
        { speaker: "Ama", avatar: "👩🏾", native: "Ŋkɔnye enye Ama.", english: "My name is Ama.", audioPlaceholder: "/audio/ewe/nkonye-enye-ama.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Ŋkɔwò ɖe?” mean?", options: ["What is your name?", "How are you?", "Where are you?", "Good morning"], answer: "What is your name?", explanation: "Ŋkɔwò ɖe? asks a person's name." },
        { id: "q2", type: "sentence-builder", prompt: "Build the Ewe sentence: My name is Ama.", tiles: ["Ŋkɔnye", "enye", "Ama."], answer: "Ŋkɔnye enye Ama.", explanation: "Ŋkɔnye enye … is used to state your name." },
        { id: "q3", type: "fill-in-the-blank", prompt: "Complete: Ŋkɔnye enye ___.", options: ["Ama", "Ŋdi", "Akpe", "Fiẽ"], answer: "Ama", explanation: "A name follows Ŋkɔnye enye." },
        { id: "q4", type: "conversation", prompt: "Someone asks “Ŋkɔwò ɖe?” Choose the fitting reply.", options: ["Ŋkɔnye enye Ama.", "Mefɔ nyuie.", "Ŋdɔ.", "Woezɔ."], answer: "Ŋkɔnye enye Ama.", explanation: "This response means “My name is Ama.”" }
      ]
    },
    {
      id: "ewe-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Akpe.", english: "Thank you.", audioPlaceholder: "/audio/ewe/akpe.mp3" },
        { native: "Meɖe kuku.", english: "Please / excuse me.", audioPlaceholder: "/audio/ewe/mede-kuku.mp3" },
        { native: "Yoo.", english: "Okay.", audioPlaceholder: "/audio/ewe/yoo.mp3" }
      ],
      cultureCard: {
        id: "ewe-politeness-in-context",
        title: "Politeness Lives in Context",
        emoji: "💛",
        category: "Respect",
        text: "Meɖe kuku can soften a request or introduce a polite question, while Akpe expresses thanks. Their use is best learned inside complete exchanges rather than as isolated substitutions."
      },
      conversation: [
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Meɖe kuku, nɔ anyi.", english: "Please, have a seat.", audioPlaceholder: "/audio/ewe/mede-kuku-no-anyi.mp3" },
        { speaker: "Esi", avatar: "👩🏾", native: "Yoo, akpe.", english: "Okay, thank you.", audioPlaceholder: "/audio/ewe/yoo-akpe.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Akpe", "Meɖe kuku", "Ŋdi", "Fiẽ"], answer: "Akpe", explanation: "Akpe expresses thanks." },
        { id: "q2", type: "english-to-native", prompt: "Choose the polite expression meaning “Please / excuse me.”", options: ["Meɖe kuku", "Mefɔ nyuie", "Woezɔ", "Ŋdɔ"], answer: "Meɖe kuku", explanation: "Meɖe kuku is used for “please” or “excuse me” in polite requests." },
        { id: "q3", type: "sentence-builder", prompt: "Build the polite phrase: Please, have a seat.", tiles: ["Meɖe", "kuku,", "nɔ", "anyi."], answer: "Meɖe kuku, nɔ anyi.", explanation: "This complete expression politely invites one person to sit." },
        { id: "q4", type: "conversation", prompt: "Someone helps you. What can you say?", options: ["Akpe.", "Fiẽ.", "Ŋkɔwò ɖe?", "Ɛfɔa?"], answer: "Akpe.", explanation: "Akpe is the appropriate expression of thanks." }
      ]
    },
    {
      id: "ewe-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "ewe-first-respectful-exchange",
        title: "Your First Respectful Exchange",
        emoji: "🌍",
        category: "Milestone",
        text: "You can now choose time-based greetings, ask about wellbeing, exchange names, and use basic polite expressions. Regional usage should continue to be refined through listening and native-speaker feedback."
      },
      conversation: [
        { speaker: "Esi", avatar: "👩🏾", native: "Ŋdi. Ɛfɔa?", english: "Good morning. How are you?", audioPlaceholder: "/audio/ewe/ndi-efoa.mp3" },
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Mefɔ nyuie, akpe.", english: "I am fine, thank you.", audioPlaceholder: "/audio/ewe/mefo-nyuie-akpe.mp3" },
        { speaker: "Esi", avatar: "👩🏾", native: "Ŋkɔwò ɖe?", english: "What is your name?", audioPlaceholder: "/audio/ewe/nkowo-de.mp3" },
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Ŋkɔnye enye Kɔsi.", english: "My name is Kɔsi.", audioPlaceholder: "/audio/ewe/nkonye-enye-kosi.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "You meet someone in the morning. Choose the greeting.", options: ["Ŋdi", "Fiẽ", "Akpe", "Meɖe kuku"], answer: "Ŋdi", explanation: "Ŋdi is the morning greeting." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Mefɔ nyuie.”", options: ["I am fine.", "My name is Esi.", "Good evening.", "Please."], answer: "I am fine.", explanation: "Mefɔ nyuie means “I am fine.”" },
        { id: "q3", type: "english-to-native", prompt: "How do you ask “What is your name?”", options: ["Ŋkɔwò ɖe?", "Ɛfɔa?", "Ŋdɔ.", "Akpe."], answer: "Ŋkɔwò ɖe?", explanation: "Ŋkɔwò ɖe? asks for a person's name." },
        { id: "q4", type: "matching", prompt: "Match the expressions with their meanings.", pairs: [{ native: "Akpe", english: "Thank you" }, { native: "Meɖe kuku", english: "Please" }, { native: "Fiẽ", english: "Good evening" }], explanation: "These expressions combine politeness and time-based greeting skills." },
        { id: "q5", type: "sentence-builder", prompt: "Build: I am fine, thank you.", tiles: ["Mefɔ", "nyuie,", "akpe."], answer: "Mefɔ nyuie, akpe.", explanation: "This combines a wellbeing response with thanks." }
      ]
    }
  ]
};
