// Stable IDs are separate from display names so the cast can be renamed later.
export const sidekicks = [
  { id: "zuri", name: "Zuri", species: "Elephant", role: "The thoughtful guide", description: "Loves discovering languages, cultures, and new ideas.", image: "images/sidekicks/zuri.png", color: "#F6C445", tip: "Look around the scene first. The setting can help you understand a phrase." },
  { id: "kobby", name: "Kobby", species: "Monkey", role: "The playful explorer", description: "Turns a new challenge into a chance to try again.", image: "images/sidekicks/kobby.png", framed: true, color: "#24745B", tip: "Try one answer, check the feedback, and have another go if you need to." },
  { id: "nia", name: "Taffy", species: "Giraffe", role: "The curious traveller", description: "Notices places, people, and stories along the way.", image: "images/sidekicks/nia.png", color: "#4338CA", tip: "Notice who is speaking and where they are before choosing your response." },
  { id: "taji", name: "Chidi", species: "Parrot", role: "The listening companion", description: "Cheers you on as you learn to hear and use new expressions.", image: "images/sidekicks/taji.png", color: "#C95D3A", tip: "Read the phrase aloud if you like. Verified speaker audio can be added later." }
];

export const getSidekick = id => sidekicks.find(item => item.id === id);
