// These missions only reuse phrases already present in the Ga course and Immersion data.
const step = (id, character, speaker, native, english, prompt, choices, answer, feedback) => ({ id, character, speaker, native, english, prompt, choices, answer, feedback });

export const gaHomeMission = {
  id: "ga-home-routine", title: "Help at Home", languageName: "Ga", setting: "family home", level: "beginner",
  image: "images/adventures/family-home.jpg", imageAlt: "Illustrated family home with a welcoming sitting area", hotspotClass: "left-[12%] top-[39%]", inspectAction: "Enter the home", xp: 35,
  goal: "Greet the family, follow two household requests, and say where you are going.",
  item: { label: "The home", emoji: "🏠", hint: "Look around the home before joining the family.", vocabulary: [{ native: "Shia", english: "home" }] },
  characters: ["kofi", "gogo-nandi"],
  routes: [
    { id: "help", label: "Help Zuri first", ending: "You greeted the family and followed the household requests." },
    { id: "prepare", label: "Practise with Taffy", note: "Taffy tells you where he is going before you speak with Zuri.", ending: "Taffy helped you prepare for the family exchange.", detour: step("home-clue", "kofi", "Friend", "Miiya shia.", "I am going home.", "Where is Taffy going?", ["Home", "The market", "The station"], "Home", "Shia means home in this course phrase.") }
  ],
  steps: [
    step("greet", "gogo-nandi", "Host", "Ojekoo.", "Good morning.", "Return the morning greeting.", ["Ojekoo.", "Wɔ jogbaŋŋ.", "Midu gbɛ."], "Ojekoo.", "Ojekoo is the morning greeting in the Ga course."),
    step("door", "gogo-nandi", "Host", "Ŋa shinaa lɛ.", "Shut the door.", "What did Zuri ask you to shut?", ["The door", "The window", "A book"], "The door", "Shinaa is the door in this household request."),
    step("window", "gogo-nandi", "Host", "Gbɛlɛmɔ samflɛ lɛ.", "Open the window.", "What should you open?", ["The window", "The door", "The market"], "The window", "Samflɛ is the window in this phrase."),
    step("leave", "gogo-nandi", "Host", "Nɛgbɛ oyaa?", "Where are you going?", "Say that you are going home.", ["Miiya shia.", "Miiya Wiejaŋ.", "Miikasɛ Ga."], "Miiya shia.", "Miiya shia means ‘I am going home.’")
  ],
  culture: "Greeting before the purpose of a visit keeps this practice exchange warm and respectful. Household routines vary from family to family.",
  completionTitle: "Home routine complete!", completionText: "You followed a practical Ga exchange at home."
};

export const gaCafeMission = {
  id: "ga-cafe-order", title: "Choose a Simple Meal", languageName: "Ga", setting: "community café", level: "beginner",
  image: "images/adventures/community-cafe.jpg", imageAlt: "Illustrated café with a counter and tables", hotspotClass: "left-[16%] top-[40%]", inspectAction: "See today's food", xp: 35,
  goal: "Recognise everyday food words, ask for bread, and thank the server.",
  item: { label: "Today’s food", emoji: "🍚", hint: "Look at the counter before placing your order.", vocabulary: [{ native: "Niyenii", english: "food" }] },
  characters: ["ama", "kofi"],
  routes: [
    { id: "bread", label: "Ask for bread", ending: "You asked about bread and closed the exchange politely." },
    { id: "water", label: "Check the drinks first", note: "Kobby points out the Ga word for water.", ending: "You recognised the drink before completing your food order.", detour: step("water-clue", "ama", "Friend", "Nu.", "Water.", "What did Kobby point out?", ["Water", "Rice", "Bread"], "Water", "Nu is the Ga vocabulary word for water.") }
  ],
  steps: [
    step("food", "kofi", "Server", "Niyenii.", "Food.", "Which meaning matches Niyenii?", ["Food", "Work", "Home"], "Food", "Niyenii is the course vocabulary word for food."),
    step("rice", "kofi", "Server", "Omɔ.", "Rice.", "What food did Taffy name?", ["Rice", "Bread", "Water"], "Rice", "Omɔ means rice."),
    step("bread", "kofi", "Server", "Ohaa bodobodo lo?", "Do you sell bread?", "Which item are you asking about?", ["Bread", "Rice", "Water"], "Bread", "Bodobodo means bread in this question."),
    step("thanks", "kofi", "Server", "Ohaa bodobodo lo?", "Do you sell bread?", "Thank the server.", ["Oyiwaladɔŋŋ.", "Wiemɔ ekɔŋŋ.", "Midu gbɛ."], "Oyiwaladɔŋŋ.", "Oyiwaladɔŋŋ is the Ga thank-you used in the course.")
  ],
  culture: "This scene practises recognising staple vocabulary and making a clear request. Menus and service customs differ across homes and businesses.",
  completionTitle: "Meal chosen!", completionText: "You handled a short Ga food exchange."
};

