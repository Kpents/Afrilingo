export const iconCategories = {
  "food-drinks": ["bread", "rice", "fish", "chicken", "egg", "banana", "apple", "orange", "water", "coffee", "tea", "milk", "meat", "soup", "juice"],
  "fruits-vegetables": ["tomato", "carrot", "onion", "pepper", "lettuce", "mango", "pineapple", "plantain", "yam", "cassava", "maize"],
  animals: ["dog", "cat", "cow", "goat", "chicken", "bird", "fish", "lion", "elephant", "monkey", "sheep", "pig", "horse", "snake", "spider", "duck"],
  "people-family": ["man", "woman", "child", "baby", "father", "mother", "brother", "sister", "grandmother", "grandfather", "friend", "teacher", "student"],
  "home-items": ["house", "chair", "table", "bed", "door", "window", "phone", "laptop", "book", "pen", "cup", "plate", "spoon", "knife", "bag", "key"],
  clothing: ["shirt", "trousers", "dress", "shoe", "hat", "bag", "glasses", "watch", "necklace", "cap", "jacket"],
  transport: ["car", "bus", "bicycle", "motorcycle", "truck", "train", "airplane", "boat", "taxi", "traffic-light", "trotro", "minibus-taxi"],
  places: ["school", "hospital", "market", "shop", "restaurant", "bank", "church", "mosque", "beach", "farm", "mountain", "park", "home", "market-stall", "compound-house"],
  nature: ["sun", "cloud", "rain", "storm", "rainbow", "tree", "flower", "river", "mountain", "moon", "wind"],
  activities: ["eat", "drink", "read", "write", "walk", "run", "sleep", "listen", "speak", "play", "cook", "sit", "stand", "work", "study", "drive"],
  body: ["head", "eye", "ear", "nose", "mouth", "hand", "arm", "leg", "foot", "heart"],
  colours: ["red", "blue", "green", "yellow", "orange-colour", "purple", "pink", "brown", "black", "white"],
  shapes: ["circle", "square", "triangle", "rectangle", "star", "heart-shape"],
  "african-context": ["jollof-rice", "fufu", "banku", "kenkey", "ugali", "pap", "braai", "calabash"]
};

export const iconCategoryLabels = {
  "food-drinks": "Food & Drinks", "fruits-vegetables": "Fruits & Vegetables", animals: "Animals",
  "people-family": "People & Family", "home-items": "Home & Everyday Items", clothing: "Clothing & Accessories",
  transport: "Transport", places: "Places & Buildings", nature: "Nature & Weather", activities: "Activities & Verbs",
  body: "Body", colours: "Colours", shapes: "Shapes", "african-context": "African Context"
};

const readyIds = new Set([
  "bread", "fish", "chicken", "egg", "banana", "apple", "orange", "water", "coffee", "tea", "milk", "meat", "soup", "juice",
  "tomato", "carrot", "onion", "pepper", "lettuce", "mango", "pineapple", "plantain", "yam", "cassava", "maize", "dog", "cat", "cow", "goat", "bird", "lion", "elephant", "monkey", "sheep", "pig", "horse", "snake", "spider", "duck", "baby", "man", "woman", "child", "father", "mother", "friend", "teacher", "student",
  "house", "chair", "table", "bed", "door", "window", "phone", "laptop", "book", "pen", "cup", "plate", "spoon", "knife", "bag", "key",
  "shirt", "glasses", "watch", "necklace", "jacket", "car", "bus", "bicycle", "truck", "train", "airplane", "boat", "taxi", "traffic-light",
  "school", "hospital", "market", "shop", "restaurant", "bank", "church", "mosque", "beach", "farm", "mountain", "park", "home", "sun", "cloud", "rain", "storm", "rainbow",
  "tree", "flower", "river", "moon", "wind", "eat", "drink", "read", "write", "walk", "run", "sleep", "listen", "speak", "play", "cook", "sit",
  "stand", "work", "study", "drive", "head", "eye", "ear", "nose", "mouth", "hand", "foot", "heart", "red", "blue", "green", "yellow",
  "orange-colour", "purple", "pink", "brown", "black", "white", "circle", "square", "triangle", "rectangle", "star", "heart-shape"
]);

