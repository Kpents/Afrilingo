import { useCallback, useEffect, useMemo, useState } from "react";
import { languages } from "../data/languages";

export const initialProgress = {
  xp: 0,
  hearts: 5,
  heartUpdatedAt: null,
  streak: 0,
  lastStudyDate: null,
  daily: { date: null, completed: 0, claimed: false },
  dailyPlan: { date: null, completedStepIds: [] },
  weekly: { week: null, activities: 0, reviews: 0, xp: 0 },
  reviewStreak: { count: 0, lastDate: null, best: 0 },
  completedLessonIds: [],
  unlockedCultureCards: [],
  unlockedAchievementIds: [],
  reviewResolved: 0,
  reviewQueue: [],
  placement: null,
  onboarding: null,
  mastery: { skills: {}, checkpoints: [] },
  practice: { date: null, sessions: 0, xp: 0, lastMode: null },
  explore: { masteredEntryIds: [], completedCategoryLevels: [] },
  immersion: { savedPhrases: [], savedWords: [], completedConversations: [], completedMissions: [], completedGrammar: [], completedPronunciation: [], completedStories: [], completedAdventures: [], claimedDailyPhrases: [] }
};

export const HEART_REGEN_MS = 30 * 60 * 1000;

export function regenerateHearts(progress, now = Date.now()) {
  if (progress.hearts >= 5 || !progress.heartUpdatedAt) return progress;
  const recovered = Math.floor((now - progress.heartUpdatedAt) / HEART_REGEN_MS);
  if (recovered <= 0) return progress;
  const hearts = Math.min(5, progress.hearts + recovered);
  return { ...progress, hearts, heartUpdatedAt: hearts === 5 ? null : progress.heartUpdatedAt + recovered * HEART_REGEN_MS };
}

export function normalizeProgress(parsed = {}) {
  return { ...initialProgress, ...parsed, unlockedAchievementIds: Array.isArray(parsed.unlockedAchievementIds) ? parsed.unlockedAchievementIds : [], reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue : [], daily: { ...initialProgress.daily, ...parsed.daily }, dailyPlan: { ...initialProgress.dailyPlan, ...parsed.dailyPlan, completedStepIds: Array.isArray(parsed.dailyPlan?.completedStepIds) ? parsed.dailyPlan.completedStepIds : [] }, weekly: { ...initialProgress.weekly, ...parsed.weekly }, reviewStreak: { ...initialProgress.reviewStreak, ...parsed.reviewStreak }, practice: { ...initialProgress.practice, ...parsed.practice }, explore: { ...initialProgress.explore, ...parsed.explore }, immersion: { ...initialProgress.immersion, ...parsed.immersion }, mastery: { ...initialProgress.mastery, ...parsed.mastery, skills: { ...initialProgress.mastery.skills, ...parsed.mastery?.skills }, checkpoints: Array.isArray(parsed.mastery?.checkpoints) ? parsed.mastery.checkpoints : [] } };
}

function readProgress(languageId) {
  try {
    const saved = localStorage.getItem(`afrilingo:${languageId}`);
    if (!saved) return { ...initialProgress };
    const parsed = JSON.parse(saved);
    return regenerateHearts(normalizeProgress(parsed));
  } catch {
    try {
      const damaged = localStorage.getItem(`afrilingo:${languageId}`);
      if (damaged) localStorage.setItem(`afrilingo:recovery:${languageId}:${Date.now()}`, damaged);
      localStorage.removeItem(`afrilingo:${languageId}`);
    } catch {}
    return { ...initialProgress };
  }
}

export default function useCourseProgress(activeLanguage) {
  const [progressByLanguage, setProgressByLanguage] = useState(() =>
    Object.fromEntries(Object.keys(languages).map(id => [id, readProgress(id)]))
  );
  const progress = progressByLanguage[activeLanguage] || initialProgress;
  const setProgress = useCallback((update) => {
    setProgressByLanguage(all => {
      const previous = all[activeLanguage] || initialProgress;
      const next = typeof update === "function" ? update(previous) : update;
      try { localStorage.setItem(`afrilingo:${activeLanguage}`, JSON.stringify(next)); } catch {}
      return { ...all, [activeLanguage]: next };
    });
  }, [activeLanguage]);
  const setLanguageProgress = useCallback((languageId, update) => {
    if (!languages[languageId]) return;
    setProgressByLanguage(all => {
      const previous = all[languageId] || initialProgress;
      const next = typeof update === "function" ? update(previous) : update;
      try { localStorage.setItem(`afrilingo:${languageId}`, JSON.stringify(next)); } catch {}
      return { ...all, [languageId]: next };
    });
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgressByLanguage(all => Object.fromEntries(Object.entries(all).map(([id, value]) => {
        const next = regenerateHearts(value);
        if (next !== value) try { localStorage.setItem(`afrilingo:${id}`, JSON.stringify(next)); } catch {}
        return [id, next];
      })));
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => ({ progress, setProgress, setLanguageProgress, progressByLanguage }), [progress, setProgress, setLanguageProgress, progressByLanguage]);
}
