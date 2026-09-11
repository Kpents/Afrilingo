export const leboThemes = {
  twi: { regionCode: "GH", label: "Akan warmth", colors: ["#F6C445", "#C95D3A", "#24745B"], motif: "◆" },
  ga: { regionCode: "GH", label: "Accra energy", colors: ["#4BA3C7", "#F8F4EA", "#C95D3A"], motif: "◫" },
  ewe: { regionCode: "GH · TG", label: "Ewe rhythm", colors: ["#24745B", "#F6C445", "#4338CA"], motif: "◇" },
  swahili: { regionCode: "TZ · KE", label: "Swahili coast", colors: ["#20A464", "#49A7DD", "#F6C445"], motif: "≈" },
  yoruba: { regionCode: "NG · BJ", label: "Yorùbá style", colors: ["#24745B", "#F8F4EA", "#C95D3A"], motif: "▥" },
  hausa: { regionCode: "NG · NE", label: "Hausa heritage", colors: ["#176B4D", "#F6C445", "#F8F4EA"], motif: "✦" },
  igbo: { regionCode: "NG", label: "Igbo spirit", colors: ["#C95D3A", "#F6C445", "#24745B"], motif: "●" },
  shona: { regionCode: "ZW", label: "Shona roots", colors: ["#24745B", "#F6C445", "#C95D3A"], motif: "△" },
  ndebele: { regionCode: "ZW", label: "Ndebele colour", colors: ["#E9473F", "#2F80C9", "#F6C445"], motif: "▰" },
  zulu: { regionCode: "ZA", label: "Zulu pride", colors: ["#111827", "#F8F4EA", "#C95D3A"], motif: "▲" },
  bemba: { regionCode: "ZM", label: "Bemba welcome", colors: ["#198754", "#F28C28", "#111827"], motif: "◆" },
  chichewa: { regionCode: "MW · ZM", label: "Chichewa warmth", colors: ["#C73737", "#24745B", "#111827"], motif: "☀" },
  kinyarwanda: { regionCode: "RW", label: "Rwandan brightness", colors: ["#4FA4DE", "#F6C445", "#24745B"], motif: "✹" },
  kirundi: { regionCode: "BI", label: "Kirundi welcome", colors: ["#CE3F49", "#F8F4EA", "#24745B"], motif: "✦" }
};

const outfitPaths = Object.fromEntries(Object.keys(leboThemes).map(languageId => [languageId, `/mascot/languages/lebo-${languageId}.png`]));
const poseOutfits = {
  twi: {
    learn: "/mascot/languages/lebo-twi-learn.png",
    encourage: "/mascot/languages/lebo-twi-encourage.png",
    celebrate: "/mascot/languages/lebo-twi-celebrate.png"
  }
};

export function getLeboTheme(languageId) {
  const id = leboThemes[languageId] ? languageId : "twi";
  return { ...leboThemes[id], outfit: outfitPaths[id], poses: poseOutfits[id] || {} };
}