export const gaTaxiMission = {
  id: "ga-taxi-route", title: "Find the Right Route", languageName: "Ga", setting: "taxi rank", level: "intermediate",
  image: "images/adventures/taxi-rank.jpg", imageAlt: "Illustrated taxi rank with vehicles and passengers", hotspotClass: "left-[12%] top-[43%]", inspectAction: "Check the station", xp: 40,
  goal: "Find the lorry station, ask the fare, and tell a passenger where you are going.",
  item: { label: "The station", emoji: "🚐", hint: "Look for the lorry station before choosing a route.", vocabulary: [{ native: "Tsɔnemaamɔhe", english: "lorry station" }] },
  characters: ["kofi", "ama"],
  routes: [
    { id: "station", label: "Ask at the station", ending: "You found the station, asked the fare, and named your destination." },
    { id: "lost", label: "Tell Kobby you are lost", note: "Kobby hears that you have lost the way and gives you a direction.", ending: "You recovered from getting lost and completed the journey exchange.", detour: step("lost-clue", "ama", "Traveller", "Midu gbɛ.", "I have lost the way.", "What problem did you explain?", ["You lost the way", "You are ill", "You want bread"], "You lost the way", "Midu gbɛ is the course phrase for losing the way.") }
  ],
  steps: [
    step("station", "kofi", "Passenger", "Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?", "Where is the lorry station?", "What place are you looking for?", ["The lorry station", "The school", "The market"], "The lorry station", "Tsɔnemaamɔhe names the lorry station."),
    step("straight", "kofi", "Passenger", "Yaa ohie tɛɛ.", "Go straight ahead.", "Which direction did Taffy give?", ["Go straight ahead", "Go home", "Turn back"], "Go straight ahead", "Yaa ohie tɛɛ directs you straight ahead."),
    step("fare", "kofi", "Passenger", "Enyie ji bɔ ni ahɛɔ?", "What is the fare?", "What information are you asking for?", ["The fare", "A name", "The time"], "The fare", "This question asks what fare is charged."),
    step("destination", "kofi", "Passenger", "Nɛgbɛ oyaa?", "Where are you going?", "Say that you are going to Weija.", ["Miiya Wiejaŋ.", "Miiya shia.", "Maya nitsumɔ."], "Miiya Wiejaŋ.", "Miiya Wiejaŋ means ‘I am going to Weija.’")
  ],
  culture: "Route questions are most useful when they are clear and courteous. Fares and transport routines vary, so confirm details locally.",
  completionTitle: "Route found!", completionText: "You navigated a practical Ga transport exchange."
};

