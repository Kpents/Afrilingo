export const MASTER_CURRICULUM_VERSION = "1.0";

export const masterCurriculumSections = [
  {
    id: "foundations",
    number: 1,
    title: "Foundations",
    unitRange: [1, 9],
    outcome: "Build a dependable foundation for greetings, identity, essential vocabulary and simple everyday exchanges.",
    cefr: "A1-informed"
  },
  {
    id: "everyday-life",
    number: 2,
    title: "Everyday Life",
    unitRange: [10, 39],
    outcome: "Handle common daily situations with growing independence, including travel, shopping, work, health and social life.",
    cefr: "A1–A2-informed"
  },
  {
    id: "communication-culture",
    number: 3,
    title: "Communication & Culture",
    unitRange: [40, 73],
    outcome: "Sustain connected communication and interpret culturally grounded language across practical and social contexts.",
    cefr: "A2-informed · B1 bridge"
  }
];

const unitBlueprints = [
  ["Greetings & courtesy", "Greet people, respond naturally and use culturally appropriate courtesy forms.", ["vocabulary", "listening", "speaking"]],
  ["Numbers & essential quantities", "Understand and use essential numbers, quantities and counting expressions.", ["vocabulary", "listening", "matching"]],
  ["Introductions & identity", "Introduce yourself and exchange basic personal information.", ["speaking", "translation", "grammar"]],
  ["People & family", "Identify people and describe close family relationships.", ["vocabulary", "listening", "translation"]],
  ["Everyday actions", "Talk about high-frequency actions using language-appropriate verb patterns.", ["grammar", "speaking", "matching"]],
  ["Food & drink basics", "Name common foods and drinks and express simple wants and preferences.", ["vocabulary", "listening", "speaking"]],
  ["Home & daily life", "Describe familiar objects, places and routines at home.", ["vocabulary", "translation", "matching"]],
  ["Describing things", "Describe people and objects using language-appropriate agreement and word order.", ["grammar", "speaking", "translation"]],
  ["Foundations checkpoint", "Combine foundational skills in short, supported real-life exchanges.", ["review", "assessment", "speaking"]],
  ["Questions & clarification", "Ask useful questions and request repetition or clarification.", ["speaking", "listening", "grammar"]],
  ["Places & directions", "Locate common places and understand simple directions.", ["vocabulary", "listening", "translation"]],
  ["Time & dates", "Discuss time, days, dates and simple schedules.", ["vocabulary", "listening", "speaking"]],
  ["Markets & shopping", "Ask for items and navigate a familiar market interaction.", ["speaking", "listening", "culture"]],
  ["Money & prices", "Understand prices, quantities and basic payment language.", ["vocabulary", "listening", "matching"]],
  ["Work & occupations", "Talk about common occupations, workplaces and responsibilities.", ["vocabulary", "translation", "speaking"]],
  ["School & learning", "Communicate about school, study and classroom needs.", ["vocabulary", "listening", "speaking"]],
  ["Travel & transport", "Use practical language for local transport and journeys.", ["listening", "speaking", "culture"]],
  ["Social conversations", "Open, maintain and close friendly everyday conversations.", ["speaking", "listening", "grammar"]],
  ["Everyday Life checkpoint I", "Apply early everyday-life skills in mixed listening, reading and speaking tasks.", ["review", "assessment", "listening"]],
  ["Feelings & needs", "Express feelings, needs and simple preferences.", ["vocabulary", "speaking", "translation"]],
  ["Body & wellbeing", "Identify parts of the body and discuss basic wellbeing.", ["vocabulary", "listening", "matching"]],
  ["Health & emergencies", "Seek help and communicate essential health or safety information.", ["speaking", "listening", "assessment"]],
  ["Weather & environment", "Discuss common weather and local environmental conditions.", ["vocabulary", "listening", "speaking"]],
  ["Clothing & appearance", "Identify clothing and describe appearance appropriately.", ["vocabulary", "grammar", "matching"]],
  ["Plans & appointments", "Arrange plans, appointments and meeting times.", ["speaking", "listening", "translation"]],
  ["Past experiences", "Describe completed events using the language's own time and aspect system.", ["grammar", "speaking", "listening"]],
  ["Future intentions", "Discuss intentions and future events using natural language-specific forms.", ["grammar", "speaking", "translation"]],
  ["Polite requests", "Make, accept and decline requests with appropriate politeness.", ["speaking", "culture", "listening"]],
  ["Everyday Life checkpoint II", "Integrate needs, health, description and time reference in practical exchanges.", ["review", "assessment", "speaking"]],
  ["Restaurant & hospitality", "Order food and participate in culturally appropriate hospitality exchanges.", ["speaking", "listening", "culture"]],
  ["Home routines & chores", "Discuss recurring routines, responsibilities and chores.", ["grammar", "vocabulary", "speaking"]],
  ["Community services", "Interact around common services and public places.", ["vocabulary", "listening", "translation"]],
  ["Phone & digital communication", "Handle simple phone calls and everyday digital messages.", ["listening", "speaking", "translation"]],
  ["Hobbies & free time", "Discuss interests, leisure and frequency.", ["vocabulary", "grammar", "speaking"]],
  ["Sports & support", "Talk about sport, participation and encouragement.", ["vocabulary", "listening", "culture"]],
  ["Relationships & invitations", "Invite people, respond and discuss social relationships respectfully.", ["speaking", "culture", "listening"]],
  ["Problems & solutions", "Explain a practical problem and negotiate a solution.", ["speaking", "listening", "translation"]],
  ["Practical decision-making", "Compare options and make decisions in everyday scenarios.", ["speaking", "grammar", "culture"]],
  ["Everyday Life assessment", "Demonstrate independent performance across core everyday scenarios.", ["review", "assessment", "speaking"]],
  ["Connected conversations", "Link ideas and sustain a multi-turn conversation.", ["speaking", "listening", "grammar"]],
  ["Narrating a sequence", "Tell events in a clear sequence using natural connectors.", ["speaking", "grammar", "translation"]],
  ["Giving reasons & opinions", "State an opinion and support it with simple reasons.", ["speaking", "listening", "grammar"]],
  ["Comparing & choosing", "Compare people, objects or options and explain a choice.", ["grammar", "speaking", "translation"]],
  ["Advice & obligation", "Give advice and discuss responsibility using language-appropriate forms.", ["grammar", "culture", "speaking"]],
  ["Permission & possibility", "Ask about permission and discuss possibility or ability.", ["grammar", "speaking", "listening"]],
  ["Grammar patterns in context", "Recognize and apply high-value grammatical patterns in meaningful contexts.", ["grammar", "review", "translation"]],
  ["Pronunciation & listening workshop", "Distinguish important sound, rhythm or tone contrasts for this language.", ["pronunciation", "listening", "speaking"]],
  ["Regional varieties & register", "Recognize useful regional, formal and informal variation without stereotyping.", ["listening", "culture", "vocabulary"]],
  ["Proverbs & figurative language", "Interpret selected, verified figurative expressions in cultural context.", ["culture", "listening", "translation"]],
  ["Communication checkpoint I", "Use connected speech, register and repair strategies in mixed tasks.", ["review", "assessment", "speaking"]],
  ["Family, respect & social roles", "Communicate respectfully across family and community roles.", ["culture", "speaking", "listening"]],
  ["Names & identity traditions", "Discuss names and identity through verified community-specific contexts.", ["culture", "vocabulary", "speaking"]],
  ["Foodways & hospitality", "Understand language and practices around sharing food and welcoming guests.", ["culture", "listening", "speaking"]],
  ["Markets & negotiation", "Negotiate quantities, prices and choices in a realistic market exchange.", ["speaking", "listening", "culture"]],
  ["Music, rhythm & performance", "Engage with verified language used around music, rhythm and performance.", ["culture", "listening", "pronunciation"]],
  ["Festivals & ceremonies", "Understand selected language and customs around verified community events.", ["culture", "listening", "vocabulary"]],
  ["Stories & oral tradition", "Follow and retell a short culturally grounded story.", ["listening", "speaking", "culture"]],
  ["Travel across regions", "Navigate travel while recognizing useful regional language variation.", ["listening", "speaking", "culture"]],
  ["Work, enterprise & community", "Discuss work, enterprise and contribution to community life.", ["vocabulary", "speaking", "culture"]],
  ["News & public life", "Understand the main idea of simple, verified public information.", ["listening", "reading", "vocabulary"]],
  ["Culture & Communication checkpoint II", "Integrate cultural knowledge with respectful, effective communication.", ["review", "assessment", "culture"]],
  ["Extended listening", "Follow the main points of a longer, carefully graded audio passage.", ["listening", "review", "vocabulary"]],
  ["Speaking with confidence", "Produce a connected spoken response with intelligible pronunciation.", ["speaking", "pronunciation", "assessment"]],
  ["Reading practical texts", "Read short messages, signs and practical information.", ["reading", "vocabulary", "translation"]],
  ["Writing useful messages", "Compose short, useful messages with appropriate tone.", ["writing", "grammar", "culture"]],
  ["Repairing misunderstandings", "Notice and repair common communication breakdowns.", ["speaking", "listening", "review"]],
  ["Formal & informal communication", "Choose forms appropriate to relationship, setting and purpose.", ["culture", "grammar", "speaking"]],
  ["Telling personal stories", "Tell a short personal story with sequence, detail and viewpoint.", ["speaking", "grammar", "listening"]],
  ["Discussing change & aspirations", "Discuss changes, goals and aspirations with supporting detail.", ["speaking", "listening", "vocabulary"]],
  ["Culture comparison respectfully", "Compare cultural practices with curiosity and without overgeneralizing.", ["culture", "speaking", "reading"]],
  ["Real-life scenario lab", "Complete multi-step scenarios combining listening, speaking and decision-making.", ["speaking", "listening", "assessment"]],
  ["Independent communication review", "Consolidate priority weaknesses using spaced mixed-skill review.", ["review", "listening", "speaking"]],
  ["Mastery assessment", "Demonstrate the curriculum's target outcomes in integrated, culturally grounded tasks.", ["assessment", "speaking", "listening"]]
];

