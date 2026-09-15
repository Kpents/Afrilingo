export const twiWorld = {
  id: "twi-living-world",
  languageId: "twi",
  eyebrow: "Ghana · Twi living world",
  title: "Akwaaba — your Twi world",
  intro: "Follow the crew through greetings, food, travel, stories, and everyday relationships. Learn the language inside the moments where it matters.",
  chapters: [
    {
      id: "akwaaba", number: 1, title: "Akwaaba", subtitle: "Meet people and enter the conversation", color: "#F28C28", image: "images/adventures/family-home.jpg",
      activities: [
        { id: "home-visit", type: "adventure", label: "Visit a Friend", detail: "Greet, introduce yourself, and connect", feature: "adventures", missionId: "twi-home-visit", progressField: "completedAdventures" },
        { id: "intro-story", type: "story", label: "My Name Is Ama", detail: "Read a short learner story", feature: "stories", storyId: "intro", progressField: "completedStories", progressId: "intro" },
        { id: "greeting-culture", type: "culture", label: "Greeting before the purpose", detail: "Open a cultural moment", note: "The course sources emphasize taking time to greet before moving into the purpose of an interaction. The exact greeting and etiquette depend on the people, setting, and time of day." }
      ]
    },
    {
      id: "market-table", number: 2, title: "From market to table", subtitle: "Find food, ask, choose, and respond", color: "#24745B", image: "images/adventures/market-square.jpg",
      activities: [
        { id: "market-visit", type: "adventure", label: "Shop for Bananas", detail: "Explore a stall and ask the price", feature: "adventures", missionId: "twi-market-visit", progressField: "completedAdventures" },
        { id: "cafe-order", type: "adventure", label: "Order a Simple Meal", detail: "Choose food or take the water detour", feature: "adventures", missionId: "twi-cafe-order", progressField: "completedAdventures" },
        { id: "market-match", type: "game", label: "Market Dash", detail: "A quick practical vocabulary challenge", gameId: "market-dash" }
      ]
    },
    {
      id: "moving", number: 3, title: "Moving through the day", subtitle: "Ask for help and follow the route", color: "#4338CA", image: "images/adventures/taxi-rank.jpg",
      activities: [
        { id: "taxi-route", type: "adventure", label: "Find Your Way", detail: "Take the taxi-rank route challenge", feature: "adventures", missionId: "twi-taxi-journey", progressField: "completedAdventures" },
        { id: "directions-story", type: "story", label: "Go Straight Ahead", detail: "Read and unpack a directions story", feature: "stories", storyId: "directions-story", progressField: "completedStories", progressId: "directions-story" },
        { id: "repair-culture", type: "culture", label: "Clarification is participation", detail: "Open a language habit", note: "Asking someone to repeat or slow down lets a learner remain honestly engaged. It is a communication skill—not a failure to understand." }
      ]
    },
    {
      id: "voice", number: 4, title: "Find your voice", subtitle: "Stay in Twi and build confidence", color: "#C95D3A", image: "images/adventures/community-park.jpg",
      activities: [
        { id: "conversation-coach", type: "conversation", label: "Conversation Coach", detail: "Respond in practical situations", feature: "coach" },
        { id: "learner-story", type: "story", label: "I Speak a Little Twi", detail: "Use repair phrases inside a story", feature: "stories", storyId: "learner-story", progressField: "completedStories", progressId: "learner-story" },
        { id: "daily-phrase", type: "phrase", label: "Carry a phrase with you", detail: "Practice today’s useful expression", feature: "daily" }
        ,{ id: "ama-market-story", type: "storyQuest", label: "Ama’s Market Morning", detail: "Choose your way through an interactive story", storyQuestId: "ama-market-morning" }
      ]
    }
  ],
  storyQuests: {
    "ama-market-morning": {
      id: "ama-market-morning", title: "Ama’s Market Morning", provenance: "Original AfriLingo learning story", start: "arrival", xp: 30,
      nodes: {
        arrival: { location:"Morning · neighbourhood market", image:"images/adventures/market-square.jpg", narration:"Ama arrives while sellers are preparing their stalls.", speaker:"Seller", native:"Maakye.", english:"Good morning.", vocabulary:[{native:"Maakye",english:"good morning"}], prompt:"How should Ama respond?", choices:[{text:"Maakye.",correct:true,next:"fruit",feedback:"Ama returns the morning greeting before asking for anything."},{text:"Ɛyɛ ahe?",correct:false,feedback:"That asks a price immediately. Begin with the greeting in this scene."},{text:"Da yie.",correct:false,feedback:"That is a night-time leave-taking expression, not the morning response."}] },
        fruit: { location:"The fruit stall", image:"images/adventures/market-square.jpg", narration:"Ama sees fruit but cannot spot the bananas.", speaker:"Ama", native:"Merehwehwɛ kwadu.", english:"I am looking for bananas.", vocabulary:[{native:"Merehwehwɛ",english:"I am looking for"},{native:"kwadu",english:"banana"}], prompt:"What should Ama ask next?", choices:[{text:"Wowɔ kwadu?",correct:true,next:"price",feedback:"Ama asks whether the seller has bananas."},{text:"Merekɔ fie.",correct:false,feedback:"That says ‘I am going home’ and does not help find the bananas."},{text:"Ka no brɛoo.",correct:false,feedback:"That asks someone to speak slowly; it does not ask about the fruit."}] },
        price: { location:"At the counter", image:"images/adventures/market-square.jpg", narration:"The seller shows Ama the bananas.", speaker:"Ama", native:"Ɛyɛ ahe?", english:"How much is it?", vocabulary:[{native:"Ɛyɛ ahe?",english:"How much is it?"}], prompt:"The price feels high. Which response fits?", choices:[{text:"Ne boɔ yɛ den.",correct:true,next:"close",feedback:"Ama says that the price is expensive."},{text:"Wo din de sɛn?",correct:false,feedback:"That asks someone’s name, not about the price."},{text:"Fa nifa.",correct:false,feedback:"That is a direction: turn right."}] },
        close: { location:"Leaving the stall", image:"images/adventures/market-square.jpg", narration:"Ama has finished the exchange and is ready to leave.", speaker:"Seller", native:"Yɛbɛhyia bio.", english:"We shall meet again.", vocabulary:[{native:"Yɛbɛhyia bio",english:"we shall meet again"}], prompt:"Choose Ama’s polite closing.", choices:[{text:"Meda wo ase.",correct:true,next:"complete",feedback:"Ama thanks the seller and closes the exchange politely."},{text:"Mennim.",correct:false,feedback:"That means ‘I do not know.’"},{text:"Ɛkɔm de me.",correct:false,feedback:"That means ‘I am hungry.’"}] }
      }
    }
  },
  games: {
    "market-dash": {
      title: "Market Dash", xp: 20,
      questions: [
        { prompt: "You are looking for bananas. Which phrase fits?", options: ["Merehwehwɛ kwadu.", "Merekɔ adwuma.", "Mente aseɛ."], answer: "Merehwehwɛ kwadu.", explanation: "Merehwehwɛ kwadu means ‘I am looking for bananas.’" },
        { prompt: "The seller shows you the item. Ask the price.", options: ["Ɛyɛ ahe?", "Wo din de sɛn?", "Fa nifa."], answer: "Ɛyɛ ahe?", explanation: "Ɛyɛ ahe? is the course’s price question." },
        { prompt: "The price feels high. What can you say?", options: ["Ne boɔ yɛ den.", "Mabrɛ.", "Mɛsan aba."], answer: "Ne boɔ yɛ den.", explanation: "Ne boɔ yɛ den means ‘It is expensive.’" },
        { prompt: "Close the exchange with thanks.", options: ["Meda wo ase.", "Mennim.", "Worekɔ he?"], answer: "Meda wo ase.", explanation: "Meda wo ase is the full written thank-you expression." }
      ]
    }
  }
};
