import { swahiliUnit } from "./lessonBuilder";

const unit = (id, title, subtitle, emoji, color, topics) => swahiliUnit({ id, title, subtitle, emoji, color, culture: topics[0][3], lessons: topics.map(([lessonTitle, lessonEmoji, words, culture], index) => ({ id: `${id}-lesson-${index + 1}`, title: lessonTitle, emoji: lessonEmoji, words, culture })) });
const c = (title, emoji, text, category = "Everyday life") => ({ title, emoji, text, category });

export const swahiliUnits3to20 = [
  unit("introductions", "Introductions & Identity", "Say who you are and where you live", "🙋🏾", "#4338CA", [
    ["Your Name", "🏷️", [["Unaitwa nani?","What is your name?"],["Jina langu ni Amina.","My name is Amina."],["Naitwa Juma.","I am called Juma."],["Nimefurahi kukutana nawe.","I am happy to meet you."]], c("Names and introductions","🏷️","Names carry family, religious, and regional histories across Swahili-speaking communities.","Naming traditions")],
    ["Where You Come From", "🌍", [["Unatoka wapi?","Where are you from?"],["Ninatoka Kenya.","I come from Kenya."],["Ninatoka Tanzania.","I come from Tanzania."],["Ninaishi mjini.","I live in town."]], c("A shared regional language","🌍","Kiswahili connects speakers across East and Central Africa while local identities remain distinct.","Language")],
    ["Languages", "💬", [["Unazungumza Kiswahili?","Do you speak Swahili?"],["Ninazungumza Kiswahili kidogo.","I speak a little Swahili."],["Sielewi.","I do not understand."],["Tafadhali sema polepole.","Please speak slowly."]], c("Conversation repair","💬","Asking someone to repeat or slow down keeps a conversation respectful and useful.","Communication")]
  ]),
  unit("family", "Family & People", "Talk about relatives and relationships", "👨‍👩‍👧", "#C95D3A", [
    ["Close Family", "🏠", [["mama","mother",{nounClass:"1/2"}],["baba","father",{nounClass:"1/2"}],["dada","sister",{nounClass:"1/2"}],["kaka","brother",{nounClass:"1/2"}]], c("Family vocabulary","🏠","Family terms are common early conversation topics; actual household structures vary.","Family")],
    ["Children and Parents", "👪", [["mtoto","child",{nounClass:"1/2",plural:"watoto"}],["watoto","children",{nounClass:"2",singular:"mtoto"}],["mzazi","parent",{nounClass:"1/2",plural:"wazazi"}],["wazazi","parents",{nounClass:"2",singular:"mzazi"}]], c("Noun classes in use","👪","The m-/wa- pattern often marks people in singular and plural.","Grammar")],
    ["Extended Family", "🌳", [["bibi","grandmother"],["babu","grandfather"],["mke","wife"],["mume","husband"]], c("Kinship","🌳","Kinship words help describe both immediate and extended family networks.","Family")]
  ]),
  unit("actions", "Everyday Actions", "Build useful present-tense sentences", "🏃🏾", "#24745B", [
    ["Go and Come", "🚶🏾", [["kwenda","to go",{verbStem:"-enda"}],["kuja","to come",{verbStem:"-ja"}],["Ninaenda nyumbani.","I am going home."],["Anakuja leo.","He or she is coming today."]], c("Swahili verbs","🏃🏾","A verb can combine subject, tense, and action information in one word.","Grammar")],
    ["Eat and Drink", "🍲", [["kula","to eat",{verbStem:"-la"}],["kunywa","to drink",{verbStem:"-nywa"}],["Ninakula chakula.","I am eating food."],["Ninakunywa maji.","I am drinking water."]], c("Shared meals","🍲","Food and drink vocabulary opens everyday conversations without assuming one regional cuisine.","Food")],
    ["Study and Work", "📚", [["kusoma","to read or study",{verbStem:"-soma"}],["kufanya kazi","to work"],["Ninasoma Kiswahili.","I am studying Swahili."],["Ninafanya kazi leo.","I am working today."]], c("Learning by using","📚","Short, complete sentences make new verb patterns easier to reuse.","Learning")]
  ]),
  unit("food", "Food & Drink", "Order and talk about everyday foods", "🍛", "#F28C28", [
    ["Staples", "🍚", [["chakula","food",{nounClass:"7/8"}],["wali","cooked rice"],["mkate","bread",{nounClass:"3/4"}],["mboga","vegetables",{nounClass:"9/10"}]], c("Food varies by place","🍚","Swahili food vocabulary spans coastal, inland, and urban contexts.","Food")],
    ["Drinks", "🥤", [["maji","water",{nounClass:"6"}],["chai","tea",{nounClass:"9/10"}],["kahawa","coffee",{nounClass:"9/10"}],["Ninaomba maji.","I would like water."]], c("Polite requests","🥤","Ninaomba is a useful courteous frame for requesting something.","Etiquette")],
    ["At a Restaurant", "🍽️", [["mgahawa","restaurant",{nounClass:"3/4"}],["menyu","menu"],["Ninaomba chakula.","I would like food."],["Bili, tafadhali.","The bill, please."]], c("Eating out","🍽️","Restaurant vocabulary is especially useful in towns and travel settings.","Food")]
  ]),
  unit("home", "Home & Daily Life", "Describe rooms and household objects", "🏠", "#F6C445", [
    ["Around the House", "🏡", [["nyumba","house",{nounClass:"9/10"}],["chumba","room",{nounClass:"7/8",plural:"vyumba"}],["mlango","door",{nounClass:"3/4"}],["dirisha","window",{nounClass:"5/6"}]], c("Homes and households","🏡","Household vocabulary is taught without assuming every home has the same layout.","Home")],
    ["Furniture", "🪑", [["meza","table",{nounClass:"9/10"}],["kiti","chair",{nounClass:"7/8",plural:"viti"}],["kitanda","bed",{nounClass:"7/8",plural:"vitanda"}],["Kiti kiko hapa.","The chair is here."]], c("Agreement around objects","🪑","Location words change with noun class; beginners can first learn them in complete phrases.","Grammar")],
    ["Daily Routine", "🌅", [["kuamka","to wake up"],["kuoga","to bathe"],["kulala","to sleep"],["Ninaamka asubuhi.","I wake up in the morning."]], c("Daily rhythms","🌅","Routines differ, but time-of-day expressions travel well across everyday conversations.","Daily life")]
  ]),
  unit("descriptions", "Describing Things", "Use agreement in natural phrases", "✨", "#4338CA", [
    ["People", "🙂", [["mtoto mzuri","good child"],["watoto wazuri","good children"],["mtu mkubwa","big or older person"],["watu wazuri","good people"]], c("Agreement carries meaning","✨","Describing words often agree with the noun class instead of staying unchanged.","Grammar")],
    ["Objects", "📘", [["kitabu kizuri","good book"],["vitabu vizuri","good books"],["nyumba kubwa","big house"],["nguo mpya","new clothes"]], c("Learn phrases, not isolated endings","📘","Complete noun phrases let learners notice agreement gradually.","Learning")],
    ["Colours", "🎨", [["nyekundu","red"],["nyeupe","white"],["nyeusi","black"],["rangi","colour"]], c("Colour and agreement","🎨","Colour stems may take different agreement forms with different nouns.","Grammar")]
  ]),
  unit("questions", "Asking Questions", "Find out who, what, where, and why", "❓", "#C95D3A", [
    ["Who and What", "👤", [["nani","who"],["nini","what"],["Huyu ni nani?","Who is this?"],["Hii ni nini?","What is this?"]], c("Questions in context","❓","Question words are easiest to remember inside reusable sentences.","Communication")],
    ["Where and When", "📍", [["wapi","where"],["lini","when"],["Unaenda wapi?","Where are you going?"],["Utafika lini?","When will you arrive?"]], c("Planning together","📍","Where and when questions support travel, visits, and daily coordination.","Communication")],
    ["How and Why", "🤔", [["vipi","how"],["kwa nini","why"],["Habari gani?","What news?"],["Kwa nini umechelewa?","Why are you late?"]], c("Tone and intent","🤔","The same question can feel curious or demanding depending on situation and delivery.","Etiquette")]
  ]),
  unit("directions", "Places & Directions", "Navigate common places", "🗺️", "#24745B", [
    ["Useful Places", "🏥", [["soko","market",{nounClass:"5/6"}],["hospitali","hospital",{nounClass:"9/10"}],["shule","school",{nounClass:"9/10"}],["kituo","station",{nounClass:"7/8",plural:"vituo"}]], c("Public places","🏥","Place words become most useful when paired with a direction or transport question.","Places")],
    ["Which Way?", "↔️", [["kulia","right"],["kushoto","left"],["moja kwa moja","straight ahead"],["karibu","near"]], c("Clear directions","↔️","Repeat a direction back when accuracy matters.","Travel")],
    ["Ask for Help", "🧭", [["Soko liko wapi?","Where is the market?"],["Ni mbali?","Is it far?"],["Nenda moja kwa moja.","Go straight ahead."],["Geuka kushoto.","Turn left."]], c("Navigation etiquette","🧭","A greeting before requesting directions is often socially smoother.","Etiquette")]
  ]),
  unit("time", "Time & Dates", "Plan your day in Swahili", "🕐", "#F28C28", [
    ["Days Around Today", "📅", [["leo","today"],["kesho","tomorrow"],["jana","yesterday"],["wiki","week"]], c("Time in conversation","📅","Relative day words are common in plans and stories.","Time")],
    ["Parts of the Day", "🌄", [["asubuhi","morning"],["mchana","daytime or afternoon"],["jioni","evening"],["usiku","night"]], c("Day periods","🌄","Exact boundaries vary with context; learn these as practical conversational ranges.","Time")],
    ["Swahili Clock", "⏰", [["Saa mbili asubuhi.","Eight in the morning."],["Saa saba mchana.","One in the afternoon."],["Ni saa ngapi?","What time is it?"],["Tutakutana kesho.","We will meet tomorrow."]], c("The Swahili clock","⏰","Traditional Swahili time counts daylight from about 6 a.m.; saa mbili asubuhi corresponds to 8 a.m.","Time")]
  ]),
  unit("shopping", "Markets & Shopping", "Ask prices and make purchases", "🛒", "#F6C445", [
    ["Prices", "💰", [["Ni bei gani?","What is the price?"],["Ni shilingi ngapi?","How many shillings is it?"],["ghali","expensive"],["nafuu","inexpensive"]], c("Prices in context","💰","Currency and bargaining conventions vary by country, place, and seller.","Markets")],
    ["Buying", "🧺", [["Nataka hii.","I want this."],["Ninaomba kilo moja.","I would like one kilogram."],["Nitanunua.","I will buy."],["Asante.","Thank you."]], c("Courteous buying","🧺","A greeting and polite request matter as much as knowing the item name.","Etiquette")],
    ["Quantities", "⚖️", [["moja","one"],["mbili","two"],["kilo","kilogram"],["nusu","half"]], c("Measure carefully","⚖️","Quantities help make market exchanges precise.","Markets")]
  ]),
  unit("social", "Social Conversations", "Keep real conversations moving", "💬", "#4338CA", [
    ["Polite Words", "🙏🏾", [["tafadhali","please"],["asante","thank you"],["samahani","excuse me or sorry"],["karibu","welcome"]], c("Politeness is contextual","🙏🏾","These words are useful, but greetings and respectful attention also carry politeness.","Etiquette")],
    ["Repair the Conversation", "🔁", [["Sielewi.","I do not understand."],["Sema tena, tafadhali.","Say it again, please."],["Sema polepole.","Speak slowly."],["Unaweza kurudia?","Can you repeat?"]], c("Keep trying","🔁","Repair phrases give learners agency instead of ending the conversation.","Communication")],
    ["Agree and Respond", "✅", [["ndiyo","yes"],["hapana","no"],["sawa","okay"],["labda","maybe"]], c("Listen for context","✅","Short responses can sound different depending on tone and relationship.","Communication")]
  ]),
  unit("school-work", "Work & School", "Discuss study and employment", "🎓", "#C95D3A", [
    ["At School", "🏫", [["mwalimu","teacher",{nounClass:"1/2",plural:"walimu"}],["mwanafunzi","student",{nounClass:"1/2",plural:"wanafunzi"}],["kitabu","book",{nounClass:"7/8",plural:"vitabu"}],["darasa","classroom or class",{nounClass:"5/6"}]], c("Learning communities","🏫","School vocabulary and systems vary across countries and institutions.","Education")],
    ["At Work", "💼", [["kazi","work",{nounClass:"9/10"}],["ofisi","office",{nounClass:"9/10"}],["mfanyakazi","worker",{nounClass:"1/2"}],["Ninafanya kazi ofisini.","I work in an office."]], c("Many kinds of work","💼","Examples introduce language patterns without implying one standard career path.","Work")],
    ["Schedules", "🗓️", [["Ninaanza asubuhi.","I start in the morning."],["Ninamaliza jioni.","I finish in the evening."],["Nina mkutano leo.","I have a meeting today."],["Ninasoma kila siku.","I study every day."]], c("Schedules and routines","🗓️","Time phrases help connect classroom language to actual plans.","Work")]
  ]),
  unit("travel", "Travel & Transport", "Move around with confidence", "🚌", "#24745B", [
    ["Transport", "🚕", [["basi","bus",{nounClass:"5/6"}],["teksi","taxi",{nounClass:"9/10"}],["gari","car",{nounClass:"5/6"}],["treni","train",{nounClass:"9/10"}]], c("Regional transport","🚌","Available transport and everyday terms differ across East African cities and rural areas.","Travel")],
    ["Tickets and Stops", "🎫", [["tiketi","ticket",{nounClass:"9/10"}],["kituo cha basi","bus station"],["Basi linaondoka lini?","When does the bus leave?"],["Ninaomba tiketi moja.","I would like one ticket."]], c("Confirm the details","🎫","Repeat destinations and times when arranging transport.","Travel")],
    ["On the Way", "🛣️", [["Ninaenda mjini.","I am going to town."],["Tumefika.","We have arrived."],["Shuka hapa.","Get off here."],["Safari njema.","Have a good journey."]], c("Safari","🛣️","Safari means journey in Swahili; its global English use is narrower.","Language")]
  ]),
  unit("feelings", "Feelings & Emotions", "Say how you feel", "❤️", "#F28C28", [
    ["Happy and Sad", "🙂", [["Nina furaha.","I am happy."],["Nina huzuni.","I am sad."],["Nimefurahi.","I am pleased."],["Ukoje?","How are you?"]], c("Check in genuinely","🙂","A greeting exchange may include several questions about wellbeing before other business.","Relationships")],
    ["Body States", "😴", [["Nimechoka.","I am tired."],["Nina njaa.","I am hungry."],["Nina kiu.","I am thirsty."],["Nina baridi.","I feel cold."]], c("Speak clearly about needs","😴","Simple state phrases are practical during work, travel, and visits.","Health")],
    ["Care and Concern", "🤝", [["Pole.","I am sorry for your hardship."],["Usijali.","Do not worry."],["Ninakupenda.","I love you."],["Ninakujali.","I care about you."]], c("Pole is relational","🤝","Pole acknowledges another person's difficulty; it is broader than an apology for causing harm.","Relationships")]
  ]),
  unit("health", "Health & Emergencies", "Ask for help and describe symptoms", "🏥", "#F6C445", [
    ["At the Clinic", "🩺", [["daktari","doctor"],["dawa","medicine",{nounClass:"9/10"}],["Ninaumwa.","I am ill."],["Nahitaji daktari.","I need a doctor."]], c("Clear health language","🩺","Use simple direct phrases, and seek qualified help for medical decisions.","Health")],
    ["The Body", "🧍", [["kichwa","head",{nounClass:"7/8"}],["mkono","arm or hand",{nounClass:"3/4"}],["jicho","eye",{nounClass:"5/6",plural:"macho"}],["Kichwa kinauma.","The head hurts."]], c("Body and agreement","🧍","Body-part phrases reveal noun-class agreement naturally.","Health")],
    ["Urgent Help", "🚨", [["Msaada!","Help!"],["Piga simu.","Make a phone call."],["Ni dharura.","It is an emergency."],["Hospitali iko wapi?","Where is the hospital?"]], c("Emergency communication","🚨","Local emergency numbers and services must be confirmed for the country you are in.","Safety")]
  ]),
  unit("weather", "Weather & Environment", "Talk about conditions outside", "🌦️", "#4338CA", [
    ["Sun and Rain", "🌧️", [["jua","sun",{nounClass:"5/6"}],["mvua","rain",{nounClass:"9/10"}],["Kuna jua.","It is sunny."],["Mvua inanyesha.","It is raining."]], c("Weather varies widely","🌦️","Swahili-speaking regions include coasts, highlands, lake zones, and inland climates.","Environment")],
    ["Hot and Cold", "🌡️", [["joto","heat"],["baridi","cold"],["Kuna joto.","It is hot."],["Kuna baridi.","It is cold."]], c("Describe conditions","🌡️","Kuna provides a flexible way to say that a condition exists.","Grammar")],
    ["Wind and Sky", "💨", [["upepo","wind",{nounClass:"11/10"}],["wingu","cloud",{nounClass:"5/6",plural:"mawingu"}],["Upepo unavuma.","The wind is blowing."],["Kuna mawingu.","It is cloudy."]], c("Notice agreement","💨","Subject markers in weather sentences connect back to the noun class.","Grammar")]
  ]),
  unit("tenses", "Plans, Past & Future", "Move confidently across time", "⏳", "#C95D3A", [
    ["Present", "▶️", [["Ninasoma.","I am reading or studying."],["Anakula.","He or she is eating."],["Tunafanya kazi.","We are working."],["Wanaenda.","They are going."]], c("The -na- present","▶️","Subject marker + -na- + verb stem forms a common present construction.","Grammar")],
    ["Past", "⏪", [["Nilisoma.","I studied."],["Alikula.","He or she ate."],["Tulifanya kazi.","We worked."],["Walienda.","They went."]], c("The -li- past","⏪","The past marker -li- sits between the subject marker and verb stem.","Grammar")],
    ["Future and Perfect", "⏩", [["Nitasoma.","I will study."],["Tutakwenda.","We will go."],["Nimefika.","I have arrived."],["Wamekula.","They have eaten."]], c("Future and completed action","⏩","The -ta- future and -me- perfect help organize plans and recent outcomes.","Grammar")]
  ]),
  unit("natural-conversation", "Natural Conversation", "Combine skills in real situations", "🗣️", "#24745B", [
    ["Meet and Connect", "👋", [["Habari yako?","How are you?"],["Nzuri, asante.","Fine, thank you."],["Unaitwa nani?","What is your name?"],["Nimefurahi kukutana nawe.","I am happy to meet you."]], c("Greetings take time","👋","Greeting is a meaningful social exchange, not merely a quick preface.","Etiquette")],
    ["Make a Plan", "📆", [["Unafanya nini kesho?","What are you doing tomorrow?"],["Nitaenda sokoni.","I will go to the market."],["Tutakutana saa mbili.","We will meet at eight."],["Sawa, tutaonana.","Okay, see you."]], c("Check the clock system","📆","When clarity matters, confirm whether time is being expressed using Swahili or international clock conventions.","Time")],
    ["Solve a Problem", "🛠️", [["Samahani, nimepotea.","Excuse me, I am lost."],["Unaenda wapi?","Where are you going?"],["Ninaenda kituoni.","I am going to the station."],["Nitakusaidia.","I will help you."]], c("Ask clearly, respond kindly","🛠️","A greeting and direct explanation can make requests for help easier to understand.","Community")]
  ])
];