const customAssets = {
  "jollof-rice": "/icons/african-context/jollof-rice.png",
  fufu: "/icons/african-context/fufu.png",
  trotro: "/icons/african-context/trotro.png",
  calabash: "/icons/african-context/calabash.png"
};

const seen = new Map();
Object.entries(iconCategories).forEach(([category, ids]) => ids.forEach(id => {
  if (!seen.has(id)) seen.set(id, { id, category, label: id.replaceAll("-", " "), tags: [category, category === "activities" ? "verb" : "noun"] });
}));

export const iconLibrary = Object.fromEntries([...seen.values()].map(icon => [icon.id, {
  ...icon,
  asset: customAssets[icon.id] || (readyIds.has(icon.id) ? `lucide:${icon.id}` : null),
  status: customAssets[icon.id] || readyIds.has(icon.id) ? "ready" : "placeholder"
}]));

const aliases = {
  "bread": "bread", "water": "water", "coffee": "coffee", "tea": "tea", "milk": "milk", "fish": "fish", "meat": "meat", "chicken": "chicken",
  "egg": "egg", "eggs": "egg", "banana": "banana", "bananas": "banana", "apple": "apple", "orange": "orange", "soup": "soup", "juice": "juice",
  "dog": "dog", "cat": "cat", "cow": "cow", "goat": "goat", "bird": "bird", "lion": "lion", "elephant": "elephant", "monkey": "monkey", "sheep": "sheep", "pig": "pig", "horse": "horse", "snake": "snake", "spider": "spider", "duck": "duck", "child": "child", "children": "child", "baby": "baby", "teacher": "teacher", "student": "student",
  "father": "father", "mother": "mother", "friend": "friend", "house": "house", "home": "home", "chair": "chair", "table": "table", "bed": "bed", "door": "door",
  "window": "window", "phone": "phone", "book": "book", "pen": "pen", "cup": "cup", "plate": "plate", "bag": "bag", "key": "key", "shirt": "shirt",
  "car": "car", "bus": "bus", "train": "train", "airplane": "airplane", "boat": "boat", "taxi": "taxi", "school": "school", "hospital": "hospital",
  "market": "market", "shop": "shop", "restaurant": "restaurant", "bank": "bank", "church": "church", "mosque": "mosque", "beach": "beach", "park": "park", "farm": "farm", "mountain": "mountain", "sun": "sun", "rain": "rain",
  "tree": "tree", "flower": "flower", "river": "river", "moon": "moon", "head": "head", "eye": "eye", "ear": "ear", "nose": "nose", "mouth": "mouth",
  "hand": "hand", "foot": "foot", "heart": "heart", "to eat": "eat", "to drink": "drink", "to read": "read", "to write": "write", "to walk": "walk",
  "to run": "run", "to sleep": "sleep", "to listen": "listen", "to speak": "speak", "to play": "play", "to cook": "cook", "to sit": "sit", "to stand": "stand",
  "to work": "work", "to study": "study", "to drive": "drive", "jollof rice": "jollof-rice", "fufu": "fufu",
  "trotro": "trotro", "tro tro": "trotro", "calabash": "calabash"
};

export function findIconId(english = "") {
  const normalized = english.toLowerCase().replace(/[.!?]/g, "").replace(/^(a|an|the)\s+/, "").trim();
  if (aliases[normalized]) return aliases[normalized];
  if (normalized.endsWith("s") && aliases[normalized.slice(0, -1)]) return aliases[normalized.slice(0, -1)];
  const direct = Object.keys(iconLibrary).find(id => normalized === id.replaceAll("-", " "));
  return direct || null;
}

export function getIcon(id) {
  return iconLibrary[id] || null;
}

export const missingIconIds = Object.values(iconLibrary).filter(icon => icon.status !== "ready").map(icon => icon.id);
