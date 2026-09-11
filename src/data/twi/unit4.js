export const unit4 = {
  id: "twi-unit-4",
  title: "Family & People",
  subtitle:
    "Talk about the people closest to you and describe your family in simple Twi.",

  lessons: [
    // =====================================================
    // LESSON 1 — IMMEDIATE FAMILY
    // =====================================================
    {
      id: "immediate-family",
      title: "Immediate Family",
      emoji: "👨‍👩‍👧",
      xp: 60,

      vocabulary: [
        { native: "Maame", english: "Mother" },
        { native: "Agya", english: "Father" },
        { native: "Ba", english: "Child" },
        { native: "Onua", english: "Sibling" },
        { native: "Onua barima", english: "Brother" },
        { native: "Onua baa", english: "Sister" }
      ],

      cultureCard: {
        id: "family-beyond-household",
        title: "Family Is Bigger Than a Household",
        emoji: "🏡",
        category: "Family",
        text:
          "In Akan communities, family often extends beyond parents and children. Relatives across the wider family network can play important roles in everyday life, identity, support, and belonging."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Oyi ne me maame.",
          english: "This is my mother."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Oyi ne me agya.",
          english: "This is my father."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Oyi ne me nua.",
          english: "This is my sibling."
        }
      ],

      questions: [
        {
          id: "u4-l1-q1",
          type: "multiple-choice",
          prompt: "Which Twi word means “mother”?",
          options: ["Maame", "Agya", "Ba", "Onua"],
          answer: "Maame",
          explanation: "Maame means mother."
        },
        {
          id: "u4-l1-q2",
          type: "multiple-choice",
          prompt: "What does “Agya” mean?",
          options: ["Father", "Mother", "Child", "Brother"],
          answer: "Father",
          explanation: "Agya means father."
        },
        {
          id: "u4-l1-q3",
          type: "multiple-choice",
          prompt: "Which word means “child”?",
          options: ["Ba", "Onua", "Maame", "Agya"],
          answer: "Ba",
          explanation: "Ba means child."
        },
        {
          id: "u4-l1-q4",
          type: "multiple-choice",
          prompt: "Which word refers generally to a sibling?",
          options: ["Onua", "Ba", "Agya", "Maame"],
          answer: "Onua",
          explanation: "Onua refers to a sibling."
        },
        {
          id: "u4-l1-q5",
          type: "multiple-choice",
          prompt: "Which phrase means “brother”?",
          options: ["Onua barima", "Onua baa", "Maame", "Ba"],
          answer: "Onua barima",
          explanation: "Onua barima refers to a male sibling."
        }
      ]
    },

    // =====================================================
    // LESSON 2 — EXTENDED FAMILY
    // =====================================================
    {
      id: "extended-family",
      title: "Extended Family",
      emoji: "🌳",
      xp: 65,

      vocabulary: [
        { native: "Nana", english: "Grandparent / elder" },
        { native: "Wɔfa", english: "Maternal uncle" },
        { native: "Agya nua", english: "Father's sibling" },
        { native: "Maame nua", english: "Mother's sibling" },
        { native: "Busua", english: "Family / clan" }
      ],

      cultureCard: {
        id: "abusua-and-belonging",
        title: "The Wider Family Network",
        emoji: "🌳",
        category: "Kinship",
        text:
          "Akan family relationships can carry meanings that go beyond English labels such as aunt or uncle. Extended family and lineage are important parts of belonging and social identity."
      },

      conversation: [
        {
          speaker: "Esi",
          avatar: "👩🏾",
          native: "Oyi ne me nana.",
          english: "This is my grandparent."
        },
        {
          speaker: "Yaw",
          avatar: "👨🏾",
          native: "Oyi ne me wɔfa.",
          english: "This is my maternal uncle."
        },
        {
          speaker: "Esi",
          avatar: "👩🏾",
          native: "Yɛyɛ abusua.",
          english: "We are family."
        }
      ],

      questions: [
        {
          id: "u4-l2-q1",
          type: "multiple-choice",
          prompt: "Which word can refer to a grandparent or respected elder?",
          options: ["Nana", "Ba", "Onua", "Agya"],
          answer: "Nana",
          explanation: "Nana may be used for a grandparent and also as a respectful title."
        },
        {
          id: "u4-l2-q2",
          type: "multiple-choice",
          prompt: "Which word means “maternal uncle”?",
          options: ["Wɔfa", "Nana", "Onua", "Ba"],
          answer: "Wɔfa",
          explanation: "Wɔfa refers to a maternal uncle."
        },
        {
          id: "u4-l2-q3",
          type: "multiple-choice",
          prompt: "What does “abusua” relate to?",
          options: ["Family / clan", "Food", "Numbers", "Weather"],
          answer: "Family / clan",
          explanation: "Abusua refers to family or clan."
        },
        {
          id: "u4-l2-q4",
          type: "multiple-choice",
          prompt: "Which phrase means “mother's sibling”?",
          options: ["Maame nua", "Agya nua", "Onua barima", "Ba"],
          answer: "Maame nua",
          explanation: "Maame nua literally identifies the mother's sibling."
        }
      ]
    },

    // =====================================================
    // LESSON 3 — DESCRIBING PEOPLE
    // =====================================================
    {
      id: "describing-people",
      title: "Describing People",
      emoji: "🧍🏾",
      xp: 70,

      vocabulary: [
        { native: "Barima", english: "Man / male" },
        { native: "Ɔbaa", english: "Woman / female" },
        { native: "Abofra", english: "Child / young person" },
        { native: "Panyin", english: "Elder / older person" },
        { native: "Kumaa", english: "Small / young" }
      ],

      cultureCard: {
        id: "respect-and-age",
        title: "Age and Respect",
        emoji: "🙏🏾",
        category: "Respect",
        text:
          "Age can influence how people address one another in Akan society. Respectful language and titles are often especially important when speaking with elders."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Ɔyɛ ɔbaa.",
          english: "She is a woman."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Ɔyɛ barima.",
          english: "He is a man."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Ɔyɛ abofra.",
          english: "He / she is a child."
        }
      ],

      questions: [
        {
          id: "u4-l3-q1",
          type: "multiple-choice",
          prompt: "Which word means “woman”?",
          options: ["Ɔbaa", "Barima", "Abofra", "Panyin"],
          answer: "Ɔbaa",
          explanation: "Ɔbaa means woman or female."
        },
        {
          id: "u4-l3-q2",
          type: "multiple-choice",
          prompt: "What does “barima” mean?",
          options: ["Man", "Woman", "Child", "Family"],
          answer: "Man",
          explanation: "Barima means man or male."
        },
        {
          id: "u4-l3-q3",
          type: "multiple-choice",
          prompt: "Which word refers to a child or young person?",
          options: ["Abofra", "Panyin", "Agya", "Nana"],
          answer: "Abofra",
          explanation: "Abofra refers to a child or young person."
        },
        {
          id: "u4-l3-q4",
          type: "multiple-choice",
          prompt: "Which word is associated with an elder or older person?",
          options: ["Panyin", "Kumaa", "Ba", "Onua"],
          answer: "Panyin",
          explanation: "Panyin refers to an elder or older person."
        }
      ]
    },

    // =====================================================
    // LESSON 4 — TALKING ABOUT YOUR FAMILY
    // =====================================================
    {
      id: "talking-about-family",
      title: "Talking About Your Family",
      emoji: "💬",
      xp: 80,

      vocabulary: [
        {
          native: "Me maame",
          english: "My mother"
        },
        {
          native: "Me agya",
          english: "My father"
        },
        {
          native: "Me nua",
          english: "My sibling"
        },
        {
          native: "Me busua",
          english: "My family"
        }
      ],

      cultureCard: {
        id: "introducing-family",
        title: "Family Opens Conversations",
        emoji: "💬",
        category: "Social Life",
        text:
          "Talking about family is a common way to build familiarity. Knowing a few family expressions can quickly make beginner conversations feel more personal."
      },

      conversation: [
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Oyi ne me maame.",
          english: "This is my mother."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Oyi ne me nua.",
          english: "This is my sibling."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Yei ne me busua.",
          english: "This is my family."
        }
      ],

      questions: [
        {
          id: "u4-l4-q1",
          type: "multiple-choice",
          prompt: "What does “Me maame” mean?",
          options: ["My mother", "My father", "My sibling", "My child"],
          answer: "My mother",
          explanation: "Me maame means “my mother.”"
        },
        {
          id: "u4-l4-q2",
          type: "multiple-choice",
          prompt: "Which expression means “my father”?",
          options: ["Me agya", "Me nua", "Me maame", "Me busua"],
          answer: "Me agya",
          explanation: "Me agya means “my father.”"
        },
        {
          id: "u4-l4-q3",
          type: "multiple-choice",
          prompt: "Translate “Me nua”.",
          options: ["My sibling", "My family", "My father", "My grandparent"],
          answer: "My sibling",
          explanation: "Me nua means “my sibling.”"
        },
        {
          id: "u4-l4-q4",
          type: "conversation",
          prompt: "You want to refer to your family. Which phrase fits?",
          options: ["Me busua", "Me agya", "Me nua", "Me maame"],
          answer: "Me busua",
          explanation: "Me busua means “my family.”"
        }
      ]
    },

    // =====================================================
    // LESSON 5 — FAMILY CHALLENGE
    // =====================================================
    {
      id: "family-challenge",
      title: "Family Challenge",
      emoji: "🏆",
      xp: 125,

      cultureCard: {
        id: "family-unit-complete",
        title: "You Can Talk About Your People",
        emoji: "❤️",
        category: "Milestone",
        text:
          "You can now recognize key immediate and extended family terms, identify basic descriptions of people, and talk simply about members of your own family."
      },

      conversation: [
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Oyi ne me maame.",
          english: "This is my mother."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Oyi ne me agya.",
          english: "This is my father."
        },
        {
          speaker: "Ama",
          avatar: "👩🏾",
          native: "Oyi ne me nua.",
          english: "This is my sibling."
        },
        {
          speaker: "Kojo",
          avatar: "👨🏾",
          native: "Yɛyɛ abusua.",
          english: "We are family."
        }
      ],

      questions: [
        {
          id: "u4-l5-q1",
          type: "multiple-choice",
          prompt: "Which word means “mother”?",
          options: ["Maame", "Agya", "Wɔfa", "Ba"],
          answer: "Maame",
          explanation: "Maame means mother."
        },
        {
          id: "u4-l5-q2",
          type: "multiple-choice",
          prompt: "Translate “Agya”.",
          options: ["Father", "Sibling", "Child", "Grandparent"],
          answer: "Father",
          explanation: "Agya means father."
        },
        {
          id: "u4-l5-q3",
          type: "multiple-choice",
          prompt: "Which Twi word means “family / clan”?",
          options: ["Abusua", "Onua", "Panyin", "Barima"],
          answer: "Abusua",
          explanation: "Abusua relates to family or clan."
        },
        {
          id: "u4-l5-q4",
          type: "multiple-choice",
          prompt: "Which word means “woman”?",
          options: ["Ɔbaa", "Barima", "Abofra", "Wɔfa"],
          answer: "Ɔbaa",
          explanation: "Ɔbaa means woman."
        },
        {
          id: "u4-l5-q5",
          type: "multiple-choice",
          prompt: "What does “Me nua” mean?",
          options: ["My sibling", "My father", "My family", "My mother"],
          answer: "My sibling",
          explanation: "Me nua means “my sibling.”"
        },
        {
          id: "u4-l5-q6",
          type: "multiple-choice",
          prompt: "Which word refers to an elder?",
          options: ["Panyin", "Abofra", "Ba", "Kumaa"],
          answer: "Panyin",
          explanation: "Panyin refers to an elder or older person."
        }
      ]
    }
  ]
};
