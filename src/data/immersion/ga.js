const pendingAudio = { slow: "", normal: "", natural: "", status: "pending" };
export const gaImmersion = {
  languageId: "ga", languageName: "Ga",
  capabilities: { voiceRecognition: "adapter-required", generatedFeedback: "adapter-required", nativeAudio: "pending", textFallback: "ready" },
  conversations: [
    ["meet", "Meet Someone", "👋", "beginner", "You meet someone in Accra.", "Te atsɛɔ bo tɛŋŋ?", "What is your name?", "Atsɛɔ mi Tete.", ["Atsɛɔ mi Tete.","Midu gbɛ.","Miiwɔlɔ."]],
    ["directions", "Ask for Directions", "🗺️", "beginner", "You have lost your way.", "Mɛni otao?", "What do you want?", "Midu gbɛ.", ["Midu gbɛ.","Miyɛ jogbaŋŋ.","Miiya shia."]],
    ["market", "At the Market", "🛒", "intermediate", "You want to know a price.", "Mɛni otao ohɛ?", "What would you like to buy?", "Enyie ahɔɔ enɛ?", ["Enyie ahɔɔ enɛ?","Wiemɔ ekɔŋŋ.","Wɔ jogbaŋŋ."]],
    ["school", "At School", "🏫", "intermediate", "A teacher asks what you are learning.", "Mɛni okasɛɔ?", "What are you learning?", "Miikasɛ Ga.", ["Miikasɛ Ga.","Miiye oyai.","Mimli efu."]],
    ["travel", "At the Station", "🚕", "advanced", "You need the lorry station.", "Nɛgbɛ oyaa?", "Where are you going?", "Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?", ["Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?","Mijɛ Odɔkɔɔ.","Miyitso miigba mi."]],
    ["repair", "Keep the Conversation Going", "💬", "advanced", "A speaker talks too quickly.", "Ole Ga lo?", "Do you know Ga?", "Wiemɔ bɛlɛoo.", ["Wiemɔ bɛlɛoo.","Yaa ohie tɛɛ.","Ŋa shinaa lɛ."]]
  ].map(([id,title,emoji,level,context,native,english,answer,choices])=>({id,title,emoji,level,context,turns:[{speaker:"Ga speaker",native,english,answer,choices,feedback:"Choose the response that directly fits this Ga conversation."}]})),
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
    {id:"market-story",title:"Jara Nɔ",englishTitle:"At the Market",emoji:"🛒",level:"advanced",origin:"Original AfriLingo learning story",audio:"",sentences:[{native:"Miiya jara nɔ.",english:"I am going to the market."},{native:"Enyie ahɔɔ enɛ?",english:"How much is this?"},{native:"Oyiwaladɔŋŋ.",english:"Thank you."}],vocabulary:{jara:"market",enyie:"how much",oyiwaladɔŋŋ:"thank you"},question:{prompt:"What does the learner ask?",options:["The price","The time","A name"],answer:"The price",explanation:"The middle sentence asks how much the item is."}}
  ],
  dailyPhrases: [
    ["ojekoo","Ojekoo.","Good morning.","Morning greeting","Use when greeting in the morning."],
    ["how","Te oyɔɔ tɛŋŋ?","How are you?","How are you?","A useful check-in after greeting."],
    ["thanks","Oyiwaladɔŋŋ.","Thank you.","Thanks","Use to express gratitude."],
    ["slow","Wiemɔ bɛlɛoo.","Speak slowly.","Speak slowly","Useful when learning or clarifying."],
    ["learning","Miikasɛ Ga.","I am learning Ga.","I am learning Ga","Lets a conversation partner know you are a learner."]
  ].map(([id,native,english,literal,context])=>({id,native,english,literal,when:context,context,exampleNative:native,exampleEnglish:english,audio:""}))
};
