export const shonaUnit1 = {
  id: "shona-unit-1",
  title: "Greetings",
  subtitle: "Begin warm, respectful exchanges in chiShona.",
  lessons: [
    {
      id: "shona-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Mhoro.", english: "Hello. (one peer)", audioPlaceholder: "/audio/shona/mhoro.mp3" },
        { native: "Mhoroi.", english: "Hello. (respectful / plural)", audioPlaceholder: "/audio/shona/mhoroi.mp3" },
        { native: "Wakadii?", english: "How are you? (one peer)", audioPlaceholder: "/audio/shona/wakadii.mp3" },
        { native: "Makadii?", english: "How are you? (respectful / plural)", audioPlaceholder: "/audio/shona/makadii.mp3" },
        { native: "Ndiripo zangu.", english: "I am very well / I am fine.", audioPlaceholder: "/audio/shona/ndiripo-zangu.mp3" }
      ],
      cultureCard: {
        id: "shona-respect-in-plural-forms",
        title: "The Plural of Respect",
        emoji: "🤝",
        category: "Respect",
        text: "Shona plural forms can respectfully address one elder or stranger. Makadii? may therefore mean “How are you?” to one respected person or to several people."
      },
      conversation: [
        { speaker: "Tariro", avatar: "👩🏾", native: "Mhoroi. Makadii?", english: "Hello. How are you?", audioPlaceholder: "/audio/shona/mhoroi-makadii.mp3" },
        { speaker: "VaMoyo", avatar: "👨🏾", native: "Ndiripo zangu.", english: "I am very well.", audioPlaceholder: "/audio/shona/ndiripo-zangu.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Makadii?” ask respectfully?", options: ["How are you?", "What is your name?", "Good night", "Where are you going?"], answer: "How are you?", explanation: "Makadii? addresses several people or one respected person." },
        { id: "q2", type: "english-to-native", prompt: "Choose the respectful or plural “Hello.”", options: ["Mhoroi.", "Mhoro.", "Ndatenda.", "Chisarai."], answer: "Mhoroi.", explanation: "The final -i helps mark plural or respectful address here." },
        { id: "q3", type: "conversation", prompt: "Tariro asks “Makadii?” Choose the fitting response.", options: ["Ndiripo zangu.", "Ndinonzi Tino.", "Manheru.", "Ndapota."], answer: "Ndiripo zangu.", explanation: "Ndiripo zangu is a positive wellbeing response." },
        { id: "q4", type: "matching", prompt: "Match the familiar and respectful forms.", pairs: [{ native: "Mhoro", english: "Hello — one peer" }, { native: "Mhoroi", english: "Hello — respectful / plural" }, { native: "Makadii?", english: "How are you? — respectful / plural" }], explanation: "Shona marks social relationship and number in greeting forms." }
      ]
    },
    {
      id: "shona-time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Mangwananii.", english: "Good morning. (respectful / plural)", audioPlaceholder: "/audio/shona/mangwananii.mp3" },
        { native: "Masikatii.", english: "Good afternoon. (respectful / plural)", audioPlaceholder: "/audio/shona/masikatii.mp3" },
        { native: "Manherui.", english: "Good evening. (respectful / plural)", audioPlaceholder: "/audio/shona/manherui.mp3" },
        { native: "Murare zvakanaka.", english: "Good night / sleep well. (respectful / plural)", audioPlaceholder: "/audio/shona/murare-zvakanaka.mp3" }
      ],
      cultureCard: {
        id: "shona-time-and-respect",
        title: "Time and Respect Work Together",
        emoji: "☀️",
        category: "Daily Life",
        text: "Time-based greetings can also carry respectful endings. Mangwananii, Masikatii, and Manherui address a group or show respect to one person."
      },
      conversation: [
        { speaker: "Tino", avatar: "👨🏾", native: "Mangwananii, Amai.", english: "Good morning, mother / ma'am.", audioPlaceholder: "/audio/shona/mangwananii-amai.mp3" },
        { speaker: "Amai", avatar: "👩🏾", native: "Mangwanani, mwanangu.", english: "Good morning, my child.", audioPlaceholder: "/audio/shona/mangwanani-mwanangu.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which respectful greeting is used in the morning?", options: ["Mangwananii.", "Masikatii.", "Manherui.", "Chisarai."], answer: "Mangwananii.", explanation: "Mangwananii is the respectful or plural morning form in the source lesson." },
        { id: "q2", type: "matching", prompt: "Match each greeting with its time.", pairs: [{ native: "Mangwananii", english: "Morning" }, { native: "Masikatii", english: "Afternoon" }, { native: "Manherui", english: "Evening" }], explanation: "These forms distinguish the main periods of the day." },
        { id: "q3", type: "english-to-native", prompt: "Choose the respectful “Good evening.”", options: ["Manherui.", "Mangwananii.", "Masikatii.", "Mhoroi."], answer: "Manherui.", explanation: "Manheru refers to evening; final -i marks respect or plurality here." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the good-night wish: Murare ___.", options: ["zvakanaka", "masikati", "mangwanani", "zangu"], answer: "zvakanaka", explanation: "Murare zvakanaka wishes that someone sleep well." }
      ]
    },
    {
      id: "shona-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Unonzi ani?", english: "What are you called? (one peer)", audioPlaceholder: "/audio/shona/unonzi-ani.mp3" },
        { native: "Munonzi ani?", english: "What are you called? (respectful / plural)", audioPlaceholder: "/audio/shona/munonzi-ani.mp3" },
        { native: "Ndinonzi Tariro.", english: "My name is Tariro / I am called Tariro.", audioPlaceholder: "/audio/shona/ndinonzi-tariro.mp3" }
      ],
      cultureCard: {
        id: "shona-names-and-meaning",
        title: "A Name Can Express a Hope",
        emoji: "🪪",
        category: "Identity",
        text: "Many Shona names are meaningful words or statements. Tariro means hope, while names can reflect gratitude, faith, family circumstances, or aspirations."
      },
      conversation: [
        { speaker: "Tariro", avatar: "👩🏾", native: "Mhoroi. Munonzi ani?", english: "Hello. What is your name?", audioPlaceholder: "/audio/shona/mhoroi-munonzi-ani.mp3" },
        { speaker: "Tino", avatar: "👨🏾", native: "Ndinonzi Tino.", english: "My name is Tino.", audioPlaceholder: "/audio/shona/ndinonzi-tino.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Munonzi ani?” ask respectfully?", options: ["What is your name?", "How are you?", "Where do you live?", "What time is it?"], answer: "What is your name?", explanation: "Munonzi ani? asks a respected person or group what they are called." },
        { id: "q2", type: "sentence-builder", prompt: "Build: My name is Tariro.", tiles: ["Ndinonzi", "Tariro."], answer: "Ndinonzi Tariro.", explanation: "Ndinonzi … means I am called … and introduces your name." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Unonzi ani?” Choose Tariro's reply.", options: ["Ndinonzi Tariro.", "Ndiripo zangu.", "Mangwananii.", "Ndatenda."], answer: "Ndinonzi Tariro.", explanation: "This response states Tariro's name." },
        { id: "q4", type: "matching", prompt: "Match the introduction forms.", pairs: [{ native: "Unonzi ani?", english: "Your name? — one peer" }, { native: "Munonzi ani?", english: "Your name? — respectful / plural" }, { native: "Ndinonzi…", english: "My name is…" }], explanation: "The verb form changes with the person or people addressed." }
      ]
    },
    {
      id: "shona-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Ndatenda.", english: "Thank you.", audioPlaceholder: "/audio/shona/ndatenda.mp3" },
        { native: "Ndapota.", english: "Please.", audioPlaceholder: "/audio/shona/ndapota.mp3" },
        { native: "Titambire.", english: "You're welcome.", audioPlaceholder: "/audio/shona/titambire.mp3" },
        { native: "Chisarai.", english: "Goodbye / remain well. (respectful / plural)", audioPlaceholder: "/audio/shona/chisarai.mp3" }
      ],
      cultureCard: {
        id: "shona-goodbye-follows-direction",
        title: "Leaving and Remaining Matter",
        emoji: "🚶🏾",
        category: "Language Pattern",
        text: "Shona leave-taking can reflect who is going and who is staying. Chisarai is said to those remaining behind, expressing more than a generic English goodbye."
      },
      conversation: [
        { speaker: "Tino", avatar: "👨🏾", native: "Ndatenda.", english: "Thank you.", audioPlaceholder: "/audio/shona/ndatenda.mp3" },
        { speaker: "Tariro", avatar: "👩🏾", native: "Titambire.", english: "You're welcome.", audioPlaceholder: "/audio/shona/titambire.mp3" },
        { speaker: "Tino", avatar: "👨🏾", native: "Chisarai.", english: "Goodbye; remain well.", audioPlaceholder: "/audio/shona/chisarai.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Ndatenda.", "Ndapota.", "Titambire.", "Makadii?"], answer: "Ndatenda.", explanation: "Ndatenda expresses thanks." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Please.”", options: ["Ndapota.", "Chisarai.", "Mhoroi.", "Ndiripo zangu."], answer: "Ndapota.", explanation: "Ndapota politely introduces or softens a request." },
        { id: "q3", type: "matching", prompt: "Match the polite expressions.", pairs: [{ native: "Ndatenda", english: "Thank you" }, { native: "Ndapota", english: "Please" }, { native: "Titambire", english: "You're welcome" }], explanation: "These expressions help shape a polite exchange." },
        { id: "q4", type: "conversation", prompt: "Someone says “Ndatenda.” Choose a fitting reply.", options: ["Titambire.", "Mangwananii.", "Munonzi ani?", "Chisarai."], answer: "Titambire.", explanation: "Titambire can answer thanks as “You're welcome.”" }
      ]
    },
    {
      id: "shona-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "shona-greetings-use-gesture",
        title: "Respect Is Seen and Heard",
        emoji: "👏🏾",
        category: "Etiquette",
        text: "Traditional Zimbabwean greeting may include handshakes, clapping, or lowering the body. Exact practice varies, but respectful attention to elders and wellbeing remains central."
      },
      conversation: [
        { speaker: "Tariro", avatar: "👩🏾", native: "Mangwananii. Makadii?", english: "Good morning. How are you?", audioPlaceholder: "/audio/shona/mangwananii-makadii.mp3" },
        { speaker: "Tino", avatar: "👨🏾", native: "Ndiripo zangu, ndatenda. Munonzi ani?", english: "I am very well, thank you. What is your name?", audioPlaceholder: "/audio/shona/ndiripo-ndatenda-munonzi.mp3" },
        { speaker: "Tariro", avatar: "👩🏾", native: "Ndinonzi Tariro.", english: "My name is Tariro.", audioPlaceholder: "/audio/shona/ndinonzi-tariro.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "Choose the respectful or plural “How are you?”", options: ["Makadii?", "Wakadii?", "Unonzi ani?", "Ndatenda."], answer: "Makadii?", explanation: "Makadii? uses the plural form for a group or respectful singular address." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Ndiripo zangu.”", options: ["I am very well.", "My name is Tariro.", "Good evening.", "Please."], answer: "I am very well.", explanation: "Ndiripo zangu is a positive wellbeing response." },
        { id: "q3", type: "sentence-builder", prompt: "Build: What is your name? (respectful)", tiles: ["Munonzi", "ani?"], answer: "Munonzi ani?", explanation: "Munonzi ani? respectfully asks what someone is called." },
        { id: "q4", type: "matching", prompt: "Match the time-based greetings.", pairs: [{ native: "Mangwananii", english: "Good morning" }, { native: "Masikatii", english: "Good afternoon" }, { native: "Manherui", english: "Good evening" }], explanation: "These are respectful or plural time-of-day greetings." },
        { id: "q5", type: "conversation", prompt: "Someone says “Ndatenda.” Choose the response.", options: ["Titambire.", "Mhoroi.", "Ndapota.", "Ndinonzi Tino."], answer: "Titambire.", explanation: "Titambire is a fitting response to thanks." }
      ]
    }
  ]
};
