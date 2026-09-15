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
    },
    {
      id: "story-fire", number: 5, title: "The story fire", subtitle: "Meet Ananse and explore why stories travel", color: "#7C3F18", image: "images/adventures/family-home.jpg",
      activities: [
        { id: "anansi-stories", type: "storyQuest", label: "All Stories Are Ananse’s", detail: "A sourced interactive learning adaptation", storyQuestId: "all-stories-ananses" },
        { id: "anansi-context", type: "culture", label: "Ananse, the many-sided trickster", detail: "Meet a major figure in Akan storytelling", note: "Smithsonian Folkways describes Ananse as a popular Ashanti trickster who may appear as hero, villain, moral inspiration, or comic relief. Stories vary across tellers, communities, and the wider African diaspora." }
      ]
    },
    {
      id: "crew-day", number: 6, title: "A day with the crew", subtitle: "Help Kobby, Zuri, Taffy, and Chidi plan a visit", color: "#F28C28", image: "images/adventures/community-park.jpg",
      activities: [
        { id: "crew-community-visit", type: "storyQuest", label: "The Crew’s Community Visit", detail: "Four friends, one practical Twi mission", storyQuestId: "crew-community-visit" },
        { id: "crew-culture", type: "culture", label: "People before the plan", detail: "Reflect on the language habit you practised", note: "In these scenes, the crew greet, ask clearly, request help, and give thanks. The social details of a visit vary by family and community, so learners should observe and follow their hosts rather than assume one fixed custom." }
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
    },
    "all-stories-ananses": {
      id: "all-stories-ananses", title: "All Stories Are Ananse’s", provenance: "Sourced learning adaptation · Smithsonian Folkways", start: "greeting", xp: 40, cultureCardId: "twi-ananses-stories",
      source: { title:"Smithsonian Folkways — All Stories Are Anansi’s", url:"https://folkways.si.edu/harold-courlander/all-stories-are-anansis/childrens-prose/track/smithsonian" },
      nodes: {
        greeting: { location:"At the beginning of the tale", image:"images/adventures/family-home.jpg", narration:"In this Ashanti tale, the stories are held by Nyame. Ananse approaches with a bold plan to earn them.", speaker:"Ananse", native:"Maakye.", english:"Good morning.", vocabulary:[{native:"Maakye",english:"good morning"}], prompt:"How should Ananse open the encounter?", choices:[{text:"Maakye.",correct:true,next:"tasks",feedback:"The familiar morning greeting opens the exchange before the request."},{text:"Ɛyɛ ahe?",correct:false,feedback:"That asks a price and does not fit this opening."},{text:"Da yie.",correct:false,feedback:"That is used for good night, not this morning greeting."}] },
        tasks: { location:"Nyame sets the challenge", image:"images/adventures/community-park.jpg", narration:"Nyame names difficult tasks. Ananse listens, but wants to make sure he understands what has been asked.", speaker:"Ananse", native:"Wobɛtumi aka no bio?", english:"Can you repeat it?", vocabulary:[{native:"aka no bio",english:"say it again"}], prompt:"Which response keeps Ananse honestly engaged?", choices:[{text:"Wobɛtumi aka no bio?",correct:true,next:"help",feedback:"Asking for repetition is an active communication strategy."},{text:"Merekɔ fie.",correct:false,feedback:"That says ‘I am going home’ and abandons the challenge."},{text:"Ne boɔ yɛ den.",correct:false,feedback:"That comments that something is expensive."}] },
        help: { location:"Planning the tasks", image:"images/adventures/community-park.jpg", narration:"Ananse is known for wit and planning. Before acting, he considers the help and resources he will need.", speaker:"Ananse", native:"Wobɛtumi aboa me?", english:"Can you help me?", vocabulary:[{native:"aboa me",english:"help me"}], prompt:"Choose the useful request.", choices:[{text:"Wobɛtumi aboa me?",correct:true,next:"stories",feedback:"This directly asks, ‘Can you help me?’"},{text:"Wo din de sɛn?",correct:false,feedback:"That asks someone’s name."},{text:"Fa benkum.",correct:false,feedback:"That gives the direction ‘Turn left.’"}] },
        stories: { location:"Stories reach the people", image:"images/adventures/family-home.jpg", narration:"After Ananse completes the challenges, the stories are released. The tale explains why stories are associated with Ananse and shared among people.", speaker:"Ananse", native:"Meda wo ase.", english:"Thank you.", vocabulary:[{native:"Meda wo ase",english:"thank you"}], prompt:"How should Ananse close the exchange?", choices:[{text:"Meda wo ase.",correct:true,next:"complete",feedback:"The story journey closes with the course’s full expression of thanks."},{text:"Mennim.",correct:false,feedback:"That means ‘I do not know.’"},{text:"Mabrɛ.",correct:false,feedback:"That means ‘I am tired.’"}] }
      }
    },
    "crew-community-visit": {
      id:"crew-community-visit", title:"The Crew’s Community Visit", provenance:"Original AfriLingo crew story", start:"meet", xp:45,
      nodes: {
        meet: { companionId:"kobby", location:"Morning · meeting the crew", image:"images/adventures/community-park.jpg", narration:"Kobby arrives first and greets you before everyone makes a plan.", speaker:"Kobby", native:"Maakye!", english:"Good morning!", vocabulary:[{native:"Maakye",english:"good morning"}], prompt:"Return Kobby’s greeting.", choices:[{text:"Maakye!",correct:true,next:"destination",feedback:"You greet Kobby before moving into the plan."},{text:"Da yie.",correct:false,feedback:"That is a night-time leave-taking expression."},{text:"Ɛyɛ ahe?",correct:false,feedback:"That asks a price."}] },
        destination: { companionId:"nia", location:"Choosing where to go", image:"images/adventures/community-park.jpg", narration:"Taffy has the map and wants to know the destination.", speaker:"Taffy", native:"Worekɔ he?", english:"Where are you going?", vocabulary:[{native:"Worekɔ he?",english:"Where are you going?"}], prompt:"Tell Taffy you are going home.", choices:[{text:"Merekɔ fie.",correct:true,next:"clarify",feedback:"Merekɔ fie means ‘I am going home.’"},{text:"Mennim.",correct:false,feedback:"That means ‘I do not know.’"},{text:"Ne boɔ yɛ den.",correct:false,feedback:"That says something is expensive."}] },
        clarify: { companionId:"taji", location:"Chidi checks the directions", image:"images/adventures/taxi-rank.jpg", narration:"Chidi says the route quickly. You want to stay in the conversation without guessing.", speaker:"Chidi", native:"Fa nifa.", english:"Turn right.", vocabulary:[{native:"Fa nifa",english:"turn right"}], prompt:"Ask Chidi to say it again.", choices:[{text:"Wobɛtumi aka no bio?",correct:true,next:"help",feedback:"You ask for repetition and keep the exchange moving."},{text:"Wo din de sɛn?",correct:false,feedback:"That asks someone’s name."},{text:"Ɛkɔm de me.",correct:false,feedback:"That means ‘I am hungry.’"}] },
        help: { companionId:"zuri", location:"Arriving together", image:"images/adventures/family-home.jpg", narration:"Zuri is carrying books and asks for a hand at the door.", speaker:"Zuri", native:"Wobɛtumi aboa me?", english:"Can you help me?", vocabulary:[{native:"aboa me",english:"help me"}], prompt:"Choose a clear positive response.", choices:[{text:"Aane.",correct:true,next:"thanks",feedback:"Aane means ‘Yes.’ You agree to help Zuri."},{text:"Merekɔ adwuma.",correct:false,feedback:"That says ‘I am going to work.’"},{text:"Mente aseɛ.",correct:false,feedback:"That says ‘I do not understand.’"}] },
        thanks: { companionId:"zuri", location:"The visit begins", image:"images/adventures/family-home.jpg", narration:"Everyone is ready. Zuri thanks you for helping the crew arrive together.", speaker:"Zuri", native:"Meda wo ase.", english:"Thank you.", vocabulary:[{native:"Meda wo ase",english:"thank you"}], prompt:"Close the exchange politely.", choices:[{text:"Yoo.",correct:true,next:"complete",feedback:"Yoo acknowledges what was said and closes this short exchange naturally."},{text:"Fa benkum.",correct:false,feedback:"That means ‘Turn left.’"},{text:"Mabrɛ.",correct:false,feedback:"That means ‘I am tired.’"}] }
      }
    }
  },
  cultureCards: [
    { id:"twi-ananses-stories", title:"Why stories belong to Ananse", emoji:"🕷️", category:"Storytelling", language:"Twi", region:"Akan storytelling traditions · Ghana and the wider diaspora", text:"Ananse is a many-sided spider trickster in Akan storytelling. Smithsonian Folkways records him as hero, villain, moral inspiration, and comic figure; one Ashanti tale explains how he earns stories from Nyame and how those stories come to be shared. Individual tellers and communities preserve many versions.", sourceTitle:"Smithsonian Folkways — Ashanti: Folk Tales from Ghana", sourceUrl:"https://folkways.si.edu/harold-courlander/ashanti-folk-tales-from-ghana/childrens-prose/album/smithsonian" }
  ],
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
