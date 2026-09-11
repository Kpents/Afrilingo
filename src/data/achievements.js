export const achievements = [
  { id: "first-steps", title: "First Steps", description: "Complete your first lesson", emoji: "👣", test: ({ lessons }) => lessons >= 1 },
  { id: "culture-explorer", title: "Culture Explorer", description: "Collect 3 culture cards", emoji: "🌍", test: ({ cards }) => cards >= 3 },
  { id: "unit-finisher", title: "Unit Finisher", description: "Complete 5 lessons", emoji: "🏆", test: ({ lessons }) => lessons >= 5 },
  { id: "xp-hunter", title: "XP Hunter", description: "Earn 500 total XP", emoji: "⚡", test: ({ xp }) => xp >= 500 },
  { id: "polyglot-path", title: "Two Paths", description: "Complete lessons in two languages", emoji: "🗺️", test: ({ activeLanguages }) => activeLanguages >= 2 },
  { id: "streak-starter", title: "Streak Starter", description: "Reach a 7 day streak", emoji: "🔥", test: ({ streak }) => streak >= 7 },
  { id: "review-hero", title: "Review Hero", description: "Resolve 10 review questions", emoji: "🧠", test: ({ reviews }) => reviews >= 10 },
  { id: "word-collector", title: "Word Collector", description: "Master 25 Explore words", emoji: "📚", test: ({ masteredWords }) => masteredWords >= 25 },
  { id: "culture-keeper", title: "Culture Keeper", description: "Collect 25 culture cards", emoji: "🪘", test: ({ cards }) => cards >= 25 },
  { id: "century-club", title: "Century Club", description: "Complete 100 lessons", emoji: "💯", test: ({ lessons }) => lessons >= 100 }
];

export function getAchievementStats(progressByLanguage) {
  const courses = Object.values(progressByLanguage);
  return {
    xp: courses.reduce((sum, item) => sum + (item.xp || 0), 0),
    lessons: courses.reduce((sum, item) => sum + (item.completedLessonIds?.length || 0), 0),
    cards: courses.reduce((sum, item) => sum + (item.unlockedCultureCards?.length || 0), 0),
    streak: Math.max(0, ...courses.map(item => item.streak || 0)),
    activeLanguages: courses.filter(item => (item.completedLessonIds?.length || 0) > 0).length,
    reviews: courses.reduce((sum, item) => sum + (item.reviewResolved || 0), 0),
    masteredWords: courses.reduce((sum, item) => sum + (item.explore?.masteredEntryIds?.length || 0), 0)
  };
}

export function getUnlockedAchievementIds(progressByLanguage) {
  const stats = getAchievementStats(progressByLanguage);
  return achievements.filter(achievement => achievement.test(stats)).map(achievement => achievement.id);
}
