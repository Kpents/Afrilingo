import { useCallback, useState } from "react";

const storageKey = "afrilingo:preferences";

export const defaultPreferences = {
  onboarded: false,
  name: "",
  languageId: "twi",
  motivation: "culture",
  dailyTarget: 3,
  familiarity: "new"
};

function readPreferences() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) return { ...defaultPreferences, ...JSON.parse(saved) };
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
