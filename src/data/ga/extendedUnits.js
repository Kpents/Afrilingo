import { gaUnit } from "./lessonBuilder";

const C = {
  people: ["Ga family words", "👨‍👩‍👧", "Community", "Family vocabulary helps learners speak respectfully and clearly about relationships."],
  home: ["Everyday life at home", "🏠", "Daily life", "Home expressions connect language practice to familiar daily routines."],
  food: ["Markets and meals", "🍲", "Food", "Ga food and market vocabulary reflects everyday life in Accra and surrounding communities."],
  travel: ["Moving around Accra", "🚕", "Places", "Clear questions and landmarks make travel conversations more practical."],
  talk: ["Natural conversation", "💬", "Expressions", "Short, reusable expressions make real conversations easier to enter."],
};

const specs = [
  ["ga-unit-3", "Introducing Yourself", "Share names, origins, and simple personal details.", "🙋🏾", "#4338CA", [
    ["Names", [["Te atsɛɔ bo tɛŋŋ?", "What is your name?"], ["Atsɛɔ mi Tete.", "My name is Tete."], ["Ole mi lo?", "Do you know me?"]]],
    ["Where You Come From", [["Nɛgbɛ ojɛ?", "Where do you come from?"], ["Mijɛ Odɔkɔɔ.", "I come from Odorkor."], ["Gbɔ ji mi.", "I am a stranger."]]],
    ["Learning Ga", [["Miikasɛ Ga.", "I am learning Ga."], ["Mileee.", "I do not know."], ["Minuuu shishi.", "I do not understand."]]]]],
  ["ga-unit-4", "Everyday Actions", "Use high-frequency actions in daily exchanges.", "🚶🏾", "#24745B", [
    ["Come and Go", [["Ba biɛ.", "Come here."], ["Nɛgbɛ oyaa?", "Where are you going?"], ["Miiya shia.", "I am going home."]]],
    ["Speak Clearly", [["Wiemɔ ekɔŋŋ.", "Say it again."], ["Wiemɔ bɛlɛoo.", "Speak slowly."], ["Sha ohe.", "Hurry up."]]],
    ["At Home", [["Ŋa shinaa lɛ.", "Shut the door."], ["Gbɛlɛmɔ samflɛ lɛ.", "Open the window."], ["Fo oŋɛ hu.", "Wash your hands too."]]]]],
  ["ga-unit-5", "People & Family", "Talk about close and extended family.", "👨‍👩‍👧", "#C95D3A", [
    ["Parents", [["Tsɛ", "father"], ["Nyɛ", "mother"], ["Fɔlɔ", "parent"]]],
    ["Siblings", [["Nyɛmi nuu", "brother"], ["Nyɛmi yoo", "sister"], ["Nyɛmimɛi abii", "cousins"]]],
    ["Children and Elders", [["Bi", "child"], ["Biyoo", "daughter"], ["Nii", "grandfather"]]]]],
  ["ga-unit-6", "Food & Drink", "Name staple foods and handle simple meal talk.", "🍲", "#F28C28", [
    ["Staples", [["Niyenii", "food"], ["Nu", "water"], ["Omɔ", "rice"]]],
    ["Produce", [["Akwadu", "banana"], ["Akutu", "orange"], ["Amadaa", "plantain"]]],
    ["Kitchen Words", [["Kpata", "kitchen"], ["Awale", "spoon"], ["Diishi", "dish"]]]]],
  ["ga-unit-7", "Home & Daily Life", "Navigate rooms, objects, and routines.", "🏠", "#F6C445", [
    ["Rooms", [["Shia", "house"], ["Pia", "bedroom"], ["Tsu", "room"]]],
    ["Furniture", [["Saa", "bed"], ["Sɛi", "chair"], ["Okpɔlɔ", "table"]]],
    ["Useful Objects", [["Shinaa", "door"], ["Samflɛ", "window"], ["Samfɛɛ", "key"]]]]],
  ["ga-unit-8", "Describing Things", "Use colours and simple descriptions.", "🎨", "#4338CA", [
    ["Colours I", [["Tsuru", "red"], ["Yɛŋ", "white"], ["Diŋ", "black"]]],
    ["Colours II", [["Bluu", "blue"], ["Eŋɔli", "green"], ["Wufɔ", "yellow"]]],
    ["Useful Descriptions", [["Ghana yɛ fɛo.", "Ghana is beautiful."], ["Ebɛŋkɛ", "It is near."], ["Ejɛkɛ", "It is far."]]]]],
  ["ga-unit-9", "Asking Questions", "Ask who, what, and where naturally.", "❓", "#C95D3A", [
    ["What", [["Mɛni nɛ?", "What is this?"], ["Mɛni otao?", "What do you want?"], ["Mɛni ekasɛɔ?", "What is he or she studying?"]]],
    ["Who", [["Namɔ otao?", "Whom do you want?"], ["Namɔ ji otsɔɔlɔ?", "Who is the teacher?"], ["Ole mi lo?", "Do you know me?"]]],
    ["Where", [["Nɛgbɛ bo yɛɔ?", "Where are you?"], ["Nɛgbɛ oyaa?", "Where are you going?"], ["Nɛgbɛ ojɛ?", "Where do you come from?"]]]]],
  ["ga-unit-10", "Places & Directions", "Ask for and follow directions.", "🗺️", "#24745B", [
    ["Route Words", [["Gbɛ", "road"], ["Oshigenti", "street"], ["Nanegbɛ", "path"]]],
    ["Direction", [["Abɛku", "left"], ["Ninejurɔ", "right"], ["Hie tɛɛ", "straight ahead"]]],
    ["Finding the Way", [["Yaa ohie tɛɛ.", "Go straight ahead."], ["Midu gbɛ.", "I have lost the way."], ["Olajɛ gbɛ lɛ.", "You have missed the way."]]]]],
  ["ga-unit-11", "Time & Dates", "Talk about when everyday events happen.", "🕒", "#F28C28", [
    ["Today and Tomorrow", [["Ŋmɛnɛ", "today"], ["Wɔ", "tomorrow"], ["Leebi", "morning"]]],
    ["Plans in Time", [["Maya Kumase wɔ.", "I shall go to Kumasi tomorrow."], ["Maku misɛɛ Shɔ.", "I shall return on Wednesday."], ["Misɛɛ etsɛŋ.", "I will not be long."]]],
    ["Daily Timing", [["Leebi niyeni", "breakfast"], ["Ani afee leebi niyeni kralo?", "Is breakfast ready?"], ["Ŋmɛlɛ", "time or hour"]]]]],
  ["ga-unit-12", "Markets & Shopping", "Buy food and ask about prices.", "🛒", "#F6C445", [
    ["At the Shop", [["Shwapo", "shop"], ["Mɛni otao ohɛ?", "What would you like to buy?"], ["Ohaa bodobodo lo?", "Do you sell bread?"]]],
    ["At the Market", [["Jara", "market"], ["Enyie ahɔɔ enɛ?", "How much is this?"], ["Nɛgbɛ ahɔɔ aduawai yɛ?", "Where are fruits sold?"]]],
    ["Market Foods", [["Bodobodo", "bread"], ["Ŋkatie", "groundnut"], ["Ameo", "tomato"]]]]],
  ["ga-unit-13", "Social Conversations", "Keep friendly everyday exchanges moving.", "💬", "#C95D3A", [
    ["Checking In", [["Te oyɔɔ tɛŋŋ?", "How are you?"], ["Miyɛ jogbaŋŋ.", "I am fine."], ["Miiherɛ bo.", "Welcome."]]],
    ["Polite Repair", [["Ofaine", "Please or excuse me"], ["Wiemɔ ekɔŋŋ.", "Say it again."], ["Minuuu shishi.", "I do not understand."]]],
    ["Goodbyes", [["Yaaba jogbaŋŋ.", "Goodbye."], ["Wɔ jogbaŋŋ.", "Good night."], ["Oyiwaladɔŋŋ.", "Thank you."]]]]],
  ["ga-unit-14", "Work & School", "Handle basic classroom and work talk.", "🏫", "#4338CA", [
    ["School", [["Skul", "school"], ["Otsɔɔlɔ", "teacher"], ["Wolo", "book"]]],
    ["Learning", [["Wɔkasɛɔ nibii pii.", "We learn many subjects."], ["Mɛni ekasɛɔ?", "What is he or she studying?"], ["Ŋmaa ofo shi.", "Write it down."]]],
    ["Work", [["Nitsumɔ", "work"], ["Maya nitsumɔ.", "I shall go to work."], ["Oninmaatsɔ", "pen"]]]]],
  ["ga-unit-15", "Travel & Transport", "Use transport and journey vocabulary.", "🚕", "#24745B", [
    ["Transport", [["Oketeke", "train"], ["Tsɔne", "lorry or vehicle"], ["Gbefãa", "travelling"]]],
    ["At the Station", [["Nɛgbɛ tsɔnemaamɔhe lɛ yɛɔ?", "Where is the lorry station?"], ["Enyie ji bɔ ni ahɛɔ?", "What is the fare?"], ["Gbefãa kotoku", "travel bag"]]],
    ["The Journey", [["Maya Kumase wɔ.", "I shall go to Kumasi tomorrow."], ["Miiya Wiejaŋ.", "I am going to Weija."], ["Yaaba jogbaŋŋ.", "Goodbye."]]]]],
  ["ga-unit-16", "Feelings & Emotions", "Express common physical and emotional states.", "❤️", "#C95D3A", [
    ["Needs", [["Kumai miiye mi.", "I am thirsty."], ["Hɔmɔ miiye mi.", "I am hungry."], ["Wɔ miiye mi.", "I am sleepy."]]],
    ["Strong Feelings", [["Mimli efu.", "I am angry."], ["Miishe gbeyei.", "I am afraid."], ["Mihao.", "I am worried."]]],
    ["Energy", [["Etɔ mi.", "I am tired."], ["Miiye oyai.", "I am in a hurry."], ["Miyɛ jogbaŋŋ.", "I am fine."]]]]],
  ["ga-unit-17", "Health & Emergencies", "Explain common symptoms and seek care.", "🏥", "#F28C28", [
    ["Getting Help", [["Helatsamɔhe", "hospital"], ["Datɛ", "doctor"], ["Tsofa", "medicine"]]],
    ["Feeling Ill", [["Mihe miiye.", "I am ill."], ["Mihe miiye waa diɛŋtsɛ.", "I am seriously ill."], ["Miiwɔlɔ.", "I have a cough."]]],
    ["Pain and Recovery", [["Miyitso miigba mi.", "I have a headache."], ["Mimusum miikɔ mi.", "I have a stomachache."], ["Ena hewalɛ.", "He or she has recovered."]]]]],
  ["ga-unit-18", "Weather & Environment", "Describe surroundings with safe everyday language.", "🌦️", "#24745B", [
    ["Sky Colours", [["Bluu", "blue"], ["Lamululamululu", "grey"], ["Wufɔ", "yellow"]]],
    ["Near and Far", [["Ebɛŋkɛ.", "It is near."], ["Ejɛkɛ.", "It is far."], ["Hie tɛɛ", "straight ahead"]]],
    ["Around Ghana", [["Ghana yɛ fɛo.", "Ghana is beautiful."], ["Gbɛ", "road"], ["Jara", "market"]]]]],
  ["ga-unit-19", "Plans, Past & Future", "Connect actions across time without heavy terminology.", "📅", "#4338CA", [
    ["Tomorrow's Plan", [["Maya Kumase wɔ.", "I shall go to Kumasi tomorrow."], ["Maku misɛɛ Shɔ.", "I shall return on Wednesday."], ["Misɛɛ etsɛŋ.", "I will not be long."]]],
    ["What Happened", [["Odu gbɛ?", "Did you lose the way?"], ["Olajɛ gbɛ lɛ.", "You missed the way."], ["Ena hewalɛ.", "He or she recovered."]]],
    ["Current Actions", [["Miikasɛ Ga.", "I am learning Ga."], ["Miiya shia.", "I am going home."], ["Miiya Wiejaŋ.", "I am going to Weija."]]]]],
  ["ga-unit-20", "Stories & Natural Conversation", "Combine practical Ga in longer exchanges.", "📖", "#F6C445", [
    ["Meet Someone", [["Te atsɛɔ bo tɛŋŋ?", "What is your name?"], ["Nɛgbɛ ojɛ?", "Where do you come from?"], ["Mijɛ Odɔkɔɔ.", "I come from Odorkor."]]],
    ["Find a Place", [["Midu gbɛ.", "I have lost the way."], ["Yaa ohie tɛɛ.", "Go straight ahead."], ["Oyiwaladɔŋŋ.", "Thank you."]]],
    ["Keep Talking", [["Miikasɛ Ga.", "I am learning Ga."], ["Wiemɔ bɛlɛoo.", "Speak slowly."], ["Wiemɔ ekɔŋŋ.", "Say it again."]]]]]
];

export const gaExtendedUnits = specs.map(([id, title, description, emoji, color, lessons], unitIndex) => gaUnit({
  id, title, description, emoji, color,
  culture: unitIndex % 3 === 0 ? C.talk : unitIndex % 3 === 1 ? C.people : unitIndex % 3 === 2 ? C.home : C.food,
  lessons: lessons.map(([lessonTitle, words], i) => ({ title: lessonTitle, emoji: ["🗣️", "🧠", "✨"][i], words }))
}));
