// Pilot dialogue reuses phrases already present in the Zulu course and Immersion content.
export const zuluMarketPilot = {
  id: "zulu-market-visit",
  title: "A Visit to the Market",
  level: "intermediate",
  image: "images/adventures/market-square.jpg",
  xp: 35,
  goal: "Find the fruit stall, ask the seller about fruit, decide what to buy, and thank them.",
  item: { label: "Fruit stall", hint: "Tap the fruit baskets to look closer.", vocabulary: [{ native: "izithelo", english: "fruit" }] },
  steps: [
    {
      id: "ask",
      character: "ama",
      speaker: "Seller",
      native: "Sawubona. Ufuna ini?",
      english: "Hello. What do you want?",
      prompt: "Ask for fruit and its price.",
      choices: ["Ngifuna izithelo. Zibiza malini?", "Ulale kahle.", "Angizizwa kahle."],
      answer: "Ngifuna izithelo. Zibiza malini?",
      feedback: "State what you want, then ask the price. Zibiza agrees with izithelo."
    },
    {
      id: "decide",
      character: "gogo-nandi",
      speaker: "Neighbour",
      native: "Kushibhile.",
      english: "It is cheap.",
      prompt: "A neighbour points out the value. What will you say if you decide to buy?",
      choices: ["Ngizothatha lokhu.", "Kubiza kakhulu.", "Ngiyagula."],
      answer: "Ngizothatha lokhu.",
      feedback: "Ngizothatha lokhu makes your purchase decision clear."
    },
    {
      id: "thank",
      character: "ama",
      speaker: "Your last reply",
      native: "Ngizothatha lokhu.",
      english: "I will take this.",
      prompt: "You have chosen your item. Finish the exchange politely.",
      choices: ["Ngiyabonga.", "Likuphi ibhange?", "Ngiyalala."],
      answer: "Ngiyabonga.",
      feedback: "Ngiyabonga is a natural way to thank the seller."
    }
  ],
  culture: "Market interactions vary from place to place. Greeting first, asking clearly, and thanking the seller matter more than assuming every purchase involves bargaining."
};
