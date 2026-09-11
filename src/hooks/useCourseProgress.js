import { useCallback, useEffect, useMemo, useState } from "react";
import { languages } from "../data/languages";

export const initialProgress = {
  xp: 0,
  hearts: 5,
  heartUpdatedAt: null,
  streak: 0,
  lastStudyDate: null,
  daily: { date: null, completed: 0, claimed: false },
  completedLessonIds: [],
  unlockedCultureCards: [],
  unlockedAchievementIds: [],
  reviewResolved: 0,
  reviewQueue: [],
  practice: { date: null, sessions: 0, xp: 0, lastMode: null },
  explore: { masteredEntryIds: [], completedCategoryLevels: [] },
  immersion: { savedPhrases: [], savedWords: [], completedMissions: [], completedGrammar: [], completedStories: [], claimedDailyPhrases: [] }
};

export const HEART_REGEN_MS = 30 * 60 * 1000;

function regenerateHearts(progress, now = Date.now()) {
  if (progress.hearts >= 5 || !progress.heartUpdatedAt) return progress;
  const recovered = Math.floor((now - progress.heartUpdatedAt) / HEART_REGEN_MS);
  if (recovered <= 0) return progress;
  const hearts = Math.min(5, progress.hearts + recovered);
  return { ...progress, hearts, heartUpdatedAt: hearts === 5 ? null : progress.heartUpdatedAt + recovered * HEART_REGEN_MS };
}

function readProgress(languageId) {
  try {
    const saved = localStorage.getItem(`afrilingo:${languageId}`);
    if (!saved) return { ...initialProgress };
    const parsed = JSON.parse(saved);
    return regenerateHearts({ ...initialProgress, ...parsed, unlockedAchievementIds: Array.isArray(parsed.unlockedAchievementIds) ? parsed.unlockedAchievementIds : [], reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue : [], daily: { ...initialProgress.daily, ...parsed.daily }, practice: { ...initialProgress.practice, ...parsed.practice }, explore: { ...initialProgress.explore, ...parsed.explore }, immersion: { ...initialProgress.immersion, ...parsed.immersion } });
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
  return useMemo(() => ({ progress, setProgress, progressByLanguage }), [progress, setProgress, progressByLanguage]);
}
