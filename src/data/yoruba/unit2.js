export const yorubaUnit2 = {
  id: "yoruba-unit-2",
  title: "Numbers & Counting",
  subtitle: "Count, ask about quantities, and use everyday prices in Yorùbá.",
  lessons: [
    {
      id: "yoruba-numbers-1-10", title: "Numbers 1–10", emoji: "🔢", xp: 50,
      vocabulary: [
        { native: "Oókàn", english: "One", number: 1 }, { native: "Eéjì", english: "Two", number: 2 },
        { native: "Ẹ́ẹ̀ta", english: "Three", number: 3 }, { native: "Ẹ́ẹ̀rin", english: "Four", number: 4 },
        { native: "Aárùnún", english: "Five", number: 5 }, { native: "Ẹ́ẹ̀fà", english: "Six", number: 6 },
        { native: "Eéje", english: "Seven", number: 7 }, { native: "Ẹ́ẹ̀jọ", english: "Eight", number: 8 },
        { native: "Ẹ́ẹ̀sànán", english: "Nine", number: 9 }, { native: "Ẹ́ẹ̀wàá", english: "Ten", number: 10 }
      ],
      cultureCard: { id: "yoruba-counting-and-cardinals", title: "Counting Forms and Cardinals", emoji: "🧩", category: "Language Pattern", text: "Yorùbá distinguishes standalone counting forms from cardinal forms that describe nouns. You count eéjì for “two,” but say ìwé méjì for “two books.” This unit introduces both patterns gradually." },
      conversation: [
        { speaker: "Adé", avatar: "👨🏾", native: "Oókàn, eéjì, ẹ́ẹ̀ta.", english: "One, two, three." },
        { speaker: "Bísí", avatar: "👩🏾", native: "Ẹ́ẹ̀rin, aárùnún.", english: "Four, five." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What number is “Eéjì”?", options: ["One", "Two", "Five", "Eight"], answer: "Two", explanation: "Eéjì is the standalone counting form for two." },
        { id: "q2", type: "english-to-native", prompt: "Choose the standalone counting form for five.", options: ["Aárùnún", "Ẹ́ẹ̀ta", "Ẹ́ẹ̀fà", "Eéje"], answer: "Aárùnún", explanation: "Aárùnún is the counting form for five." },
        { id: "q3", type: "matching", prompt: "Match the counting forms.", pairs: [{ native: "Oókàn", english: "One" }, { native: "Ẹ́ẹ̀rin", english: "Four" }, { native: "Ẹ́ẹ̀jọ", english: "Eight" }], explanation: "Tone marks are part of each written number form." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the sequence: Eéje, ẹ́ẹ̀jọ, ___.", options: ["Ẹ́ẹ̀sànán", "Ẹ́ẹ̀wàá", "Ẹ́ẹ̀fà", "Aárùnún"], answer: "Ẹ́ẹ̀sànán", explanation: "Seven, eight, nine are eéje, ẹ́ẹ̀jọ, ẹ́ẹ̀sànán." },
        { id: "q5", type: "multiple-choice", prompt: "Which standalone form means ten?", options: ["Ẹ́ẹ̀wàá", "Ẹ́ẹ̀sànán", "Oókàn", "Ẹ́ẹ̀fà"], answer: "Ẹ́ẹ̀wàá", explanation: "Ẹ́ẹ̀wàá means ten." }
      ]
    },
    {
      id: "yoruba-numbers-11-100", title: "Numbers 11–100", emoji: "💯", xp: 65,
      vocabulary: [
        { native: "Oókànlá", english: "Eleven", number: 11 }, { native: "Eéjìlá", english: "Twelve", number: 12 },
        { native: "Ogún", english: "Twenty", number: 20 }, { native: "Ọgbọ̀n", english: "Thirty", number: 30 },
        { native: "Ogójì", english: "Forty", number: 40 }, { native: "Àádọ́ta", english: "Fifty", number: 50 },
        { native: "Ogọ́ta", english: "Sixty", number: 60 }, { native: "Ogọ́rúnún", english: "One hundred", number: 100 }
      ],
      cultureCard: { id: "yoruba-number-system-patterns", title: "A Distinctive Number System", emoji: "🧠", category: "Language Pattern", text: "Yorùbá numbers beyond ten use established addition and subtraction patterns rather than one uniform decimal formula. Learning key anchor numbers first makes the wider system easier to recognise." },
      conversation: [
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Oókànlá.", english: "Eleven." },
        { speaker: "Learner", avatar: "🧑🏾", native: "Ogún.", english: "Twenty." },
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Ogọ́rúnún.", english: "One hundred." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What number is “Oókànlá”?", options: ["Ten", "Eleven", "Twenty", "Thirty"], answer: "Eleven", explanation: "Oókànlá means eleven." },
        { id: "q2", type: "english-to-native", prompt: "Choose the Yorùbá form for twenty.", options: ["Ogún", "Ọgbọ̀n", "Ogójì", "Ogọ́rúnún"], answer: "Ogún", explanation: "Ogún means twenty." },
        { id: "q3", type: "matching", prompt: "Match the larger numbers.", pairs: [{ native: "Ọgbọ̀n", english: "Thirty" }, { native: "Ogójì", english: "Forty" }, { native: "Ogọ́rúnún", english: "One hundred" }], explanation: "These are important anchors in the Yorùbá number system." },
        { id: "q4", type: "multiple-choice", prompt: "Which number comes after oókànlá in this lesson?", options: ["Eéjìlá", "Ogún", "Ọgbọ̀n", "Ẹ́ẹ̀wàá"], answer: "Eéjìlá", explanation: "Oókànlá is eleven and eéjìlá is twelve." }
      ]
    },
    {
      id: "yoruba-how-many", title: "Asking How Many", emoji: "❓", xp: 60,
      vocabulary: [
        { native: "Mélòó?", english: "How many?" },
        { native: "Ìwé mélòó ni ó wà ní orí tábìlì?", english: "How many books are on the table?" },
        { native: "Ìwé mẹ́ta ni ó wà lórí tábìlì.", english: "There are three books on the table." },
        { native: "Ìwé méjì", english: "Two books" }
      ],
      cultureCard: { id: "yoruba-cardinals-follow-nouns", title: "The Number Follows the Noun", emoji: "📚", category: "Grammar", text: "Cardinal numbers act like describing words and follow the noun: ìwé méjì means “two books.” Mélòó occupies the same position when asking “how many?”" },
      conversation: [
        { speaker: "Adé", avatar: "👨🏾", native: "Ìwé mélòó ni ó wà ní orí tábìlì?", english: "How many books are on the table?" },
        { speaker: "Bísí", avatar: "👩🏾", native: "Ìwé mẹ́ta ni ó wà lórí tábìlì.", english: "There are three books on the table." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Mélòó?” ask?", options: ["How many?", "How much?", "Where?", "Who?"], answer: "How many?", explanation: "Mélòó asks about the number of countable items." },
        { id: "q2", type: "english-to-native", prompt: "Choose “Two books.”", options: ["Ìwé méjì", "Eéjì ìwé", "Ìwé mélòó", "Ìwé mẹ́ta"], answer: "Ìwé méjì", explanation: "The cardinal méjì follows the noun ìwé." },
        { id: "q3", type: "conversation", prompt: "Someone asks how many books are on the table. Choose “There are three books on the table.”", options: ["Ìwé mẹ́ta ni ó wà lórí tábìlì.", "Ìwé méjì.", "Eélóò ni?", "Ogún ni."], answer: "Ìwé mẹ́ta ni ó wà lórí tábìlì.", explanation: "This complete response comes from the source lesson on mélòó." },
        { id: "q4", type: "sentence-builder", prompt: "Build: Two books.", tiles: ["Ìwé", "méjì"], answer: "Ìwé méjì", explanation: "Yorùbá places the cardinal after the noun." }
      ]
    },
    {
      id: "yoruba-prices-simple-math", title: "Prices & Simple Math", emoji: "🛒", xp: 70,
      vocabulary: [
        { native: "Eélóò?", english: "How much?" },
        { native: "Eélóò ni aṣọ?", english: "How much is the cloth?" },
        { native: "Àádọ́ta naira ni.", english: "It is fifty naira." },
        { native: "Kí ni o fẹ́ rà?", english: "What would you like to buy?" },
        { native: "Mo fẹ́ ra àgbàdo.", english: "I would like to buy corn." }
      ],
      cultureCard: { id: "yoruba-market-haggling", title: "Ọjà and Price Negotiation", emoji: "🏪", category: "Market Life", text: "Some Nigerian shops have fixed prices, while open markets may allow negotiation. A complete exchange still begins socially—with a greeting—before moving to the item, quantity, and price." },
      conversation: [
        { speaker: "Buyer", avatar: "👨🏾", native: "Eélóò ni aṣọ?", english: "How much is the cloth?" },
        { speaker: "Seller", avatar: "👩🏾", native: "Àádọ́ta naira ni.", english: "It is fifty naira." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Ẹ ṣé.", english: "Thank you." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Eélóò ni aṣọ?” ask?", options: ["How much is the cloth?", "How many cloths?", "Where is the cloth?", "Do you like the cloth?"], answer: "How much is the cloth?", explanation: "Eélóò asks how much, while aṣọ names the item." },
        { id: "q2", type: "conversation", prompt: "A buyer asks “Eélóò ni aṣọ?” Choose “It is fifty naira.”", options: ["Àádọ́ta naira ni.", "Naira mẹ́ta ni.", "Mo fẹ́ ra aṣọ.", "Aṣọ mélòó?"], answer: "Àádọ́ta naira ni.", explanation: "The source market lesson places naira after the multiple-of-ten amount." },
        { id: "q3", type: "multiple-choice", prompt: "Oókàn àti oókàn jẹ́ which number?", options: ["Eéjì", "Ẹ́ẹ̀ta", "Ẹ́ẹ̀rin", "Ogún"], answer: "Eéjì", explanation: "One and one makes two; the source arithmetic example answers eéjì." },
        { id: "q4", type: "sentence-builder", prompt: "Build: How much is the cloth?", tiles: ["Eélóò", "ni", "aṣọ?"], answer: "Eélóò ni aṣọ?", explanation: "This is the source pattern Eélóò ni ___?" },
        { id: "q5", type: "matching", prompt: "Match the price amounts.", pairs: [{ native: "Ẹ́ẹ̀wàá", english: "10" }, { native: "Ogún", english: "20" }, { native: "Àádọ́ta", english: "50" }], explanation: "Recognising anchor amounts supports market conversations." }
      ]
    },
    {
      id: "yoruba-numbers-challenge", title: "Numbers Challenge", emoji: "🏆", xp: 100,
      cultureCard: { id: "yoruba-numbers-in-action", title: "From Counting to Conversation", emoji: "⭐", category: "Milestone", text: "You can now recognise key Yorùbá numbers through one hundred, distinguish counting and cardinal forms, ask how many or how much, and use a basic market exchange." },
      conversation: [
        { speaker: "Seller", avatar: "👩🏾", native: "Kí ni o fẹ́ rà?", english: "What would you like to buy?" },
        { speaker: "Buyer", avatar: "👨🏾", native: "Mo fẹ́ ra àgbàdo.", english: "I would like to buy corn." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Eélóò ni?", english: "How much is it?" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "What number is “Ẹ́ẹ̀jọ”?", options: ["Six", "Seven", "Eight", "Nine"], answer: "Eight", explanation: "Ẹ́ẹ̀jọ is the counting form for eight." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Eéjìlá.”", options: ["Twelve", "Twenty", "Two", "Twenty-two"], answer: "Twelve", explanation: "Eéjìlá means twelve." },
        { id: "q3", type: "english-to-native", prompt: "Choose “How much is the cloth?”", options: ["Eélóò ni aṣọ?", "Aṣọ mélòó?", "Kí ni o fẹ́ rà?", "Ìwé mélòó?"], answer: "Eélóò ni aṣọ?", explanation: "Eélóò asks the price or amount." },
        { id: "q4", type: "matching", prompt: "Match each number form.", pairs: [{ native: "Ẹ́ẹ̀sànán", english: "Nine" }, { native: "Ogójì", english: "Forty" }, { native: "Ogọ́rúnún", english: "One hundred" }], explanation: "These forms span single digits, tens, and one hundred." },
        { id: "q5", type: "sentence-builder", prompt: "Build: Two books.", tiles: ["Ìwé", "méjì"], answer: "Ìwé méjì", explanation: "A cardinal follows the noun it describes." }
      ]
    }
  ]
};
