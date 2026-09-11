import { twiUnit } from "./lessonBuilder";

const culture = {
  food:["Food in conversation","🍲","Food","Food vocabulary is most useful when tied to meals, hospitality, and real requests."],
  travel:["Finding your way","🗺️","Places","Direction phrases help learners move through real Ghanaian settings with confidence."],
  talk:["Keep the conversation going","💬","Expressions","Repair phrases let learners remain engaged even when they miss a word."],
  life:["Everyday Twi","🇬🇭","Daily life","Practical language grows through repeated use in ordinary social situations."],
};

const specs = [
  [5,"Food & Drink","Order, identify, and talk about everyday foods.","🍲","#F28C28",[
    ["Meals",[["Aduane","food"],["Anɔpa aduane","breakfast"],["Awia aduane","lunch"]]],
    ["Fruit & Produce",[["Ankaa","orange"],["Kwadu","banana"],["Aborɔbɛ","pineapple"]]],
    ["Staples",[["Nsuo","water"],["Paano","bread"],["Nsuomnam","fish"]]]]],
  [6,"Home & Daily Life","Use practical expressions for everyday routines.","🏠","#F6C445",[
    ["Daily Needs",[["Mepɛ sɛ medware.","I want to bathe."],["Ɛkɔm de me.","I am hungry."],["Nsukɔm de me.","I am thirsty."]]],
    ["Energy & Study",[["Mabrɛ.","I am tired."],["Ɛsɛ sɛ mesua adeɛ.","I need to study."],["Mepɛ sɛ mesi nneɛma.","I want to wash clothes."]]],
    ["Help at Home",[["Boa me.","Help me."],["Mente aseɛ.","I do not understand."],["Mennim.","I do not know."]]]]],
  [7,"Describing Things","Describe cost, quantity, and preference.","✨","#4338CA",[
    ["Cost",[["Ne boɔ yɛ den.","It is expensive."],["Ɛyɛ sɛn?","How much is it?"],["Ɛyɛ ahe?","How much is it?"]]],
    ["Preference",[["Mepɛ.","I like it."],["Mempɛ.","I do not like it."],["Merehwehwɛ.","I am looking for it."]]],
    ["Amount",[["Pii","a lot or many"],["Kakra","a little"],["Biara","every or any"]]]]],
  [8,"Asking Questions","Ask what, where, and how in useful exchanges.","❓","#C95D3A",[
    ["What",[["Ɛdeɛn nie?","What is this?"],["Wo din de sɛn?","What is your name?"],["Ɛyɛ nokorɛ?","Is it true?"]]],
    ["Where",[["Wo fire he?","Where do you come from?"],["Worekɔ he?","Where are you going?"],["Baabi a ɛwɔ he?","Where is the place?"]]],
    ["How to Say It",[["Sɛn na yɛka no wɔ Twi mu?","How do we say it in Twi?"],["Wobɛtumi aka no bio?","Can you repeat it?"],["Wobɛtumi aka no brɛoo?","Can you say it slowly?"]]]]],
  [9,"Places & Directions","Follow and give simple directions.","🗺️","#24745B",[
    ["Direction Words",[["Nifa","right"],["Benkum","left"],["W'anim tee","straight ahead"]]],
    ["Instructions",[["Fa nifa.","Turn right."],["Fa benkum.","Turn left."],["Kɔ w'anim tee.","Go straight ahead."]]],
    ["Finding Places",[["Kwan","road or way"],["Nkwanta","junction"],["Wobɛtumi akyerɛ me?","Can you show me?"]]]]],
  [10,"Time & Dates","Talk about parts of the day and simple plans.","🕒","#F28C28",[
    ["Parts of Day",[["Anɔpa","morning"],["Awia","afternoon"],["Anwummere","evening"]]],
    ["Night & Hours",[["Anadwo","night"],["Dɔnhwere baako","one hour"],["Nnɔnhwere mmienu","two hours"]]],
    ["Later",[["Mɛsan aba.","I will return."],["Yɛbɛhyia bio.","We shall meet again."],["Akyire yi yɛbɛhyia.","We shall meet later."]]]]],
  [11,"Markets & Shopping","Ask prices and complete a simple purchase.","🛒","#F6C445",[
    ["Shopping",[["Dwadie","shopping"],["Sika","money"],["Wowɔ bi?","Do you have any?"]]],
    ["Price",[["Ɛyɛ ahe?","How much is it?"],["Ne boɔ yɛ den.","It is expensive."],["Mepa wo kyɛw, te so.","Please reduce the price."]]],
    ["Complete the Sale",[["Mepa wo kyɛw, ma me nsesa.","Please give me my change."],["Mepa wo kyɛw, to so.","Please add a little extra."],["Meda wo ase.","Thank you."]]]]],
  [12,"Social Conversations","Speak politely and repair misunderstandings.","💬","#C95D3A",[
    ["Short Answers",[["Aane","yes"],["Daabi","no"],["Ɛyɛ nokorɛ?","Is it true?"]]],
    ["Language Skills",[["Mete Twi kakra.","I speak a little Twi."],["Mente Twi papa.","I do not speak Twi well."],["Wote borɔfo?","Do you speak English?"]]],
    ["Conversation Repair",[["Mente aseɛ.","I do not understand."],["Wobɛtumi aka no bio?","Can you repeat it?"],["Ka no brɛoo.","Say it slowly."]]]]],
  [13,"Work & School","Discuss work, roles, and learning.","🏫","#4338CA",[
    ["Roles",[["Meyɛ tikyani.","I am a teacher."],["Adwuma","work"],["Sukuu","school"]]],
    ["Learning",[["Mesua adeɛ.","I study."],["Ɛsɛ sɛ mesua adeɛ.","I need to study."],["Nhoma","book"]]],
    ["At Work",[["Merekɔ adwuma.","I am going to work."],["Meyɛ adwuma.","I work."],["Mabrɛ.","I am tired."]]]]],
  [14,"Travel & Transport","Handle journeys and destinations.","🚕","#24745B",[
    ["Going",[["Merekɔ.","I am going."],["Worekɔ he?","Where are you going?"],["Mɛsan aba.","I will return."]]],
    ["On the Way",[["Kwan","road or way"],["Nkwanta","junction"],["Kɔ w'anim tee.","Go straight ahead."]]],
    ["Ask for Help",[["Wobɛtumi akyerɛ me?","Can you show me?"],["Mepa wo kyɛw, boa me.","Please help me."],["Meda wo ase.","Thank you."]]]]],
  [15,"Feelings & Needs","Express physical states and preferences.","❤️","#C95D3A",[
    ["Physical Needs",[["Ɛkɔm de me.","I am hungry."],["Nsukɔm de me.","I am thirsty."],["Mabrɛ.","I am tired."]]],
    ["Likes",[["Mepɛ eyi.","I like this."],["Mempɛ eyi.","I do not like this."],["Merehwehwɛ eyi.","I am looking for this."]]],
    ["Need Help",[["Boa me.","Help me."],["Mente aseɛ.","I do not understand."],["Mennim.","I do not know."]]]]],
  [16,"Health & Safety","Ask for assistance in urgent situations.","🏥","#F28C28",[
    ["Safety Words",[["Korɔmfoɔ","thief"],["Polisini","police officer"],["Mmoa!","Help!"]]],
    ["Ask for Help",[["Mepa wo kyɛw, boa me.","Please help me."],["Wobɛtumi aboa me?","Can you help me?"],["Mente aseɛ.","I do not understand."]]],
    ["Basic Needs",[["Nsuo","water"],["Ɛkɔm de me.","I am hungry."],["Nsukɔm de me.","I am thirsty."]]]]],
  [17,"Weather & Environment","Build environmental vocabulary without unsupported claims.","🌦️","#24745B",[
    ["Orientation",[["Apueeɛ","east"],["Atɔeɛ","west"],["Atifi","north"]]],
    ["Surroundings",[["Anaafoɔ","south"],["Dua no ase","under the tree"],["Ɔsoro","sky or above"]]],
    ["Movement",[["Awia pue wɔ apueeɛ.","The sun rises in the east."],["Awia tɔ wɔ atɔeɛ.","The sun sets in the west."],["Hwɛ soro.","Look upward."]]]]],
  [18,"Plans & Future","Recognize useful future and return expressions.","📅","#4338CA",[
    ["Meet Again",[["Yɛbɛhyia bio.","We shall meet again."],["Akyire yi yɛbɛhyia.","We shall meet later."],["Mɛsan aba.","I will return."]]],
    ["Ability",[["Wobɛtumi akyerɛ me?","Can you show me?"],["Wobɛtumi aka no bio?","Can you repeat it?"],["Wobɛtumi aboa me?","Can you help me?"]]],
    ["Going Somewhere",[["Merekɔ adwuma.","I am going to work."],["Worekɔ he?","Where are you going?"],["Merekɔ fie.","I am going home."]]]]],
  [19,"Natural Conversation","Combine polite, social, and practical Twi.","🗣️","#C95D3A",[
    ["Introduce Yourself",[["Me din de Ama.","My name is Ama."],["Me firi Ghana.","I come from Ghana."],["Mete Twi kakra.","I speak a little Twi."]]],
    ["Stay in Twi",[["Sɛn na yɛka no wɔ Twi mu?","How do we say it in Twi?"],["Ka no brɛoo.","Say it slowly."],["Ka no bio.","Say it again."]]],
    ["Close Politely",[["Meda wo ase.","Thank you."],["Yɛbɛhyia bio.","We shall meet again."],["Da yie.","Good night."]]]]],
  [20,"Stories & Course Review","Bring the complete course into connected scenarios.","📖","#F6C445",[
    ["At the Market",[["Merehwehwɛ kwadu.","I am looking for bananas."],["Ɛyɛ ahe?","How much is it?"],["Mepa wo kyɛw, te so.","Please reduce the price."]]],
    ["Find the Way",[["Wobɛtumi akyerɛ me?","Can you show me?"],["Fa nifa.","Turn right."],["Kɔ w'anim tee.","Go straight ahead."]]],
    ["A New Conversation",[["Maakye.","Good morning."],["Me din de Kofi.","My name is Kofi."],["Mete Twi kakra.","I speak a little Twi."]]]]]
];

export const twiExtendedUnits = specs.map(([number,title,subtitle,emoji,color,lessons],index)=>twiUnit({
  id:`twi-unit-${number}`,title,subtitle,emoji,color,
  culture:index%3===0?culture.food:index%3===1?culture.life:index%3===2?culture.talk:culture.travel,
  lessons:lessons.map(([lessonTitle,words],i)=>({title:lessonTitle,emoji:["🗣️","🧠","✨"][i],words}))
}));
