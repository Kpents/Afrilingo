const culture = (title, text, emoji = "🇷🇼", category = "Culture") => ({ title, text, emoji, category });

const options = (entries, answer, key) => [answer, ...entries.map(entry => entry[key]).filter(value => value !== answer)].slice(0, 4);

function makeLesson(id, title, entries, cultureInfo, emoji = "💬", xp = 55) {
  const vocabulary = entries.map(([native, english, linguistic = {}]) => ({ native, english, audio: "", linguistic }));
  const first = vocabulary[0];
  const second = vocabulary[1] || first;
  return {
    id, title, emoji, xp, vocabulary,
    conversation: [
      { speaker: "A", native: first.native, english: first.english },
      { speaker: "B", native: second.native, english: second.english }
    ],
    cultureCard: { ...cultureInfo, id: `${id}-culture` },
    questions: [
      { id: "native-english", type: "native-to-english", prompt: `What does “${first.native}” mean?`, options: options(vocabulary, first.english, "english"), answer: first.english, explanation: `${first.native} means ${first.english}.` },
      { id: "english-native", type: "english-to-native", prompt: `Choose the Kinyarwanda for “${second.english}”.`, options: options(vocabulary, second.native, "native"), answer: second.native, explanation: `${second.native} means ${second.english}.` },
      { id: "matching", type: "matching", prompt: "Match the Kinyarwanda forms with their meanings.", pairs: vocabulary.map(({ native, english }) => ({ native, english })), explanation: "Review these core forms before moving on." }
    ]
  };
}

function makeUnit([number, title, subtitle, emoji, words, cultureInfo]) {
  const groups = [words.slice(0, 3), words.slice(3, 6), words.slice(6, 9)];
  const lessonNames = ["Learn", "Use", "Connect"];
  const lessonEmojis = ["🗣️", "🧠", "✨"];
  const lessons = groups.map((group, index) => makeLesson(
    `kinyarwanda-unit-${number}-lesson-${index + 1}`,
    `${title}: ${lessonNames[index]}`,
    group,
    cultureInfo,
    lessonEmojis[index],
    55 + index * 5
  ));
  return {
    id: `kinyarwanda-unit-${number}`,
    title, subtitle, emoji,
    color: number % 2 ? "#24745B" : "#F28C28",
    lessons: [
      ...lessons,
      makeLesson(`kinyarwanda-unit-${number}-challenge`, `${title} Challenge`, words.slice(0, 9), cultureInfo, "🏆", 90)
    ]
  };
}

