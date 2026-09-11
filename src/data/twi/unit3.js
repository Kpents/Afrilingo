export const unit3 = {
  id: "twi-unit-3",
  title: "Pronouns & Basic Sentences",
  subtitle:
    "Build your first complete Twi sentences using pronouns, simple verbs, and everyday expressions.",

  lessons: [
    // =====================================================
    // LESSON 1 — SUBJECT PRONOUNS
    // =====================================================
    {
      id: "subject-pronouns",
      title: "Subject Pronouns",
      emoji: "👥",
      xp: 55,

      vocabulary: [
        { native: "Me", english: "I" },
        { native: "Wo", english: "You" },
        { native: "Ɔ", english: "He / She" },
        { native: "Yɛn", english: "We" },
        { native: "Mo", english: "You (plural)" },
        { native: "Wɔn", english: "They" }
      ],

      cultureCard: {
        id: "language-and-people",
        title: "Language Begins With People",
        emoji: "👥",
        category: "Communication",
        text:
          "Pronouns may be small words, but they make conversation personal. Learning who is speaking and who is being addressed is one of the first steps toward building natural Twi sentences."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Me.",
          english: "I / me."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Wo.",
          english: "You."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Yɛn.",
          english: "We."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Wɔn.",
          english: "They."
        }
      ],

      questions: [
        {
          id: "u3-l1-q1",
          type: "multiple-choice",
          prompt: "Which Twi pronoun means “I”?",
          options: ["Me", "Wo", "Mo", "Wɔn"],
          answer: "Me",
          explanation: "Me is the first-person singular pronoun."
        },
        {
          id: "u3-l1-q2",
          type: "multiple-choice",
          prompt: "Which pronoun means “we”?",
          options: ["Ɔ", "Yɛn", "Wo", "Mo"],
          answer: "Yɛn",
          explanation: "Yɛn means “we.”"
        },
        {
          id: "u3-l1-q3",
          type: "multiple-choice",
          prompt: "Translate “Wɔn”.",
          options: ["I", "You", "We", "They"],
          answer: "They",
          explanation: "Wɔn means “they.”"
        },
        {
          id: "u3-l1-q4",
          type: "multiple-choice",
          prompt: "Which pronoun represents “he / she”?",
          options: ["Me", "Ɔ", "Yɛn", "Wɔn"],
          answer: "Ɔ",
          explanation: "Ɔ is used for a third-person singular subject."
        },
        {
          id: "u3-l1-q5",
          type: "multiple-choice",
          prompt: "Which pronoun means “you” when speaking to several people?",
          options: ["Wo", "Mo", "Me", "Ɔ"],
          answer: "Mo",
          explanation: "Mo is the plural form of “you.”"
        }
      ]
    },

    // =====================================================
    // LESSON 2 — TO BE / YƐ
    // =====================================================
    {
      id: "to-be-ye",
      title: "To Be — Yɛ",
      emoji: "🧩",
      xp: 60,

      vocabulary: [
        {
          native: "Yɛ",
          english: "To be / is / am / are"
        }
      ],

      cultureCard: {
        id: "small-words-big-power",
        title: "Small Words, Big Power",
        emoji: "🧩",
        category: "Grammar",
        text:
          "A small set of high-frequency words can unlock hundreds of sentences. Learning core sentence patterns makes it easier to move beyond memorized phrases."
      },

      conversation: [
        {
          speaker: "Teacher",
          avatar: "👩🏾‍🏫",
          native: "Yɛ.",
          english: "Be / is / am / are."
        },
        {
          speaker: "Learner",
          avatar: "🧑🏾",
          native: "Yɛ.",
          english: "To be."
        }
      ],

      questions: [
        {
          id: "u3-l2-q1",
          type: "multiple-choice",
          prompt: "Which word is introduced for the idea of “to be”?",
          options: ["Yɛ", "Mepɛ", "Mewɔ", "Sɛn"],
          answer: "Yɛ",
          explanation: "Yɛ is the core form introduced in this lesson."
        },
        {
          id: "u3-l2-q2",
          type: "multiple-choice",
          prompt: "Which lesson concept is connected with “is / am / are”?",
          options: ["Yɛ", "Wo", "Medaase", "Agoo"],
          answer: "Yɛ",
          explanation: "This lesson introduces Yɛ for the 'to be' concept."
        }
      ]
    },

    // =====================================================
    // LESSON 3 — I HAVE / I WANT
    // =====================================================
    {
      id: "have-want",
      title: "I Have / I Want",
      emoji: "🙋🏾",
      xp: 70,

      vocabulary: [
        {
          native: "Mewɔ",
          english: "I have"
        },
        {
          native: "Mepɛ",
          english: "I want"
        }
      ],

      cultureCard: {
        id: "expressing-needs",
        title: "From Words to Real Needs",
        emoji: "🙋🏾",
        category: "Everyday Speech",
        text:
          "Being able to say what you have and what you want moves you beyond greetings and into practical everyday conversation."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Mewɔ.",
          english: "I have."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Mepɛ.",
          english: "I want."
        }
      ],

      questions: [
        {
          id: "u3-l3-q1",
          type: "multiple-choice",
          prompt: "Which expression means “I have”?",
          options: ["Mewɔ", "Mepɛ", "Yɛ", "Wo"],
          answer: "Mewɔ",
          explanation: "Mewɔ means “I have.”"
        },
        {
          id: "u3-l3-q2",
          type: "multiple-choice",
          prompt: "Which expression means “I want”?",
          options: ["Mepɛ", "Mewɔ", "Me", "Yɛn"],
          answer: "Mepɛ",
          explanation: "Mepɛ means “I want.”"
        },
        {
          id: "u3-l3-q3",
          type: "multiple-choice",
          prompt: "You want to express possession. Which form should you recognize?",
          options: ["Mewɔ", "Mepɛ", "Mo", "Wɔn"],
          answer: "Mewɔ",
          explanation: "Mewɔ expresses the idea of “I have.”"
        },
        {
          id: "u3-l3-q4",
          type: "multiple-choice",
          prompt: "You want something. Which expression matches that idea?",
          options: ["Mepɛ", "Mewɔ", "Ɔ", "Yɛ"],
          answer: "Mepɛ",
          explanation: "Mepɛ expresses “I want.”"
        }
      ]
    },

    // =====================================================
    // LESSON 4 — YES / NO SENTENCES
    // =====================================================
    {
      id: "yes-no-sentences",
      title: "Simple Yes / No Sentences",
      emoji: "✅",
      xp: 75,

      vocabulary: [
        {
          native: "Aane",
          english: "Yes"
        },
        {
          native: "Daabi",
          english: "No"
        }
      ],

      cultureCard: {
        id: "conversation-needs-responses",
        title: "Conversation Is a Two-Way Street",
        emoji: "↔️",
        category: "Conversation",
        text:
          "Fluency is not only about producing long sentences. Short responses such as yes and no help learners participate naturally in real conversations."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Aane.",
          english: "Yes."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Daabi.",
          english: "No."
        }
      ],

      questions: [
        {
          id: "u3-l4-q1",
          type: "multiple-choice",
          prompt: "Which response means “Yes”?",
          options: ["Aane", "Daabi", "Mewɔ", "Mepɛ"],
          answer: "Aane",
          explanation: "Aane means “Yes.”"
        },
        {
          id: "u3-l4-q2",
          type: "multiple-choice",
          prompt: "Which response means “No”?",
          options: ["Daabi", "Aane", "Yɛ", "Wo"],
          answer: "Daabi",
          explanation: "Daabi means “No.”"
        },
        {
          id: "u3-l4-q3",
          type: "conversation",
          prompt: "Someone asks you a yes/no question and you agree. Which response fits?",
          options: ["Aane", "Daabi", "Mepɛ", "Wɔn"],
          answer: "Aane",
          explanation: "Aane is an affirmative response."
        },
        {
          id: "u3-l4-q4",
          type: "conversation",
          prompt: "You want to disagree or answer negatively. Choose the response.",
          options: ["Daabi", "Aane", "Mewɔ", "Yɛn"],
          answer: "Daabi",
          explanation: "Daabi gives a negative response."
        }
      ]
    },

    // =====================================================
    // LESSON 5 — BASIC SENTENCES CHALLENGE
    // =====================================================
    {
      id: "basic-sentences-challenge",
      title: "Basic Sentences Challenge",
      emoji: "🏆",
      xp: 120,

      cultureCard: {
        id: "first-sentence-builder",
        title: "You Are Building Sentences",
        emoji: "⭐",
        category: "Milestone",
        text:
          "You have moved beyond greetings and numbers. You can now recognize core pronouns and essential sentence-building forms used to express identity, possession, wants, and responses."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Me.",
          english: "I."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Mewɔ.",
          english: "I have."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Mepɛ.",
          english: "I want."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Aane.",
          english: "Yes."
        }
      ],

      questions: [
        {
          id: "u3-l5-q1",
          type: "multiple-choice",
          prompt: "Which pronoun means “we”?",
          options: ["Yɛn", "Me", "Wo", "Ɔ"],
          answer: "Yɛn",
          explanation: "Yɛn means “we.”"
        },
        {
          id: "u3-l5-q2",
          type: "multiple-choice",
          prompt: "Translate “Mewɔ”.",
          options: ["I have", "I want", "We are", "They are"],
          answer: "I have",
          explanation: "Mewɔ means “I have.”"
        },
        {
          id: "u3-l5-q3",
          type: "multiple-choice",
          prompt: "Which expression means “I want”?",
          options: ["Mepɛ", "Mewɔ", "Yɛ", "Aane"],
          answer: "Mepɛ",
          explanation: "Mepɛ means “I want.”"
        },
        {
          id: "u3-l5-q4",
          type: "multiple-choice",
          prompt: "Which pronoun means “they”?",
          options: ["Wɔn", "Mo", "Yɛn", "Me"],
          answer: "Wɔn",
          explanation: "Wɔn means “they.”"
        },
        {
          id: "u3-l5-q5",
          type: "multiple-choice",
          prompt: "Choose the affirmative response.",
          options: ["Aane", "Daabi", "Mepɛ", "Ɔ"],
          answer: "Aane",
          explanation: "Aane means “Yes.”"
        },
        {
          id: "u3-l5-q6",
          type: "multiple-choice",
          prompt: "Which core form belongs to the “to be” lesson?",
          options: ["Yɛ", "Mewɔ", "Mepɛ", "Wɔn"],
          answer: "Yɛ",
          explanation: "Yɛ is the core 'to be' form introduced in Unit 3."
        }
      ]
    }
  ]
};
