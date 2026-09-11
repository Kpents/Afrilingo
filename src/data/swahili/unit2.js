export const swahiliUnit2 = {
  id: "swahili-unit-2",
  title: "Numbers & Counting",
  subtitle: "Count, ask about quantities, and handle simple prices in Kiswahili.",
  lessons: [
    {
      id: "swahili-numbers-1-10", title: "Numbers 1–10", emoji: "🔢", xp: 50,
      vocabulary: [
        { native: "Moja", english: "One", number: 1 }, { native: "Mbili", english: "Two", number: 2 },
        { native: "Tatu", english: "Three", number: 3 }, { native: "Nne", english: "Four", number: 4 },
        { native: "Tano", english: "Five", number: 5 }, { native: "Sita", english: "Six", number: 6 },
        { native: "Saba", english: "Seven", number: 7 }, { native: "Nane", english: "Eight", number: 8 },
        { native: "Tisa", english: "Nine", number: 9 }, { native: "Kumi", english: "Ten", number: 10 }
      ],
      cultureCard: { id: "swahili-counting-rhythm", title: "Counting Has a Rhythm", emoji: "🎶", category: "Daily Life", text: "The first ten Swahili numbers are building blocks for dates, time, prices, phone numbers, and larger amounts. Practising them as a sequence helps make recall quick and natural." },
      conversation: [
        { speaker: "Amina", avatar: "👩🏾", native: "Moja, mbili, tatu.", english: "One, two, three." },
        { speaker: "Juma", avatar: "👨🏾", native: "Nne, tano, sita.", english: "Four, five, six." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What number is “Mbili”?", options: ["One", "Two", "Five", "Eight"], answer: "Two", explanation: "Mbili means two." },
        { id: "q2", type: "english-to-native", prompt: "Choose the Swahili word for five.", options: ["Tano", "Tatu", "Sita", "Saba"], answer: "Tano", explanation: "Tano means five." },
        { id: "q3", type: "matching", prompt: "Match the number words.", pairs: [{ native: "Moja", english: "One" }, { native: "Nne", english: "Four" }, { native: "Nane", english: "Eight" }], explanation: "These are core Swahili cardinal numbers." },
        { id: "q4", type: "fill-in-the-blank", prompt: "Complete the sequence: Saba, nane, ___.", options: ["Tisa", "Kumi", "Sita", "Tano"], answer: "Tisa", explanation: "Seven, eight, nine are saba, nane, tisa." },
        { id: "q5", type: "multiple-choice", prompt: "Which Swahili word means ten?", options: ["Kumi", "Tisa", "Moja", "Sita"], answer: "Kumi", explanation: "Kumi means ten." }
      ]
    },
    {
      id: "swahili-numbers-11-100", title: "Numbers 11–100", emoji: "💯", xp: 65,
      vocabulary: [
        { native: "Kumi na moja", english: "Eleven", number: 11 }, { native: "Kumi na mbili", english: "Twelve", number: 12 },
        { native: "Ishirini", english: "Twenty", number: 20 }, { native: "Ishirini na moja", english: "Twenty-one", number: 21 },
        { native: "Thelathini", english: "Thirty", number: 30 }, { native: "Arobaini", english: "Forty", number: 40 },
        { native: "Hamsini", english: "Fifty", number: 50 }, { native: "Mia moja", english: "One hundred", number: 100 }
      ],
      cultureCard: { id: "swahili-number-building-patterns", title: "Build with Na", emoji: "🧠", category: "Language Pattern", text: "Swahili uses na, meaning “and,” to join tens and units. Kumi na mbili is ten and two; ishirini na moja is twenty and one. The regular pattern makes many larger numbers predictable." },
      conversation: [
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Kumi na mbili.", english: "Twelve." },
        { speaker: "Learner", avatar: "🧑🏾", native: "Ishirini.", english: "Twenty." },
        { speaker: "Teacher", avatar: "👩🏾‍🏫", native: "Mia moja.", english: "One hundred." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What number is “Kumi na moja”?", options: ["Ten", "Eleven", "Twenty", "Twenty-one"], answer: "Eleven", explanation: "Kumi na moja is ten and one: eleven." },
        { id: "q2", type: "english-to-native", prompt: "Choose the Swahili form for twenty.", options: ["Ishirini", "Thelathini", "Kumi na mbili", "Mia moja"], answer: "Ishirini", explanation: "Ishirini means twenty." },
        { id: "q3", type: "matching", prompt: "Match the larger numbers.", pairs: [{ native: "Thelathini", english: "Thirty" }, { native: "Arobaini", english: "Forty" }, { native: "Mia moja", english: "One hundred" }], explanation: "These forms cover tens and one hundred." },
        { id: "q4", type: "sentence-builder", prompt: "Build the Swahili number: twenty-one.", tiles: ["Ishirini", "na", "moja"], answer: "Ishirini na moja", explanation: "Na joins twenty and one." }
      ]
    },
    {
      id: "swahili-how-many", title: "Asking How Many", emoji: "❓", xp: 60,
      vocabulary: [
        { native: "Ngapi?", english: "How many?" },
        { native: "Una madarasa mangapi?", english: "How many classes do you have?" },
        { native: "Nina madarasa matatu.", english: "I have three classes." },
        { native: "Muuzaji anauza kwa shilingi ngapi?", english: "For how many shillings is the seller selling?" }
      ],
      cultureCard: { id: "swahili-number-agreement", title: "Numbers Agree with Nouns", emoji: "🧩", category: "Grammar", text: "Swahili noun classes shape nearby words. That is why ngapi can appear as mangapi with madarasa, and tatu becomes matatu. Numbers one through five commonly show this agreement." },
      conversation: [
        { speaker: "Neema", avatar: "👩🏾", native: "Una madarasa mangapi?", english: "How many classes do you have?" },
        { speaker: "Baraka", avatar: "👨🏾", native: "Nina madarasa matatu.", english: "I have three classes." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Ngapi?” ask?", options: ["How many?", "Where?", "When?", "Who?"], answer: "How many?", explanation: "Ngapi asks about number or quantity." },
        { id: "q2", type: "english-to-native", prompt: "Choose “How many classes do you have?”", options: ["Una madarasa mangapi?", "Nina madarasa matatu.", "Ni saa ngapi?", "Jina lako ni nani?"], answer: "Una madarasa mangapi?", explanation: "Mangapi agrees with the plural noun madarasa." },
        { id: "q3", type: "conversation", prompt: "Someone asks “Una madarasa mangapi?” Choose “I have three classes.”", options: ["Nina madarasa matatu.", "Nina darasa moja.", "Madarasa ni wapi?", "Ishirini na tatu."], answer: "Nina madarasa matatu.", explanation: "Matatu is the agreeing form of three with madarasa." },
        { id: "q4", type: "sentence-builder", prompt: "Build: How many classes do you have?", tiles: ["Una", "madarasa", "mangapi?"], answer: "Una madarasa mangapi?", explanation: "The question places the agreeing quantity word after madarasa." }
      ]
    },
    {
      id: "swahili-prices-simple-math", title: "Prices & Simple Math", emoji: "🛒", xp: 70,
      vocabulary: [
        { native: "Ndizi ni pesa ngapi?", english: "How much are the bananas?" },
        { native: "Ndizi ni shilingi hamsini.", english: "The bananas are fifty shillings." },
        { native: "Tofaa ni pesa ngapi?", english: "How much is the apple?" },
        { native: "Nina shilingi ishirini tu.", english: "I only have twenty shillings." },
        { native: "Punguza kidogo, tafadhali.", english: "Reduce it a little, please." }
      ],
      cultureCard: { id: "swahili-open-air-markets", title: "Conversation at the Market", emoji: "🏪", category: "Market Life", text: "Open-air markets are common across East Africa. Buying often combines a greeting, a price question, quantities, and polite negotiation—turning number knowledge into a complete social exchange." },
      conversation: [
        { speaker: "Buyer", avatar: "👨🏾", native: "Ndizi ni pesa ngapi?", english: "How much are the bananas?" },
        { speaker: "Seller", avatar: "👩🏾", native: "Ndizi ni shilingi hamsini.", english: "The bananas are fifty shillings." },
        { speaker: "Buyer", avatar: "👨🏾", native: "Asante.", english: "Thank you." }
      ],
      questions: [
        { id: "q1", type: "native-to-english", prompt: "What does “Ndizi ni pesa ngapi?” ask?", options: ["How much are the bananas?", "How many bananas are there?", "Do you like bananas?", "Where are the bananas?"], answer: "How much are the bananas?", explanation: "Pesa ngapi asks the amount of money or price." },
        { id: "q2", type: "conversation", prompt: "The buyer asks “Ndizi ni pesa ngapi?” Choose the seller's answer: fifty shillings.", options: ["Ndizi ni shilingi hamsini.", "Nina shilingi ishirini tu.", "Punguza kidogo.", "Ndizi ni tano."], answer: "Ndizi ni shilingi hamsini.", explanation: "Shilingi hamsini means fifty shillings." },
        { id: "q3", type: "multiple-choice", prompt: "Kumi plus kumi equals which Swahili number?", options: ["Ishirini", "Thelathini", "Hamsini", "Mia moja"], answer: "Ishirini", explanation: "Ten plus ten is twenty, ishirini." },
        { id: "q4", type: "sentence-builder", prompt: "Build: I only have twenty shillings.", tiles: ["Nina", "shilingi", "ishirini", "tu."], answer: "Nina shilingi ishirini tu.", explanation: "Tu means only in this market expression." },
        { id: "q5", type: "matching", prompt: "Match the price amounts.", pairs: [{ native: "Kumi", english: "10" }, { native: "Ishirini", english: "20" }, { native: "Hamsini", english: "50" }], explanation: "Fast number recognition makes price exchanges easier." }
      ]
    },
    {
      id: "swahili-numbers-challenge", title: "Numbers Challenge", emoji: "🏆", xp: 100,
      cultureCard: { id: "swahili-numbers-in-action", title: "From Counting to Conversation", emoji: "⭐", category: "Milestone", text: "You can now count into the hundreds, recognise a basic noun-agreement pattern, ask about quantities and prices, and respond with useful everyday amounts." },
      conversation: [
        { speaker: "Buyer", avatar: "👩🏾", native: "Tofaa ni pesa ngapi?", english: "How much is the apple?" },
        { speaker: "Seller", avatar: "👨🏾", native: "Shilingi hamsini.", english: "Fifty shillings." },
        { speaker: "Buyer", avatar: "👩🏾", native: "Nina shilingi ishirini tu.", english: "I only have twenty shillings." }
      ],
      questions: [
        { id: "q1", type: "challenge", prompt: "What number is “Nane”?", options: ["Six", "Seven", "Eight", "Nine"], answer: "Eight", explanation: "Nane means eight." },
        { id: "q2", type: "native-to-english", prompt: "Translate “Kumi na mbili.”", options: ["Twelve", "Twenty-two", "Twenty", "Two"], answer: "Twelve", explanation: "Kumi na mbili is ten and two: twelve." },
        { id: "q3", type: "english-to-native", prompt: "Choose “How much are the bananas?”", options: ["Ndizi ni pesa ngapi?", "Una madarasa mangapi?", "Ndizi ni shilingi hamsini.", "Ni saa ngapi?"], answer: "Ndizi ni pesa ngapi?", explanation: "This is the source course's market price question." },
        { id: "q4", type: "matching", prompt: "Match each number form.", pairs: [{ native: "Tisa", english: "Nine" }, { native: "Arobaini", english: "Forty" }, { native: "Mia moja", english: "One hundred" }], explanation: "These forms span single digits, tens, and hundreds." },
        { id: "q5", type: "sentence-builder", prompt: "Build the Swahili number: twenty-one.", tiles: ["Ishirini", "na", "moja"], answer: "Ishirini na moja", explanation: "Na joins twenty and one." }
      ]
    }
  ]
};
