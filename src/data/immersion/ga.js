const pendingAudio = { slow: "", normal: "", natural: "", status: "pending" };
const gaTurn = (speaker, native, english, answer, choices, feedback) => ({ speaker, native, english, answer, choices, feedback });
const gaConversation = (id, title, emoji, level, context, turns, xp = 15) => ({ id, title, emoji, level, context, turns, xp });
const gaGuideUrl = "https://pages.mtu.edu/~rlstrick/rsvtxt/gaguide.pdf";
const gaLessonUrl = "https://www.thegadangme.com/wp-content/uploads/2016/03/Lessons-on-Ga-Language-Amon-Quartey.pdf";
const gaStoryContext = {
  learner: "Asking someone to slow down or repeat an expression keeps a learner honestly involved in the conversation.",
  way: "Transport systems and route-giving habits vary. Confirm the destination and fare locally instead of assuming one routine.",
  "market-story": "This practice exchange uses a direct price question and thanks without assuming that every market purchase involves bargaining.",
  home: "The story practises useful household requests. The exact roles and routines inside a home differ across families.",
  school: "Clarification is an active learning skill. Classroom address and expectations depend on the school and teacher.",
  "accra-plan": "Ga is strongly associated with Accra and surrounding Ga communities, while multilingual life means speakers may use several languages across a single day."
};
export const gaImmersion = {
  languageId: "ga", languageName: "Ga",
  capabilities: { voiceRecognition: "adapter-required", generatedFeedback: "adapter-required", nativeAudio: "pending", textFallback: "ready" },
  conversations: [
    gaConversation("meet", "Meet Someone", "👋", "beginner", "You meet someone and exchange names before continuing.", [
      gaTurn("New acquaintance", "Te atsɛɔ bo tɛŋŋ?", "What is your name?", "Atsɛɔ mi Tete.", ["Atsɛɔ mi Tete.", "Midu gbɛ.", "Miiwɔlɔ."], "Atsɛɔ mi… gives your name directly."),
      gaTurn("New acquaintance", "Te oyɔɔ tɛŋŋ?", "How are you?", "Miyɛ jogbaŋŋ.", ["Miyɛ jogbaŋŋ.", "Miiya shia.", "Minuuu shishi."], "Miyɛ jogbaŋŋ says that you are fine.")
    ], 15),
    gaConversation("home", "Going Home", "🏠", "beginner", "A friend asks where you are going, then welcomes you back.", [
      gaTurn("Friend", "Nɛgbɛ oyaa?", "Where are you going?", "Miiya shia.", ["Miiya shia.", "Mijɛ Odɔkɔɔ.", "Mimli efu."], "Miiya shia says that you are going home."),
      gaTurn("Friend", "Miiherɛ bo.", "Welcome.", "Oyiwaladɔŋŋ.", ["Oyiwaladɔŋŋ.", "Yaa ohie tɛɛ.", "Miiwɔlɔ."], "Oyiwaladɔŋŋ closes the welcome with thanks.")
    ], 15),
    gaConversation("learner", "Learning Ga", "📚", "beginner", "You explain that you are learning and ask for helpful pacing.", [
      gaTurn("Ga speaker", "Ole Ga lo?", "Do you know Ga?", "Miikasɛ Ga.", ["Miikasɛ Ga.", "Midu gbɛ.", "Etɔ mi."], "Miikasɛ Ga explains that you are learning Ga."),
      gaTurn("Ga speaker", "Miikasɛ Ga.", "I am learning Ga.", "Wiemɔ bɛlɛoo.", ["Wiemɔ bɛlɛoo.", "Sha ohe.", "Nɛgbɛ ojɛ?"], "Wiemɔ bɛlɛoo asks the person to speak slowly.")
    ], 15),
    gaConversation("school", "At School", "🏫", "beginner", "A teacher checks what you are learning and whether you followed.", [
      gaTurn("Teacher", "Mɛni okasɛɔ?", "What are you learning?", "Miikasɛ Ga.", ["Miikasɛ Ga.", "Miiya shia.", "Mihao."], "Miikasɛ Ga answers with the subject you are learning."),
      gaTurn("Teacher", "Miikasɛ Ga.", "I am learning Ga.", "Wiemɔ ekɔŋŋ.", ["Wiemɔ ekɔŋŋ.", "Wɔ jogbaŋŋ.", "Maya Kumase wɔ."], "Wiemɔ ekɔŋŋ asks for the expression again.")
    ], 15),
    gaConversation("directions", "Find the Way", "🗺️", "intermediate", "You are lost and need a clear route.", [
      gaTurn("Local guide", "Mɛni otao?", "What do you want?", "Midu gbɛ.", ["Midu gbɛ.", "Miyɛ jogbaŋŋ.", "Miiya shia."], "Midu gbɛ clearly says that you have lost the way."),
      gaTurn("Local guide", "Yaa ohie tɛɛ.", "Go straight ahead.", "Wiemɔ ekɔŋŋ.", ["Wiemɔ ekɔŋŋ.", "Atsɛɔ mi Tete.", "Hɔmɔ miiye mi."], "Asking for repetition is safer than pretending to understand."),
      gaTurn("Local guide", "Yaa ohie tɛɛ.", "Go straight ahead.", "Oyiwaladɔŋŋ.", ["Oyiwaladɔŋŋ.", "Nɛgbɛ ojɛ?", "Miiwɔlɔ."], "Thank the person after confirming the direction.")
    ], 20),
    gaConversation("market", "At the Market", "🛒", "intermediate", "You greet a seller, ask about bread, and check the price.", [
      gaTurn("Seller", "Mɛni otao ohɛ?", "What would you like to buy?", "Ohaa bodobodo lo?", ["Ohaa bodobodo lo?", "Nɛgbɛ oyaa?", "Miyitso miigba mi."], "Ohaa bodobodo lo? asks whether bread is sold."),
      gaTurn("Seller", "Ohaa bodobodo lo?", "Do you sell bread?", "Enyie ahɔɔ enɛ?", ["Enyie ahɔɔ enɛ?", "Wiemɔ bɛlɛoo.", "Wɔ jogbaŋŋ."], "Enyie ahɔɔ enɛ? moves the exchange to the price."),
      gaTurn("Seller", "Enyie ahɔɔ enɛ?", "How much is this?", "Oyiwaladɔŋŋ.", ["Oyiwaladɔŋŋ.", "Midu gbɛ.", "Mimli efu."], "Oyiwaladɔŋŋ is the sourced thank-you expression.")
    ], 20),
    gaConversation("station", "At the Station", "🚕", "intermediate", "You locate the station and ask about the fare.", [
      gaTurn("Passenger", "Nɛgbɛ oyaa?", "Where are you going?", "Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?", ["Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?", "Mijɛ Odɔkɔɔ.", "Miiwɔlɔ."], "This asks where the lorry station is."),
      gaTurn("Passenger", "Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?", "Where is the lorry station?", "Enyie ji bɔ ni ahɛɔ?", ["Enyie ji bɔ ni ahɛɔ?", "Te atsɛɔ bo tɛŋŋ?", "Ŋa shinaa lɛ."], "Enyie ji bɔ ni ahɛɔ? asks about the fare.")
    ], 20),
    gaConversation("health", "Ask for Care", "🏥", "intermediate", "You explain that you are ill and identify a symptom.", [
      gaTurn("Health worker", "Te oyɔɔ tɛŋŋ?", "How are you?", "Mihe miiye.", ["Mihe miiye.", "Miyɛ jogbaŋŋ.", "Miiya shia."], "Mihe miiye says that you are ill."),
      gaTurn("Health worker", "Mihe miiye.", "I am ill.", "Miyitso miigba mi.", ["Miyitso miigba mi.", "Miiya Wiejaŋ.", "Miiherɛ bo."], "Miyitso miigba mi identifies a headache.")
    ], 20),
    gaConversation("repair", "Keep the Conversation Going", "💬", "advanced", "You miss part of a fast exchange and repair it honestly.", [
      gaTurn("Ga speaker", "Ole Ga lo?", "Do you know Ga?", "Miikasɛ Ga.", ["Miikasɛ Ga.", "Yaa ohie tɛɛ.", "Ŋa shinaa lɛ."], "Explain that you are learning Ga."),
      gaTurn("Ga speaker", "Miikasɛ Ga.", "I am learning Ga.", "Minuuu shishi.", ["Minuuu shishi.", "Maya Kumase wɔ.", "Etɔ mi."], "Minuuu shishi honestly says that you do not understand."),
      gaTurn("Ga speaker", "Minuuu shishi.", "I do not understand.", "Wiemɔ bɛlɛoo.", ["Wiemɔ bɛlɛoo.", "Sha ohe.", "Miiya shia."], "Ask for slower speech to stay in the conversation.")
    ], 25),
    gaConversation("plans", "Make a Future Plan", "📅", "advanced", "You explain tomorrow's journey and when you will return.", [
      gaTurn("Friend", "Nɛgbɛ oyaa?", "Where are you going?", "Maya Kumase wɔ.", ["Maya Kumase wɔ.", "Midu gbɛ.", "Miiwɔlɔ."], "Maya Kumase wɔ states tomorrow's journey to Kumasi."),
      gaTurn("Friend", "Maya Kumase wɔ.", "I shall go to Kumasi tomorrow.", "Maku misɛɛ Shɔ.", ["Maku misɛɛ Shɔ.", "Mimli efu.", "Nɛgbɛ ojɛ?"], "Maku misɛɛ Shɔ states the sourced Wednesday return plan.")
    ], 25),
    gaConversation("accra-day", "An Accra Day", "🏙️", "advanced", "You move between home, school, and the market using connected course language.", [
      gaTurn("Teacher", "Mɛni okasɛɔ?", "What are you learning?", "Miikasɛ Ga.", ["Miikasɛ Ga.", "Miiwɔlɔ.", "Mimli efu."], "Miikasɛ Ga gives Ga as the subject you are learning."),
      gaTurn("Classmate", "Mɛni ekasɛɔ?", "What is he or she studying?", "Wɔkasɛɔ nibii pii.", ["Wɔkasɛɔ nibii pii.", "Midu gbɛ.", "Etɔ mi."], "This says that many subjects are being learned."),
      gaTurn("Seller", "Mɛni otao ohɛ?", "What would you like to buy?", "Enyie ahɔɔ enɛ?", ["Enyie ahɔɔ enɛ?", "Wɔ jogbaŋŋ.", "Nɛgbɛ ojɛ?"], "The price question fits the market part of the day.")
    ], 25),
    gaConversation("social", "Respond With Context", "🤝", "advanced", "A friend checks in; you state how you feel and close politely.", [
      gaTurn("Friend", "Te oyɔɔ tɛŋŋ?", "How are you?", "Etɔ mi.", ["Etɔ mi.", "Yaa ohie tɛɛ.", "Ohaa bodobodo lo?"], "Etɔ mi says that you are tired."),
      gaTurn("Friend", "Etɔ mi.", "I am tired.", "Yaaba jogbaŋŋ.", ["Yaaba jogbaŋŋ.", "Enyie ahɔɔ enɛ?", "Nɛgbɛ bo yɛɔ?"], "Yaaba jogbaŋŋ closes the exchange with goodbye.")
    ], 25)
  ],
  variations: [
    { id:"welcome", common:"Miiherɛ bo.", alternative:"Miifala.", meaning:"Welcome.", region:"Ga usage; regional labeling pending", formality:"neutral", context:"Receiving someone", explanation:"Both forms appear in the Bureau of Ghana Languages guide. A native-speaker review will document finer contextual preference." },
    { id:"good-night", common:"Wɔ jogbaŋŋ.", alternative:"Oke wɔ jurɔ.", meaning:"Good night.", region:"Ga usage; regional labeling pending", formality:"neutral", context:"Night-time leave-taking", explanation:"The source records both forms; AfriLingo does not assign a dialect label without stronger evidence." },
    { id:"slowly", common:"Wiemɔ bɛlɛoo.", alternative:"Wiemɔ nyaa.", meaning:"Speak slowly.", region:"Ga usage; regional labeling pending", formality:"polite request", context:"Conversation repair", explanation:"Both variants are documented in the source guide." }
  ],
  speakers: [
    ["speaker-1","Accra contributor","Accra — contributor pending","Ojekoo.","Good morning."],
    ["speaker-2","Ga contributor","Contributor details pending","Te oyɔɔ tɛŋŋ?","How are you?"],
    ["speaker-3","Careful-speech contributor","Contributor details pending","Oyiwaladɔŋŋ.","Thank you."]
  ].map(([id,label,region,phrase,english])=>({id,label,region,ageRange:"Not supplied",style:"Recording pending",phrase,transcription:phrase,english,audio:pendingAudio})),
  pronunciation: {
    intro: "Ga uses three level tones, and vowel length can matter. These cards build visual awareness now; playback remains unavailable until a verified Ga speaker records each item.",
    items: [
      { id:"levels", focus:"Three level tones", native:"high · mid · low", english:"Tone is part of the spoken word", audio:"", note:"The 1969 pedagogical source explicitly describes three level tones. AfriLingo will add minimal pairs only after native-speaker verification." },
      { id:"length", focus:"Vowel length", native:"short vowel · long vowel", english:"Duration can help distinguish forms", audio:"", note:"Do not infer vowel length from English habits. Match a verified speaker when recordings arrive." },
      { id:"flow", focus:"Connected speech", native:"Te oyɔɔ tɛŋŋ?", english:"How are you?", audio:"", note:"Practice the expression as a complete rhythm before opening technical details. Slow and natural recordings will share the same audio interface." }
    ]
  },
  grammar: [
    {id:"progressive",title:"Spot an action in progress",level:"beginner",intro:"Compare a simple action idea with an action happening now.",before:"yaa",after:"miiya",highlightBefore:"yaa",highlightAfter:"mii-ya",explanation:"In these course expressions, mii- helps present an action as ongoing. Start by recognizing the whole pattern.",question:{prompt:"Which form appears in ‘I am going home’?",options:["miiya","yaa","maya"],answer:"miiya",explanation:"Miiya appears in Miiya shia."}},
    {id:"possessive",title:"Names and people in context",level:"beginner",intro:"Learn the full expression before analyzing its pieces.",before:"mi",after:"Atsɛɔ mi Tete.",highlightBefore:"mi",highlightAfter:"mi",explanation:"The course teaches the natural full expression for giving your name; optional grammatical detail stays secondary.",question:{prompt:"Which sentence gives a name?",options:["Atsɛɔ mi Tete.","Midu gbɛ.","Miiwɔlɔ."],answer:"Atsɛɔ mi Tete.",explanation:"This means ‘My name is Tete.’"}},
    {id:"question-where",title:"Build a where-question",level:"intermediate",intro:"The same question frame works with different destinations.",before:"Nɛgbɛ",after:"Nɛgbɛ oyaa?",highlightBefore:"Nɛgbɛ",highlightAfter:"Nɛgbɛ",explanation:"Nɛgbɛ introduces documented where-questions in the course.",question:{prompt:"Which asks ‘Where are you going?’",options:["Nɛgbɛ oyaa?","Mɛni nɛ?","Namɔ otao?"],answer:"Nɛgbɛ oyaa?",explanation:"Nɛgbɛ is the where cue here."}},
    {id:"future",title:"Recognize a future plan",level:"intermediate",intro:"Watch the beginning change in a planned journey.",before:"miiya",after:"maya",highlightBefore:"mii-",highlightAfter:"ma-",explanation:"The sourced examples contrast an ongoing journey with a future plan. Learn the whole sentence pattern first.",question:{prompt:"Which means ‘I shall go to Kumasi tomorrow’?",options:["Maya Kumase wɔ.","Miiya shia.","Mijɛ Odɔkɔɔ."],answer:"Maya Kumase wɔ.",explanation:"The ma- form occurs in the documented future sentence."}},
    {id:"tone",title:"Meaning lives in tone too",level:"advanced",intro:"Ga is written here with tone marks only where the learning source supplies them.",before:"written form",after:"verified spoken form",highlightBefore:"text",highlightAfter:"tone",explanation:"Ga has three level tones. Tone and vowel length can distinguish words, so recordings must come from verified speakers rather than synthetic guesses.",question:{prompt:"What is the safest way to learn an uncertain tone?",options:["Use a verified speaker recording","Guess from English spelling","Ignore vowel length"],answer:"Use a verified speaker recording",explanation:"Verified audio is essential for tone and vowel length."}}
  ],
  missions: [
    {id:"greet",title:"Begin with a Greeting",emoji:"🤝",level:"beginner",context:"You arrive and meet someone in the morning.",prompt:"Choose the fitting opening.",choices:[{text:"Ojekoo.",correct:true,feedback:"This is the documented morning greeting."},{text:"Midu gbɛ.",correct:false,feedback:"That says you have lost the way."}],culture:"Greeting first creates space for the conversation; finer etiquette notes remain subject to Ga editorial review.",xp:15},
    {id:"repair",title:"Ask for Slower Speech",emoji:"💬",level:"intermediate",context:"You are learning Ga and need help following.",prompt:"What should you say?",choices:[{text:"Wiemɔ bɛlɛoo.",correct:true,feedback:"This asks the person to speak slowly."},{text:"Sha ohe.",correct:false,feedback:"That asks someone to hurry."}],culture:"A clear repair phrase lets a learner remain in the conversation instead of switching languages immediately.",xp:20},
    {id:"market",title:"Navigate a Purchase",emoji:"🛒",level:"advanced",context:"You are at a market and need the price.",prompt:"Choose the direct price question.",choices:[{text:"Enyie ahɔɔ enɛ?",correct:true,feedback:"This documented expression asks how much the item costs."},{text:"Nɛgbɛ ojɛ?",correct:false,feedback:"That asks where someone comes from."}],culture:"Market contexts differ; AfriLingo teaches respectful, direct language without assuming bargaining is universal.",xp:25}
  ],
  stories: [
    {id:"learner",title:"Miikasɛ Ga",englishTitle:"I Am Learning Ga",emoji:"📚",level:"beginner",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Atsɛɔ mi Tete.",english:"My name is Tete."},{native:"Miikasɛ Ga.",english:"I am learning Ga."},{native:"Minuuu shishi.",english:"I do not understand."},{native:"Wiemɔ bɛlɛoo.",english:"Speak slowly."}],vocabulary:{miikasɛ:"I am learning",ga:"Ga",wiemɔ:"speak"},question:{prompt:"What is Tete learning?",options:["Ga","Directions","Prices"],answer:"Ga",explanation:"Tete says Miikasɛ Ga."}},
    {id:"way",title:"Midu Gbɛ",englishTitle:"Finding the Way",emoji:"🗺️",level:"intermediate",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Midu gbɛ.",english:"I have lost the way."},{native:"Yaa ohie tɛɛ.",english:"Go straight ahead."},{native:"Oyiwaladɔŋŋ.",english:"Thank you."}],vocabulary:{gbɛ:"way",yaa:"go",ohie:"ahead"},question:{prompt:"What direction is given?",options:["Go straight ahead","Turn back","Wait here"],answer:"Go straight ahead",explanation:"Yaa ohie tɛɛ gives that direction."}},
    {id:"market-story",title:"Jara Nɔ",englishTitle:"At the Market",emoji:"🛒",level:"advanced",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Miiya jara nɔ.",english:"I am going to the market."},{native:"Enyie ahɔɔ enɛ?",english:"How much is this?"},{native:"Oyiwaladɔŋŋ.",english:"Thank you."}],vocabulary:{jara:"market",enyie:"how much",oyiwaladɔŋŋ:"thank you"},question:{prompt:"What does the learner ask?",options:["The price","The time","A name"],answer:"The price",explanation:"The middle sentence asks how much the item is."}},
    {id:"home",title:"Shia Mli",englishTitle:"At Home",emoji:"🏠",level:"beginner",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Miiya shia.",english:"I am going home."},{native:"Ŋa shinaa lɛ.",english:"Shut the door."},{native:"Gbɛlɛmɔ samflɛ lɛ.",english:"Open the window."},{native:"Fo oŋɛ hu.",english:"Wash your hands too."}],vocabulary:{shia:"home",shinaa:"door",samflɛ:"window",oŋɛ:"your hands"},question:{prompt:"What should be opened?",options:["The window","The door","A book"],answer:"The window",explanation:"Gbɛlɛmɔ samflɛ lɛ asks for the window to be opened."}},
    {id:"school",title:"Miikasɛ Ga",englishTitle:"A School Day",emoji:"🏫",level:"intermediate",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Mɛni okasɛɔ?",english:"What are you learning?"},{native:"Miikasɛ Ga.",english:"I am learning Ga."},{native:"Ŋmaa ofo shi.",english:"Write it down."},{native:"Wiemɔ ekɔŋŋ.",english:"Say it again."}],vocabulary:{mɛni:"what",miikasɛ:"I am learning",ŋmaa:"write",wiemɔ:"speak or say"},question:{prompt:"What is the learner studying?",options:["Ga","Prices","Directions"],answer:"Ga",explanation:"The learner says Miikasɛ Ga."}},
    {id:"accra-plan",title:"Wɔ Lɛ",englishTitle:"Tomorrow's Plan",emoji:"🏙️",level:"advanced",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Mijɛ Odɔkɔɔ.",english:"I come from Odorkor."},{native:"Maya Kumase wɔ.",english:"I shall go to Kumasi tomorrow."},{native:"Maku misɛɛ Shɔ.",english:"I shall return on Wednesday."},{native:"Misɛɛ etsɛŋ.",english:"I will not be long."}],vocabulary:{odɔkɔɔ:"Odorkor",kumase:"Kumasi",wɔ:"tomorrow",shɔ:"Wednesday"},question:{prompt:"When will the speaker return?",options:["Wednesday","Tomorrow morning","Tonight"],answer:"Wednesday",explanation:"Maku misɛɛ Shɔ states the Wednesday return plan."}}
  ].map(story => ({ ...story, xp: story.level === "advanced" ? 25 : story.level === "intermediate" ? 20 : 15, culturalContext: gaStoryContext[story.id], verificationStatus: "Source-aligned original learning story · final Ga speaker review pending", sourceTitle: "Bureau of Ghana Languages — Language Guide (Ga Version)", sourceUrl: gaGuideUrl })),
  cultureNotes: [
    { id:"ga-language", title:"Ga in a multilingual capital", emoji:"🏙️", category:"Language and place", text:"Ga is an important language of Accra and neighbouring Ga communities. AfriLingo treats the city as multilingual and does not imply that every resident has the same language background.", sourceTitle:"Bureau of Ghana Languages — Ga Guide", sourceUrl:gaGuideUrl },
    { id:"ga-greetings", title:"Let the greeting open the exchange", emoji:"🤝", category:"Conversation", text:"The source guide teaches time-appropriate greetings alongside introductions and everyday requests. This shelf encourages greeting first while leaving finer etiquette to speaker review and the specific relationship.", sourceTitle:"Bureau of Ghana Languages — Ga Guide", sourceUrl:gaGuideUrl },
    { id:"ga-markets", title:"Clear questions at the market", emoji:"🛒", category:"Everyday life", text:"The course material includes asking what someone wants to buy, whether bread is sold, and how much an item costs. Real prices and negotiation practices vary by seller and setting.", sourceTitle:"Bureau of Ghana Languages — Ga Guide", sourceUrl:gaGuideUrl },
    { id:"ga-transport", title:"Confirm the route and fare", emoji:"🚐", category:"Getting around", text:"Useful source phrases locate the lorry station, ask the fare, name a destination, and repair a missed direction. Learners should still confirm current local routes and prices.", sourceTitle:"Bureau of Ghana Languages — Ga Guide", sourceUrl:gaGuideUrl },
    { id:"ga-sound", title:"Tone and vowel length carry meaning", emoji:"🎵", category:"Language pattern", text:"The pedagogical source describes three level tones and meaningful vowel length. AfriLingo therefore avoids guessing pronunciation and keeps native-speaker audio pending.", sourceTitle:"Lessons on Ga Language (1969)", sourceUrl:gaLessonUrl },
    { id:"ga-variation", title:"One language, real variation", emoji:"🧭", category:"Usage", text:"Published materials document more than one form for some everyday expressions. The app shows alternatives cautiously and postpones fine regional labels until Ga speakers review them.", sourceTitle:"Bureau of Ghana Languages — Ga Guide", sourceUrl:gaGuideUrl }
  ],
  dailyPhrases: [
    ["ojekoo","Ojekoo.","Good morning.","Morning greeting","Use when greeting in the morning."],
    ["how","Te oyɔɔ tɛŋŋ?","How are you?","How are you?","A useful check-in after greeting."],
    ["thanks","Oyiwaladɔŋŋ.","Thank you.","Thanks","Use to express gratitude."],
    ["slow","Wiemɔ bɛlɛoo.","Speak slowly.","Speak slowly","Useful when learning or clarifying."],
    ["learning","Miikasɛ Ga.","I am learning Ga.","I am learning Ga","Lets a conversation partner know you are a learner."]
  ].map(([id,native,english,literal,context])=>({id,native,english,literal,when:context,context,exampleNative:native,exampleEnglish:english,audio:""}))
};
