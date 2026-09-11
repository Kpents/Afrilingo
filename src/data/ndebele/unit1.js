export const ndebeleUnit1 = {
  id: "ndebele-unit-1",
  title: "Greetings",
  subtitle: "Begin friendly, respectful exchanges in isiNdebele.",
  lessons: [
    {
      id: "ndebele-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,
      vocabulary: [
        { native: "Sawubona.", english: "Hello. (one person)", audioPlaceholder: "/audio/ndebele/sawubona.mp3" },
        { native: "Salibonani.", english: "Hello. (plural / respectful)", audioPlaceholder: "/audio/ndebele/salibonani.mp3" },
        { native: "Unjani?", english: "How are you? (one person)", audioPlaceholder: "/audio/ndebele/unjani.mp3" },
        { native: "Linjani?", english: "How are you? (plural / respectful)", audioPlaceholder: "/audio/ndebele/linjani.mp3" },
        { native: "Ngiyaphila.", english: "I am well.", audioPlaceholder: "/audio/ndebele/ngiyaphila.mp3" }
      ],
      cultureCard: {
        id: "ndebele-greeting-means-seeing",
        title: "A Greeting Recognizes You",
        emoji: "👁️",
        category: "Communication",
        text: "Sawubona and Salibonani are connected with seeing or recognizing the person addressed. A greeting acknowledges another person's presence before conversation continues."
      },
      conversation: [
        { speaker: "Nomusa", avatar: "👩🏾", native: "Salibonani. Linjani?", english: "Hello. How are you?", audioPlaceholder: "/audio/ndebele/salibonani-linjani.mp3" },
        { speaker: "Bongani", avatar: "👨🏾", native: "Ngiyaphila.", english: "I am well.", audioPlaceholder: "/audio/ndebele/ngiyaphila.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Linjani?” ask?", options: ["How are you?", "What is your name?", "Good night", "Where are you from?"], answer: "How are you?", explanation: "Linjani? addresses several people or may respectfully address one person." },
        { id: "q2", type: "english-to-native", prompt: "Choose the plural or respectful “Hello.”", options: ["Salibonani.", "Sawubona.", "Ngiyabonga.", "Lisale kuhle."], answer: "Salibonani.", explanation: "Salibonani is plural and is also widely used respectfully." },
        { id: "q3", type: "conversation", prompt: "Nomusa asks “Linjani?” Choose the fitting response.", options: ["Ngiyaphila.", "Ibizo lami nguBongani.", "Litshonile.", "Ngicela."], answer: "Ngiyaphila.", explanation: "Ngiyaphila says “I am well.”" },
        { id: "q4", type: "matching", prompt: "Match singular and plural greeting forms.", pairs: [{ native: "Sawubona", english: "Hello — one person" }, { native: "Salibonani", english: "Hello — plural / respectful" }, { native: "Linjani?", english: "How are you? — plural / respectful" }], explanation: "The forms reflect how many people are addressed and can also signal respect." }
      ]
    },
    {
      id: "ndebele-time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌅",
      xp: 50,
      vocabulary: [
        { native: "Uvukile?", english: "Good morning / Have you woken? (singular)", audioPlaceholder: "/audio/ndebele/uvukile.mp3" },
        { native: "Livukile?", english: "Good morning / Have you woken? (plural / respectful)", audioPlaceholder: "/audio/ndebele/livukile.mp3" },
        { native: "Litshonile?", english: "Good afternoon or evening. (plural / respectful)", audioPlaceholder: "/audio/ndebele/litshonile.mp3" },
        { native: "Lilale kuhle.", english: "Good night / sleep well. (plural / respectful)", audioPlaceholder: "/audio/ndebele/lilale-kuhle.mp3" }
      ],
      cultureCard: {
        id: "ndebele-greetings-follow-the-day",
        title: "Waking and Sunset Shape Greetings",
        emoji: "🌇",
        category: "Daily Life",
        text: "Morning greetings draw on waking, while later greetings draw on the sun setting. Livukile? and Litshonile? carry meanings richer than direct English time labels."
      },
      conversation: [
        { speaker: "Nomusa", avatar: "👩🏾", native: "Livukile, Baba?", english: "Good morning, Father / sir. Have you woken?", audioPlaceholder: "/audio/ndebele/livukile-baba.mp3" },
        { speaker: "Baba", avatar: "👨🏾", native: "Ngivukile, mntanami.", english: "I have woken, my child.", audioPlaceholder: "/audio/ndebele/ngivukile-mntanami.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which is the plural or respectful morning greeting?", options: ["Livukile?", "Litshonile?", "Lilale kuhle.", "Lisale kuhle."], answer: "Livukile?", explanation: "Livukile? asks whether the person or people have woken." },
        { id: "q2", type: "matching", prompt: "Match each expression with its use.", pairs: [{ native: "Livukile?", english: "Morning greeting" }, { native: "Litshonile?", english: "Afternoon / evening greeting" }, { native: "Lilale kuhle", english: "Good night" }], explanation: "These expressions follow waking, sunset, and sleep." },
        { id: "q3", type: "english-to-native", prompt: "Choose the afternoon or evening greeting.", options: ["Litshonile?", "Livukile?", "Ngiyaphila.", "Salibonani."], answer: "Litshonile?", explanation: "Litshonile? is connected with the sun setting and is used later in the day." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the good-night wish: Lilale ___.", options: ["kuhle", "njani", "khona", "vukile"], answer: "kuhle", explanation: "Lilale kuhle wishes that the person or people sleep well." }
      ]
    },
    {
      id: "ndebele-introductions",
      title: "Introducing Yourself",
      emoji: "🙂",
      xp: 55,
      vocabulary: [
        { native: "Ibizo lakho ngubani?", english: "What is your name?", audioPlaceholder: "/audio/ndebele/ibizo-lakho-ngubani.mp3" },
        { native: "Ibizo lami nguNomusa.", english: "My name is Nomusa.", audioPlaceholder: "/audio/ndebele/ibizo-lami-ngunomusa.mp3" },
        { native: "Kuhle ukukubona.", english: "It is good to meet / see you.", audioPlaceholder: "/audio/ndebele/kuhle-ukukubona.mp3" }
      ],
      cultureCard: {
        id: "ndebele-names-and-identity",
        title: "Names Speak About Life",
        emoji: "🪪",
        category: "Identity",
        text: "Many isiNdebele names carry transparent meanings linked to family experience, gratitude, hope, character, or circumstances surrounding a birth."
      },
      conversation: [
        { speaker: "Bongani", avatar: "👨🏾", native: "Ibizo lakho ngubani?", english: "What is your name?", audioPlaceholder: "/audio/ndebele/ibizo-lakho-ngubani.mp3" },
        { speaker: "Nomusa", avatar: "👩🏾", native: "Ibizo lami nguNomusa.", english: "My name is Nomusa.", audioPlaceholder: "/audio/ndebele/ibizo-lami-ngunomusa.mp3" },
        { speaker: "Bongani", avatar: "👨🏾", native: "Kuhle ukukubona.", english: "It is good to meet you.", audioPlaceholder: "/audio/ndebele/kuhle-ukukubona.mp3" }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Ibizo lakho ngubani?” ask?", options: ["What is your name?", "How are you?", "Where is your home?", "Did you wake well?"], answer: "What is your name?", explanation: "Ibizo means name, and lakho refers to the listener's name." },
        { id: "q2", type: "sentence-builder", prompt: "Build: My name is Nomusa.", tiles: ["Ibizo", "lami", "nguNomusa."], answer: "Ibizo lami nguNomusa.", explanation: "Ibizo lami ngu… introduces your name." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Ibizo lakho ngubani?” Choose Nomusa's reply.", options: ["Ibizo lami nguNomusa.", "Ngiyaphila.", "Livukile?", "Ngiyabonga."], answer: "Ibizo lami nguNomusa.", explanation: "This response states Nomusa's name." },
        { id: "q4", type: "english-to-native", prompt: "Choose “It is good to meet you.”", options: ["Kuhle ukukubona.", "Linjani?", "Lilale kuhle.", "Siyalemukela."], answer: "Kuhle ukukubona.", explanation: "This expression conveys pleasure at seeing or meeting someone." }
      ]
    },
    {
      id: "ndebele-politeness",
      title: "Thank You & Please",
      emoji: "🙏🏾",
      xp: 60,
      vocabulary: [
        { native: "Ngiyabonga.", english: "Thank you.", audioPlaceholder: "/audio/ndebele/ngiyabonga.mp3" },
        { native: "Ngicela.", english: "Please / I request.", audioPlaceholder: "/audio/ndebele/ngicela.mp3" },
        { native: "Siyalemukela.", english: "Welcome.", audioPlaceholder: "/audio/ndebele/siyalemukela.mp3" },
        { native: "Kulungile.", english: "It's all right / you're welcome.", audioPlaceholder: "/audio/ndebele/kulungile.mp3" },
        { native: "Hamba kuhle.", english: "Go well. (said to the person leaving)", audioPlaceholder: "/audio/ndebele/hamba-kuhle.mp3" },
        { native: "Sala kuhle.", english: "Stay well. (said to the person remaining)", audioPlaceholder: "/audio/ndebele/sala-kuhle.mp3" }
      ],
      cultureCard: {
        id: "ndebele-goodbye-has-direction",
        title: "Goodbye Depends on Who Moves",
        emoji: "🚶🏾",
        category: "Language Pattern",
        text: "The person staying tells the departing person Hamba kuhle—go well. The person leaving says Sala kuhle—stay well. The farewell reflects each person's direction."
      },
      conversation: [
        { speaker: "Nomusa", avatar: "👩🏾", native: "Ngiyabonga.", english: "Thank you.", audioPlaceholder: "/audio/ndebele/ngiyabonga.mp3" },
        { speaker: "Bongani", avatar: "👨🏾", native: "Kulungile. Hamba kuhle.", english: "You're welcome. Go well.", audioPlaceholder: "/audio/ndebele/kulungile-hamba-kuhle.mp3" },
        { speaker: "Nomusa", avatar: "👩🏾", native: "Sala kuhle.", english: "Stay well.", audioPlaceholder: "/audio/ndebele/sala-kuhle.mp3" }
      ],
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "Which expression means “Thank you”?", options: ["Ngiyabonga.", "Ngicela.", "Kulungile.", "Linjani?"], answer: "Ngiyabonga.", explanation: "Ngiyabonga expresses thanks from one speaker." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Please / I request.”", options: ["Ngicela.", "Siyalemukela.", "Ngiyaphila.", "Litshonile?"], answer: "Ngicela.", explanation: "Ngicela introduces a request politely." },
        { id: "q3", type: "matching", prompt: "Match each expression with its meaning.", pairs: [{ native: "Ngiyabonga", english: "Thank you" }, { native: "Hamba kuhle", english: "Go well" }, { native: "Sala kuhle", english: "Stay well" }], explanation: "The two farewells depend on whether the listener is leaving or staying." },
        { id: "q4", type: "conversation", prompt: "You are staying while your friend leaves. What do you tell them?", options: ["Hamba kuhle.", "Sala kuhle.", "Lilale kuhle.", "Linjani?"], answer: "Hamba kuhle.", explanation: "The person staying tells the departing person to go well." }
      ]
    },
    {
      id: "ndebele-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,
      cultureCard: {
        id: "ndebele-plural-shows-respect",
        title: "Plural Speech Can Honor One",
        emoji: "🌍",
        category: "Respect",
        text: "Plural greeting forms such as Salibonani and Linjani can address several people, and many speakers also use them respectfully for one elder or parent."
      },
      conversation: [
        { speaker: "Nomusa", avatar: "👩🏾", native: "Livukile, Baba? Linjani?", english: "Good morning, Father / sir. How are you?", audioPlaceholder: "/audio/ndebele/livukile-baba-linjani.mp3" },
        { speaker: "Baba", avatar: "👨🏾", native: "Ngiyaphila. Ibizo lakho ngubani?", english: "I am well. What is your name?", audioPlaceholder: "/audio/ndebele/ngiyaphila-ibizo.mp3" },
        { speaker: "Nomusa", avatar: "👩🏾", native: "Ibizo lami nguNomusa.", english: "My name is Nomusa.", audioPlaceholder: "/audio/ndebele/ibizo-lami-ngunomusa.mp3" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "Choose the plural or respectful “How are you?”", options: ["Linjani?", "Unjani?", "Ngiyaphila.", "Ngicela."], answer: "Linjani?", explanation: "Linjani? addresses several people and may respectfully address one person." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Ngiyaphila.”", options: ["I am well.", "My name is Nomusa.", "Good evening.", "Please."], answer: "I am well.", explanation: "Ngiyaphila is a positive wellbeing response from one speaker." },
        { id: "q3", type: "sentence-builder", prompt: "Build: My name is Nomusa.", tiles: ["Ibizo", "lami", "nguNomusa."], answer: "Ibizo lami nguNomusa.", explanation: "This sentence introduces the speaker's name." },
        { id: "q4", type: "matching", prompt: "Match the time-based expressions.", pairs: [{ native: "Livukile?", english: "Good morning" }, { native: "Litshonile?", english: "Good afternoon / evening" }, { native: "Lilale kuhle", english: "Good night" }], explanation: "The greetings relate to waking, sunset, and sleep." },
        { id: "q5", type: "conversation", prompt: "Someone says “Ngiyabonga.” Choose a fitting reply.", options: ["Kulungile.", "Livukile?", "Ibizo lakho ngubani?", "Ngicela."], answer: "Kulungile.", explanation: "Kulungile can mean “It's all right” or respond as “You're welcome.”" }
      ]
    }
  ]
};
