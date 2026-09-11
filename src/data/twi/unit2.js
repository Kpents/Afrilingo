export const unit2 = {
  id: "twi-unit-2",
  title: "Numbers & Counting",
  subtitle: "Count, understand quantities, and handle simple numbers in everyday Twi.",

  lessons: [
    // -------------------------------------------------------
    // LESSON 1 — NUMBERS 1–10
    // -------------------------------------------------------
    {
      id: "numbers-1-10",
      title: "Numbers 1–10",
      emoji: "🔢",
      xp: 50,

      vocabulary: [
        { native: "baako", english: "one", number: 1 },
        { native: "mmienu", english: "two", number: 2 },
        { native: "mmiɛnsa", english: "three", number: 3 },
        { native: "ɛnan", english: "four", number: 4 },
        { native: "enum", english: "five", number: 5 },
        { native: "nsia", english: "six", number: 6 },
        { native: "nson", english: "seven", number: 7 },
        { native: "nwɔtwe", english: "eight", number: 8 },
        { native: "nkron", english: "nine", number: 9 },
        { native: "du", english: "ten", number: 10 }
      ],

      cultureCard: {
        id: "numbers-everywhere",
        title: "Numbers Live in Everyday Conversation",
        emoji: "🧺",
        category: "Daily Life",
        text:
          "Counting becomes useful very quickly in Ghanaian daily life — from buying food and counting items to discussing transport fares, time, and money."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Baako.",
          english: "One."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Mmienu.",
          english: "Two."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Mmiɛnsa.",
          english: "Three."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Ɛnan.",
          english: "Four."
        }
      ],

      questions: [
        {
          id: "u2-l1-q1",
          type: "multiple-choice",
          prompt: "Which Twi word means “one”?",
          options: ["baako", "mmienu", "enum", "du"],
          answer: "baako",
          explanation: "Baako means one."
        },
        {
          id: "u2-l1-q2",
          type: "multiple-choice",
          prompt: "What number is “mmiɛnsa”?",
          options: ["2", "3", "5", "8"],
          answer: "3",
          explanation: "Mmiɛnsa means three."
        },
        {
          id: "u2-l1-q3",
          type: "multiple-choice",
          prompt: "Choose the Twi word for “five”.",
          options: ["enum", "nsia", "ɛnan", "nson"],
          answer: "enum",
          explanation: "Enum means five."
        },
        {
          id: "u2-l1-q4",
          type: "multiple-choice",
          prompt: "What does “nwɔtwe” mean?",
          options: ["six", "seven", "eight", "nine"],
          answer: "eight",
          explanation: "Nwɔtwe means eight."
        },
        {
          id: "u2-l1-q5",
          type: "multiple-choice",
          prompt: "Which Twi word means “ten”?",
          options: ["nkron", "du", "nsia", "baako"],
          answer: "du",
          explanation: "Du means ten."
        },
        {
          id: "u2-l1-q6",
          type: "image-choice",
          prompt: "Which picture shows three items?",
          options: [
            { value: "baako", label: "Baako", emoji: "🥭" },
            { value: "mmienu", label: "Mmienu", emoji: "🥭🥭" },
            { value: "mmiɛnsa", label: "Mmiɛnsa", emoji: "🥭🥭🥭" },
            { value: "ɛnan", label: "Ɛnan", emoji: "🥭🥭🥭🥭" }
          ],
          answer: "mmiɛnsa",
          explanation: "Mmiɛnsa means three."
        }
      ]
    },

    // -------------------------------------------------------
    // LESSON 2 — NUMBERS 11–100
    // -------------------------------------------------------
    {
      id: "numbers-11-100",
      title: "Numbers 11–100",
      emoji: "💯",
      xp: 60,

      vocabulary: [
        { native: "du baako", english: "eleven", number: 11 },
        { native: "du mmienu", english: "twelve", number: 12 },
        { native: "aduonu", english: "twenty", number: 20 },
        { native: "aduasa", english: "thirty", number: 30 },
        { native: "aduanan", english: "forty", number: 40 },
        { native: "aduonum", english: "fifty", number: 50 },
        { native: "aduosia", english: "sixty", number: 60 },
        { native: "aduoson", english: "seventy", number: 70 },
        { native: "aduowɔtwe", english: "eighty", number: 80 },
        { native: "aduokron", english: "ninety", number: 90 },
        { native: "ɔha", english: "one hundred", number: 100 }
      ],

      cultureCard: {
        id: "market-numbers",
        title: "Counting Meets the Market",
        emoji: "🛍️",
        category: "Market Life",
        text:
          "Numbers are especially useful in markets. Even learners who know only a little Twi can use numbers to understand quantities and prices during everyday transactions."
      },

      conversation: [
        {
          speaker: "Seller",
          avatar: "👩🏾‍🌾",
          native: "Aduonu.",
          english: "Twenty."
        },
        {
          speaker: "Buyer",
          avatar: "🧑🏾",
          native: "Aduasa?",
          english: "Thirty?"
        },
        {
          speaker: "Seller",
          avatar: "👩🏾‍🌾",
          native: "Aane, aduasa.",
          english: "Yes, thirty."
        }
      ],

      questions: [
        {
          id: "u2-l2-q1",
          type: "multiple-choice",
          prompt: "What number is “aduonu”?",
          options: ["10", "20", "30", "40"],
          answer: "20",
          explanation: "Aduonu means twenty."
        },
        {
          id: "u2-l2-q2",
          type: "multiple-choice",
          prompt: "Which Twi number means “thirty”?",
          options: ["aduasa", "aduanan", "aduonu", "ɔha"],
          answer: "aduasa",
          explanation: "Aduasa means thirty."
        },
        {
          id: "u2-l2-q3",
          type: "multiple-choice",
          prompt: "What does “aduonum” mean?",
          options: ["40", "50", "60", "70"],
          answer: "50",
          explanation: "Aduonum means fifty."
        },
        {
          id: "u2-l2-q4",
          type: "multiple-choice",
          prompt: "Which word means “one hundred”?",
          options: ["du", "aduokron", "ɔha", "aduonu"],
          answer: "ɔha",
          explanation: "Ɔha means one hundred."
        }
      ]
    },

    // -------------------------------------------------------
    // LESSON 3 — HOW MUCH / HOW MANY?
    // -------------------------------------------------------
    {
      id: "how-many",
      title: "How Much / How Many?",
      emoji: "🤔",
      xp: 65,

      vocabulary: [
        {
          native: "Sɛn?",
          english: "How much? / How many?",
          note: "Used as the key question concept for this lesson."
        },
        {
          native: "baako",
          english: "one"
        },
        {
          native: "mmienu",
          english: "two"
        },
        {
          native: "enum",
          english: "five"
        }
      ],

      cultureCard: {
        id: "questions-and-context",
        title: "Context Does Part of the Talking",
        emoji: "💬",
        category: "Conversation",
        text:
          "In real conversations, meaning is often carried by context as well as vocabulary. Number questions become easier to understand when you know what people are counting or discussing."
      },

      conversation: [
        {
          speaker: "Buyer",
          avatar: "🧑🏾",
          native: "Sɛn?",
          english: "How much / how many?"
        },
        {
          speaker: "Seller",
          avatar: "👩🏾‍🌾",
          native: "Enum.",
          english: "Five."
        }
      ],

      questions: [
        {
          id: "u2-l3-q1",
          type: "multiple-choice",
          prompt: "Which word introduces the idea of “how much / how many” in this lesson?",
          options: ["Sɛn?", "Maakye", "Medaase", "Agoo"],
          answer: "Sɛn?",
          explanation: "Sɛn? is the question form introduced in this unit."
        },
        {
          id: "u2-l3-q2",
          type: "conversation",
          prompt: "Someone asks “Sɛn?” and the answer is “Enum.” What number did they hear?",
          options: ["1", "2", "5", "10"],
          answer: "5",
          explanation: "Enum means five."
        },
        {
          id: "u2-l3-q3",
          type: "multiple-choice",
          prompt: "Which answer represents two?",
          options: ["baako", "mmienu", "nson", "du"],
          answer: "mmienu",
          explanation: "Mmienu means two."
        }
      ]
    },

    // -------------------------------------------------------
    // LESSON 4 — PRICES & SIMPLE MATH
    // -------------------------------------------------------
    {
      id: "prices-simple-math",
      title: "Prices & Simple Math",
      emoji: "🪙",
      xp: 70,

      cultureCard: {
        id: "cedis-and-pesewas",
        title: "Cedis & Pesewas",
        emoji: "🇬🇭",
        category: "Money",
        text:
          "Ghana uses the cedi and pesewa. Learning numbers in Twi becomes especially practical when talking about prices, transport fares, food, and everyday purchases."
      },

      conversation: [
        {
          speaker: "Seller",
          avatar: "👩🏾‍🌾",
          native: "Du.",
          english: "Ten."
        },
        {
          speaker: "Buyer",
          avatar: "🧑🏾",
          native: "Mmienu.",
          english: "Two."
        },
        {
          speaker: "Narrator",
          avatar: "🧮",
          native: "Aduonu.",
          english: "Twenty."
        }
      ],

      questions: [
        {
          id: "u2-l4-q1",
          type: "multiple-choice",
          prompt: "Two items cost 5 each. What is the total?",
          options: ["5", "8", "10", "20"],
          answer: "10",
          explanation: "5 + 5 = 10. In Twi, ten is du."
        },
        {
          id: "u2-l4-q2",
          type: "multiple-choice",
          prompt: "Which Twi word represents the total 10?",
          options: ["du", "enum", "aduonu", "nkron"],
          answer: "du",
          explanation: "Du means ten."
        },
        {
          id: "u2-l4-q3",
          type: "multiple-choice",
          prompt: "10 + 10 equals which Twi number?",
          options: ["aduonu", "aduasa", "du", "ɔha"],
          answer: "aduonu",
          explanation: "Ten plus ten is twenty, which is aduonu."
        },
        {
          id: "u2-l4-q4",
          type: "multiple-choice",
          prompt: "Which is larger?",
          options: ["enum", "aduasa", "baako", "mmienu"],
          answer: "aduasa",
          explanation: "Aduasa means thirty."
        }
      ]
    },

    // -------------------------------------------------------
    // LESSON 5 — NUMBERS CHALLENGE
    // -------------------------------------------------------
    {
      id: "numbers-challenge",
      title: "Numbers Challenge",
      emoji: "🏆",
      xp: 110,

      cultureCard: {
        id: "numbers-milestone",
        title: "You Can Count in Twi",
        emoji: "⭐",
        category: "Milestone",
        text:
          "You can now recognize basic Twi numbers, understand larger tens, answer simple quantity questions, and use numbers in practical situations."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Mmiɛnsa.",
          english: "Three."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Du.",
          english: "Ten."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Aduonu.",
          english: "Twenty."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Ɔha.",
          english: "One hundred."
        }
      ],

      questions: [
        {
          id: "u2-l5-q1",
          type: "multiple-choice",
          prompt: "What number is “nkron”?",
          options: ["6", "7", "8", "9"],
          answer: "9",
          explanation: "Nkron means nine."
        },
        {
          id: "u2-l5-q2",
          type: "multiple-choice",
          prompt: "Which Twi word means twenty?",
          options: ["du", "aduonu", "aduasa", "ɔha"],
          answer: "aduonu",
          explanation: "Aduonu means twenty."
        },
        {
          id: "u2-l5-q3",
          type: "multiple-choice",
          prompt: "Translate “ɔha”.",
          options: ["ten", "twenty", "fifty", "one hundred"],
          answer: "one hundred",
          explanation: "Ɔha means one hundred."
        },
        {
          id: "u2-l5-q4",
          type: "multiple-choice",
          prompt: "Which sequence is correct?",
          options: [
            "baako, mmienu, mmiɛnsa",
            "du, baako, enum",
            "ɛnan, baako, mmienu",
            "nson, enum, nsia"
          ],
          answer: "baako, mmienu, mmiɛnsa",
          explanation: "Baako, mmienu, mmiɛnsa correspond to one, two, three."
        },
        {
          id: "u2-l5-q5",
          type: "multiple-choice",
          prompt: "What is 10 + 10?",
          options: ["du", "aduonu", "aduasa", "ɔha"],
          answer: "aduonu",
          explanation: "10 + 10 = 20, and twenty is aduonu."
        }
      ]
    }
  ]
};
