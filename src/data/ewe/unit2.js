export const eweUnit2 = {
  id: "ewe-unit-2",
  title: "Numbers & Counting",
  subtitle: "Count, ask about quantities, and work with everyday amounts in Eʋegbe.",
  lessons: [
    {
      id: "ewe-numbers-1-10", title: "Numbers 1–10", emoji: "🔢", xp: 50,
      vocabulary: [
        { native: "Ɖeka", english: "One", number: 1 }, { native: "Eve", english: "Two", number: 2 },
        { native: "Etɔ̃", english: "Three", number: 3 }, { native: "Ene", english: "Four", number: 4 },
        { native: "Atɔ̃", english: "Five", number: 5 }, { native: "Ade", english: "Six", number: 6 },
        { native: "Adre", english: "Seven", number: 7 }, { native: "Enyi", english: "Eight", number: 8 },
        { native: "Asieke", english: "Nine", number: 9 }, { native: "Ewo", english: "Ten", number: 10 }
      ],
      cultureCard: { id: "ewe-counting-everyday-life", title: "Counting in Everyday Life", emoji: "🧺", category: "Daily Life", text: "Ewe number words appear in everyday conversations about people, objects, time, travel, and purchases. Learning the first ten gives you the building blocks for larger numbers." },
      conversation: [
        { speaker: "Esi", avatar: "👩🏾", native: "Ɖeka, eve, etɔ̃.", english: "One, two, three." },
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Ene, atɔ̃.", english: "Four, five." }
      ],
      questions: [
        { id: "ewe-u2-l1-q1", type: "native-to-english", prompt: "What number is “Eve”?", options: ["One", "Two", "Five", "Eight"], answer: "Two", explanation: "Eve means two." },
        { id: "ewe-u2-l1-q2", type: "english-to-native", prompt: "Choose the Ewe word for five.", options: ["Atɔ̃", "Etɔ̃", "Ade", "Adre"], answer: "Atɔ̃", explanation: "Atɔ̃ means five." },
        { id: "ewe-u2-l1-q3", type: "matching", prompt: "Match the number words.", pairs: [{ native: "Ɖeka", english: "One" }, { native: "Ene", english: "Four" }, { native: "Enyi", english: "Eight" }], explanation: "These are core Ewe cardinal numbers." },
        { id: "ewe-u2-l1-q4", type: "fill-in-the-blank", prompt: "Complete the sequence: Adre, enyi, ___.", options: ["Asieke", "Ewo", "Ade", "Atɔ̃"], answer: "Asieke", explanation: "Seven, eight, nine are adre, enyi, asieke." },
        { id: "ewe-u2-l1-q5", type: "multiple-choice", prompt: "Which Ewe word means ten?", options: ["Ewo", "Asieke", "Eve", "Ade"], answer: "Ewo", explanation: "Ewo means ten." }
      ]
    },
    {
      id: "ewe-numbers-11-100", title: "Numbers 11–100", emoji: "💯", xp: 65,
      vocabulary: [
        { native: "Wuiɖeka", english: "Eleven", number: 11 }, { native: "Wuieve", english: "Twelve", number: 12 },
        { native: "Wuiatɔ̃", english: "Fifteen", number: 15 }, { native: "Blaeve", english: "Twenty", number: 20 },
        { native: "Blaetɔ̃", english: "Thirty", number: 30 }, { native: "Blaene", english: "Forty", number: 40 },
        { native: "Blaeve vɔ ɖeka", english: "Twenty-one", number: 21 }, { native: "Alafa ɖeka", english: "One hundred", number: 100 }
      ],
      cultureCard: { id: "ewe-number-building-patterns", title: "How Bigger Numbers Are Built", emoji: "🧠", category: "Language Pattern", text: "Ewe larger numbers follow reusable patterns. Wui- forms the teens, bla- builds multiples of ten, and vɔ adds the remaining amount: blaeve vɔ ɖeka is twenty plus one." },
      conversation: [
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Wuieve.", english: "Twelve." },
        { speaker: "Learner", avatar: "🧑🏾", native: "Blaeve.", english: "Twenty." },
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Alafa ɖeka.", english: "One hundred." }
      ],
      questions: [
        { id: "ewe-u2-l2-q1", type: "native-to-english", prompt: "What number is “Wuiɖeka”?", options: ["Ten", "Eleven", "Twenty", "Twenty-one"], answer: "Eleven", explanation: "Wuiɖeka means eleven." },
        { id: "ewe-u2-l2-q2", type: "english-to-native", prompt: "Choose the Ewe form for twenty.", options: ["Blaeve", "Blaetɔ̃", "Wuieve", "Alafa ɖeka"], answer: "Blaeve", explanation: "Blaeve means twenty." },
        { id: "ewe-u2-l2-q3", type: "matching", prompt: "Match the larger numbers.", pairs: [{ native: "Blaetɔ̃", english: "Thirty" }, { native: "Blaene", english: "Forty" }, { native: "Alafa ɖeka", english: "One hundred" }], explanation: "The bla- forms mark multiples of ten; alafa marks hundreds." },
        { id: "ewe-u2-l2-q4", type: "sentence-builder", prompt: "Build the Ewe number: twenty-one.", tiles: ["Blaeve", "vɔ", "ɖeka"], answer: "Blaeve vɔ ɖeka", explanation: "Vɔ adds the final unit to the multiple of ten." }
      ]
    },
    {
      id: "ewe-how-many", title: "Asking How Many", emoji: "❓", xp: 60,
      vocabulary: [
        { native: "Neni?", english: "How many?" },
        { native: "Nkeke neni?", english: "How many days?" },
        { native: "Nkeke nenie mienɔ anyi?", english: "How many days did you stay?" },
        { native: "Nkeke eve.", english: "Two days." }
      ],
      cultureCard: { id: "ewe-neni-and-nouns", title: "A Useful Quantity Pattern", emoji: "⚖️", category: "Language Pattern", text: "Neni asks “how many.” In the Ewe Basic Course, a noun followed by a number or neni remains in its singular form—a useful pattern when asking about quantities." },
      conversation: [
        { speaker: "Esi", avatar: "👩🏾", native: "Nkeke nenie mienɔ anyi?", english: "How many days did you stay?" },
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Nkeke eve.", english: "Two days." }
      ],
      questions: [
        { id: "ewe-u2-l3-q1", type: "native-to-english", prompt: "What does “Neni?” ask?", options: ["How many?", "Where?", "When?", "Who?"], answer: "How many?", explanation: "Neni asks about quantity." },
        { id: "ewe-u2-l3-q2", type: "english-to-native", prompt: "Choose “How many days?”", options: ["Nkeke neni?", "Nkeke eve.", "Blaeve.", "Neni ŋkɔ?"], answer: "Nkeke neni?", explanation: "Nkeke means day, and neni asks how many." },
        { id: "ewe-u2-l3-q3", type: "conversation", prompt: "Someone asks “Nkeke nenie mienɔ anyi?” Choose “Two days.”", options: ["Nkeke eve.", "Nkeke etɔ̃.", "Ewo.", "Alafa ɖeka."], answer: "Nkeke eve.", explanation: "Nkeke eve means two days." },
        { id: "ewe-u2-l3-q4", type: "sentence-builder", prompt: "Build: How many days?", tiles: ["Nkeke", "neni?"], answer: "Nkeke neni?", explanation: "The noun comes before neni in this quantity question." }
      ]
    },
    {
      id: "ewe-amounts-simple-math", title: "Amounts & Simple Math", emoji: "🛒", xp: 70,
      vocabulary: [
        { native: "Ɖeka", english: "One" }, { native: "Eve", english: "Two" },
        { native: "Etɔ̃", english: "Three" }, { native: "Ewo", english: "Ten" },
        { native: "Blaeve", english: "Twenty" }, { native: "Blaetɔ̃", english: "Thirty" }
      ],
      cultureCard: { id: "ewe-numbers-at-the-market", title: "Numbers at the Market", emoji: "🏪", category: "Market Life", text: "Quick number recognition is especially useful when counting goods and checking totals. This lesson practices the number system without assuming one fixed market phrase across Ewe-speaking regions." },
      conversation: [
        { speaker: "Seller", avatar: "👩🏾", native: "Ewo.", english: "Ten." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Eve.", english: "Two." },
        { speaker: "Seller", avatar: "👩🏾", native: "Blaeve.", english: "Twenty." }
      ],
      questions: [
        { id: "ewe-u2-l4-q1", type: "multiple-choice", prompt: "Ɖeka plus eve equals which Ewe number?", options: ["Etɔ̃", "Ene", "Atɔ̃", "Ade"], answer: "Etɔ̃", explanation: "One plus two is three; etɔ̃ means three." },
        { id: "ewe-u2-l4-q2", type: "multiple-choice", prompt: "Ewo plus ewo gives which Ewe number?", options: ["Blaeve", "Blaetɔ̃", "Wuieve", "Alafa ɖeka"], answer: "Blaeve", explanation: "Ten plus ten is twenty, blaeve." },
        { id: "ewe-u2-l4-q3", type: "matching", prompt: "Match the amounts.", pairs: [{ native: "Ewo", english: "10" }, { native: "Blaeve", english: "20" }, { native: "Blaetɔ̃", english: "30" }], explanation: "Recognizing amounts quickly supports everyday counting." },
        { id: "ewe-u2-l4-q4", type: "fill-in-the-blank", prompt: "Complete: Blaeve vɔ ___ means twenty-one.", options: ["ɖeka", "eve", "etɔ̃", "ewo"], answer: "ɖeka", explanation: "Twenty-one is blaeve vɔ ɖeka." }
      ]
    },
    {
      id: "ewe-numbers-challenge", title: "Numbers Challenge", emoji: "🏆", xp: 100,
      cultureCard: { id: "ewe-numbers-in-action", title: "From Counting to Conversation", emoji: "⭐", category: "Milestone", text: "You can now recognize Ewe numbers from one into the hundreds, use neni to ask about quantity, and apply number-building patterns to everyday amounts." },
      conversation: [
        { speaker: "Esi", avatar: "👩🏾", native: "Nkeke neni?", english: "How many days?" },
        { speaker: "Kɔsi", avatar: "👨🏾", native: "Nkeke etɔ̃.", english: "Three days." }
      ],
      questions: [
        { id: "ewe-u2-l5-q1", type: "challenge", prompt: "What number is “Enyi”?", options: ["Six", "Seven", "Eight", "Nine"], answer: "Eight", explanation: "Enyi means eight." },
        { id: "ewe-u2-l5-q2", type: "native-to-english", prompt: "Translate “Wuieve.”", options: ["Twelve", "Twenty-two", "Twenty", "Two"], answer: "Twelve", explanation: "Wuieve means twelve." },
        { id: "ewe-u2-l5-q3", type: "english-to-native", prompt: "Choose “How many days?”", options: ["Nkeke neni?", "Nkeke eve.", "Neni ŋkɔ?", "Blaeve?"], answer: "Nkeke neni?", explanation: "Nkeke neni? asks how many days." },
        { id: "ewe-u2-l5-q4", type: "matching", prompt: "Match each number form.", pairs: [{ native: "Asieke", english: "Nine" }, { native: "Blaene", english: "Forty" }, { native: "Alafa ɖeka", english: "One hundred" }], explanation: "These forms span single digits, tens, and hundreds." },
        { id: "ewe-u2-l5-q5", type: "sentence-builder", prompt: "Build the Ewe number: twenty-one.", tiles: ["Blaeve", "vɔ", "ɖeka"], answer: "Blaeve vɔ ɖeka", explanation: "The expression combines twenty, vɔ, and one." }
      ]
    }
  ]
};
