export const gaUnit1 = {
  id: "ga-unit-1",
  title: "Greetings",
  subtitle:
    "Learn essential Ga greetings and begin your first conversations.",

  lessons: [
    {
      id: "ga-saying-hello",
      title: "Saying Hello",
      emoji: "👋",
      xp: 40,

      vocabulary: [
        {
          native: "Agoo",
          english: "Hello / announcing your presence"
        },
        {
          native: "Amɛɛ",
          english: "Response to Agoo"
        },
        {
          native: "Miiŋa bo",
          english: "I greet you"
        }
      ],

      cultureCard: {
        id: "ga-greeting-respect",
        title: "Greetings Before Conversation",
        emoji: "🤝",
        category: "Etiquette",
        text:
          "Greetings are an important part of Ga social interaction. Acknowledging someone before beginning a conversation communicates warmth and respect."
      },

      conversation: [
        {
          speaker: "Ayele",
          avatar: "👩🏾",
          native: "Agoo!",
          english: "Hello / may I come in?"
        },
        {
          speaker: "Nii",
          avatar: "👨🏾",
          native: "Amɛɛ!",
          english: "Response to Agoo."
        },
        {
          speaker: "Ayele",
          avatar: "👩🏾",
          native: "Miiŋa bo.",
          english: "I greet you."
        }
      ],

      questions: [
        {
          id: "ga-u1-l1-q1",
          type: "multiple-choice",
          prompt: "Which Ga expression can announce your presence?",
          options: [
            "Agoo",
            "Ojekoo",
            "Minaokoo",
            "Oshwiee"
          ],
          answer: "Agoo",
          explanation:
            "Agoo is used to announce your presence or politely call attention."
        },

        {
          id: "ga-u1-l1-q2",
          type: "multiple-choice",
          prompt: "What is a response to “Agoo”?",
          options: [
            "Amɛɛ",
            "Ojekoo",
            "Ekome",
            "Nyɔŋma"
          ],
          answer: "Amɛɛ",
          explanation:
            "Amɛɛ is used as a response to Agoo."
        },

        {
          id: "ga-u1-l1-q3",
          type: "multiple-choice",
          prompt: "What does “Miiŋa bo” express?",
          options: [
            "I greet you",
            "Good evening",
            "Ten",
            "Thank you"
          ],
          answer: "I greet you",
          explanation:
            "Miiŋa bo is a general greeting addressed to one person."
        },
        {
          id: "ga-u1-l1-q4",
          type: "sentence-builder",
          prompt: "Build the Ga phrase: I greet you.",
          tiles: ["Miiŋa", "bo"],
          answer: "Miiŋa bo",
          explanation: "Miiŋa bo is a general greeting addressed to one person."
        }
      ]
    },

    {
      id: "ga-time-greetings",
      title: "Morning, Afternoon & Evening",
      emoji: "🌅",
      xp: 50,

      vocabulary: [
        {
          native: "Ojekoo",
          english: "Good morning"
        },
        {
          native: "Minaokoo",
          english: "Good afternoon"
        },
        {
          native: "Oshwiee",
          english: "Good evening"
        }
      ],

      cultureCard: {
        id: "ga-greetings-through-day",
        title: "The Day Shapes the Greeting",
        emoji: "🌞",
        category: "Daily Life",
        text:
          "Ga has greetings associated with different periods of the day. Choosing the appropriate greeting makes everyday speech feel more natural."
      },

      conversation: [
        {
          speaker: "Nii",
          avatar: "👨🏾",
          native: "Ojekoo.",
          english: "Good morning."
        },
        {
          speaker: "Ayele",
          avatar: "👩🏾",
          native: "Minaokoo.",
          english: "Good afternoon."
        },
        {
          speaker: "Nii",
          avatar: "👨🏾",
          native: "Oshwiee.",
          english: "Good evening."
        }
      ],

      questions: [
        {
          id: "ga-u1-l2-q1",
          type: "multiple-choice",
          prompt: "Which Ga greeting means “Good morning”?",
          options: [
            "Ojekoo",
            "Minaokoo",
            "Oshwiee",
            "Agoo"
          ],
          answer: "Ojekoo",
          explanation:
            "Ojekoo is the morning greeting."
        },

        {
          id: "ga-u1-l2-q2",
          type: "multiple-choice",
          prompt: "Which greeting is used in the afternoon?",
          options: [
            "Minaokoo",
            "Ojekoo",
            "Oshwiee",
            "Amɛɛ"
          ],
          answer: "Minaokoo",
          explanation:
            "Minaokoo is used as a good-afternoon greeting."
        },

        {
          id: "ga-u1-l2-q3",
          type: "multiple-choice",
          prompt: "Which greeting means “Good evening”?",
          options: [
            "Oshwiee",
            "Ojekoo",
            "Agoo",
            "Minaokoo"
          ],
          answer: "Oshwiee",
          explanation:
            "Oshwiee is the evening greeting."
        },
        {
          id: "ga-u1-l2-q4",
          type: "fill-in-the-blank",
          prompt: "Complete the morning greeting: Oje___",
          options: ["koo", "shwiee", "goo", "mɛɛ"],
          answer: "koo",
          explanation: "Ojekoo is the Ga morning greeting."
        }
      ]
    },

    {
      id: "ga-greetings-challenge",
      title: "Greetings Challenge",
      emoji: "🏆",
      xp: 100,

      cultureCard: {
        id: "ga-first-conversation",
        title: "You Can Greet Someone in Ga",
        emoji: "⭐",
        category: "Milestone",
        text:
          "You can now recognize several common Ga greetings and choose greetings appropriate to different times of day."
      },

      conversation: [
        {
          speaker: "Ayele",
          avatar: "👩🏾",
          native: "Agoo!",
          english: "Hello / may I come in?"
        },
        {
          speaker: "Nii",
          avatar: "👨🏾",
          native: "Amɛɛ!",
          english: "Response."
        },
        {
          speaker: "Ayele",
          avatar: "👩🏾",
          native: "Ojekoo.",
          english: "Good morning."
        }
      ],

      questions: [
        {
          id: "ga-u1-l3-q1",
          type: "multiple-choice",
          prompt: "You meet someone in the morning. What do you say?",
          options: [
            "Ojekoo",
            "Minaokoo",
            "Oshwiee",
            "Amɛɛ"
          ],
          answer: "Ojekoo",
          explanation:
            "Ojekoo is used in the morning."
        },

        {
          id: "ga-u1-l3-q2",
          type: "multiple-choice",
          prompt: "Which greeting belongs to the evening?",
          options: [
            "Oshwiee",
            "Ojekoo",
            "Minaokoo",
            "Agoo"
          ],
          answer: "Oshwiee",
          explanation:
            "Oshwiee is the evening greeting."
        },

        {
          id: "ga-u1-l3-q3",
          type: "multiple-choice",
          prompt: "Someone says “Agoo”. Which response fits?",
          options: [
            "Amɛɛ",
            "Ekome",
            "Ojekoo",
            "Nyɔŋma"
          ],
          answer: "Amɛɛ",
          explanation:
            "Amɛɛ is a response to Agoo."
        },
        {
          id: "ga-u1-l3-q4",
          type: "matching",
          prompt: "Match each Ga greeting with its time of day.",
          pairs: [
            { native: "Ojekoo", english: "Morning" },
            { native: "Minaokoo", english: "Afternoon" },
            { native: "Oshwiee", english: "Evening" }
          ],
          explanation: "Ga greetings change with the time of day."
        }
      ]
    }
  ]
};
