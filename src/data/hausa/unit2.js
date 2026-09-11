export const hausaUnit2 = {
  id: "hausa-unit-2",
  title: "Numbers & Counting",
  subtitle: "Count, ask about quantities, and recognise everyday prices in Hausa.",
  lessons: [
    {
      id: "hausa-numbers-1-10", title: "Numbers 1–10", emoji: "🔢", xp: 50,
      vocabulary: [
        { native: "Ɗaya", english: "One", number: 1 }, { native: "Biyu", english: "Two", number: 2 },
        { native: "Uku", english: "Three", number: 3 }, { native: "Huɗu", english: "Four", number: 4 },
        { native: "Biyar", english: "Five", number: 5 }, { native: "Shida", english: "Six", number: 6 },
        { native: "Bakwai", english: "Seven", number: 7 }, { native: "Takwas", english: "Eight", number: 8 },
        { native: "Tara", english: "Nine", number: 9 }, { native: "Goma", english: "Ten", number: 10 }
      ],
      cultureCard: { id: "hausa-numbers-everywhere", title: "Numbers Travel Far", emoji: "🧭", category: "Daily Life", text: "Hausa is used across a wide area of West Africa. Core number words support trade, travel, phone numbers, addresses, time, and everyday conversation across many Hausa-speaking communities." },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Ɗaya, biyu, uku.", english: "One, two, three." },
        { speaker: "Musa", avatar: "👨🏾", native: "Huɗu, biyar, shida.", english: "Four, five, six." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What number is “Biyu”?", options: ["One", "Two", "Five", "Eight"], answer: "Two", explanation: "Biyu means two." },
        { id: "q2", type: "english-to-native", prompt: "Choose the Hausa word for five.", options: ["Biyar", "Uku", "Shida", "Bakwai"], answer: "Biyar", explanation: "Biyar means five." },
        { id: "q3", type: "matching", prompt: "Match the number words.", pairs: [{ native: "Ɗaya", english: "One" }, { native: "Huɗu", english: "Four" }, { native: "Takwas", english: "Eight" }], explanation: "These are widely taught Standard Hausa number forms." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the sequence: Bakwai, takwas, ___.", options: ["Tara", "Goma", "Shida", "Biyar"], answer: "Tara", explanation: "Seven, eight, nine are bakwai, takwas, tara." },
        { id: "q5", type: "multiple-choice", prompt: "Which Hausa word means ten?", options: ["Goma", "Tara", "Ɗaya", "Shida"], answer: "Goma", explanation: "Goma means ten." }
      ]
    },
    {
      id: "hausa-numbers-11-100", title: "Numbers 11–100", emoji: "💯", xp: 65,
      vocabulary: [
        { native: "Goma sha ɗaya", english: "Eleven", number: 11 }, { native: "Goma sha biyu", english: "Twelve", number: 12 },
        { native: "Ashirin", english: "Twenty", number: 20 }, { native: "Ashirin da ɗaya", english: "Twenty-one", number: 21 },
        { native: "Talatin", english: "Thirty", number: 30 }, { native: "Arba'in", english: "Forty", number: 40 },
        { native: "Hamsin", english: "Fifty", number: 50 }, { native: "Ɗari", english: "One hundred", number: 100 }
      ],
      cultureCard: { id: "hausa-number-building-patterns", title: "Build Larger Numbers", emoji: "🧠", category: "Language Pattern", text: "Eleven through nineteen follow goma sha plus a unit. Larger compound numbers use da, “and”: ashirin da ɗaya is twenty and one. In everyday speech, goma may be omitted from teen forms." },
      conversation: [
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Goma sha biyu.", english: "Twelve." },
        { speaker: "Learner", avatar: "🧑🏾", native: "Ashirin.", english: "Twenty." },
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Ɗari.", english: "One hundred." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What number is “Goma sha ɗaya”?", options: ["Ten", "Eleven", "Twenty", "Twenty-one"], answer: "Eleven", explanation: "Goma sha ɗaya means eleven." },
        { id: "q2", type: "english-to-native", prompt: "Choose the Hausa form for twenty.", options: ["Ashirin", "Talatin", "Goma sha biyu", "Ɗari"], answer: "Ashirin", explanation: "Ashirin means twenty." },
        { id: "q3", type: "matching", prompt: "Match the larger numbers.", pairs: [{ native: "Talatin", english: "Thirty" }, { native: "Arba'in", english: "Forty" }, { native: "Ɗari", english: "One hundred" }], explanation: "These are useful anchor numbers." },
        { id: "q4", type: "sentence-builder", prompt: "Build the Hausa number: twenty-one.", tiles: ["Ashirin", "da", "ɗaya"], answer: "Ashirin da ɗaya", explanation: "Da joins twenty and one." }
      ]
    },
    {
      id: "hausa-how-many", title: "Asking How Many", emoji: "❓", xp: 60,
      vocabulary: [
        { native: "Nawa?", english: "How many? / How much?" },
        { native: "Mutum nawa ne?", english: "How many people are there?" },
        { native: "Mutum biyu ne.", english: "There are two people." },
        { native: "Ɗaki nawa?", english: "How many rooms?" },
        { native: "Yana da ɗaki ɗaya.", english: "It has one room." }
      ],
      cultureCard: { id: "hausa-singular-before-numbers", title: "Singular Before a Number", emoji: "🧩", category: "Grammar", text: "Although Hausa plural forms can be irregular, counting is simpler: a noun is usually singular before its number. Mutum biyu literally uses “person two” to mean two people." },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Mutum nawa ne?", english: "How many people are there?" },
        { speaker: "Musa", avatar: "👨🏾", native: "Mutum biyu ne.", english: "There are two people." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What can “Nawa?” ask?", options: ["How many / how much?", "Where?", "When?", "Who?"], answer: "How many / how much?", explanation: "Nawa asks about number, quantity, or cost depending on context." },
        { id: "q2", type: "english-to-native", prompt: "Choose “How many people are there?”", options: ["Mutum nawa ne?", "Mutum biyu ne.", "Ɗaki nawa?", "Nawa ne kuɗin?"], answer: "Mutum nawa ne?", explanation: "Mutum is followed by nawa to ask the number of people." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Mutum nawa ne?” Choose “There are two people.”", options: ["Mutum biyu ne.", "Mutane biyu ne.", "Mutum ɗaya ne.", "Ɗaki biyu ne."], answer: "Mutum biyu ne.", explanation: "The source course notes that Hausa normally uses the singular noun before a number." },
        { id: "q4", type: "sentence-builder", prompt: "Build: How many rooms?", tiles: ["Ɗaki", "nawa?"], answer: "Ɗaki nawa?", explanation: "Nawa follows the noun in this quantity question." }
      ]
    },
    {
      id: "hausa-prices-simple-math", title: "Prices & Simple Math", emoji: "🛒", xp: 70,
      vocabulary: [
        { native: "Nawa ne kuɗin?", english: "How much does it cost?" },
        { native: "Naira hamsin.", english: "Fifty naira." },
        { native: "Guda nawa?", english: "How many pieces?" },
        { native: "Guda biyu.", english: "Two pieces." },
        { native: "Kasuwa", english: "Market" }
      ],
      cultureCard: { id: "hausa-market-numbers", title: "Numbers in the Kasuwa", emoji: "🏪", category: "Market Life", text: "Hausa has long served as a language of trade across West Africa. At a kasuwa, number skills support questions about price, quantity, transport, and change." },
      conversation: [
        { speaker: "Buyer", avatar: "👨🏾", native: "Nawa ne kuɗin?", english: "How much does it cost?" },
        { speaker: "Seller", avatar: "👩🏾", native: "Naira hamsin.", english: "Fifty naira." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Na gode.", english: "Thank you." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Nawa ne kuɗin?” ask?", options: ["How much does it cost?", "How many people?", "Where is the market?", "What is your name?"], answer: "How much does it cost?", explanation: "Kuɗi means money; this sourced pattern asks the cost." },
        { id: "q2", type: "conversation", prompt: "A buyer asks “Nawa ne kuɗin?” Choose “Fifty naira.”", options: ["Naira hamsin.", "Guda biyu.", "Ashirin da ɗaya.", "Ɗari."], answer: "Naira hamsin.", explanation: "Naira hamsin states an amount of fifty naira." },
        { id: "q3", type: "multiple-choice", prompt: "Goma plus goma equals which Hausa number?", options: ["Ashirin", "Talatin", "Hamsin", "Ɗari"], answer: "Ashirin", explanation: "Ten plus ten is twenty, ashirin." },
        { id: "q4", type: "sentence-builder", prompt: "Build: Two pieces.", tiles: ["Guda", "biyu."], answer: "Guda biyu.", explanation: "Guda is a useful counter for individual pieces or items." },
        { id: "q5", type: "matching", prompt: "Match the amounts.", pairs: [{ native: "Goma", english: "10" }, { native: "Ashirin", english: "20" }, { native: "Hamsin", english: "50" }], explanation: "Fast number recognition makes price exchanges easier." }
      ]
    },
    {
      id: "hausa-numbers-challenge", title: "Numbers Challenge", emoji: "🏆", xp: 100,
      cultureCard: { id: "hausa-numbers-in-action", title: "From Counting to Conversation", emoji: "⭐", category: "Milestone", text: "You can now count into the hundreds, ask nawa questions, follow the singular-noun counting pattern, and recognise basic quantity and price exchanges." },
      conversation: [
        { speaker: "Seller", avatar: "👩🏾", native: "Guda nawa?", english: "How many pieces?" },
        { speaker: "Buyer", avatar: "👨🏾", native: "Guda biyu.", english: "Two pieces." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Nawa ne kuɗin?", english: "How much does it cost?" }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "What number is “Takwas”?", options: ["Six", "Seven", "Eight", "Nine"], answer: "Eight", explanation: "Takwas means eight." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Goma sha biyu.”", options: ["Twelve", "Twenty-two", "Twenty", "Two"], answer: "Twelve", explanation: "Goma sha biyu means twelve." },
        { id: "q3", type: "english-to-native", prompt: "Choose “How much does it cost?”", options: ["Nawa ne kuɗin?", "Mutum nawa ne?", "Ɗaki nawa?", "Guda biyu."], answer: "Nawa ne kuɗin?", explanation: "This nawa question asks about cost." },
        { id: "q4", type: "matching", prompt: "Match each number form.", pairs: [{ native: "Tara", english: "Nine" }, { native: "Arba'in", english: "Forty" }, { native: "Ɗari", english: "One hundred" }], explanation: "These forms span single digits, tens, and one hundred." },
        { id: "q5", type: "sentence-builder", prompt: "Build the Hausa number: twenty-one.", tiles: ["Ashirin", "da", "ɗaya"], answer: "Ashirin da ɗaya", explanation: "Da joins twenty and one." }
      ]
    }
  ]
};