const checkpointUnits = new Set([9, 19, 29, 39, 50, 61, 73]);

const cefrForUnit = number => {
  if (number <= 9) return "A1-informed";
  if (number <= 19) return "A1–A2-informed";
  if (number <= 61) return "A2-informed";
  return "A2-informed · B1 bridge";
};

const sectionForUnit = number =>
  masterCurriculumSections.find(section => number >= section.unitRange[0] && number <= section.unitRange[1]);

export const masterCurriculumUnits = unitBlueprints.map(([title, objective, skills], index) => {
  const number = index + 1;
  const section = sectionForUnit(number);
  return {
    id: `master-unit-${String(number).padStart(2, "0")}`,
    number,
    sectionId: section.id,
    title,
    objective,
    skills,
    cefr: cefrForUnit(number),
    checkpoint: checkpointUnits.has(number),
    contentPolicy: "Verified language-specific content only"
  };
});

export const languageAdaptationProfiles = {
  twi: { family: "Akan", priorities: ["tone-aware listening", "natural aspect progression", "Ghanaian cultural contexts"] },
  ga: { family: "Kwa", priorities: ["tone-aware listening", "language-specific verb patterns", "Greater Accra contexts"] },
  ewe: { family: "Gbe", priorities: ["tone-aware listening", "language-specific grammar", "Volta and Ewe cultural contexts"] },
  yoruba: { family: "Volta–Niger", priorities: ["tone-aware listening", "tone-marking support", "Yoruba cultural contexts"] },
  igbo: { family: "Volta–Niger", priorities: ["tone-aware listening", "language-specific varieties", "Igbo cultural contexts"] },
  hausa: { family: "Chadic", priorities: ["sound and tone awareness", "gender-sensitive grammar", "Hausa cultural contexts"] },
  swahili: { family: "Bantu", priorities: ["noun classes", "concord", "East African and coastal contexts"] },
  zulu: { family: "Bantu", priorities: ["noun classes", "concord and verb morphology", "South African contexts"] },
  ndebele: { family: "Bantu", priorities: ["noun classes", "concord and verb morphology", "Matabeleland contexts"] },
  shona: { family: "Bantu", priorities: ["noun classes", "concord", "Zimbabwean contexts"] },
  bemba: { family: "Bantu", priorities: ["noun classes", "concord", "Zambian contexts"] },
  chichewa: { family: "Bantu", priorities: ["noun classes", "concord", "Malawian contexts"] },
  kinyarwanda: { family: "Bantu", priorities: ["noun classes", "concord", "Rwandan contexts"] },
  kirundi: { family: "Bantu", priorities: ["noun classes", "concord", "Burundian contexts"] }
};

export const masterCurriculum = {
  id: "afrilingo-master-curriculum",
  version: MASTER_CURRICULUM_VERSION,
  title: "AfriLingo Master Curriculum v1.0",
  sections: masterCurriculumSections,
  units: masterCurriculumUnits,
  principles: {
    universalObjectives: true,
    languageOwnedGrammarSequence: true,
    verifiedContentOnly: true,
    cefrNote: "CEFR-informed outcomes are planning guidance, not a claim of certification or exact equivalence.",
    adaptationNote: "Pronunciation, grammar, examples, register and culture must be authored and reviewed for each language."
  }
};

export default masterCurriculum;
