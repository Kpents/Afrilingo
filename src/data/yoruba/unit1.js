export const yorubaUnit1 = {
  id: "yoruba-unit-1",
  title: "Greetings",
  subtitle: "Begin respectful everyday exchanges in Yorùbá.",
  lessons: [
    {
      id: "yoruba-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Báwo ni?", english: "How are you?", audioPlaceholder: "/audio/yoruba/bawo-ni.mp3" },
        { native: "Ṣé dáadáa ni?", english: "Are you well?", audioPlaceholder: "/audio/yoruba/se-daadaa-ni.mp3" },
        { native: "Dáadáa ni, ẹ ṣé.", english: "I am fine, thank you.", audioPlaceholder: "/audio/yoruba/daadaa-ni-e-se.mp3" },
        { native: "Ẹ káàbọ̀.", english: "Welcome.", audioPlaceholder: "/audio/yoruba/e-kaabo.mp3" }
      ],
      cultureCard: {
        id: "yoruba-greeting-is-essential",
        title: "Greeting Is Essential",
        emoji: "🤝",
        category: "Etiquette",
        text: "Greeting is central to Yorùbá community life. The appropriate words can reflect the time, activity, relationship, and status of the people meeting."
      },
      conversation: [
        { speaker: "Adé", avatar: "👨🏾", native: "Báwo ni?", english: "How are you?", audioPlaceholder: "/audio/yoruba/bawo-ni.mp3" },
        { speaker: "Bísí", avatar: "👩🏾", native: "Dáadáa ni, ẹ ṣé.", english: "I am fine, thank you.", audioPlaceholder: "/audio/yoruba/daadaa-ni-e-se.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Báwo ni?” ask?", options: ["How are you?", "What is your name?", "Good evening", "Where are you going?"], answer: "How are you?", explanation: "Báwo ni? is a general way to ask how someone is." },
        { id: "q2", type: "english-to-native", prompt: "Choose “I am fine, thank you.”", options: ["Dáadáa ni, ẹ ṣé.", "Ẹ káàbọ̀.", "Ó dàbọ̀.", "Ẹ jọ̀wọ́."], answer: "Dáadáa ni, ẹ ṣé.", explanation: "Dáadáa ni answers that things are well; ẹ ṣé adds thanks." },
        { id: "q3", type: "conversation", prompt: "Adé asks “Ṣé dáadáa ni?” Choose the fitting reply.", options: ["Dáadáa ni.", "Ó dàbọ̀.", "Orúkọ mi ni Bísí.", "Ẹ káalẹ́."], answer: "Dáadáa ni.", explanation: "Dáadáa ni is a fitting positive response to a wellbeing question." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the welcome: Ẹ káà__.", options: ["bọ̀", "rọ̀", "sán", "lẹ́"], answer: "bọ̀", explanation: "Ẹ káàbọ̀ means welcome and uses the respectful or plural Ẹ form." }
      ]
    },
    {
      id: "yoruba-time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Ẹ káàárọ̀.", english: "Good morning.", audioPlaceholder: "/audio/yoruba/e-kaaaro.mp3" },
        { native: "Ẹ káàsán.", english: "Good afternoon.", audioPlaceholder: "/audio/yoruba/e-kaasan.mp3" },
        { native: "Ẹ kú ìrọ̀lẹ́.", english: "Good early evening.", audioPlaceholder: "/audio/yoruba/e-ku-irole.mp3" },
        { native: "Ẹ káalẹ́.", english: "Good evening.", audioPlaceholder: "/audio/yoruba/e-kaale.mp3" }
      ],
      cultureCard: {
        id: "yoruba-greetings-fit-the-moment",
        title: "A Greeting for the Moment",
        emoji: "☀️",
        category: "Daily Life",
        text: "Yorùbá has greetings for times of day and many situations, including work, rest, weather, and celebrations. Choosing a fitting greeting shows attention to another person's circumstances."
      },
      conversation: [
        { speaker: "Bísí", avatar: "👩🏾", native: "Ẹ káàárọ̀, màmá.", english: "Good morning, mother / ma'am.", audioPlaceholder: "/audio/yoruba/e-kaaaro-mama.mp3" },
        { speaker: "Màmá", avatar: "👵🏾", native: "Káàárọ̀ o.", english: "Good morning.", audioPlaceholder: "/audio/yoruba/kaaaro-o.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which greeting is used in the morning?", options: ["Ẹ káàárọ̀.", "Ẹ káàsán.", "Ẹ káalẹ́.", "Ó dàbọ̀."], answer: "Ẹ káàárọ̀.", explanation: "Ẹ káàárọ̀ is the respectful or plural morning greeting." },
        { id: "q2", type: "matching", prompt: "Match each greeting with its time.", pairs: [{ native: "Ẹ káàárọ̀", english: "Morning" }, { native: "Ẹ káàsán", english: "Afternoon" }, { native: "Ẹ káalẹ́", english: "Evening" }], explanation: "The forms distinguish morning, afternoon, and evening." },
        { id: "q3", type: "english-to-native", prompt: "Choose “Good early evening.”", options: ["Ẹ kú ìrọ̀lẹ́.", "Ẹ káàárọ̀.", "Ẹ káàsán.", "Ẹ káàbọ̀."], answer: "Ẹ kú ìrọ̀lẹ́.", explanation: "Ìrọ̀lẹ́ refers to the early evening period." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the afternoon greeting: Ẹ káà__.", options: ["sán", "rọ̀", "lẹ́", "bọ̀"], answer: "sán", explanation: "Ẹ káàsán is the afternoon greeting." }
      ]
    },
    {
      id: "yoruba-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Kí ni orúkọ rẹ?", english: "What is your name?", audioPlaceholder: "/audio/yoruba/ki-ni-oruko-re.mp3" },
        { native: "Kí ni orúkọ yín?", english: "What is your name? (respectful / plural)", audioPlaceholder: "/audio/yoruba/ki-ni-oruko-yin.mp3" },
        { native: "Orúkọ mi ni Adé.", english: "My name is Adé.", audioPlaceholder: "/audio/yoruba/oruko-mi-ni-ade.mp3" },
        { native: "Inú mi dùn láti pàdé yín.", english: "I am pleased to meet you.", audioPlaceholder: "/audio/yoruba/inu-mi-dun-lati-pade-yin.mp3" }
      ],
      cultureCard: {
        id: "yoruba-names-carry-meaning",
        title: "Names Carry Meaning",
        emoji: "🪪",
        category: "Identity",
        text: "Many Yorùbá names are meaningful expressions connected to family, circumstances, hopes, or spiritual outlook. Correct pronunciation—including tone—respects both the person and the name."
      },
      conversation: [
        { speaker: "Adé", avatar: "👨🏾", native: "Kí ni orúkọ yín?", english: "What is your name?", audioPlaceholder: "/audio/yoruba/ki-ni-oruko-yin.mp3" },
        { speaker: "Bísí", avatar: "👩🏾", native: "Orúkọ mi ni Bísí.", english: "My name is Bísí.", audioPlaceholder: "/audio/yoruba/oruko-mi-ni-bisi.mp3" },
        { speaker: "Adé", avatar: "👨🏾", native: "Inú mi dùn láti pàdé yín.", english: "I am pleased to meet you.", audioPlaceholder: "/audio/yoruba/inu-mi-dun-lati-pade-yin.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Kí ni orúkọ rẹ?” ask?", options: ["What is your name?", "How are you?", "Where do you live?", "Are you well?"], answer: "What is your name?", explanation: "Kí ni orúkọ rẹ? asks one familiar person for their name." },
        { id: "q2", type: "sentence-builder", prompt: "Build: My name is Adé.", tiles: ["Orúkọ", "mi", "ni", "Adé."], answer: "Orúkọ mi ni Adé.", explanation: "Orúkọ mi ni … is used to state your name." },
        { id: "q3", type: "conversation", prompt: "Someone respectfully asks “Kí ni orúkọ yín?” Choose the reply.", options: ["Orúkọ mi ni Bísí.", "Dáadáa ni.", "Ẹ káàsán.", "Ó dàbọ̀."], answer: "Orúkọ mi ni Bísí.", explanation: "This response states the speaker's name." },
        { id: "q4", type: "english-to-native", prompt: "Choose “I am pleased to meet you.”", options: ["Inú mi dùn láti pàdé yín.", "Kí ni orúkọ yín?", "Ẹ jọ̀wọ́.", "Ẹ káàbọ̀."], answer: "Inú mi dùn láti pàdé yín.", explanation: "This expression conveys pleasure at meeting the person respectfully." }
      ]
    },
    {
      id: "yoruba-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Ẹ ṣé.", english: "Thank you.", audioPlaceholder: "/audio/yoruba/e-se.mp3" },
        { native: "Ẹ ṣéun gan-an.", english: "Thank you very much.", audioPlaceholder: "/audio/yoruba/e-seun-gan-an.mp3" },
        { native: "Ẹ jọ̀wọ́.", english: "Please.", audioPlaceholder: "/audio/yoruba/e-jowo.mp3" },
        { native: "Ó dàbọ̀.", english: "Goodbye.", audioPlaceholder: "/audio/yoruba/o-dabo.mp3" }
      ],
      cultureCard: {
        id: "yoruba-respect-in-grammar",
        title: "Respect Lives in Grammar",
        emoji: "💛",
        category: "Respect",
        text: "Ẹ and yín can address several people, but they also respectfully address one elder or higher-status person. The relationship supplies the meaning."
      },
      conversation: [
        { speaker: "Bísí", avatar: "👩🏾", native: "Ẹ jọ̀wọ́, ẹ káàbọ̀.", english: "Please, welcome.", audioPlaceholder: "/audio/yoruba/e-jowo-e-kaabo.mp3" },
        { speaker: "Adé", avatar: "👨🏾", native: "Ẹ ṣéun gan-an.", english: "Thank you very much.", audioPlaceholder: "/audio/yoruba/e-seun-gan-an.mp3" },
        { speaker: "Bísí", avatar: "👩🏾", native: "Ó dàbọ̀.", english: "Goodbye.", audioPlaceholder: "/audio/yoruba/o-dabo.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Ẹ ṣé.", "Ẹ jọ̀wọ́.", "Ó dàbọ̀.", "Báwo ni?"], answer: "Ẹ ṣé.", explanation: "Ẹ ṣé expresses thanks respectfully or to more than one person." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Please.”", options: ["Ẹ jọ̀wọ́.", "Ẹ káàsán.", "Dáadáa ni.", "Ó dàbọ̀."], answer: "Ẹ jọ̀wọ́.", explanation: "Ẹ jọ̀wọ́ politely introduces a request." },
        { id: "q3", type: "matching", prompt: "Match each expression with its meaning.", pairs: [{ native: "Ẹ ṣé", english: "Thank you" }, { native: "Ẹ jọ̀wọ́", english: "Please" }, { native: "Ó dàbọ̀", english: "Goodbye" }], explanation: "These expressions help manage a polite exchange." },
        { id: "q4", type: "sentence-builder", prompt: "Build: Thank you very much.", tiles: ["Ẹ", "ṣéun", "gan-an."], answer: "Ẹ ṣéun gan-an.", explanation: "Gan-an strengthens the expression of thanks." }
      ]
    },
    {
      id: "yoruba-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "yoruba-greeting-with-the-body",
        title: "Respect Beyond Words",
        emoji: "🌍",
        category: "Etiquette",
        text: "Traditional respectful greeting can include posture: younger women may kneel and younger men may prostrate when greeting elders. Practices vary by family and setting, but the underlying value is respect."
      },
      conversation: [
        { speaker: "Adé", avatar: "👨🏾", native: "Ẹ káàárọ̀, màmá. Ṣé dáadáa ni?", english: "Good morning, ma'am. Are you well?", audioPlaceholder: "/audio/yoruba/e-kaaaro-mama-se-daadaa.mp3" },
        { speaker: "Màmá", avatar: "👵🏾", native: "Dáadáa ni, a dúpẹ́. Kí ni orúkọ rẹ?", english: "I am well, thank you. What is your name?", audioPlaceholder: "/audio/yoruba/daadaa-ni-a-dupe-oruko.mp3" },
        { speaker: "Adé", avatar: "👨🏾", native: "Orúkọ mi ni Adé.", english: "My name is Adé.", audioPlaceholder: "/audio/yoruba/oruko-mi-ni-ade.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "Choose the respectful morning greeting for an elder.", options: ["Ẹ káàárọ̀.", "Káàárọ̀.", "Ó dàbọ̀.", "Ẹ káàsán."], answer: "Ẹ káàárọ̀.", explanation: "Ẹ marks respect here; káàárọ̀ identifies morning." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Dáadáa ni, ẹ ṣé.”", options: ["I am fine, thank you.", "Good evening.", "My name is Adé.", "Please sit."], answer: "I am fine, thank you.", explanation: "The phrase combines a positive wellbeing response with thanks." },
        { id: "q3", type: "sentence-builder", prompt: "Build: What is your name? (respectful)", tiles: ["Kí", "ni", "orúkọ", "yín?"], answer: "Kí ni orúkọ yín?", explanation: "Yín is the respectful or plural form in this question." },
        { id: "q4", type: "matching", prompt: "Match the time-based greetings.", pairs: [{ native: "Ẹ káàárọ̀", english: "Good morning" }, { native: "Ẹ káàsán", english: "Good afternoon" }, { native: "Ẹ káalẹ́", english: "Good evening" }], explanation: "These forms pair respect with the time of day." },
        { id: "q5", type: "conversation", prompt: "Someone welcomes you with “Ẹ káàbọ̀.” Choose a polite reply.", options: ["Ẹ ṣé.", "Báwo ni?", "Ó dàbọ̀.", "Kí ni orúkọ rẹ?"], answer: "Ẹ ṣé.", explanation: "Ẹ ṣé is a polite expression of thanks." }
      ]
    }
  ]
};
