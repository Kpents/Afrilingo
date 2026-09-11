export const igboUnit1 = {
  id: "igbo-unit-1",
  title: "Greetings",
  subtitle: "Begin friendly and respectful exchanges in Igbo.",
  lessons: [
    {
      id: "igbo-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Ndeewo.", english: "Hello / greetings.", audioPlaceholder: "/audio/igbo/ndeewo.mp3" },
        { native: "Kedụ?", english: "How are you?", audioPlaceholder: "/audio/igbo/kedu.mp3" },
        { native: "Ọ dị mma.", english: "It is fine / good.", audioPlaceholder: "/audio/igbo/o-di-mma.mp3" },
        { native: "Kedụnụ?", english: "How are you all?", audioPlaceholder: "/audio/igbo/kedunu.mp3" }
      ],
      cultureCard: {
        id: "igbo-younger-greets-first",
        title: "Respect Starts the Greeting",
        emoji: "🤝",
        category: "Etiquette",
        text: "In many Igbo settings, a younger person or subordinate initiates the greeting as a sign of respect. Age and relationship can shape both the words and accompanying gestures."
      },
      conversation: [
        { speaker: "Emeka", avatar: "👨🏾", native: "Ndeewo. Kedụ?", english: "Hello. How are you?", audioPlaceholder: "/audio/igbo/ndeewo-kedu.mp3" },
        { speaker: "Ada", avatar: "👩🏾", native: "Ọ dị mma.", english: "It is fine / I am well.", audioPlaceholder: "/audio/igbo/o-di-mma.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Kedụ?” ask here?", options: ["How are you?", "What is your name?", "Where are you going?", "Good night"], answer: "How are you?", explanation: "Kedụ? is a common informal wellbeing greeting." },
        { id: "q2", type: "english-to-native", prompt: "Choose “It is fine / good.”", options: ["Ọ dị mma.", "Ndeewo.", "Ka chi foo.", "Biko."], answer: "Ọ dị mma.", explanation: "Ọ dị mma is a standard positive response." },
        { id: "q3", type: "conversation", prompt: "Emeka asks “Kedụ?” Choose Ada's fitting reply.", options: ["Ọ dị mma.", "Aha m bụ Ada.", "Ka ọ dị.", "Nnọọ."], answer: "Ọ dị mma.", explanation: "This response says things are fine or good." },
        { id: "q4", type: "matching", prompt: "Match the greeting forms.", pairs: [{ native: "Kedụ?", english: "How are you? — one person" }, { native: "Kedụnụ?", english: "How are you all?" }, { native: "Ndeewo", english: "Hello / greetings" }], explanation: "The plural suffix -nụ helps address more than one person." }
      ]
    },
    {
      id: "igbo-time-greetings",
      title: "Morning, Day & Night",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Ị bọọla chi?", english: "Good morning / Have you welcomed the day?", audioPlaceholder: "/audio/igbo/i-boola-chi.mp3" },
        { native: "Ndeewo.", english: "Good day / greetings.", audioPlaceholder: "/audio/igbo/ndeewo.mp3" },
        { native: "Ka chi foo.", english: "Good night / May day break.", audioPlaceholder: "/audio/igbo/ka-chi-foo.mp3" },
        { native: "Ka ọ bọọ.", english: "Good night response / May it break.", audioPlaceholder: "/audio/igbo/ka-o-boo.mp3" }
      ],
      cultureCard: {
        id: "igbo-day-does-not-map-to-english",
        title: "Not Every Greeting Translates Literally",
        emoji: "☀️",
        category: "Language Pattern",
        text: "Igbo greeting practice does not divide the day exactly like English. Ndeewo can work broadly during the day, while morning and night expressions may refer to welcoming the new day."
      },
      conversation: [
        { speaker: "Ada", avatar: "👩🏾", native: "Ị bọọla chi?", english: "Good morning. Have you welcomed the day?", audioPlaceholder: "/audio/igbo/i-boola-chi.mp3" },
        { speaker: "Emeka", avatar: "👨🏾", native: "Ee, ọ dị mma.", english: "Yes, it is well.", audioPlaceholder: "/audio/igbo/ee-o-di-mma.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression is a morning greeting?", options: ["Ị bọọla chi?", "Ka chi foo.", "Ka ọ dị.", "Biko."], answer: "Ị bọọla chi?", explanation: "Ị bọọla chi? is a morning greeting connected with the arrival of a new day." },
        { id: "q2", type: "matching", prompt: "Match each expression with its use.", pairs: [{ native: "Ị bọọla chi?", english: "Morning greeting" }, { native: "Ndeewo", english: "General daytime greeting" }, { native: "Ka chi foo", english: "Good night" }], explanation: "Igbo time-based usage does not map word-for-word to English greeting categories." },
        { id: "q3", type: "english-to-native", prompt: "Choose “Good night.”", options: ["Ka chi foo.", "Ndeewo.", "Kedụ?", "Nnọọ."], answer: "Ka chi foo.", explanation: "Ka chi foo is a good-night wish; Ka ọ bọọ can answer it." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the night wish: Ka chi ___.", options: ["foo", "mma", "dị", "nụ"], answer: "foo", explanation: "Ka chi foo wishes for daybreak." }
      ]
    },
    {
      id: "igbo-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Kedụ aha gị?", english: "What is your name?", audioPlaceholder: "/audio/igbo/kedu-aha-gi.mp3" },
        { native: "Aha m bụ Ada.", english: "My name is Ada.", audioPlaceholder: "/audio/igbo/aha-m-bu-ada.mp3" },
        { native: "Gị kwanụ?", english: "And you?", audioPlaceholder: "/audio/igbo/gi-kwanu.mp3" }
      ],
      cultureCard: {
        id: "igbo-names-tell-stories",
        title: "Names Tell Stories",
        emoji: "🪪",
        category: "Identity",
        text: "Many Igbo names carry meaningful statements about family experience, faith, hopes, or circumstances. Asking and pronouncing a name carefully recognizes that story."
      },
      conversation: [
        { speaker: "Emeka", avatar: "👨🏾", native: "Biko, kedụ aha gị?", english: "Please, what is your name?", audioPlaceholder: "/audio/igbo/biko-kedu-aha-gi.mp3" },
        { speaker: "Ada", avatar: "👩🏾", native: "Aha m bụ Ada. Gị kwanụ?", english: "My name is Ada. And you?", audioPlaceholder: "/audio/igbo/aha-m-bu-ada-gi-kwanu.mp3" },
        { speaker: "Emeka", avatar: "👨🏾", native: "Aha m bụ Emeka.", english: "My name is Emeka.", audioPlaceholder: "/audio/igbo/aha-m-bu-emeka.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Kedụ aha gị?” ask?", options: ["What is your name?", "How are your children?", "Where do you live?", "What is your work?"], answer: "What is your name?", explanation: "Aha means name; gị refers to the person addressed." },
        { id: "q2", type: "sentence-builder", prompt: "Build: My name is Ada.", tiles: ["Aha", "m", "bụ", "Ada."], answer: "Aha m bụ Ada.", explanation: "Aha m bụ … introduces your name." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Kedụ aha gị?” Choose Ada's reply.", options: ["Aha m bụ Ada.", "Ọ dị mma.", "Ka chi foo.", "Daalụ."], answer: "Aha m bụ Ada.", explanation: "This response states Ada's name." },
        { id: "q4", type: "english-to-native", prompt: "Choose “And you?”", options: ["Gị kwanụ?", "Kedụnụ?", "Ka ọ dị.", "Nnọọ."], answer: "Gị kwanụ?", explanation: "Gị kwanụ? returns the question to one person." }
      ]
    },
    {
      id: "igbo-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Daalụ.", english: "Thank you.", audioPlaceholder: "/audio/igbo/daalu.mp3" },
        { native: "Biko.", english: "Please.", audioPlaceholder: "/audio/igbo/biko.mp3" },
        { native: "Nnọọ.", english: "Welcome.", audioPlaceholder: "/audio/igbo/nnoo.mp3" },
        { native: "Ka ọ dị.", english: "Goodbye / see you.", audioPlaceholder: "/audio/igbo/ka-o-di.mp3" }
      ],
      cultureCard: {
        id: "igbo-welcome-and-return",
        title: "Nnọọ Welcomes You In",
        emoji: "🏠",
        category: "Hospitality",
        text: "Nnọọ welcomes someone who has arrived or returned. Greeting visitors warmly reflects the importance of presence, relationship, and hospitality."
      },
      conversation: [
        { speaker: "Ada", avatar: "👩🏾", native: "Nnọọ.", english: "Welcome.", audioPlaceholder: "/audio/igbo/nnoo.mp3" },
        { speaker: "Emeka", avatar: "👨🏾", native: "Daalụ.", english: "Thank you.", audioPlaceholder: "/audio/igbo/daalu.mp3" },
        { speaker: "Ada", avatar: "👩🏾", native: "Ka ọ dị.", english: "Goodbye / see you.", audioPlaceholder: "/audio/igbo/ka-o-di.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Daalụ.", "Biko.", "Nnọọ.", "Kedụ?"], answer: "Daalụ.", explanation: "Daalụ expresses thanks." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Please.”", options: ["Biko.", "Ka ọ dị.", "Ndeewo.", "Ọ dị mma."], answer: "Biko.", explanation: "Biko politely introduces or softens a request." },
        { id: "q3", type: "matching", prompt: "Match the polite expressions.", pairs: [{ native: "Daalụ", english: "Thank you" }, { native: "Nnọọ", english: "Welcome" }, { native: "Ka ọ dị", english: "Goodbye / see you" }], explanation: "These expressions welcome, thank, and close an exchange." },
        { id: "q4", type: "conversation", prompt: "Someone welcomes you with “Nnọọ.” Choose a polite reply.", options: ["Daalụ.", "Ka chi foo.", "Kedụ aha gị?", "Ọ dị mma."], answer: "Daalụ.", explanation: "Daalụ is an appropriate response of thanks." }
      ]
    },
    {
      id: "igbo-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "igbo-greeting-groups",
        title: "Greeting One and Greeting Many",
        emoji: "🌍",
        category: "Social Life",
        text: "The suffix -nụ helps address a group: Kedụnụ? asks how everyone is, while Ndewonụ greets several people. Number and social setting shape the exchange."
      },
      conversation: [
        { speaker: "Ada", avatar: "👩🏾", native: "Ndeewo. Kedụ?", english: "Hello. How are you?", audioPlaceholder: "/audio/igbo/ndeewo-kedu.mp3" },
        { speaker: "Emeka", avatar: "👨🏾", native: "Ọ dị mma, daalụ. Kedụ aha gị?", english: "It is well, thank you. What is your name?", audioPlaceholder: "/audio/igbo/o-di-mma-daalu-aha.mp3" },
        { speaker: "Ada", avatar: "👩🏾", native: "Aha m bụ Ada.", english: "My name is Ada.", audioPlaceholder: "/audio/igbo/aha-m-bu-ada.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "Choose the greeting addressed to several people.", options: ["Kedụnụ?", "Kedụ?", "Gị kwanụ?", "Aha m bụ Ada."], answer: "Kedụnụ?", explanation: "The -nụ ending marks a plural addressee here." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Ọ dị mma.”", options: ["It is fine / good.", "Good night.", "My name is Ada.", "Welcome."], answer: "It is fine / good.", explanation: "Ọ dị mma is a positive response about wellbeing or condition." },
        { id: "q3", type: "sentence-builder", prompt: "Build: What is your name?", tiles: ["Kedụ", "aha", "gị?"], answer: "Kedụ aha gị?", explanation: "This asks one person for their name." },
        { id: "q4", type: "matching", prompt: "Match the expressions with their uses.", pairs: [{ native: "Ị bọọla chi?", english: "Morning greeting" }, { native: "Ndeewo", english: "General greeting" }, { native: "Ka chi foo", english: "Good night" }], explanation: "These expressions cover morning, general daytime greeting, and night." },
        { id: "q5", type: "conversation", prompt: "Someone asks “Kedụ aha gị?” Choose a fitting reply.", options: ["Aha m bụ Emeka.", "Ndeewo.", "Biko.", "Ka ọ dị."], answer: "Aha m bụ Emeka.", explanation: "Aha m bụ … states the speaker's name." }
      ]
    }
  ]
};
