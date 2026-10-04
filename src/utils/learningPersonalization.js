export const motivationProfiles = {
  travel: {
    label: "Travel",
    themes: ["transport", "places-directions", "restaurant", "market-shopping", "food-drinks"],
    patterns: /travel|transport|taxi|bus|direction|place|market|restaurant|food|drink|fare|route/i,
    immersionFeature: "adventures"
  },
  family: {
    label: "Family",
    themes: ["family", "home", "relationships", "food-drinks"],
    patterns: /family|home|visit|parent|child|elder|introduc|relationship/i,
    immersionFeature: "coach"
  },
  culture: {
    label: "Culture",
    themes: ["food-drinks", "market-shopping", "relationships", "clothing", "school"],
    patterns: /culture|story|custom|food|market|name|music|proverb|festival|greeting/i,
    immersionFeature: "stories"
  },
  relationships: {
    label: "Relationships",
    themes: ["relationships", "family", "home", "work", "school"],
    patterns: /friend|relationship|family|conversation|greeting|people|social|plan/i,
    immersionFeature: "coach"
  },
  general: {
    label: "Personal growth",
    themes: [],
    patterns: /.*/i,
    immersionFeature: "adventures"
  }
};

export function normalizedMotivations(motivations = []) {
  const known = motivations.filter(id => motivationProfiles[id]);
  return known.length ? [...new Set(known)] : ["general"];
}

export function preferredThemeIds(motivations = []) {
  return [...new Set(normalizedMotivations(motivations).flatMap(id => motivationProfiles[id].themes))];
}

export function rankByMotivations(items = [], motivations = [], getText = item => JSON.stringify(item)) {
  const profiles = normalizedMotivations(motivations).map(id => motivationProfiles[id]);
  return items.map((item, index) => {
    const text = getText(item);
    const score = profiles.reduce((total, profile, profileIndex) => total + (profile.patterns.test(text) ? 100 - profileIndex * 5 : 0), 0);
    return { item, index, score };
  }).sort((a, b) => b.score - a.score || a.index - b.index).map(entry => entry.item);
}

export function recommendedImmersionFeature(motivations = []) {
  return motivationProfiles[normalizedMotivations(motivations)[0]].immersionFeature;
}

export function motivationSummary(motivations = []) {
  return normalizedMotivations(motivations).map(id => motivationProfiles[id].label).join(" + ");
}