export const gaSchoolMission = {
  id: "ga-school-day", title: "Join the Class", languageName: "Ga", setting: "school", level: "intermediate",
  image: "images/adventures/workplace.jpg", imageAlt: "Illustrated shared learning space with desks and study materials", hotspotClass: "left-[13%] top-[41%]", inspectAction: "Check the lesson", xp: 40,
  goal: "Talk about learning Ga, follow a classroom instruction, and repair the conversation.",
  item: { label: "The lesson", emoji: "📚", hint: "Look at the learning space before joining the class.", vocabulary: [{ native: "Miikasɛ Ga", english: "I am learning Ga" }] },
  characters: ["gogo-nandi", "kofi"],
  routes: [
    { id: "class", label: "Join Zuri's class", ending: "You explained what you study and asked for support when needed." },
    { id: "subjects", label: "Ask Taffy first", note: "Taffy tells you that the class learns many subjects.", ending: "Taffy’s clue helped you enter the lesson confidently.", detour: step("subjects-clue", "kofi", "Classmate", "Wɔkasɛɔ nibii pii.", "We learn many subjects.", "What does the class learn?", ["Many subjects", "One price", "A route"], "Many subjects", "Nibii pii means many things or subjects in this course sentence.") }
  ],
  steps: [
    step("study", "gogo-nandi", "Teacher", "Mɛni okasɛɔ?", "What are you learning?", "Say that you are learning Ga.", ["Miikasɛ Ga.", "Miiya shia.", "Mihe miiye."], "Miikasɛ Ga.", "Miikasɛ Ga means ‘I am learning Ga.’"),
    step("write", "gogo-nandi", "Teacher", "Ŋmaa ofo shi.", "Write it down.", "What did Zuri ask you to do?", ["Write it down", "Say it again", "Go home"], "Write it down", "Ŋmaa ofo shi is the classroom instruction to write it down."),
    step("slowly", "gogo-nandi", "Teacher", "Wɔkasɛɔ nibii pii.", "We learn many subjects.", "Ask the teacher to speak slowly.", ["Wiemɔ bɛlɛoo.", "Wiemɔ ekɔŋŋ.", "Oyiwaladɔŋŋ."], "Wiemɔ bɛlɛoo.", "Wiemɔ bɛlɛoo asks someone to speak slowly."),
    step("repeat", "gogo-nandi", "Teacher", "Ŋmaa ofo shi.", "Write it down.", "Ask the teacher to say it again.", ["Wiemɔ ekɔŋŋ.", "Mijɛ Odɔkɔɔ.", "Nɛgbɛ oyaa?"], "Wiemɔ ekɔŋŋ.", "Wiemɔ ekɔŋŋ asks the speaker to say it again.")
  ],
  culture: "Asking for repetition is a learning skill, not a failure. Classroom routines and forms of address vary by school and teacher.",
  completionTitle: "Class complete!", completionText: "You kept a Ga learning exchange moving."
};

export const gaPlansMission = {
  id: "ga-make-plans", title: "Plan the Next Day", languageName: "Ga", setting: "community park", level: "advanced",
  image: "images/adventures/community-park.jpg", imageAlt: "Illustrated community park where friends are meeting", hotspotClass: "left-[15%] top-[42%]", inspectAction: "Find your friends", xp: 45,
  goal: "Check in with friends, talk about tomorrow, clarify a detail, and close politely.",
  item: { label: "Tomorrow’s plan", emoji: "📅", hint: "Find the crew before discussing the next day.", vocabulary: [{ native: "Wɔ", english: "tomorrow" }] },
  characters: ["ama", "gogo-nandi"],
  routes: [
    { id: "plan", label: "Make the plan together", ending: "You checked in, shared tomorrow’s plan, and closed clearly." },
    { id: "check", label: "Check on Zuri first", note: "Zuri tells you how she feels before the group makes its plan.", ending: "You listened to Zuri and then made the group plan.", detour: step("tired-clue", "gogo-nandi", "Friend", "Etɔ mi.", "I am tired.", "How does Zuri feel?", ["Tired", "Lost", "Hungry"], "Tired", "Etɔ mi means ‘I am tired.’") }
  ],
  steps: [
    step("check-in", "ama", "Friend", "Te oyɔɔ tɛŋŋ?", "How are you?", "Answer that you are fine.", ["Miyɛ jogbaŋŋ.", "Mihao.", "Midu gbɛ."], "Miyɛ jogbaŋŋ.", "Miyɛ jogbaŋŋ means ‘I am fine.’"),
    step("tomorrow", "ama", "Friend", "Nɛgbɛ oyaa?", "Where are you going?", "Say that you will go to Kumasi tomorrow.", ["Maya Kumase wɔ.", "Maku misɛɛ Shɔ.", "Maya nitsumɔ."], "Maya Kumase wɔ.", "This course sentence says, ‘I shall go to Kumasi tomorrow.’"),
    step("clarify", "ama", "Friend", "Maya Kumase wɔ.", "I shall go to Kumasi tomorrow.", "Ask your friend to say it again.", ["Wiemɔ ekɔŋŋ.", "Wiemɔ bɛlɛoo.", "Te atsɛɔ bo tɛŋŋ?"], "Wiemɔ ekɔŋŋ.", "Wiemɔ ekɔŋŋ asks for repetition."),
    step("close", "ama", "Friend", "Misɛɛ etsɛŋ.", "I will not be long.", "Close the evening conversation.", ["Wɔ jogbaŋŋ.", "Ojekoo.", "Miikasɛ Ga."], "Wɔ jogbaŋŋ.", "Wɔ jogbaŋŋ is the good-night expression used in the course.")
  ],
  culture: "Good plans include checking in, sharing details, and confirming what was heard. Choose greetings and leave-taking that fit the time and relationship.",
  completionTitle: "Plan made!", completionText: "You completed a social planning exchange in Ga."
};
