import { useCallback, useState } from "react";

const storageKey = "afrilingo:preferences";

export const defaultPreferences = {
  onboarded: false,
  name: "",
  languageId: "twi",
  startedLanguageIds: [],
  motivation: "culture",
  dailyTarget: 3,
  familiarity: "new"
};

function readPreferences() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = { ...defaultPreferences, ...JSON.parse(saved) };
      const progressed = Object.keys(localStorage).filter(key => {
        if (!key.startsWith("afrilingo:") || key.startsWith("afrilingo:recovery:") || key === storageKey) return false;
        try { const value = JSON.parse(localStorage.getItem(key)); return value?.xp > 0 || value?.completedLessonIds?.length > 0; } catch { return false; }
      }).map(key => key.slice("afrilingo:".length));
      parsed.startedLanguageIds = [...new Set([parsed.languageId, ...(parsed.startedLanguageIds || []), ...progressed])];
      return parsed;
    }
    const returning = Object.keys(localStorage).some(key => {
      if (!key.startsWith("afrilingo:") || key === storageKey) return false;
      try { const value = JSON.parse(localStorage.getItem(key)); return value?.xp > 0 || value?.completedLessonIds?.length > 0; } catch { return false; }
    });
    return { ...defaultPreferences, onboarded: returning };
  } catch {
    return defaultPreferences;
  }
}

export default function useUserPreferences() {
  const [preferences, setPreferencesState] = useState(readPreferences);
  const setPreferences = useCallback(update => {
    setPreferencesState(previous => {
      const next = typeof update === "function" ? update(previous) : update;
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  return { preferences, setPreferences };
}
