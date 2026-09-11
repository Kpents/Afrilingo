import { zuluChallenge, zuluLesson } from "./lessonBuilder";

const makeUnit = (number, title, subtitle, topics) => {
  const lessons = topics.map(([slug, lessonTitle, emoji, words, cultureText]) =>
    zuluLesson({
      id: `zulu-${slug}`,
      title: lessonTitle,
      emoji,
      words,
      culture: [`${lessonTitle} in Context`, emoji, "Daily Life", cultureText],
      conversation: [
        ["Speaker", "🧑🏾", words[0][0], words[0][1]],
        ["Listener", "👩🏾", words[1][0], words[1][1]]
      ]
    })
  );
  const challengeWords = topics.map((topic) => topic[3][0]);
  lessons.push(zuluChallenge({
    id: `zulu-unit-${number}-challenge`,
    title: `${title} Challenge`,
    words: challengeWords,
    culture: [`${title} Milestone`, "⭐", "Milestone", `This checkpoint revisits the key expressions from ${title.toLowerCase()} before the next unit unlocks.`],
    conversation: [
      ["Thandi", "👩🏾", challengeWords[0][0], challengeWords[0][1]],
      ["Sipho", "👨🏾", challengeWords[1][0], challengeWords[1][1]]
    ]
  }));
  return { id: `zulu-unit-${number}`, title, subtitle, lessons };
};

