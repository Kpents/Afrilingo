const C = (title, text, emoji = "🇧🇮", category = "Culture") => ({ title, text, emoji, category });
const O = (entries, answer, key) => [answer, ...entries.map(entry => entry[key]).filter(value => value !== answer)].slice(0, 4);

function lesson(id, title, words, culture, emoji = "💬", xp = 55) {
  const vocabulary = words.map(([native, english, linguistic = {}]) => ({ native, english, audio: "", linguistic }));
  const first = vocabulary[0];
  const second = vocabulary[1] || first;
  return {
    id, title, emoji, xp, vocabulary,
    conversation: [{ speaker: "A", native: first.native, english: first.english }, { speaker: "B", native: second.native, english: second.english }],
    cultureCard: { ...culture, id: `${id}-culture` },
    questions: [
      { id: "native-english", type: "native-to-english", prompt: `What does “${first.native}” mean?`, options: O(vocabulary, first.english, "english"), answer: first.english, explanation: `${first.native} means ${first.english}.` },
      { id: "english-native", type: "english-to-native", prompt: `Choose the Kirundi for “${second.english}”.`, options: O(vocabulary, second.native, "native"), answer: second.native, explanation: `${second.native} means ${second.english}.` },
      { id: "matching", type: "matching", prompt: "Match the Kirundi forms with their meanings.", pairs: vocabulary.map(({ native, english }) => ({ native, english })), explanation: "Review these core forms before moving on." }
    ]
  };
}

function unit([number, title, subtitle, emoji, words, culture]) {
  const names = ["Learn", "Use", "Connect"];
  const icons = ["🗣️", "🧠", "✨"];
  const lessons = [0, 3, 6].map((start, index) => lesson(`kirundi-unit-${number}-lesson-${index + 1}`, `${title}: ${names[index]}`, words.slice(start, start + 3), culture, icons[index], 55 + index * 5));
  return { id: `kirundi-unit-${number}`, title, subtitle, emoji, color: number % 2 ? "#C95D3A" : "#24745B", lessons: [...lessons, lesson(`kirundi-unit-${number}-challenge`, `${title} Challenge`, words, culture, "🏆", 90)] };
}