const curriculum = [
  [1, "Greetings", "Begin warm, respectful conversations.", "👋", [
    ["Muraho.", "Hello."], ["Mwaramutse.", "Good morning."], ["Mwiriwe.", "Good afternoon or evening."],
    ["Amakuru?", "How are things?"], ["Ni meza.", "They are good."], ["Murabeho.", "Goodbye."],
    ["Murakoze.", "Thank you."], ["Murakaza neza.", "Welcome."], ["Ijoro ryiza.", "Good night."]
  ], culture("Greeting comes first", "A greeting normally opens an interaction before a request or transaction.", "🤝", "Etiquette")],
  [2, "Introductions", "Share your name, origin, and language goals.", "🙋🏾", [
    ["Witwa nde?", "What is your name?"], ["Nitwa Aline.", "My name is Aline."], ["Uturuka he?", "Where are you from?"],
    ["Nturuka i Kigali.", "I come from Kigali."], ["Ntuye i Huye.", "I live in Huye."], ["Ndi umunyeshuri.", "I am a student."],
    ["Niga Ikinyarwanda.", "I am learning Kinyarwanda."], ["Nishimiye kukumenya.", "I am pleased to meet you."], ["Sinumva.", "I do not understand."]
  ], culture("Names and place", "Names and home places are natural anchors for getting acquainted.", "🪪", "Identity")],
  [3, "Numbers", "Count and ask about quantities.", "🔢", [
    ["rimwe", "one"], ["kabiri", "two"], ["gatatu", "three"], ["kane", "four"], ["gatanu", "five"],
    ["gatandatu", "six"], ["karindwi", "seven"], ["umunani", "eight"], ["icyenda", "nine"]
  ], culture("Numbers agree", "Many number forms change with the noun class; these are common counting forms.", "🧩", "Grammar")],
  [4, "Family", "Talk about relatives and households.", "👨‍👩‍👧", [
    ["umuryango", "family"], ["mama", "mother"], ["papa", "father"],
    ["umwana", "child", { nounClass: "1/2", plural: "abana" }], ["abana", "children", { nounClass: "2", singular: "umwana" }], ["musaza", "brother of a woman"],
    ["mushiki", "sister of a man"], ["umugabo", "husband or man"], ["umugore", "wife or woman"]
  ], culture("Kinship is specific", "Some sibling terms depend on the speaker’s gender, so context matters.", "🌳", "Family")],
  [5, "Everyday Actions", "Use high-frequency verb infinitives.", "🏃🏾", [
    ["kurya", "to eat", { verbStem: "-rya" }], ["kunywa", "to drink", { verbStem: "-nywa" }], ["kugenda", "to go", { verbStem: "-genda" }],
    ["kuza", "to come", { verbStem: "-za" }], ["gukora", "to work", { verbStem: "-kora" }], ["kwiga", "to learn or study", { verbStem: "-iga" }],
    ["gusoma", "to read", { verbStem: "-soma" }], ["kuvuga", "to speak", { verbStem: "-vuga" }], ["gufasha", "to help", { verbStem: "-fasha" }]
  ], culture("The infinitive has a prefix", "Kinyarwanda dictionary-form verbs commonly begin with ku-, gu-, or kw-.", "🏃🏾", "Grammar")],
  [6, "Food & Drink", "Request familiar foods and drinks.", "🍲", [
    ["ibiryo", "food"], ["amazi", "water"], ["amata", "milk"], ["umugati", "bread"], ["umuceri", "rice"],
    ["ibishyimbo", "beans"], ["igitoki", "banana or plantain"], ["inyama", "meat"], ["Ndashaka amazi.", "I want water."]
  ], culture("Meals and hospitality", "Sharing food and welcoming guests are important, while dishes vary by family and region.", "🍲", "Food")],
  [7, "Home & Routine", "Name household spaces and daily actions.", "🏠", [
    ["inzu", "house"], ["urugi", "door"], ["idirishya", "window"], ["ameza", "table"], ["intebe", "chair"],
    ["uburiri", "bed"], ["kubyuka", "to wake up"], ["koga", "to wash or bathe"], ["kuryama", "to go to bed"]
  ], culture("Homes are diverse", "Household vocabulary should not be taken as one universal picture of Rwandan life.", "🏠", "Daily life")],
  [8, "Descriptions", "Describe people and objects with agreement.", "✨", [
    ["-nini", "big"], ["-to", "small"], ["-iza", "good or beautiful"], ["-shya", "new"], ["-shaje", "old"], ["-re", "long or tall"],
    ["inzu nini", "big house"], ["umwana muto", "small child"], ["abantu beza", "good people"]
  ], culture("Description follows agreement", "Adjective stems take prefixes that agree with the noun they describe.", "🧩", "Grammar")],
  [9, "Questions", "Ask clearly for useful information.", "❓", [
    ["Nde?", "Who?"], ["Iki?", "What?"], ["He?", "Where?"], ["Ryari?", "When?"], ["Kubera iki?", "Why?"],
    ["Gute?", "How?"], ["Angahe?", "How many?"], ["Iki ni iki?", "What is this?"], ["Urajya he?", "Where are you going?"]
  ], culture("Ask after greeting", "Beginning with a greeting makes practical questions more socially natural.", "❓", "Communication")],
  [10, "Places & Directions", "Find common destinations.", "🗺️", [
    ["isoko", "market"], ["ishuri", "school"], ["ibitaro", "hospital"], ["gare", "bus station"], ["umujyi", "city"],
    ["iburyo", "right"], ["ibumoso", "left"], ["Genda imbere.", "Go straight ahead."], ["Ibitaro biri he?", "Where is the hospital?"]
  ], culture("Landmarks help", "Directions are often confirmed through familiar landmarks as well as street names.", "🗺️", "Travel")],
  [11, "Time & Calendar", "Connect plans to days and times.", "🕐", [
    ["uyu munsi", "today"], ["ejo", "tomorrow or yesterday, by context"], ["mu gitondo", "in the morning"], ["ku manywa", "during the day"],
    ["nimugoroba", "in the evening"], ["nijoro", "at night"], ["icyumweru", "week"], ["ukwezi", "month"], ["umwaka", "year"]
  ], culture("Context resolves ejo", "Ejo can refer to tomorrow or yesterday; surrounding tense and context clarify it.", "📅", "Time")],
  [12, "Market & Shopping", "Ask prices and make simple purchases.", "🛒", [
    ["kugura", "to buy"], ["kugurisha", "to sell"], ["amafaranga", "money"], ["Ni angahe?", "How much is it?"], ["Ndashaka iki.", "I want this."],
    ["Birahenda.", "It is expensive."], ["Gabanya igiciro.", "Reduce the price."], ["Ndagura iki.", "I am buying this."], ["Murakoze.", "Thank you."]
  ], culture("Markets are conversations", "Greeting, clarification, and respectful negotiation make market interactions smoother.", "🛒", "Markets")],
  [13, "Conversation Repair", "Keep communicating when meaning is unclear.", "💬", [
    ["Nyabuneka.", "Please."], ["Murakoze.", "Thank you."], ["Mbabarira.", "Sorry or excuse me."], ["Sinumva.", "I do not understand."],
    ["Ongera uvuge.", "Say it again."], ["Vuga buhoro.", "Speak slowly."], ["Yego.", "Yes."], ["Oya.", "No."], ["Ni byiza.", "It is good."]
  ], culture("Repair is real fluency", "Asking for repetition is a normal communication strategy, not a failure.", "🔁", "Communication")],
  [14, "School & Work", "Discuss learning and occupations.", "🎓", [
    ["umwarimu", "teacher"], ["umunyeshuri", "student"], ["igitabo", "book"], ["ishuri", "school"], ["akazi", "work or job"],
    ["ibiro", "office"], ["Niga Ikinyarwanda.", "I study Kinyarwanda."], ["Nkora ku biro.", "I work at an office."], ["Ni umukozi.", "He or she is a worker."]
  ], culture("Learning and livelihoods", "The examples build useful language without assuming one educational or career path.", "🎓", "Work")],
  [15, "Travel & Transport", "Manage everyday journeys.", "🚌", [
    ["bisi", "bus"], ["tagisi", "taxi"], ["imodoka", "car"], ["moto", "motorcycle taxi"], ["itike", "ticket"],
    ["gare", "station"], ["Iyi bisi ijya he?", "Where does this bus go?"], ["Ndashaka itike imwe.", "I want one ticket."], ["Urugendo rwiza.", "Have a good journey."]
  ], culture("Moto travel", "Motorcycle taxis are common in Rwanda; use local safety guidance and agreed procedures.", "🏍️", "Travel")],
  [16, "Feelings & Needs", "Say how you feel and what you need.", "❤️", [
    ["Ndishimye.", "I am happy."], ["Ndababaye.", "I am sad."], ["Ndarushye.", "I am tired."], ["Ndashonje.", "I am hungry."],
    ["Mfite inyota.", "I am thirsty."], ["Mfite ubwoba.", "I am afraid."], ["Humura.", "Do not be afraid."], ["Ndagukunda.", "I love you."], ["Nzagufasha.", "I will help you."]
  ], culture("Comfort depends on context", "Humura reassures someone who is afraid; ihangane encourages endurance through difficulty.", "❤️", "Relationships")],
  [17, "Health & Safety", "Seek help and describe urgent needs.", "🏥", [
    ["muganga", "doctor"], ["umuforomo", "nurse"], ["umuti", "medicine"], ["Ndarwaye.", "I am ill."], ["Umutwe urandya.", "My head hurts."],
    ["Ndashaka muganga.", "I need a doctor."], ["Mfasha!", "Help me!"], ["Ibitaro biri he?", "Where is the hospital?"], ["Ni ubutabazi bwihutirwa.", "It is an emergency."]
  ], culture("Communication, not diagnosis", "These phrases can support help-seeking but do not replace qualified medical care or interpretation.", "🩺", "Health")],
  [18, "Weather", "Discuss everyday conditions.", "🌦️", [
    ["izuba", "sun"], ["imvura", "rain"], ["umuyaga", "wind"], ["ubushyuhe", "heat"], ["ubukonje", "cold"],
    ["Imvura iragwa.", "It is raining."], ["Harashyushye.", "It is hot."], ["Harakonje.", "It is cold."], ["Umuyaga urahuha.", "The wind is blowing."]
  ], culture("Land of a thousand hills", "Elevation and season shape local weather; conditions vary across Rwanda.", "⛰️", "Environment")],
  [19, "Present Actions", "Build sentences about actions now.", "▶️", [
    ["Ndarya.", "I am eating."], ["Urarya.", "You are eating."], ["Ararya.", "He or she is eating."],
    ["Turarya.", "We are eating."], ["Murarya.", "You all are eating."], ["Bararya.", "They are eating."],
    ["Ndakora.", "I am working."], ["Turiga.", "We are learning."], ["Bajya ku isoko.", "They go to the market."]
  ], culture("Subjects live in the verb", "Subject markers attach to the verb, so a complete subject idea may be carried inside one word.", "▶️", "Grammar")],
  [20, "Past & Future", "Place familiar actions in time.", "⏳", [
    ["Nagiye ku isoko.", "I went to the market."], ["Yaje uyu munsi.", "He or she came today."], ["Bariye ibiryo.", "They ate food."],
    ["Nzagenda ejo.", "I will go tomorrow."], ["Azaza ejo.", "He or she will come tomorrow."], ["Tuzakora.", "We will work."],
    ["Naramubonye.", "I saw him or her."], ["Twarabonanye.", "We saw each other."], ["Bazagaruka.", "They will return."]
  ], culture("Time is built into verbs", "Tense markers combine with subject markers and the verb stem.", "⏳", "Grammar")],
  [21, "Noun Classes", "Track agreement across a sentence.", "🧩", [
    ["umuntu", "person", { nounClass: "1", plural: "abantu" }], ["abantu", "people", { nounClass: "2", singular: "umuntu" }], ["Abantu barakora.", "People are working."],
    ["umuti", "tree", { nounClass: "3", plural: "ibiti" }], ["ibiti", "trees", { nounClass: "4", singular: "umuti" }], ["Ibiti ni binini.", "The trees are big."],
    ["igitabo", "book", { nounClass: "7", plural: "ibitabo" }], ["ibitabo", "books", { nounClass: "8", singular: "igitabo" }], ["Ibitabo ni byiza.", "The books are good."]
  ], culture("Agreement creates connections", "Noun-class prefixes influence verbs, descriptions, numbers, and other words around the noun.", "🧩", "Grammar")],
  [22, "Verb Building", "Notice the ordered pieces inside verbs.", "🧠", [
    ["n-da-kor-a", "I am working"], ["u-ra-kor-a", "you are working"], ["ba-ra-kor-a", "they are working"],
    ["na-gi-ye", "I went"], ["n-za-gend-a", "I will go"], ["tu-za-kor-a", "we will work"],
    ["Ndamufasha.", "I am helping him or her."], ["Baradufasha.", "They are helping us."], ["Tuzabonana.", "We will see each other."]
  ], culture("Build, then blend", "Breaking verbs into learning chunks reveals patterns, though normal writing joins them together.", "🧠", "Grammar")],
  [23, "Rwandan Daily Life", "Connect familiar actions into a routine.", "🇷🇼", [
    ["Mbyuka mu gitondo.", "I wake up in the morning."], ["Mfata ifunguro rya mu gitondo.", "I eat breakfast."], ["Njya ku kazi.", "I go to work."],
    ["Rimwe na rimwe njya ku isoko.", "Sometimes I go to the market."], ["Ngura ibiryo.", "I buy food."], ["Ngaruka mu rugo.", "I return home."],
    ["Turarya hamwe.", "We eat together."], ["Turaganira.", "We talk together."], ["Nryama nijoro.", "I sleep at night."]
  ], culture("One routine, many lives", "This practice sequence is one possible day, not a universal description of Rwandan life.", "🇷🇼", "Daily life")],
  [24, "Market & Travel Decisions", "Compare, choose, and confirm details.", "🛒", [
    ["Iki ni angahe?", "How much is this?"], ["Birahenda cyane.", "It is very expensive."], ["Nzagura kiriya.", "I will buy that one."],
    ["Iyi bisi ijya i Musanze?", "Does this bus go to Musanze?"], ["Itike ni angahe?", "How much is the ticket?"], ["Ndashaka itike imwe.", "I want one ticket."],
    ["Irahaguruka ryari?", "When does it leave?"], ["Ongera uvuge, nyabuneka.", "Repeat, please."], ["Murakoze ku bufasha.", "Thank you for the help."]
  ], culture("Confirm before moving", "Repeat prices, destinations, and departure details before acting.", "🚌", "Travel")],
  [25, "Health Conversations", "Combine symptoms, needs, and directions.", "🩺", [
    ["Ndarwaye.", "I am ill."], ["Umutwe urandya.", "My head hurts."], ["Ndarushye cyane.", "I am very tired."],
    ["Ndashaka muganga.", "I need a doctor."], ["Ibitaro biri he?", "Where is the hospital?"], ["Mfite umuti.", "I have medicine."],
    ["Mfasha!", "Help me!"], ["Ni ubutabazi bwihutirwa.", "It is an emergency."], ["Hamagara nonaha.", "Call now."]
  ], culture("Confirm critical meaning", "For detailed care, use a qualified interpreter whenever possible.", "🩺", "Health")],
  [26, "Respect & Social Nuance", "Choose forms that fit the relationship.", "🤝", [
    ["Muraho neza?", "Hello, how are you?"], ["Amakuru yawe?", "How are you?"], ["Ni meza, murakoze.", "I am well, thank you."],
    ["Nyabuneka.", "Please."], ["Mbabarira.", "Excuse me or forgive me."], ["Murabeho.", "Goodbye."],
    ["Ushatse kuvuga iki?", "What do you mean?"], ["Vuga buhoro.", "Speak slowly."], ["Sobanura, nyabuneka.", "Explain, please."]
  ], culture("Singular and plural politeness", "Plural-address forms such as mura- are also commonly used for respectful singular address.", "🤝", "Language")],
  [27, "Story Workshop", "Follow and retell connected events.", "📖", [
    ["Nitwa Aline.", "My name is Aline."], ["Ntuye i Huye.", "I live in Huye."], ["Niga Ikinyarwanda.", "I am learning Kinyarwanda."],
    ["Nagiye ku isoko.", "I went to the market."], ["Naguze ibiryo.", "I bought food."], ["Nagarutse mu rugo.", "I returned home."],
    ["Mbere narasuhuje.", "First I greeted."], ["Hanyuma nabajije igiciro.", "Then I asked the price."], ["Amaherezo narashimiye.", "Finally I gave thanks."]
  ], culture("Stories join the patterns", "Sequencing familiar actions helps learners move from isolated phrases to connected speech.", "📖", "Storytelling")],
  [28, "Kinyarwanda Mastery", "Bring the full practical course together.", "🏆", [
    ["Nishimiye kukumenya.", "I am pleased to meet you."], ["Uvuga Ikinyarwanda?", "Do you speak Kinyarwanda?"], ["Mvuga Ikinyarwanda gake.", "I speak a little Kinyarwanda."],
    ["Njya kuri gare.", "I am going to the station."], ["Ndashaka itike imwe.", "I want one ticket."], ["Irahaguruka ryari?", "When does it leave?"],
    ["Sinumva.", "I do not understand."], ["Vuga buhoro, nyabuneka.", "Speak slowly, please."], ["Murakoze ku bufasha.", "Thank you for the help."]
  ], culture("The path opens a conversation", "Completing the course is a foundation for listening to speakers, noticing variation, and accepting correction.", "🏆", "Learning")]
];

