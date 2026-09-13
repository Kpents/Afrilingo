// Phrases are reused from the reviewed Ga Immersion market story and conversations.
export const gaMarketMission = {
  id: "ga-market-visit",
  title: "At the Market",
  languageName: "Ga",
  setting: "market",
  level: "intermediate",
  image: "images/adventures/market-square.jpg",
  imageAlt: "Illustrated neighbourhood market with a fruit stall",
  hotspotClass: "left-[9%] top-[38%]",
  inspectAction: "Explore the market",
  xp: 35,
  goal: "Find the market, ask about a price, and thank the seller.",
  item: { label: "Market stall", emoji: "🛒", hint: "Look around the stall before speaking.", vocabulary: [{ native: "jara", english: "market" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "seller", label: "Speak to the seller", ending: "You asked the price directly and thanked Ama." },
    { id: "friend", label: "Ask Kofi first", note: "Kofi mentions where he is going before you approach Ama.", ending: "Kofi helped you recognise the setting before you spoke to Ama.", detour: {
      id: "friend-clue", character: "kofi", speaker: "Friend", native: "Miiya jara nɔ.", english: "I am going to the market.",
      prompt: "Where is Kofi going?", choices: ["The market", "The school", "Home"], answer: "The market",
      feedback: "Jara is the market in this documented phrase."
    } }
  ],
  steps: [
    { id: "greet", character: "ama", speaker: "Seller", native: "Ojekoo.", english: "Good morning.", prompt: "How should you greet Ama in the morning?", choices: ["Ojekoo.", "Midu gbɛ.", "Wɔ jogbaŋŋ."], answer: "Ojekoo.", feedback: "Ojekoo is the morning greeting used in the Ga course." },
    { id: "price", character: "ama", speaker: "Seller", native: "Mɛni otao ohɛ?", english: "What would you like to buy?", prompt: "Ask how much this costs.", choices: ["Enyie ahɔɔ enɛ?", "Wiemɔ bɛlɛoo.", "Nɛgbɛ ojɛ?"], answer: "Enyie ahɔɔ enɛ?", feedback: "Enyie ahɔɔ enɛ? is the price question in the existing market material." },
    { id: "thanks", character: "ama", speaker: "Seller", native: "Enyie ahɔɔ enɛ?", english: "How much is this?", prompt: "End the exchange with thanks.", choices: ["Oyiwaladɔŋŋ.", "Miiya shia.", "Sha ohe."], answer: "Oyiwaladɔŋŋ.", feedback: "Oyiwaladɔŋŋ is the thank-you in the Ga market story." }
  ],
  culture: "This practice exchange uses a greeting, a clear price question, and thanks. Real market interactions vary by person and place.",
  completionTitle: "Market mission complete!",
  completionText: "You explored the stall and handled a short Ga exchange."
};
