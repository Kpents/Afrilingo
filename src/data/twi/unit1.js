export const unit1 = {
  id: "twi-unit-1",
  title: "Greetings",
  subtitle: "Survive your first basic real-life interaction in Twi.",
  lessons: [
    {
      id: "saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      cultureCard: {
        id: "greeting-is-respect",
        title: "Greeting is Respect",
        emoji: "🤝",
        text: "In many Akan communities, greeting someone is an important sign of respect. A greeting often comes before asking a question or beginning a conversation.",
        category: "Etiquette"
      },
      conversation: [
        { speaker: "Ama", avatar: "👩🏾", native: "Agoo!", english: "Hello / attention!" },
        { speaker: "Kojo", avatar: "👨🏾", native: "Yaa agoo!", english: "Response to Agoo!" },
        { speaker: "Ama", avatar: "👩🏾", native: "Ɛte sɛn?", english: "How are you?" },
        { speaker: "Kojo", avatar: "👨🏾", native: "Me ho yɛ.", english: "I am fine." }
      ],
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          prompt: "Which phrase means “How are you?”",
          options: ["Medaase", "Ɛte sɛn?", "Maadwo", "Agoo"],
          answer: "Ɛte sɛn?",
          explanation: "Ɛte sɛn? is used to ask how someone is doing."
        },
        {
          id: "q2",
          type: "multiple-choice",
          prompt: "Choose the greeting used to call for attention or announce yourself.",
          options: ["Agoo", "Maakye", "Mepa wo kyɛw", "Me din de"],
          answer: "Agoo",
          explanation: "Agoo can be used to announce yourself or call for attention."
        },
        {
          id: "q3",
          type: "native-to-english",
          prompt: "Translate to English: “Me ho yɛ.”",
          options: ["I am fine", "Good evening", "Thank you", "Please"],
          answer: "I am fine",
          explanation: "Me ho yɛ means “I am fine.”"
        },
        {
          id: "q4",
          type: "conversation",
          prompt: "Ama says: “Ɛte sɛn?” What is the best reply?",
          options: ["Me ho yɛ.", "Maaha", "Agoo", "Medaase"],
          answer: "Me ho yɛ.",
          explanation: "Me ho yɛ is a natural response meaning “I am fine.”"
        },
        {
          id: "q5",
          type: "sentence-builder",
          prompt: "Build the Twi question: How are you?",
          tiles: ["Ɛte", "sɛn?"],
          answer: "Ɛte sɛn?",
          explanation: "Ɛte sɛn? is the standard phrase used here to ask how someone is doing."
        }
      ]
    },
    {
      id: "time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌞",
      xp: 50,
      cultureCard: {
        id: "time-matters",
        title: "Time Matters in Greetings",
        emoji: "🌅",
        text: "Twi greetings often reflect the time of day. Using the right greeting makes your speech feel more natural and respectful.",
        category: "Daily Life"
      },
      conversation: [
        { speaker: "Yaw", avatar: "👨🏾", native: "Maakye.", english: "Good morning." },
        { speaker: "Esi", avatar: "👩🏾", native: "Yaa agya.", english: "Respectful response to an older man." },
        { speaker: "Yaw", avatar: "👨🏾", native: "Maaha.", english: "Good afternoon." },
        { speaker: "Esi", avatar: "👩🏾", native: "Maadwo.", english: "Good evening." }
      ],
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          prompt: "Which phrase means “Good morning”?",
          options: ["Maakye", "Maaha", "Maadwo", "Medaase"],
          answer: "Maakye",
          explanation: "Maakye is the morning greeting."
        },
        {
          id: "q2",
          type: "multiple-choice",
          prompt: "Which greeting fits the afternoon?",
          options: ["Maaha", "Maakye", "Agoo", "Ɛte sɛn?"],
          answer: "Maaha",
          explanation: "Maaha is used in the afternoon."
        },
        {
          id: "q3",
          type: "multiple-choice",
          prompt: "Which phrase means “Good evening”?",
          options: ["Medaase", "Maadwo", "Maaha", "Maakye"],
          answer: "Maadwo",
          explanation: "Maadwo is the evening greeting."
        },
        {
          id: "q4",
          type: "fill-in-the-blank",
          prompt: "Complete the evening greeting: Maa___",
          options: ["dwo", "kye", "ha", "daase"],
          answer: "dwo",
          explanation: "Maadwo is the Twi greeting used in the evening."
        }
      ]
    },
    {
      id: "introducing-yourself",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      cultureCard: {
        id: "names-and-identity",
        title: "Names Carry Identity",
        emoji: "🪪",
        text: "Names are deeply connected to identity in Akan communities. Introducing yourself is often the first step toward building familiarity and trust.",
        category: "Identity"
      },
      conversation: [
        { speaker: "Abena", avatar: "👩🏾", native: "Wo din de sɛn?", english: "What is your name?" },
        { speaker: "Kofi", avatar: "👨🏾", native: "Me din de Kofi.", english: "My name is Kofi." }
      ],
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          prompt: "What does “Wo din de sɛn?” mean?",
          options: ["What is your name?", "How are you?", "Where are you going?", "Good morning"],
          answer: "What is your name?",
          explanation: "Wo din de sɛn? asks for someone's name."
        },
        {
          id: "q2",
          type: "english-to-native",
          prompt: "Complete the sentence: “Me din de ___.”",
          options: ["Kofi", "Maakye", "Medaase", "Agoo"],
          answer: "Kofi",
          explanation: "Me din de ... means “My name is ...”"
        }
      ]
    },
    {
      id: "thank-you-please",
      title: "Thank You & Please",
      emoji: "❤️",
      xp: 60,
      cultureCard: {
        id: "gratitude-and-politeness",
        title: "Gratitude Builds Warmth",
        emoji: "🙏🏾",
        text: "Politeness and gratitude are central to warm social interaction. Expressions such as Medaase and Mepa wo kyɛw help make requests and responses more respectful.",
        category: "Respect"
      },
      conversation: [
        { speaker: "Akua", avatar: "👩🏾", native: "Mepa wo kyɛw.", english: "Please." },
        { speaker: "Nana", avatar: "👴🏾", native: "Yoo.", english: "Okay." },
        { speaker: "Akua", avatar: "👩🏾", native: "Medaase.", english: "Thank you." }
      ],
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          prompt: "Which phrase means “Thank you”?",
          options: ["Medaase", "Maaha", "Agoo", "Ɛte sɛn?"],
          answer: "Medaase",
          explanation: "Medaase means “Thank you.”"
        },
        {
          id: "q2",
          type: "multiple-choice",
          prompt: "Which phrase is used for “Please”?",
          options: ["Mepa wo kyɛw", "Maakye", "Me ho yɛ", "Maadwo"],
          answer: "Mepa wo kyɛw",
          explanation: "Mepa wo kyɛw is a polite way to say “Please.”"
        },
        {
          id: "q3",
          type: "listening",
          prompt: "Choose the phrase represented by this audio exercise.",
          audio: "/audio/twi/medaase.mp3",
          options: ["Medaase", "Maakye", "Maadwo", "Agoo"],
          answer: "Medaase",
          explanation: "Medaase means “Thank you.” Real native-speaker audio can be added at this path later."
        }
      ]
    },
    {
      id: "greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "unit-one-complete",
        title: "You Can Open a Conversation",
        emoji: "🌍",
        text: "You have learned the building blocks of a basic Twi greeting: opening a conversation, greeting by time of day, introducing yourself, and showing gratitude.",
        category: "Milestone"
      },
      conversation: [
        { speaker: "Ama", avatar: "👩🏾", native: "Maakye.", english: "Good morning." },
        { speaker: "Kojo", avatar: "👨🏾", native: "Maakye.", english: "Good morning." },
        { speaker: "Ama", avatar: "👩🏾", native: "Wo din de sɛn?", english: "What is your name?" },
        { speaker: "Kojo", avatar: "👨🏾", native: "Me din de Kojo.", english: "My name is Kojo." },
        { speaker: "Ama", avatar: "👩🏾", native: "Medaase.", english: "Thank you." }
      ],
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          prompt: "You meet someone in the morning. What do you say?",
          options: ["Maakye", "Maadwo", "Medaase", "Agoo"],
          answer: "Maakye",
          explanation: "Maakye is the morning greeting."
        },
        {
          id: "q2",
          type: "multiple-choice",
          prompt: "How do you ask “What is your name?”",
          options: ["Wo din de sɛn?", "Ɛte sɛn?", "Mepa wo kyɛw", "Me ho yɛ"],
          answer: "Wo din de sɛn?",
          explanation: "Wo din de sɛn? asks for someone's name."
        },
        {
          id: "q3",
          type: "multiple-choice",
          prompt: "Choose the polite phrase meaning “Please.”",
          options: ["Mepa wo kyɛw", "Medaase", "Maaha", "Agoo"],
          answer: "Mepa wo kyɛw",
          explanation: "Mepa wo kyɛw means “Please.”"
        },
        {
          id: "q4",
          type: "multiple-choice",
          prompt: "Which is the correct evening greeting?",
          options: ["Maadwo", "Maakye", "Maaha", "Ɛte sɛn?"],
          answer: "Maadwo",
          explanation: "Maadwo means “Good evening.”"
        },
        {
          id: "q5",
          type: "matching",
          prompt: "Match each Twi greeting with its English meaning.",
          pairs: [
            { native: "Maakye", english: "Good morning" },
            { native: "Maaha", english: "Good afternoon" },
            { native: "Maadwo", english: "Good evening" }
          ],
          explanation: "These three greetings follow the time of day."
        }
      ]
    }
  ]
};