export const kinyarwandaUnits = curriculum.map(makeUnit);

export const kinyarwandaSourceNotes = {
  reviewStatus: "Units 1–28 are source-aligned; audio and final Rwandan speaker editorial review are pending.",
  varietyNote: "Standard Kinyarwanda is the baseline. Register, agreement, and context-sensitive forms are introduced progressively.",
  sources: [
    { title: "Peace Corps Rwanda Kinyarwanda Language Lessons", url: "https://files.peacecorps.gov/multimedia/audio/languagelessons/rwanda/RW_Kinyarwanda_Language_Lessons.pdf", coverage: "Greetings, introductions, daily routines, work, transport, health, noun classes, verb forms, time, and cultural use" },
    { title: "Kinyarwanda Lessons by Betty Ellen Cox and Gakuba Faustin", url: "https://kinyarwanda.com/wp-content/uploads/2021/12/learn-kinyarwanda.pdf", coverage: "Noun classes, agreement, adjectives, possession, verbs, tense, negation, and numbers" }
  ]
};

export const kinyarwandaCourse = {
  id: "kinyarwanda",
  language: "Kinyarwanda",
  nativeName: "Ikinyarwanda",
  flag: "🇷🇼",
  accent: "#24745B",
  sourceNotes: kinyarwandaSourceNotes,
  phases: [
    { id: "foundations", title: "Foundations", units: kinyarwandaUnits.slice(0, 7) },
    { id: "everyday-kinyarwanda", title: "Everyday Kinyarwanda", units: kinyarwandaUnits.slice(7, 14) },
    { id: "independent-speaker", title: "Independent Speaker", units: kinyarwandaUnits.slice(14, 21) },
    { id: "advanced-communication", title: "Advanced Communication", units: kinyarwandaUnits.slice(21, 28) }
  ]
};