const curriculum = [
  [1, "Greetings", "Begin peaceful, respectful conversations.", "👋", [
    ["Amahoro.", "Hello or peace."], ["Mwaramutse.", "Good morning."], ["Mwiriwe.", "Good afternoon or evening."],
    ["Amakuru?", "How are things?"], ["Ni meza.", "They are good."], ["Urakomeye?", "Are you well?"],
    ["Ego, ndakomeye.", "Yes, I am well."], ["Murakoze.", "Thank you."], ["Ijoro ryiza.", "Good night."]
  ], C("Amahoro begins connection", "Amahoro—peace—is a widely used greeting and a warm way to open an interaction.", "🤝", "Etiquette")],
  [2, "Introductions", "Share your identity and where you live.", "🙋🏾", [
    ["Witwa nde?", "What is your name?"], ["Nitwa Aline.", "My name is Aline."], ["Uba hehe?", "Where do you live?"],
    ["Mba i Bujumbura.", "I live in Bujumbura."], ["Ukora iki?", "What do you do?"], ["Ndi umunyeshure.", "I am a student."],
    ["Ndiga Ikirundi.", "I study Kirundi."], ["Nezerewe kukumenya.", "I am pleased to meet you."], ["Sintahura.", "I do not understand."]
  ], C("Names and home", "Names, work, and home places are natural starting points for becoming acquainted.", "🪪", "Identity")],
  [3, "Numbers", "Count familiar objects and quantities.", "🔢", [
    ["rimwe", "one"], ["kabiri", "two"], ["gatatu", "three"], ["kane", "four"], ["gatanu", "five"],
    ["gatandatu", "six"], ["indwi", "seven"], ["umunani", "eight"], ["icenda", "nine"]
  ], C("Counting forms agree", "Number stems can take different prefixes according to the noun class being counted.", "🧩", "Grammar")],
  [4, "Family", "Talk about relatives and households.", "👨‍👩‍👧", [
    ["umuryango", "family"], ["mama", "mother"], ["papa", "father"], ["umwana", "child", { nounClass: "1/2", plural: "abana" }],
    ["abana", "children", { nounClass: "2", singular: "umwana" }], ["musaza", "brother of a woman"], ["mushiki", "sister of a man"],
    ["umugabo", "husband or man"], ["umugore", "wife or woman"]
  ], C("Kinship words carry perspective", "Some sibling terms reflect the speaker’s gender, so learn them in full personal phrases.", "🌳", "Family")],
  [5, "Everyday Actions", "Learn productive verb infinitives.", "🏃🏾", [
    ["kurya", "to eat", { verbStem: "-rya" }], ["kunywa", "to drink", { verbStem: "-nywa" }], ["kugenda", "to go", { verbStem: "-genda" }],
    ["kuza", "to come", { verbStem: "-za" }], ["gukora", "to work", { verbStem: "-kora" }], ["kwiga", "to study", { verbStem: "-iga" }],
    ["gusoma", "to read", { verbStem: "-soma" }], ["kuvuga", "to speak", { verbStem: "-vuga" }], ["gufasha", "to help", { verbStem: "-fasha" }]
  ], C("Infinitives show their class", "Dictionary-form verbs commonly begin with ku-, gu-, or kw-, reflecting noun class 15.", "🏃🏾", "Grammar")],
  [6, "Food & Drink", "Request everyday food and drink.", "🍲", [
    ["ibifungurwa", "food"], ["amazi", "water"], ["amata", "milk"], ["umukate", "bread"], ["umuceri", "rice"],
    ["ibiharage", "beans"], ["igitoke", "banana or plantain"], ["inyama", "meat"], ["Nshaka amazi.", "I want water."]
  ], C("Food and welcome", "Offering food or drink can express hospitality, while everyday dishes vary by household and region.", "🍲", "Food")],
  [7, "Home & Routine", "Name common spaces and daily actions.", "🏠", [
    ["inzu", "house"], ["umuryango", "door"], ["idirisha", "window"], ["imeza", "table"], ["intebe", "chair"],
    ["uburiri", "bed"], ["kuzinduka", "to wake early"], ["kwoga", "to wash or bathe"], ["kuryama", "to go to bed"]
  ], C("One word, multiple meanings", "Umuryango can mean a door or a family; context makes the intended meaning clear.", "🏠", "Language")],
  [8, "Descriptions", "Use adjective agreement in useful phrases.", "✨", [
    ["-nini", "big"], ["-to", "small"], ["-iza", "good or beautiful"], ["-shasha", "new"], ["-kuru", "old or important"], ["-re", "long or tall"],
    ["inzu nini", "big house"], ["umwana muto", "small child"], ["abantu beza", "good people"]
  ], C("Descriptions connect", "An adjective stem changes its prefix to agree with the class of the noun.", "🧩", "Grammar")],
  [9, "Questions", "Ask for people, places, and reasons.", "❓", [
    ["Nde?", "Who?"], ["Iki?", "What?"], ["Hehe?", "Where?"], ["Ryari?", "When?"], ["Kubera iki?", "Why?"],
    ["Gute?", "How?"], ["Bingahe?", "How many?"], ["Iki ni iki?", "What is this?"], ["Uja hehe?", "Where are you going?"]
  ], C("Greeting before asking", "A greeting before a practical question usually makes the exchange warmer and more respectful.", "❓", "Communication")],
  [10, "Places & Directions", "Navigate common destinations.", "🗺️", [
    ["isoko", "market"], ["ishure", "school"], ["ibitaro", "hospital"], ["gare", "bus station"], ["igisagara", "city"],
    ["iburyo", "right"], ["ibubamfu", "left"], ["Bandanya imbere.", "Continue straight ahead."], ["Ibitaro biri hehe?", "Where is the hospital?"]
  ], C("Confirm with landmarks", "Routes may be explained through known landmarks; repeat key details to confirm them.", "🗺️", "Travel")],
  [11, "Time & Calendar", "Connect plans to days and periods.", "🕐", [
    ["uno musi", "today"], ["ejo", "tomorrow or yesterday, by context"], ["mu gitondo", "in the morning"], ["ku murango", "during the daytime"],
    ["ku mugoroba", "in the evening"], ["mw'ijoro", "at night"], ["indwi", "week"], ["ukwezi", "month"], ["umwaka", "year"]
  ], C("Context resolves ejo", "Ejo may mean tomorrow or yesterday; tense and the surrounding conversation disambiguate it.", "📅", "Time")],
  [12, "Market & Shopping", "Ask prices and make purchases.", "🛒", [
    ["kugura", "to buy"], ["kugurisha", "to sell"], ["amahera", "money"], ["Ni angahe?", "How much is it?"], ["Nshaka iki.", "I want this."],
    ["Kirazimvye.", "It is expensive."], ["Gabanya igiciro.", "Reduce the price."], ["Ndagura iki.", "I am buying this."], ["Urakoze.", "Thank you."]
  ], C("Markets are social spaces", "Greeting and respectful clarification matter alongside price and quantity.", "🛒", "Markets")],
  [13, "Conversation Repair", "Keep talking when meaning is unclear.", "💬", [
    ["Ndakwinginze.", "Please."], ["Urakoze.", "Thank you."], ["Mbabarira.", "Sorry or excuse me."], ["Sintahura.", "I do not understand."],
    ["Subiramwo.", "Repeat."], ["Vuga bukebuke.", "Speak slowly."], ["Ego.", "Yes."], ["Oya.", "No."], ["Ni vyiza.", "It is good."]
  ], C("Clarification is competence", "Requesting repetition and slower speech keeps a real conversation moving.", "🔁", "Communication")],
  [14, "School & Work", "Discuss learning and occupations.", "🎓", [
    ["umwigisha", "teacher"], ["umunyeshure", "student"], ["igitabu", "book"], ["ishure", "school"], ["akazi", "work or job"],
    ["ibiro", "office"], ["Ndiga Ikirundi.", "I study Kirundi."], ["Nkora mu biro.", "I work in an office."], ["Ni umukozi.", "He or she is a worker."]
  ], C("Learning and work differ", "The lesson supplies language patterns without assuming one educational or professional experience.", "🎓", "Work")],
  [15, "Travel & Transport", "Manage practical journeys.", "🚌", [
    ["ibisi", "bus"], ["itagisi", "taxi"], ["imodoka", "car"], ["ipikipiki", "motorcycle"], ["itike", "ticket"],
    ["gare", "station"], ["Iyi bisi ija hehe?", "Where does this bus go?"], ["Nshaka itike imwe.", "I want one ticket."], ["Urugendo rwiza.", "Have a good journey."]
  ], C("Confirm journey details", "Repeat the destination, fare, and departure details before travelling.", "🚌", "Travel")],
  [16, "Feelings & Needs", "Express states and offer support.", "❤️", [
    ["Ndanezerewe.", "I am happy."], ["Ndababaye.", "I am sad."], ["Ndarushe.", "I am tired."], ["Ndashonje.", "I am hungry."],
    ["Mfise inyota.", "I am thirsty."], ["Mfise ubwoba.", "I am afraid."], ["Humura.", "Do not be afraid."], ["Ndagukunda.", "I love you."], ["Nzogufasha.", "I will help you."]
  ], C("Encouragement fits the need", "Humura reassures fear, while ihangane encourages someone facing difficulty.", "❤️", "Relationships")],
  [17, "Health & Safety", "Seek care and state urgent needs.", "🏥", [
    ["umuganga", "doctor"], ["umuforoma", "nurse"], ["umuti", "medicine"], ["Ndarwaye.", "I am ill."], ["Umutwe urambabaza.", "My head hurts."],
    ["Nshaka umuganga.", "I need a doctor."], ["Mfasha!", "Help me!"], ["Ibitaro biri hehe?", "Where is the hospital?"], ["Ni ivyihutirwa.", "It is an emergency."]
  ], C("Communication is not diagnosis", "These phrases support help-seeking; qualified care and interpretation remain essential.", "🩺", "Health")],
  [18, "Weather", "Talk about familiar conditions.", "🌦️", [
    ["izuba", "sun"], ["imvura", "rain"], ["umuyaga", "wind"], ["ubushuhe", "heat"], ["imbeho", "cold"],
    ["Imvura iragwa.", "It is raining."], ["Harashushe.", "It is hot."], ["Harakonje.", "It is cold."], ["Umuyaga urahuhuta.", "The wind is blowing."]
  ], C("Seasons shape routines", "Rain and dry seasons affect travel, farming, and daily plans across Burundi.", "🌦️", "Environment")],
  [19, "Present Actions", "Build sentences about actions now.", "▶️", [
    ["Ndarya.", "I am eating."], ["Urarya.", "You are eating."], ["Ararya.", "He or she is eating."], ["Turarya.", "We are eating."],
    ["Murarya.", "You all are eating."], ["Bararya.", "They are eating."], ["Ndakora.", "I am working."], ["Turiga.", "We are learning."], ["Baja kw'isoko.", "They go to the market."]
  ], C("The subject enters the verb", "Kirundi verbs carry subject agreement, often making a separate pronoun unnecessary.", "▶️", "Grammar")],
  [20, "Past & Future", "Move familiar actions through time.", "⏳", [
    ["Nagiye kw'isoko.", "I went to the market."], ["Yaje uno musi.", "He or she came today."], ["Bariye ibifungurwa.", "They ate food."],
    ["Nzogenda ejo.", "I will go tomorrow."], ["Azoza ejo.", "He or she will come tomorrow."], ["Tuzokora.", "We will work."],
    ["Naramubonye.", "I saw him or her."], ["Twarabonanye.", "We saw each other."], ["Bazogaruka.", "They will return."]
  ], C("Time sits inside the verb", "Subject and tense markers combine with the verb stem in a regular sequence.", "⏳", "Grammar")],
  [21, "Noun Classes", "Follow agreement across sentences.", "🧩", [
    ["umuntu", "person", { nounClass: "1", plural: "abantu" }], ["abantu", "people", { nounClass: "2", singular: "umuntu" }], ["Abantu barakora.", "People are working."],
    ["umutwe", "head", { nounClass: "3", plural: "imitwe" }], ["imitwe", "heads", { nounClass: "4", singular: "umutwe" }], ["Imitwe irababaza.", "The heads hurt."],
    ["igitabu", "book", { nounClass: "7", plural: "ibitabu" }], ["ibitabu", "books", { nounClass: "8", singular: "igitabu" }], ["Ibitabu ni vyiza.", "The books are good."]
  ], C("Prefixes organize agreement", "A noun’s class guides the forms of verbs, adjectives, possessives, and numbers around it.", "🧩", "Grammar")],
  [22, "Verb Building", "See the ordered parts inside verbs.", "🧠", [
    ["n-da-kor-a", "I am working"], ["u-ra-kor-a", "you are working"], ["ba-ra-kor-a", "they are working"],
    ["na-gi-ye", "I went"], ["n-zo-gend-a", "I will go"], ["tu-zo-kor-a", "we will work"],
    ["Ndamufasha.", "I am helping him or her."], ["Baradufasha.", "They are helping us."], ["Tuzobonana.", "We will see each other."]
  ], C("Build and blend", "Segmented forms expose the pattern for learning; ordinary Kirundi spelling joins the pieces.", "🧠", "Grammar")],
  [23, "Burundian Daily Life", "Connect actions into a daily routine.", "🇧🇮", [
    ["Nzinduka mu gitondo.", "I wake early in the morning."], ["Mfata ifunguro rya mu gitondo.", "I eat breakfast."], ["Nja ku kazi.", "I go to work."],
    ["Rimwe na rimwe nja kw'isoko.", "Sometimes I go to the market."], ["Ngura ibifungurwa.", "I buy food."], ["Ngaruka muhira.", "I return home."],
    ["Turafungura hamwe.", "We eat together."], ["Turaganira.", "We talk together."], ["Nryama mw'ijoro.", "I sleep at night."]
  ], C("Daily life has many forms", "This sequence is language practice, not one universal portrait of life in Burundi.", "🇧🇮", "Daily life")],
  [24, "Market & Travel Decisions", "Compare, choose, and confirm.", "🛒", [
    ["Iki ni angahe?", "How much is this?"], ["Kirazimvye cane.", "It is very expensive."], ["Nzogura kiriya.", "I will buy that one."],
    ["Iyi bisi ija i Gitega?", "Does this bus go to Gitega?"], ["Itike ni angahe?", "How much is the ticket?"], ["Nshaka itike imwe.", "I want one ticket."],
    ["Ihaguruka ryari?", "When does it leave?"], ["Subiramwo, ndakwinginze.", "Repeat, please."], ["Urakoze ku mfashanyo.", "Thank you for the help."]
  ], C("Confirm before acting", "Repeat important prices, routes, and times before making a decision.", "🚌", "Travel")],
  [25, "Health Conversations", "Combine symptoms and help-seeking.", "🩺", [
    ["Ndarwaye.", "I am ill."], ["Umutwe urambabaza.", "My head hurts."], ["Ndarushe cane.", "I am very tired."],
    ["Nshaka umuganga.", "I need a doctor."], ["Ibitaro biri hehe?", "Where is the hospital?"], ["Mfise umuti.", "I have medicine."],
    ["Mfasha!", "Help me!"], ["Ni ivyihutirwa.", "It is an emergency."], ["Hamagara ubu nyene.", "Call right now."]
  ], C("Critical meaning deserves care", "Use qualified interpretation for detailed medical communication whenever possible.", "🩺", "Health")],
  [26, "Respect & Social Nuance", "Choose forms for person and setting.", "🤝", [
    ["Amahoro?", "Hello, are you well?"], ["Amakuru yawe?", "How are you?"], ["Ni meza, urakoze.", "I am well, thank you."],
    ["Ndakwinginze.", "Please."], ["Mbabarira.", "Excuse me or forgive me."], ["N'akagaruka.", "See you later."],
    ["Ushaka kuvuga iki?", "What do you mean?"], ["Vuga bukebuke.", "Speak slowly."], ["Sigura, ndakwinginze.", "Explain, please."]
  ], C("Respect changes address", "Plural forms can serve as respectful singular address; relationship and setting guide the choice.", "🤝", "Language")],
  [27, "Story Workshop", "Follow and retell connected events.", "📖", [
    ["Nitwa Aline.", "My name is Aline."], ["Mba i Gitega.", "I live in Gitega."], ["Ndiga Ikirundi.", "I am learning Kirundi."],
    ["Nagiye kw'isoko.", "I went to the market."], ["Naguze ibifungurwa.", "I bought food."], ["Nagarutse muhira.", "I returned home."],
    ["Ubwa mbere nararamukije.", "First I greeted."], ["Hanyuma nabajije igiciro.", "Then I asked the price."], ["Mu nyuma narashimiye.", "Finally I gave thanks."]
  ], C("Stories connect patterns", "Sequencing familiar events helps turn vocabulary and grammar into connected communication.", "📖", "Storytelling")],
  [28, "Kirundi Mastery", "Bring the practical course together.", "🏆", [
    ["Nezerewe kukumenya.", "I am pleased to meet you."], ["Uvuga Ikirundi?", "Do you speak Kirundi?"], ["Mvuga Ikirundi gitoyi.", "I speak a little Kirundi."],
    ["Nja kuri gare.", "I am going to the station."], ["Nshaka itike imwe.", "I want one ticket."], ["Ihaguruka ryari?", "When does it leave?"],
    ["Sintahura.", "I do not understand."], ["Vuga bukebuke, ndakwinginze.", "Speak slowly, please."], ["Urakoze ku mfashanyo.", "Thank you for the help."]
  ], C("Completion begins deeper learning", "The path prepares learners to listen, notice local variation, and welcome correction from speakers.", "🏆", "Learning")]
];