const unitSpecs = [
  [8, "Asking for Help", "Clarify, repeat, and ask for assistance with confidence.", [
    ["help-understanding", "Understanding", "🧠", [["Angiqondi.", "I do not understand."], ["Ngiqonda kancane.", "I understand a little."], ["Yebo, ngiyaqonda.", "Yes, I understand."]], "Saying clearly what you understand helps a conversation continue without embarrassment."],
    ["help-language", "Language Help", "🗣️", [["Ukhuluma isiNgisi?", "Do you speak English?"], ["Angikhulumi isiZulu.", "I do not speak isiZulu."], ["Ngifunda isiZulu.", "I am learning isiZulu."]], "Language learners commonly combine a direct question with a short explanation of what they are learning."],
    ["help-repeat", "Repeat & Slow Down", "🐢", [["Ngicela uphinde.", "Please repeat."], ["Ngicela ukhulume kancane.", "Please speak slowly."], ["Kulungile.", "All right."]], "Ngicela frames a request politely; the following verb carries the requested action."],
    ["help-assistance", "Ask for Assistance", "🤝", [["Ngicela ungisize.", "Please help me."], ["Ungangisiza na?", "Can you help me?"], ["Ngibonga usizo lwakho.", "Thank you for your help."]], "Courteous requests and thanks recognize the time and effort of the person helping."]
  ]],
  [9, "Emergencies", "Use short, clear expressions when safety matters.", [
    ["emergency-alerts", "Urgent Alerts", "🚨", [["Ngisize!", "Help me!"], ["Umlilo!", "Fire!"], ["Shesha!", "Hurry!"]], "Emergency language favors short commands that can be understood quickly."],
    ["emergency-police", "Police & Safety", "👮🏾", [["Sikuphi isiteshi samaphoyisa?", "Where is the police station?"], ["Ngifuna ummeli.", "I want a lawyer."], ["Vimba, isela!", "Stop, thief!"]], "In a serious situation, repeat the key place or person you need and seek official help."],
    ["emergency-lost-items", "Lost & Stolen Items", "🧳", [["Ngilahlekile.", "I am lost."], ["Iwalethi yami ilahlekile.", "My wallet is lost."], ["Iphasiphoti yami ilahlekile.", "My passport is lost."]], "Naming the missing item precisely makes it easier for others to direct you to the right help."],
    ["emergency-boundaries", "Personal Boundaries", "✋🏾", [["Ungangithinti!", "Do not touch me!"], ["Ngiyeke!", "Leave me alone!"], ["Biza amaphoyisa!", "Call the police!"]], "Firm, direct language is appropriate when communicating an urgent safety boundary."]
  ]],
  [10, "Food & Restaurants", "Order food, drinks, and handle a simple restaurant visit.", [
    ["restaurant-table", "Getting a Table", "🍽️", [["Ngicela itafula labantu ababili.", "A table for two, please."], ["Ikhona indawo?", "Is there space?"], ["Nansi imenyu.", "Here is the menu."]], "Restaurant requests often begin with Ngicela, followed by the item or service wanted."],
    ["restaurant-order", "Ordering", "🥘", [["Ngicela ukudla.", "Food, please."], ["Ngicela amanzi.", "Water, please."], ["Ngicela itiye.", "Tea, please."]], "A concise Ngicela request is polite and natural when the context already makes the order clear."],
    ["restaurant-taste", "Taste & Preference", "😋", [["Kumnandi.", "It is delicious."], ["Ngithanda lokhu.", "I like this."], ["Angiyidli inyama.", "I do not eat meat."]], "Explaining a preference or restriction clearly helps a host or server respond appropriately."],
    ["restaurant-bill", "The Bill", "🧾", [["Ngicela ibhili.", "The bill, please."], ["Kubiza malini?", "How much does it cost?"], ["Nali ithiphu lakho.", "Here is your tip."]], "Tipping for good service is customary in many South African restaurants, though practices vary."]
  ]],
  [11, "Taxis & Money", "Navigate a taxi ride and basic money tasks.", [
    ["taxi-driver", "Talking to a Driver", "🚕", [["Mshayeli!", "Driver!"], ["Ngiyaphuthuma.", "I am in a hurry."], ["Ngicela ume lapha.", "Please stop here."]], "A clear destination and a courteous request make a taxi exchange easier."],
    ["taxi-route", "Routes & Stops", "🛣️", [["Ngifuna ukuya ehhotela.", "I want to go to the hotel."], ["Ngicela indlela enqamulelayo.", "Please take the shortest route."], ["Kuseduze.", "It is nearby."]], "Place names commonly follow e- or another locative form when expressing destination."],
    ["money-bank", "At the Bank", "🏦", [["Likuphi ibhange eliseduze?", "Where is the nearest bank?"], ["Ngifuna ukukhipha imali.", "I want to withdraw money."], ["Ibhange liseduze nehhotela.", "The bank is near the hotel."]], "Agreement changes the form of where: likuphi is used here with ibhange."],
    ["money-fare", "Paying the Fare", "💵", [["Ngikweleta malini?", "How much do I owe?"], ["Kubiza amarandi angamashumi amathathu.", "It costs thirty rand."], ["Ngiyabonga, mshayeli.", "Thank you, driver."]], "Confirming the fare aloud is useful in transport and market settings."]
  ]],
  [12, "Transport", "Talk about vehicles, journeys, and destinations.", [
    ["transport-types", "Ways to Travel", "🚌", [["ibhasi", "bus"], ["isitimela", "train"], ["imoto", "car"]], "Transport nouns belong to different noun classes, which becomes visible in their sentence agreement."],
    ["transport-going", "Where Are You Going?", "🧭", [["Uyaphi?", "Where are you going?"], ["Ngiya edolobheni.", "I am going to town."], ["Ngiya esiteshini.", "I am going to the station."]], "The locative e- form helps turn a place into a destination."],
    ["transport-distance", "Distance", "📍", [["Kuyibanga elingakanani?", "How far is it?"], ["Kuseduze.", "It is near."], ["Kukude.", "It is far."]], "Near and far are often expressed impersonally with ku-, referring to the situation or place."],
    ["transport-hire", "Hiring a Car", "🚗", [["Ngifuna ukuqasha imoto.", "I want to hire a car."], ["Ngilahlekile.", "I am lost."], ["Ibhasi likhona lapho.", "The bus is over there."]], "When lost, pair your destination with Ngifuna ukuya… so the helper knows where you need to go."]
  ]],
  [13, "Finding Your Way", "Follow and give essential directions.", [
    ["directions-forward", "Straight Ahead", "⬆️", [["Qhubekela phambili.", "Continue straight ahead."], ["Hamba uqonde.", "Go straight."], ["Yima lapha.", "Stop here."]], "Direction commands usually omit an explicit subject because the listener is understood."],
    ["directions-turns", "Left & Right", "↔️", [["Jikela kwesokunxele.", "Turn left."], ["Jikela kwesokudla.", "Turn right."], ["Ekhoneni.", "At the corner."]], "Left and right are easiest to learn in complete route instructions."],
    ["directions-places", "Location Clues", "🏙️", [["Eduze nehhotela.", "Near the hotel."], ["Phambi kwebhange.", "In front of the bank."], ["Ngemuva kwesitolo.", "Behind the shop."]], "Zulu locative expressions connect landmarks through forms meaning near, in front of, and behind."],
    ["directions-check", "Check the Route", "🗺️", [["Ikuphi indlela?", "Where is the road?"], ["Ngihamba ngendlela efanele?", "Am I going the right way?"], ["Ngiyabonga ngosizo.", "Thank you for the help."]], "Repeating the landmark and checking the route can prevent a misunderstanding."]
  ]],
  [14, "Touring", "Explore places and ask about sights.", [
    ["tour-office", "Tourist Information", "ℹ️", [["Likuphi ihhovisi lezivakashi?", "Where is the tourist office?"], ["Ngingathanda ukubona iminyuziyamu.", "I would like to see museums."], ["Ngicela ibalazwe.", "A map, please."]], "Ngingathanda is a courteous way to express what you would like to do."],
    ["tour-nature", "Natural Sights", "🏞️", [["ihlathi", "forest"], ["intaba", "mountain"], ["umfula", "river"]], "Landscape vocabulary carries place, travel, and heritage stories across KwaZulu-Natal and beyond."],
    ["tour-town", "Around Town", "🏛️", [["isonto", "church"], ["isibhedlela", "hospital"], ["imigwaqo emincane", "small streets"]], "A town tour often uses landmarks as practical anchors for both directions and local history."],
    ["tour-photo", "Taking a Photo", "📸", [["Ngicela usithathe isithombe.", "Please take our picture."], ["Mamatheka!", "Smile!"], ["Sesilungele.", "We are ready."]], "A polite request before taking or asking for a photograph respects the people involved."]
  ]],
  [15, "Socializing", "Join friendly conversations and celebrations.", [
    ["social-welcome", "Welcoming Someone", "🏠", [["Ngena!", "Come in!"], ["Ngiyajabula ukukubona.", "I am happy to see you."], ["Ube nosuku oluhle!", "Have a good day!"]], "Hospitality is expressed through welcome, conversation, and attention to a guest's comfort."],
    ["social-news", "Good News", "🎉", [["Nginezindaba ezinhle!", "I have good news!"], ["Halala!", "Congratulations!"], ["Ngikufisela inhlanhla!", "I wish you good luck!"]], "Halala is a lively congratulatory expression heard at achievements and celebrations."],
    ["social-birthday", "Birthdays", "🎂", [["Namuhla usuku lwami lokuzalwa.", "Today is my birthday."], ["Uneminyaka emingaki?", "How old are you?"], ["Ngineminyaka engamashumi amabili.", "I am twenty years old."]], "Age expressions use iminyaka, years, with number agreement."],
    ["social-feelings", "Warm Feelings", "💛", [["Ngiyakuthanda.", "I love you / I like you."], ["Nami ngiyakuthanda.", "I love you too."], ["Kuhle kakhulu!", "That is wonderful!"]], "Context and relationships shape whether ukuthanda communicates liking or love."]
  ]],
  [16, "At the Filling Station", "Handle fuel, service, and road questions.", [
    ["fuel-order", "Buying Fuel", "⛽", [["Ngicela uphethroli.", "Petrol, please."], ["Ngicela ugcwalise.", "Fill it up, please."], ["Faka uphethroli wamarandi angamakhulu amabili.", "Put in petrol for two hundred rand."]], "Fuel attendants provide full service at South African filling stations."],
    ["fuel-checks", "Vehicle Checks", "🔧", [["Ngicela uhlole uwoyela namanzi.", "Please check the oil and water."], ["Ngicela ufuthe amasondo.", "Please inflate the tyres."], ["Konke kulungile.", "Everything is all right."]], "A courteous request may cover extra checks such as oil, water, tyres, or the windscreen."],
    ["fuel-problems", "Car Problems", "🚘", [["Isondo aligcwele.", "The tyre is flat."], ["Injini ishisa ngokweqile.", "The engine is overheating."], ["Ngidinga usizo.", "I need help."]], "Naming the affected car part lets an attendant or mechanic understand the problem faster."],
    ["fuel-road", "Road Information", "🛣️", [["Likuphi igalaji eliseduze?", "Where is the nearest garage?"], ["Uyini umkhawulo wesivinini?", "What is the speed limit?"], ["Libiza malini ibalazwe lomgwaqo?", "How much is a road map?"]], "Road questions combine familiar location and price patterns with travel vocabulary."]
  ]],
  [17, "The Body", "Name major body parts in useful singular and plural forms.", [
    ["body-head", "Head & Face", "🙂", [["ikhanda", "head"], ["ubuso", "face"], ["amehlo", "eyes"]], "Body-part plurals often reveal a change of noun-class prefix, such as iso and amehlo."],
    ["body-upper", "Upper Body", "🫱🏾", [["intamo", "neck"], ["isifuba", "chest"], ["izandla", "hands"]], "Learning singular and plural body terms together prepares you for clear health descriptions."],
    ["body-lower", "Lower Body", "🦵🏾", [["umlenze", "leg"], ["idolo", "knee"], ["izinyawo", "feet"]], "Complete noun forms matter because the prefix is part of the word and its agreement pattern."],
    ["body-inside", "Inside the Body", "❤️", [["inhliziyo", "heart"], ["isisu", "stomach"], ["umhlane", "back"]], "These words appear frequently when describing pain or wellbeing."]
  ]],
  [18, "Health & Wellness", "Explain symptoms and seek basic care.", [
    ["health-feeling", "How You Feel", "🩺", [["Angizizwa kahle.", "I do not feel well."], ["Ngiyagula.", "I am ill."], ["Ngizizwa ngingcono.", "I feel better."]], "A direct statement about how you feel is the clearest start to asking for care."],
    ["health-pain", "Describing Pain", "🤕", [["Ikhanda lami libuhlungu.", "My head hurts."], ["Isisu sami sibuhlungu.", "My stomach hurts."], ["Umhlane wami ubuhlungu.", "My back hurts."]], "The descriptive form for pain changes to agree with the body-part noun."],
    ["health-care", "Getting Care", "🏥", [["Ngidinga udokotela.", "I need a doctor."], ["Sikuphi isibhedlela?", "Where is the hospital?"], ["Ngicela umuthi.", "Medicine, please."]], "In urgent health situations, use the place or professional you need as the key information."],
    ["health-recovery", "Rest & Recovery", "🛌", [["Phumula.", "Rest."], ["Phuza amanzi.", "Drink water."], ["Ululame masinyane.", "Get well soon."]], "Well-wishes and practical care instructions are common ways of supporting someone who is ill."]
  ]],
  [19, "Grocery Shopping", "Find staple foods and ask their prices.", [
    ["shop-find-food", "Finding Food", "🛒", [["Zikuphi izithelo?", "Where is the fruit?"], ["Lukuphi ubisi?", "Where is the milk?"], ["Iphi imifino?", "Where are the vegetables?"]], "Different forms of where agree with different noun classes; learn each question as a whole."],
    ["shop-staples", "Everyday Staples", "🍞", [["isinkwa", "bread"], ["inyama", "meat"], ["amaqanda", "eggs"]], "Food markets and small neighborhood spaza shops are important everyday shopping spaces."],
    ["shop-prices", "Asking Prices", "🏷️", [["Sibiza malini isinkwa?", "How much is the bread?"], ["Ibiza malini inyama?", "How much is the meat?"], ["Abiza malini amaqanda?", "How much are the eggs?"]], "The price verb changes its agreement to match the item being priced."],
    ["shop-checkout", "At the Checkout", "💳", [["Ngikhokha kuphi?", "Where do I pay?"], ["Ngidinga irisidi.", "I need a receipt."], ["Uyawamukela amakhadi?", "Do you accept cards?"]], "Confirming payment method and asking for a receipt are useful final steps in a purchase."]
  ]],
  [20, "Clothes Shopping", "Ask for clothes, sizes, and fit.", [
    ["clothes-buy", "Buying Clothes", "👕", [["Ngifuna ukuthenga izingubo.", "I want to buy clothes."], ["Ngingakulinganisa lokhu na?", "Can I try this on?"], ["Ngifuna usayizi wesithupha.", "I want size six."]], "Trying on clothes and confirming size avoids ambiguity before buying."],
    ["clothes-fit", "Fit & Size", "📏", [["Lokhu kukhulu kakhulu.", "This is too big."], ["Lokhu kuncane kakhulu.", "This is too small."], ["Lokhu kuyangilingana.", "This fits me."]], "The ku- agreement refers naturally to lokhu, this thing, in these fit descriptions."],
    ["clothes-value", "Price & Value", "💰", [["Kubiza kakhulu.", "It is too expensive."], ["Kushibhile.", "It is cheap."], ["Ngizothatha lokhu.", "I will take this."]], "A purchase exchange often moves from an evaluation of price to a clear decision."],
    ["clothes-colors", "Choosing a Color", "🎨", [["Ngithanda okubomvu.", "I like the red one."], ["Unakho okuluhlaza?", "Do you have a green one?"], ["Ngifuna okumnyama.", "I want the black one."]], "Color forms adapt when the noun is understood rather than repeated."]
  ]],
  [21, "Sport & Supporters", "Talk about matches, teams, and key moments.", [
    ["sport-venue", "Going to a Match", "🏟️", [["Ikuphi inkundla yebhola?", "Where is the soccer stadium?"], ["Ngingalithenga kuphi ithikithi?", "Where can I buy a ticket?"], ["Umdlalo uqala ngehora lesithupha.", "The match starts at six."]], "Match-day conversation combines directions, purchasing, and time."],
    ["sport-preference", "Favorite Sports", "⚽", [["Uthanda liphi iqembu?", "Which team do you support?"], ["Ngithanda ibhola.", "I like soccer."], ["Ngithanda ithenisi.", "I like tennis."]], "Sport is a lively conversation starter across South Africa."],
    ["sport-action", "On the Field", "🥅", [["Ufake igoli!", "He scored a goal!"], ["Uwise ibhola.", "He dropped the ball."], ["Uwele phansi.", "He fell down."]], "Short action descriptions help learners recognize the completed-action forms heard in commentary."],
    ["sport-cheers", "From the Stands", "📣", [["Igoli!", "Goal!"], ["Vula amehlo akho!", "Open your eyes!"], ["Waze wamuhle umdlalo!", "What a good match!"]], "Supporters use energetic exclamations, but respectful cheering keeps the match welcoming."]
  ]],
  [22, "Plans & Appointments", "Combine days, times, and future intentions.", [
    ["plans-today", "Today & Tomorrow", "📅", [["namuhla", "today"], ["kusasa", "tomorrow"], ["izolo", "yesterday"]], "Time words usually appear without an extra preposition in simple sentences."],
    ["plans-meeting", "Making a Plan", "🤝", [["Sizobonana kusasa.", "We will see each other tomorrow."], ["Uzofika nini?", "When will you arrive?"], ["Ngizofika ekuseni.", "I will arrive in the morning."]], "The zo future form connects a subject with an action that will happen later."],
    ["plans-clock", "Clock Time", "🕒", [["Yisikhathi sini?", "What time is it?"], ["Yihora lesithathu.", "It is three o'clock."], ["Ngizofika ngehora lesine.", "I will arrive at four o'clock."]], "Clock-time expressions commonly use ihora, hour, with an agreeing number form."],
    ["plans-days", "Days of the Week", "🗓️", [["uMsombuluko", "Monday"], ["uLwesihlanu", "Friday"], ["iSonto", "Sunday"]], "Day names are written with their noun prefixes and often carry clues to traditional counting of the week."]
  ]],
  [23, "Weather & Nature", "Discuss conditions and make simple weather plans.", [
    ["weather-basic", "Today's Weather", "☀️", [["Kuyashisa.", "It is hot."], ["Kuyabanda.", "It is cold."], ["Liyana.", "It is raining."]], "Weather expressions are often impersonal, using ku- or a weather verb without naming an actor."],
    ["weather-sky", "Sky & Wind", "🌬️", [["Kunomoya.", "It is windy."], ["Kunamafu.", "It is cloudy."], ["Ilanga liyakhanya.", "The sun is shining."]], "Conditions may be expressed through there-is constructions or agreement with a named noun such as ilanga."],
    ["weather-seasons", "Seasons", "🌦️", [["ihlobo", "summer"], ["ubusika", "winter"], ["intwasahlobo", "spring"]], "Southern African seasonal patterns shape farming, travel, clothing, and celebrations."],
    ["weather-plan", "Weather Plans", "☂️", [["Thatha isambulela.", "Take an umbrella."], ["Gqoka ijazi.", "Wear a coat."], ["Namuhla kuyabanda.", "Today it is cold."]], "Weather advice often uses a direct command followed by a reason or condition."]
  ]],
  [24, "Home & Daily Routine", "Describe common places and actions at home.", [
    ["home-rooms", "Around the Home", "🏠", [["ikhishi", "kitchen"], ["igumbi lokulala", "bedroom"], ["indlu yokugezela", "bathroom"]], "Compound place names often describe a room by the action associated with it."],
    ["routine-morning", "Morning Routine", "🌅", [["Ngiyavuka.", "I wake up."], ["Ngiyageza.", "I wash."], ["Ngidla ukudla kwasekuseni.", "I eat breakfast."]], "The present long form with -ya- is natural when the action is not followed by an object inside the same phrase."],
    ["routine-evening", "Evening Routine", "🌙", [["Ngibuyela ekhaya.", "I return home."], ["Ngipheka ukudla.", "I cook food."], ["Ngiyalala.", "I sleep / go to bed."]], "A sequence of short first-person verbs makes an everyday routine easy to narrate."],
    ["home-tasks", "Household Tasks", "🧹", [["Ngiyahlanza.", "I clean."], ["Ngigeza izitsha.", "I wash the dishes."], ["Ngivula iwindi.", "I open the window."]], "Object words follow the verb, while the first-person subject remains carried by ngi-. "]
  ]],
  [25, "Polite Requests", "Make courteous requests in everyday settings.", [
    ["request-items", "Requesting Things", "🙏🏾", [["Ngicela amanzi.", "Water, please."], ["Ngicela ithikithi.", "A ticket, please."], ["Ngicela irisidi.", "A receipt, please."]], "IsiZulu communicates please through the act of requesting with Ngicela rather than a separate please word."],
    ["request-actions", "Requesting Actions", "🤲🏾", [["Ngicela uhlale phansi.", "Please sit down."], ["Ngicela uvule umnyango.", "Please open the door."], ["Ngicela ulinde.", "Please wait."]], "In a polite request, the requested verb commonly ends in -e."],
    ["request-permission", "Asking Permission", "🚪", [["Ngingangena?", "May I come in?"], ["Ngingahlala lapha?", "May I sit here?"], ["Ngingakubuza?", "May I ask you?"]], "Nginga- is a useful pattern for asking whether you may do something."],
    ["request-response", "Responding Politely", "✅", [["Kulungile.", "All right."], ["Yebo, ungangena.", "Yes, you may come in."], ["Ngiyaxolisa, ngeke.", "I am sorry, no / it will not be possible."]], "A respectful refusal can begin with an apology before giving the negative response."]
  ]],
  [26, "Connected Conversations", "Link ideas and sustain a longer exchange.", [
    ["connect-and-but", "And & But", "🔗", [["futhi", "and / again"], ["kodwa", "but"], ["ngoba", "because"]], "Connectors turn separate memorized phrases into explanations and stories."],
    ["connect-reasons", "Giving Reasons", "💭", [["Ngifunda isiZulu ngoba ngiyasithanda.", "I learn isiZulu because I like it."], ["Ngiyahamba ngoba sekwephuzile.", "I am leaving because it is late."], ["Ngifuna ukuya kodwa ngiyasebenza.", "I want to go, but I am working."]], "Ngoba introduces a reason, while kodwa marks a contrast."],
    ["connect-opinions", "Sharing an Opinion", "💬", [["Ngicabanga ukuthi kuhle.", "I think that it is good."], ["Ngiyavuma.", "I agree."], ["Angivumi.", "I disagree."]], "Direct disagreement can be softened through tone and a brief explanation."],
    ["connect-followup", "Follow-up Questions", "❔", [["Usho ukuthini?", "What do you mean?"], ["Bese kwenzekani?", "Then what happened?"], ["Kunjalo yini?", "Is that so?"]], "Follow-up questions show attention and invite the speaker to continue."]
  ]],
  [27, "Culture & Community", "Practice respectful language around community life.", [
    ["culture-respect", "Respectful Address", "🤝", [["Sawubona, Baba.", "Hello, Sir / Father."], ["Sawubona, Mama.", "Hello, Ma'am / Mother."], ["Sanibonani, bakithi.", "Greetings, everyone / my people."]], "Kinship terms may function as respectful social address beyond a literal nuclear-family relationship."],
    ["culture-ubuntu", "Ubuntu", "🌍", [["Ubuntu", "humanity toward others"], ["Umuntu ngumuntu ngabantu.", "A person is a person through other people."], ["Siyabambisana.", "We help one another."]], "Ubuntu emphasizes personhood formed through relationships, responsibility, and mutual recognition."],
    ["culture-hosting", "Hosting & Sharing", "🍲", [["Wamukelekile.", "You are welcome."], ["Ngena, uhlale phansi.", "Come in and sit down."], ["Masidle.", "Let us eat."]], "Welcoming a guest commonly includes greeting, offering a place to sit, and sharing refreshments or food."],
    ["culture-celebrate", "Celebration", "🎊", [["Halala!", "Congratulations!"], ["Siyajabula.", "We are happy."], ["Asigubhe!", "Let us celebrate!"]], "Collective forms fit occasions where joy and achievement are shared by a family or community."]
  ]],
  [28, "Zulu Capstone", "Bring the full course together in practical scenarios.", [
    ["capstone-introduce", "Meet Someone", "👋", [["Sawubona, igama lami nguThandi.", "Hello, my name is Thandi."], ["Ngivela eThekwini.", "I come from Durban."], ["Ngiyajabula ukukwazi.", "I am pleased to meet you."]], "A confident introduction combines greeting, identity, origin, and a warm closing."],
    ["capstone-navigate", "Navigate the City", "🧭", [["Ngilahlekile, ngicela ungisize.", "I am lost; please help me."], ["Likuphi ibhange eliseduze?", "Where is the nearest bank?"], ["Qhubekela phambili.", "Continue straight ahead."]], "Real navigation requires both asking for help and recognizing a short direction in reply."],
    ["capstone-shop", "Complete a Purchase", "🛍️", [["Kubiza malini lokhu?", "How much does this cost?"], ["Kushibhile.", "It is cheap."], ["Ngizothatha lokhu, ngiyabonga.", "I will take this, thank you."]], "A complete shopping exchange moves from price to evaluation, decision, and thanks."],
    ["capstone-connect", "Keep Talking", "🌟", [["Ngifunda isiZulu ngoba ngiyasithanda.", "I learn isiZulu because I like it."], ["Ngicela ukhulume kancane.", "Please speak slowly."], ["Sizobonana kusasa!", "We will see each other tomorrow!"]], "Fluency grows through strategies: explain your motivation, ask for clarity, and make plans to speak again."]
  ]]
];

export const zuluExtendedUnits = unitSpecs.map(([number, title, subtitle, topics]) => makeUnit(number, title, subtitle, topics));
