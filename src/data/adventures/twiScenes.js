const step = (id, character, speaker, native, english, prompt, choices, answer, feedback) => ({ id, character, speaker, native, english, prompt, choices, answer, feedback });

export const twiTaxiMission = {
  id: "twi-taxi-journey", title: "Find Your Way", languageName: "Twi", setting: "taxi rank", level: "intermediate",
  image: "images/adventures/taxi-rank.jpg", imageAlt: "Illustrated taxi rank with vehicles and passengers", hotspotClass: "left-[12%] top-[43%]", inspectAction: "Check the route", xp: 40,
  goal: "Find the right route, ask for help, follow a direction, and close politely.",
  item: { label: "The route", emoji: "🛣️", hint: "Look for the road before asking someone to guide you.", vocabulary: [{ native: "Kwan", english: "road or way" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "direct", label: "Ask Ama directly", ending: "You asked clearly, followed the route, and thanked Ama." },
    { id: "friend", label: "Check with Kofi first", note: "Kofi tells you where he is going before you ask Ama.", ending: "Kofi’s clue helped you orient yourself before asking Ama.", detour: step("destination", "kofi", "Friend", "Merekɔ adwuma.", "I am going to work.", "Where is Kofi going?", ["To work", "Home", "To buy bananas"], "To work", "Adwuma means work in this familiar course phrase.") }
  ],
  steps: [
    step("ask", "ama", "Passenger", "Worekɔ he?", "Where are you going?", "Ask whether Ama can show you the way.", ["Wobɛtumi akyerɛ me?", "Ɛyɛ ahe?", "Mepɛ aduane."], "Wobɛtumi akyerɛ me?", "This asks, ‘Can you show me?’"),
    step("straight", "ama", "Passenger", "Kɔ w'anim tee.", "Go straight ahead.", "Which direction did Ama give?", ["Go straight ahead", "Turn left", "Return later"], "Go straight ahead", "W'anim tee points you straight ahead."),
    step("right", "ama", "Passenger", "Fa nifa.", "Turn right.", "Follow the next instruction.", ["Turn right", "Turn left", "Stop here"], "Turn right", "Nifa is right."),
    step("thanks", "ama", "Passenger", "Fa nifa.", "Turn right.", "Thank Ama before leaving.", ["Meda wo ase.", "Mennim.", "Mabrɛ."], "Meda wo ase.", "Meda wo ase is the full thank-you expression.")
  ],
  culture: "Clear questions, careful listening, and thanks make this a respectful route-finding exchange. Transport routines differ by place and journey.",
  completionTitle: "You found the way!", completionText: "You completed a practical Twi direction exchange."
};

export const twiCafeMission = {
  id: "twi-cafe-order", title: "A Simple Meal", languageName: "Twi", setting: "community café", level: "beginner",
  image: "images/adventures/community-cafe.jpg", imageAlt: "Illustrated café with a counter and tables", hotspotClass: "left-[16%] top-[40%]", inspectAction: "Look at the food", xp: 35,
  goal: "Look at the meal, explain what you need, ask for food or water, and say thanks.",
  item: { label: "Today’s meal", emoji: "🍲", hint: "Notice the food before starting your order.", vocabulary: [{ native: "Aduane", english: "food" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "food", label: "Order food", ending: "You explained that you were hungry and asked for food politely." },
    { id: "water", label: "Ask about water first", note: "Kofi reminds you how to say that you are thirsty.", ending: "You asked for water first, then completed the meal exchange.", detour: step("thirsty", "kofi", "Friend", "Nsukɔm de me.", "I am thirsty.", "What does Kofi need?", ["Water", "Directions", "A book"], "Water", "Nsukɔm de me expresses being thirsty.") }
  ],
  steps: [
    step("hungry", "ama", "Server", "Ɛdeɛn na wopɛ?", "What do you want?", "Tell Ama that you are hungry.", ["Ɛkɔm de me.", "Mabrɛ.", "Mennim."], "Ɛkɔm de me.", "Ɛkɔm de me means ‘I am hungry.’"),
    step("order", "ama", "Server", "Ɛdeɛn na wopɛ?", "What do you want?", "Ask for food.", ["Mepɛ aduane.", "Merekɔ fie.", "Fa benkum."], "Mepɛ aduane.", "Mepɛ aduane means ‘I want food.’"),
    step("thanks", "ama", "Server", "Mepɛ aduane.", "I want food.", "Finish politely.", ["Meda wo ase.", "Worekɔ he?", "Ka no bio."], "Meda wo ase.", "End the exchange with thanks.")
  ],
  culture: "This scene practices stating a need and responding courteously. Food, service, and hospitality practices vary across homes and businesses.",
  completionTitle: "Meal ordered!", completionText: "You handled a short Twi food exchange."
};

export const twiHomeMission = {
  id: "twi-home-visit", title: "Visit a Friend", languageName: "Twi", setting: "family home", level: "beginner",
  image: "images/adventures/family-home.jpg", imageAlt: "Illustrated family home with a welcoming sitting area", hotspotClass: "left-[12%] top-[39%]", inspectAction: "Approach the home", xp: 35,
  goal: "Greet your hosts, introduce yourself, explain your Twi level, and arrange to meet again.",
  item: { label: "The home", emoji: "🏠", hint: "Get ready to greet before beginning the conversation.", vocabulary: [{ native: "Fie", english: "home" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "ama", label: "Greet Ama first", ending: "You greeted Ama, introduced yourself, and closed the visit warmly." },
    { id: "kofi", label: "Ask Kofi for help", note: "Kofi models a simple introduction before you speak to Ama.", ending: "Kofi helped you prepare a confident introduction.", detour: step("model", "kofi", "Friend", "Me din de Kofi.", "My name is Kofi.", "What did Kofi tell you?", ["His name", "A price", "A direction"], "His name", "Me din de introduces a name.") }
  ],
  steps: [
    step("greet", "ama", "Host", "Maakye.", "Good morning.", "Return the morning greeting.", ["Maakye.", "Da yie.", "Ɛyɛ ahe?"], "Maakye.", "Maakye is the morning greeting used throughout the course."),
    step("name", "ama", "Host", "Wo din de sɛn?", "What is your name?", "Introduce yourself as Ama.", ["Me din de Ama.", "Me firi Ghana.", "Merekɔ fie."], "Me din de Ama.", "Me din de… introduces your name."),
    step("ability", "ama", "Host", "Wote Twi?", "Do you speak Twi?", "Explain that you speak a little Twi.", ["Mete Twi kakra.", "Mente aseɛ.", "Mempɛ eyi."], "Mete Twi kakra.", "Kakra means a little in this learner introduction."),
    step("close", "ama", "Host", "Da yie.", "Good night.", "Say that you will meet again.", ["Yɛbɛhyia bio.", "Fa nifa.", "Ɛkɔm de me."], "Yɛbɛhyia bio.", "Yɛbɛhyia bio means ‘We shall meet again.’")
  ],
  culture: "This practice scene puts the greeting before the purpose of the visit and closes with appreciation for the relationship. Real household etiquette varies.",
  completionTitle: "Visit complete!", completionText: "You introduced yourself and maintained a friendly Twi exchange."
};

export const twiWorkMission = {
  id: "twi-workday", title: "A Busy Workday", languageName: "Twi", setting: "workplace", level: "intermediate",
  image: "images/adventures/workplace.jpg", imageAlt: "Illustrated shared workplace with desks and work materials", hotspotClass: "left-[13%] top-[41%]", inspectAction: "Check the work area", xp: 40,
  goal: "Tell the crew where you are going, describe your workday, ask for slower speech, and explain that you will return.",
  item: { label: "Today’s work", emoji: "💼", hint: "Look around the work area before joining the conversation.", vocabulary: [{ native: "Adwuma", english: "work" }] },
  characters: ["kofi", "gogo-nandi"],
  routes: [
    { id: "begin", label: "Start the workday", ending: "You explained your destination, followed the exchange, and closed with a clear plan." },
    { id: "check", label: "Check with Taffy first", note: "Taffy describes the activity before you join Zuri.", ending: "Taffy’s clue helped you enter the workplace exchange confidently.", detour: step("work-clue", "kofi", "Colleague", "Meyɛ adwuma.", "I work.", "What activity did Taffy describe?", ["Working", "Shopping", "Going home"], "Working", "Adwuma means work in this course expression.") }
  ],
  steps: [
    step("destination", "gogo-nandi", "Colleague", "Worekɔ he?", "Where are you going?", "Tell Zuri you are going to work.", ["Merekɔ adwuma.", "Merekɔ fie.", "Mepɛ aduane."], "Merekɔ adwuma.", "Merekɔ adwuma means ‘I am going to work.’"),
    step("activity", "gogo-nandi", "Colleague", "Meyɛ adwuma.", "I work.", "Which response matches the activity?", ["I work", "I am hungry", "Turn right"], "I work", "Meyɛ adwuma describes working."),
    step("tired", "gogo-nandi", "Colleague", "Mabrɛ.", "I am tired.", "What is Zuri telling you?", ["She is tired", "She is thirsty", "She is going home"], "She is tired", "Mabrɛ means ‘I am tired.’"),
    step("repair", "gogo-nandi", "Colleague", "Meyɛ adwuma.", "I work.", "Ask Zuri to say it slowly.", ["Wobɛtumi aka no brɛoo?", "Ɛyɛ ahe?", "Wo din de sɛn?"], "Wobɛtumi aka no brɛoo?", "This asks whether the speaker can say it slowly."),
    step("return", "gogo-nandi", "Colleague", "Yɛbɛhyia bio.", "We shall meet again.", "Say that you will return.", ["Mɛsan aba.", "Mennim.", "Fa benkum."], "Mɛsan aba.", "Mɛsan aba means ‘I will return.’")
  ],
  culture: "This scene practises clear plans, honest clarification, and leave-taking. Workplaces differ, so observe how colleagues address one another in the setting you enter.",
  completionTitle: "Workday complete!", completionText: "You navigated a practical Twi workplace exchange."
};

export const twiPlansMission = {
  id: "twi-meet-again", title: "Meet Again", languageName: "Twi", setting: "community park", level: "advanced",
  image: "images/adventures/community-park.jpg", imageAlt: "Illustrated community park where friends are meeting", hotspotClass: "left-[15%] top-[42%]", inspectAction: "Find the meeting place", xp: 45,
  goal: "Join the crew, make a later plan, repair the conversation when needed, and close at the right moment.",
  item: { label: "The meeting place", emoji: "📍", hint: "Find the crew’s meeting point before making the plan.", vocabulary: [{ native: "Akyire yi", english: "later" }] },
  characters: ["kofi", "gogo-nandi"],
  routes: [
    { id: "plan", label: "Make the plan together", ending: "You agreed on a later meeting and kept the conversation clear." },
    { id: "listen", label: "Listen to Taffy first", note: "Taffy models the plan before Zuri asks you to respond.", ending: "You listened to the model, confirmed the plan, and closed the exchange.", detour: step("later-clue", "kofi", "Friend", "Akyire yi yɛbɛhyia.", "We shall meet later.", "When will the friends meet?", ["Later", "This morning", "Never"], "Later", "Akyire yi means later in this course expression.") }
  ],
  steps: [
    step("greet", "gogo-nandi", "Friend", "Maakye.", "Good morning.", "Return Zuri’s greeting.", ["Maakye.", "Da yie.", "Ɛyɛ ahe?"], "Maakye.", "Maakye is the morning greeting practised in the course."),
    step("invite", "gogo-nandi", "Friend", "Yɛbɛhyia bio?", "Shall we meet again?", "Agree to meet later.", ["Aane, akyire yi yɛbɛhyia.", "Ne boɔ yɛ den.", "Mente aseɛ."], "Aane, akyire yi yɛbɛhyia.", "This agrees and says that you will meet later."),
    step("repeat", "gogo-nandi", "Friend", "Akyire yi yɛbɛhyia.", "We shall meet later.", "Ask Zuri to repeat the plan.", ["Wobɛtumi aka no bio?", "Wobɛtumi aboa me?", "Mepɛ aduane."], "Wobɛtumi aka no bio?", "This asks whether the speaker can repeat it."),
    step("confirm", "gogo-nandi", "Friend", "Yɛbɛhyia bio.", "We shall meet again.", "Confirm the plan positively.", ["Aane.", "Mente aseɛ.", "Mabrɛ."], "Aane.", "Aane means ‘Yes.’ It confirms the plan directly."),
    step("close", "gogo-nandi", "Friend", "Akyire yi yɛbɛhyia.", "We shall meet later.", "Close with thanks.", ["Meda wo ase.", "Fa nifa.", "Ɛkɔm de me."], "Meda wo ase.", "Meda wo ase is the full thank-you expression used in the course.")
  ],
  culture: "Making plans includes listening, confirming, and repairing misunderstandings. The exact greeting and leave-taking should fit the time, relationship, and local context.",
  completionTitle: "Plan made!", completionText: "You arranged another meeting and kept the Twi exchange moving."
};