export const kirundiUnits = curriculum.map(unit);

export const kirundiSourceNotes = {
  reviewStatus: "Units 1–28 are source-aligned; audio and final Burundian speaker editorial review are pending.",
  varietyNote: "Standard Kirundi is the baseline. Tone, register, agreement, and context-sensitive forms require progressive listening and speaker feedback.",
  sources: [
    { title: "FSI Kirundi Basic Course", url: "https://www.livelingua.com/fsi/FSI%20-%20Kirundi%20Basic%20Course%20-%20Student%20Text.pdf", coverage: "Dialogues, greetings, language repair, travel, tense, tone, agreement, and verb structure" },
    { title: "Kirundi Lessons by Betty Ellen Cox", url: "https://www.matana.de/index1.php?deep=&q=urundi", coverage: "Introductions, noun classes, agreement, adjectives, possession, verbs, time, and numbers" }
  ]
};

export const kirundiCourse = {
  id: "kirundi", language: "Kirundi", nativeName: "Ikirundi", flag: "🇧🇮", accent: "#C95D3A", sourceNotes: kirundiSourceNotes,
  phases: [
    { id: "foundations", title: "Foundations", units: kirundiUnits.slice(0, 7) },
    { id: "everyday-kirundi", title: "Everyday Kirundi", units: kirundiUnits.slice(7, 14) },
    { id: "independent-speaker", title: "Independent Speaker", units: kirundiUnits.slice(14, 21) },
    { id: "advanced-communication", title: "Advanced Communication", units: kirundiUnits.slice(21, 28) }
  ]
};
