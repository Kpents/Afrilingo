export const hausaUnit1 = {
  id: "hausa-unit-1",
  title: "Greetings",
  subtitle: "Begin warm everyday exchanges in Hausa.",
  lessons: [
    {
      id: "hausa-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Sannu.", english: "Hello / greetings.", audioPlaceholder: "/audio/hausa/sannu.mp3" },
        { native: "Yaya kake?", english: "How are you? (to a man)", audioPlaceholder: "/audio/hausa/yaya-kake.mp3" },
        { native: "Yaya kike?", english: "How are you? (to a woman)", audioPlaceholder: "/audio/hausa/yaya-kike.mp3" },
        { native: "Lafiya lau.", english: "Very well / in good health.", audioPlaceholder: "/audio/hausa/lafiya-lau.mp3" }
      ],
      cultureCard: {
        id: "hausa-greetings-open-conversation",
        title: "Everything Starts with Greeting",
        emoji: "🤝",
        category: "Etiquette",
        text: "Hausa greetings often open a longer exchange about health, home, family, work, and the day. Taking time to ask shows care and helps build relationships."
      },
      conversation: [
        { speaker: "Musa", avatar: "👨🏾", native: "Sannu. Yaya kike?", english: "Hello. How are you?", audioPlaceholder: "/audio/hausa/sannu-yaya-kike.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Lafiya lau.", english: "Very well.", audioPlaceholder: "/audio/hausa/lafiya-lau.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Sannu” do here?", options: ["It greets someone", "It asks a name", "It says goodbye", "It gives thanks"], answer: "It greets someone", explanation: "Sannu is a widely used greeting and can also acknowledge someone's effort or condition." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Very well / in good health.”", options: ["Lafiya lau.", "Sai an jima.", "Na gode.", "Sunana Musa."], answer: "Lafiya lau.", explanation: "Lafiya lau is a strong positive response about wellbeing." },
        { id: "q3", type: "conversation", prompt: "Musa asks Amina “Yaya kike?” Choose the fitting reply.", options: ["Lafiya lau.", "Sunana Amina.", "Barka da yamma.", "Sai an jima."], answer: "Lafiya lau.", explanation: "Yaya kike? asks a woman how she is." },
        { id: "q4", type: "matching", prompt: "Match each question with the person addressed.", pairs: [{ native: "Yaya kake?", english: "How are you? — man" }, { native: "Yaya kike?", english: "How are you? — woman" }, { native: "Sannu", english: "Hello / greetings" }], explanation: "Hausa second-person forms can reflect the gender of one person being addressed." }
      ]
    },
    {
      id: "hausa-time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Ina kwana?", english: "Good morning / How did you sleep?", audioPlaceholder: "/audio/hausa/ina-kwana.mp3" },
        { native: "Ina yini?", english: "Good afternoon / How is the day?", audioPlaceholder: "/audio/hausa/ina-yini.mp3" },
        { native: "Barka da yamma.", english: "Good evening.", audioPlaceholder: "/audio/hausa/barka-da-yamma.mp3" },
        { native: "A kwana lafiya.", english: "Good night / Sleep in health.", audioPlaceholder: "/audio/hausa/a-kwana-lafiya.mp3" }
      ],
      cultureCard: {
        id: "hausa-time-greetings-are-questions",
        title: "A Greeting Can Be a Question",
        emoji: "☀️",
        category: "Daily Life",
        text: "Ina kwana? is conventionally a morning greeting but literally asks how someone slept. Many Hausa greetings express concern for how a person has passed part of the day."
      },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Ina kwana?", english: "Good morning. How did you sleep?", audioPlaceholder: "/audio/hausa/ina-kwana.mp3" },
        { speaker: "Musa", avatar: "👨🏾", native: "Lafiya lau.", english: "Very well.", audioPlaceholder: "/audio/hausa/lafiya-lau.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression is a morning greeting?", options: ["Ina kwana?", "Ina yini?", "Barka da yamma.", "Sai an jima."], answer: "Ina kwana?", explanation: "Ina kwana? is used in the morning and asks how someone slept." },
        { id: "q2", type: "matching", prompt: "Match the greetings with their times.", pairs: [{ native: "Ina kwana?", english: "Morning" }, { native: "Ina yini?", english: "Afternoon / day" }, { native: "Barka da yamma", english: "Evening" }], explanation: "These forms anchor greeting exchanges at different times of day." },
        { id: "q3", type: "english-to-native", prompt: "Choose “Good evening.”", options: ["Barka da yamma.", "Ina kwana?", "A kwana lafiya.", "Sannu da zuwa."], answer: "Barka da yamma.", explanation: "Yamma refers to evening." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the good-night wish: A kwana ___.", options: ["lafiya", "yamma", "yini", "gode"], answer: "lafiya", explanation: "A kwana lafiya wishes that someone sleep in health." }
      ]
    },
    {
      id: "hausa-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Menene sunanka?", english: "What is your name? (to a man)", audioPlaceholder: "/audio/hausa/menene-sunanka.mp3" },
        { native: "Menene sunanki?", english: "What is your name? (to a woman)", audioPlaceholder: "/audio/hausa/menene-sunanki.mp3" },
        { native: "Sunana Amina.", english: "My name is Amina.", audioPlaceholder: "/audio/hausa/sunana-amina.mp3" }
      ],
      cultureCard: {
        id: "hausa-gender-in-address",
        title: "The Listener Shapes the Word",
        emoji: "🗣️",
        category: "Language Pattern",
        text: "When addressing one person, Hausa forms can distinguish a male listener from a female listener. Sunanka asks a man his name; sunanki asks a woman."
      },
      conversation: [
        { speaker: "Musa", avatar: "👨🏾", native: "Menene sunanki?", english: "What is your name?", audioPlaceholder: "/audio/hausa/menene-sunanki.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Sunana Amina.", english: "My name is Amina.", audioPlaceholder: "/audio/hausa/sunana-amina.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Menene sunanka?", english: "What is your name?", audioPlaceholder: "/audio/hausa/menene-sunanka.mp3" },
        { speaker: "Musa", avatar: "👨🏾", native: "Sunana Musa.", english: "My name is Musa.", audioPlaceholder: "/audio/hausa/sunana-musa.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Menene sunanki?” ask a woman?", options: ["What is your name?", "How is your family?", "Where are you going?", "How did you sleep?"], answer: "What is your name?", explanation: "Sunanki means your name when addressing one woman." },
        { id: "q2", type: "sentence-builder", prompt: "Build: My name is Amina.", tiles: ["Sunana", "Amina."], answer: "Sunana Amina.", explanation: "Sunana … introduces your name." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Menene sunanka?” Choose Musa's reply.", options: ["Sunana Musa.", "Lafiya lau.", "Ina kwana?", "Na gode."], answer: "Sunana Musa.", explanation: "This response states Musa's name." },
        { id: "q4", type: "matching", prompt: "Match the forms with the listener.", pairs: [{ native: "sunanka", english: "your name — man" }, { native: "sunanki", english: "your name — woman" }, { native: "sunana", english: "my name" }], explanation: "The endings distinguish my name and your name for male or female listeners." }
      ]
    },
    {
      id: "hausa-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Na gode.", english: "Thank you.", audioPlaceholder: "/audio/hausa/na-gode.mp3" },
        { native: "Don Allah.", english: "Please.", audioPlaceholder: "/audio/hausa/don-allah.mp3" },
        { native: "Sannu da zuwa.", english: "Welcome.", audioPlaceholder: "/audio/hausa/sannu-da-zuwa.mp3" },
        { native: "Babu laifi.", english: "You're welcome / no problem.", audioPlaceholder: "/audio/hausa/babu-laifi.mp3" },
        { native: "Sai an jima.", english: "Goodbye / see you later.", audioPlaceholder: "/audio/hausa/sai-an-jima.mp3" }
      ],
      cultureCard: {
        id: "hausa-sannu-and-care",
        title: "Sannu Shows Care",
        emoji: "💛",
        category: "Respect",
        text: "Sannu can greet, encourage, sympathize, or acknowledge effort depending on context. Its social meaning is broader than a single English translation."
      },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Sannu da zuwa.", english: "Welcome.", audioPlaceholder: "/audio/hausa/sannu-da-zuwa.mp3" },
        { speaker: "Musa", avatar: "👨🏾", native: "Na gode.", english: "Thank you.", audioPlaceholder: "/audio/hausa/na-gode.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Babu laifi.", english: "You're welcome.", audioPlaceholder: "/audio/hausa/babu-laifi.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Na gode.", "Don Allah.", "Sai an jima.", "Ina yini?"], answer: "Na gode.", explanation: "Na gode expresses thanks." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Please.”", options: ["Don Allah.", "Babu laifi.", "Lafiya lau.", "Sannu da zuwa."], answer: "Don Allah.", explanation: "Don Allah is commonly used to make a request polite." },
        { id: "q3", type: "matching", prompt: "Match the polite expressions.", pairs: [{ native: "Na gode", english: "Thank you" }, { native: "Sannu da zuwa", english: "Welcome" }, { native: "Sai an jima", english: "Goodbye / see you later" }], explanation: "These expressions welcome, thank, and close an exchange." },
        { id: "q4", type: "conversation", prompt: "Someone says “Na gode.” Choose a fitting response.", options: ["Babu laifi.", "Ina kwana?", "Sunana Amina.", "Barka da yamma."], answer: "Babu laifi.", explanation: "Babu laifi can respond to thanks as “You're welcome” or “no problem.”" }
      ]
    },
    {
      id: "hausa-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "hausa-wellbeing-beyond-one-person",
        title: "Ask Beyond the Individual",
        emoji: "🏠",
        category: "Social Life",
        text: "A Hausa greeting exchange may continue with Ina gida?—asking about the household. Greeting well means recognizing that a person's wellbeing is connected to family and community."
      },
      conversation: [
        { speaker: "Musa", avatar: "👨🏾", native: "Ina kwana? Yaya kike?", english: "Good morning. How are you?", audioPlaceholder: "/audio/hausa/ina-kwana-yaya-kike.mp3" },
        { speaker: "Amina", avatar: "👩🏾", native: "Lafiya lau, na gode. Menene sunanka?", english: "Very well, thank you. What is your name?", audioPlaceholder: "/audio/hausa/lafiya-na-gode-sunanka.mp3" },
        { speaker: "Musa", avatar: "👨🏾", native: "Sunana Musa.", english: "My name is Musa.", audioPlaceholder: "/audio/hausa/sunana-musa.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "Choose the morning greeting.", options: ["Ina kwana?", "Barka da yamma.", "Sai an jima.", "Sannu da zuwa."], answer: "Ina kwana?", explanation: "Ina kwana? is the conventional morning greeting." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Lafiya lau.”", options: ["Very well / in good health.", "Good evening.", "My name is Musa.", "Please."], answer: "Very well / in good health.", explanation: "Lafiya lau gives a strongly positive wellbeing response." },
        { id: "q3", type: "sentence-builder", prompt: "Build: What is your name? (to a woman)", tiles: ["Menene", "sunanki?"], answer: "Menene sunanki?", explanation: "Sunanki addresses one woman." },
        { id: "q4", type: "matching", prompt: "Match the time-based greetings.", pairs: [{ native: "Ina kwana?", english: "Morning" }, { native: "Ina yini?", english: "Afternoon / day" }, { native: "Barka da yamma", english: "Evening" }], explanation: "These greetings distinguish major periods of the day." },
        { id: "q5", type: "conversation", prompt: "Someone welcomes you with “Sannu da zuwa.” Choose a polite reply.", options: ["Na gode.", "Sai an jima.", "Menene sunanka?", "Ina yini?"], answer: "Na gode.", explanation: "Na gode is an appropriate expression of thanks." }
      ]
    }
  ]
};
