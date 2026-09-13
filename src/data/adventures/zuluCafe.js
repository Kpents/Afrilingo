// Dialogue and vocabulary reuse the existing Zulu course and Immersion material.
export const zuluCafeMission = {
  id: "zulu-cafe-order",
  title: "Lunch at the Café",
  languageName: "Zulu",
  setting: "café",
  level: "beginner",
  image: "images/adventures/community-cafe.jpg",
  imageAlt: "Illustrated community café with a serving counter and water station",
  hotspotClass: "right-[8%] top-[39%]",
  inspectAction: "Inspect the counter",
  xp: 35,
  goal: "Look around the café, order food and water, thank the server, and ask for a receipt.",
  item: { label: "Serving counter", emoji: "🥘", hint: "Check the counter before placing your order.", vocabulary: [{ native: "amanzi", english: "water" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "counter", label: "Go to the counter", ending: "You ordered directly from Ama, thanked her, and requested a receipt." },
    { id: "friend", label: "Ask Kofi where to order", note: "Kofi offers an example request before you join the counter queue.", ending: "Kofi’s example helped you recognise a polite request before ordering from Ama.", detour: {
      id: "friend-clue",
      character: "kofi",
      speaker: "Friend",
      native: "Ngicela amanzi.",
      english: "Water, please.",
      prompt: "What is Kofi politely requesting?",
      choices: ["Water", "A ticket", "A receipt"],
      answer: "Water",
      feedback: "Ngicela amanzi asks for water politely. You can use the same request pattern at the counter."
    } }
  ],
  steps: [
    {
      id: "order",
      character: "ama",
      speaker: "Server",
      native: "Ngingakusiza ngani?",
      english: "How can I help you?",
      prompt: "Order food and water politely.",
      choices: ["Ngicela ukudla namanzi.", "Ngilahlekile.", "Ngiyasebenza."],
      answer: "Ngicela ukudla namanzi.",
      feedback: "Ngicela makes the order a courteous request."
    },
    {
      id: "thanks",
      character: "ama",
      speaker: "Server",
      native: "Nanka. Uxolo ngokulinda.",
      english: "Here it is. Sorry for the wait.",
      prompt: "Acknowledge the server politely.",
      choices: ["Ngiyabonga.", "Likuphi ibhange?", "Ngiyagula."],
      answer: "Ngiyabonga.",
      feedback: "Ngiyabonga thanks the person who brought your order."
    },
    {
      id: "receipt",
      character: "ama",
      speaker: "Server",
      native: "Ngiyabonga.",
      english: "Thank you.",
      prompt: "Before leaving, ask for a receipt.",
      choices: ["Ngicela irisidi.", "Ngicela amanzi.", "Hamba kahle."],
      answer: "Ngicela irisidi.",
      feedback: "Ngicela irisidi is a polite request for a receipt."
    }
  ],
  culture: "At a café, a clear request and a simple thank-you make the exchange courteous. Ngicela expresses a polite request rather than translating English ‘please’ word for word.",
  completionTitle: "Café mission complete!",
  completionText: "You found the counter, placed an order, thanked the server, and requested a receipt."
};
