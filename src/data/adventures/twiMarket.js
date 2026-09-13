// Phrases are reused from the existing Twi Immersion market story and conversations.
export const twiMarketMission = {
  id: "twi-market-visit",
  title: "Shopping for Bananas",
  languageName: "Twi",
  setting: "market",
  level: "intermediate",
  image: "images/adventures/market-square.jpg",
  imageAlt: "Illustrated neighbourhood market with a fruit stall",
  hotspotClass: "left-[9%] top-[38%]",
  inspectAction: "Inspect fruit",
  xp: 35,
  goal: "Find the bananas, ask the seller a question, check the price, and thank them.",
  item: { label: "Fruit stall", emoji: "🍌", hint: "Look at the fruit before talking to the seller.", vocabulary: [{ native: "kwadu", english: "banana" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "seller", label: "Speak to the seller", ending: "You found the bananas, checked the price, and thanked Ama." },
    { id: "friend", label: "Ask Kofi first", note: "Kofi says what he is looking for before you speak to Ama.", ending: "Kofi's clue helped you find the bananas before talking to Ama.", detour: {
      id: "friend-clue", character: "kofi", speaker: "Friend", native: "Merehwehwɛ kwadu.", english: "I am looking for bananas.",
      prompt: "What is Kofi looking for?", choices: ["Bananas", "A book", "A road"], answer: "Bananas",
      feedback: "Kwadu means banana in the existing Twi market story."
    } }
  ],
  steps: [
    { id: "greet", character: "ama", speaker: "Seller", native: "Maakye.", english: "Good morning.", prompt: "Greet Ama in the morning.", choices: ["Maakye.", "Da yie.", "Fa nifa."], answer: "Maakye.", feedback: "Maakye is the documented morning greeting." },
    { id: "fruit", character: "ama", speaker: "Seller", native: "Maakye.", english: "Good morning.", prompt: "Ask whether the seller has bananas.", choices: ["Wowɔ kwadu?", "Worekɔ he?", "Wo din de sɛn?"], answer: "Wowɔ kwadu?", feedback: "Wowɔ kwadu? asks whether the seller has bananas in the existing conversation." },
    { id: "price", character: "ama", speaker: "Seller", native: "Wowɔ kwadu?", english: "Do you have bananas?", prompt: "Now ask the price.", choices: ["Ɛyɛ ahe?", "Mennim.", "Mabrɛ."], answer: "Ɛyɛ ahe?", feedback: "Ɛyɛ ahe? is the price question in the market story." },
    { id: "thanks", character: "ama", speaker: "Seller", native: "Ɛyɛ ahe?", english: "How much is it?", prompt: "Finish with a thank-you.", choices: ["Meda wo ase.", "Fa benkum.", "Merekɔ fie."], answer: "Meda wo ase.", feedback: "Meda wo ase is the full written thank-you expression in the course." }
  ],
  culture: "Greeting before asking and ending with thanks makes this a courteous practice exchange. Market customs vary across communities.",
  completionTitle: "Market mission complete!",
  completionText: "You found bananas and completed a short Twi market exchange."
};
