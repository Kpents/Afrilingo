export const gaUnit2 = {
  id: "ga-unit-2",
  title: "Numbers & Counting",
  subtitle: "Count, ask about quantities, and handle simple prices in Ga.",
  lessons: [
    {
      id: "ga-numbers-1-10", title: "Numbers 1–10", emoji: "🔢", xp: 50,
      vocabulary: [
        { native: "Ekome", english: "One", number: 1 }, { native: "Enyɔ", english: "Two", number: 2 },
        { native: "Etɛ", english: "Three", number: 3 }, { native: "Ejwɛ", english: "Four", number: 4 },
        { native: "Enumɔ", english: "Five", number: 5 }, { native: "Ekpaa", english: "Six", number: 6 },
        { native: "Kpawo", english: "Seven", number: 7 }, { native: "Kpaanyɔ", english: "Eight", number: 8 },
        { native: "Nɛɛhu", english: "Nine", number: 9 }, { native: "Nyɔŋma", english: "Ten", number: 10 }
      ],
      cultureCard: { id: "ga-counting-daily-life", title: "Counting Through Daily Life", emoji: "🧺", category: "Daily Life", text: "Ga numbers become useful immediately when discussing quantities, transport, food, and market purchases around Accra and other Ga communities." },
      conversation: [
        { speaker: "Nii", avatar: "👨🏾", native: "Ekome, enyɔ, etɛ.", english: "One, two, three." },
        { speaker: "Ayele", avatar: "👩🏾", native: "Ejwɛ, enumɔ.", english: "Four, five." }
      ],
      questions: [
        { id: "ga-u2-l1-q1", type: "native-to-english", prompt: "What number is “Enyɔ”?", options: ["One", "Two", "Four", "Eight"], answer: "Two", explanation: "Enyɔ means two." },
        { id: "ga-u2-l1-q2", type: "english-to-native", prompt: "Choose the Ga word for five.", options: ["Enumɔ", "Ejwɛ", "Ekpaa", "Kpawo"], answer: "Enumɔ", explanation: "Enumɔ means five." },
        { id: "ga-u2-l1-q3", type: "matching", prompt: "Match the number words.", pairs: [{ native: "Ekome", english: "One" }, { native: "Etɛ", english: "Three" }, { native: "Kpaanyɔ", english: "Eight" }], explanation: "These are core Ga cardinal numbers." },
        { id: "ga-u2-l1-q4", type: "fill-in-the-blank", prompt: "Complete the sequence: Kpawo, Kpaanyɔ, ___.", options: ["Nɛɛhu", "Nyɔŋma", "Ekpaa", "Enumɔ"], answer: "Nɛɛhu", explanation: "Seven, eight, nine are Kpawo, Kpaanyɔ, Nɛɛhu." },
        { id: "ga-u2-l1-q5", type: "multiple-choice", prompt: "Which Ga word means ten?", options: ["Nyɔŋma", "Nɛɛhu", "Ekome", "Ekpaa"], answer: "Nyɔŋma", explanation: "Nyɔŋma means ten." }
      ]
    },
    {
      id: "ga-numbers-11-100", title: "Numbers 11–100", emoji: "💯", xp: 65,
      vocabulary: [
        { native: "Nyɔŋma kɛ ekome", english: "Eleven", number: 11 }, { native: "Nyɔŋma kɛ enyɔ", english: "Twelve", number: 12 },
        { native: "Nyɔŋmai-enyɔ", english: "Twenty", number: 20 }, { native: "Nyɔŋmai-etɛ", english: "Thirty", number: 30 },
        { native: "Nyɔŋmai-ejwɛ", english: "Forty", number: 40 }, { native: "Nyɔŋmai-enumɔ", english: "Fifty", number: 50 },
        { native: "Oha", english: "One hundred", number: 100 }
      ],
      cultureCard: { id: "ga-number-building-patterns", title: "Build Bigger Numbers", emoji: "🧠", category: "Language Pattern", text: "Ga builds eleven through nineteen from ten plus a smaller number. Multiples of ten use a tens expression followed by the multiplier." },
      conversation: [
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Nyɔŋma kɛ enyɔ.", english: "Twelve." },
        { speaker: "Learner", avatar: "🧑🏾", native: "Nyɔŋmai-enyɔ.", english: "Twenty." },
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Oha.", english: "One hundred." }
      ],
      questions: [
        { id: "ga-u2-l2-q1", type: "native-to-english", prompt: "What number is “Nyɔŋma kɛ ekome”?", options: ["Ten", "Eleven", "Twenty", "Twenty-one"], answer: "Eleven", explanation: "Nyɔŋma kɛ ekome combines ten and one." },
        { id: "ga-u2-l2-q2", type: "english-to-native", prompt: "Choose the Ga form for twenty.", options: ["Nyɔŋmai-enyɔ", "Nyɔŋmai-etɛ", "Nyɔŋma", "Oha"], answer: "Nyɔŋmai-enyɔ", explanation: "Nyɔŋmai-enyɔ means twenty—two tens." },
        { id: "ga-u2-l2-q3", type: "matching", prompt: "Match the larger numbers.", pairs: [{ native: "Nyɔŋmai-etɛ", english: "Thirty" }, { native: "Nyɔŋmai-ejwɛ", english: "Forty" }, { native: "Oha", english: "One hundred" }], explanation: "The repeated nyɔŋmai pattern marks multiples of ten." },
        { id: "ga-u2-l2-q4", type: "sentence-builder", prompt: "Build the Ga number: twelve.", tiles: ["Nyɔŋma", "kɛ", "enyɔ"], answer: "Nyɔŋma kɛ enyɔ", explanation: "Twelve is formed as ten and two." }
      ]
    },
    {
      id: "ga-how-much-how-many", title: "How Much / How Many?", emoji: "❓", xp: 60,
      vocabulary: [
        { native: "Enyie?", english: "How much? / How many?" },
        { native: "Enyie ahoo enɛ?", english: "How much is this?" },
        { native: "Enyie otaoo abe?", english: "How many do you want to buy?" },
        { native: "Mɛi enyie ba?", english: "How many people came?" },
        { native: "Ekpaa pe.", english: "Only six." }
      ],
      cultureCard: { id: "ga-enyie-context", title: "One Question, Different Quantities", emoji: "⚖️", category: "Language Pattern", text: "Enyie can ask both “how much?” and “how many?” The surrounding words and situation clarify whether the question concerns price, people, or objects." },
      conversation: [
        { speaker: "Seller", avatar: "👩🏾", native: "Enyie otaoo abe?", english: "How many do you want to buy?" },
        { speaker: "Buyer", avatar: "👨🏾", native: "Ekpaa pe.", english: "Only six." }
      ],
      questions: [
        { id: "ga-u2-l3-q1", type: "native-to-english", prompt: "What does “Enyie?” ask?", options: ["How much / how many?", "Where?", "When?", "Who?"], answer: "How much / how many?", explanation: "Enyie asks about amount or number." },
        { id: "ga-u2-l3-q2", type: "english-to-native", prompt: "Choose “How much is this?”", options: ["Enyie ahoo enɛ?", "Mɛi enyie ba?", "Ekpaa pe.", "Enyie otaoo abe?"], answer: "Enyie ahoo enɛ?", explanation: "This price question appears in the Bureau of Ghana Languages guide." },
        { id: "ga-u2-l3-q3", type: "conversation", prompt: "A seller asks “Enyie otaoo abe?” Choose “Only six.”", options: ["Ekpaa pe.", "Nyɔŋma.", "Oha.", "Enyie?"], answer: "Ekpaa pe.", explanation: "Ekpaa means six and pe means only." },
        { id: "ga-u2-l3-q4", type: "sentence-builder", prompt: "Build: How many people came?", tiles: ["Mɛi", "enyie", "ba?"], answer: "Mɛi enyie ba?", explanation: "Mɛi refers to people, while enyie asks how many." }
      ]
    },
    {
      id: "ga-prices-simple-math", title: "Prices & Simple Math", emoji: "🛒", xp: 70,
      vocabulary: [
        { native: "Jara", english: "Price / market" }, { native: "Enyie ahoo enɛ?", english: "How much is this?" },
        { native: "Nyɔŋma", english: "Ten" }, { native: "Nyɔŋmai-enyɔ", english: "Twenty" }, { native: "Nyɔŋmai-etɛ", english: "Thirty" }
      ],
      cultureCard: { id: "ga-market-number-talk", title: "Numbers at the Market", emoji: "🏪", category: "Market Life", text: "Market conversations connect greetings, quantities, and prices. Published Ga guides use these exchanges to teach learners how number knowledge becomes practical speech." },
      conversation: [
        { speaker: "Buyer", avatar: "👨🏾", native: "Enyie ahoo enɛ?", english: "How much is this?" },
        { speaker: "Seller", avatar: "👩🏾", native: "Nyɔŋma.", english: "Ten." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Enyɔ, ofaine.", english: "Two, please." }
      ],
      questions: [
        { id: "ga-u2-l4-q1", type: "multiple-choice", prompt: "Ekome plus enyɔ equals which number?", options: ["Etɛ", "Ejwɛ", "Enumɔ", "Ekpaa"], answer: "Etɛ", explanation: "One plus two equals three; Etɛ means three." },
        { id: "ga-u2-l4-q2", type: "multiple-choice", prompt: "Nyɔŋma plus nyɔŋma gives which Ga number?", options: ["Nyɔŋmai-enyɔ", "Nyɔŋmai-etɛ", "Oha", "Nɛɛhu"], answer: "Nyɔŋmai-enyɔ", explanation: "Ten plus ten is twenty, Nyɔŋmai-enyɔ." },
        { id: "ga-u2-l4-q3", type: "matching", prompt: "Match the price amounts.", pairs: [{ native: "Nyɔŋma", english: "10" }, { native: "Nyɔŋmai-enyɔ", english: "20" }, { native: "Nyɔŋmai-etɛ", english: "30" }], explanation: "Recognizing amounts quickly supports market conversations." },
        { id: "ga-u2-l4-q4", type: "conversation", prompt: "You want to ask the price of an item. What do you say?", options: ["Enyie ahoo enɛ?", "Mɛi enyie ba?", "Ekpaa pe.", "Oha."], answer: "Enyie ahoo enɛ?", explanation: "This asks “How much is this?”" }
      ]
    },
    {
      id: "ga-numbers-challenge", title: "Numbers Challenge", emoji: "🏆", xp: 100,
      cultureCard: { id: "ga-numbers-in-action", title: "From Counting to Conversation", emoji: "⭐", category: "Milestone", text: "You can now count from one into the hundreds, ask about quantities and prices, and recognize useful number patterns in everyday Ga." },
      conversation: [
        { speaker: "Ayele", avatar: "👩🏾", native: "Enyie otaoo abe?", english: "How many do you want to buy?" },
        { speaker: "Nii", avatar: "👨🏾", native: "Nyɔŋma.", english: "Ten." },
        { speaker: "Ayele", avatar: "👩🏾", native: "Enyie ahoo enɛ?", english: "How much is this?" }
      ],
      questions: [
        { id: "ga-u2-l5-q1", type: "challenge", prompt: "What number is “Kpaanyɔ”?", options: ["Six", "Seven", "Eight", "Nine"], answer: "Eight", explanation: "Kpaanyɔ means eight." },
        { id: "ga-u2-l5-q2", type: "native-to-english", prompt: "Translate “Nyɔŋma kɛ etɛ.”", options: ["Thirteen", "Twenty-three", "Thirty", "Three"], answer: "Thirteen", explanation: "Ten and three form thirteen." },
        { id: "ga-u2-l5-q3", type: "english-to-native", prompt: "Choose “How much is this?”", options: ["Enyie ahoo enɛ?", "Enyie otaoo abe?", "Mɛi enyie ba?", "Ekpaa pe."], answer: "Enyie ahoo enɛ?", explanation: "This is the price question." },
        { id: "ga-u2-l5-q4", type: "matching", prompt: "Match each number form.", pairs: [{ native: "Nɛɛhu", english: "Nine" }, { native: "Nyɔŋmai-ejwɛ", english: "Forty" }, { native: "Oha", english: "One hundred" }], explanation: "These forms span single digits, tens, and hundreds." },
        { id: "ga-u2-l5-q5", type: "sentence-builder", prompt: "Build: How many do you want to buy?", tiles: ["Enyie", "otaoo", "abe?"], answer: "Enyie otaoo abe?", explanation: "This asks the desired quantity in a buying context." }
      ]
    }
  ]
};
