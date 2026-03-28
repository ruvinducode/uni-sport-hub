import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "savedCoachIds";

const SavedCoachesContext = createContext(null);

export function SavedCoachesProvider({ children }) {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedIds(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next) => {
    setSavedIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSave = useCallback(
    (coachId) => {
      persist(
        savedIds.includes(coachId) ? savedIds.filter((id) => id !== coachId) : [...savedIds, coachId]
      );
    },
    [savedIds, persist]
  );

  const isSaved = useCallback((coachId) => savedIds.includes(coachId), [savedIds]);

  const value = useMemo(
    () => ({ savedIds, toggleSave, isSaved }),
    [savedIds, toggleSave, isSaved]
  );

  return <SavedCoachesContext.Provider value={value}>{children}</SavedCoachesContext.Provider>;
}

export function useSavedCoaches() {
  const ctx = useContext(SavedCoachesContext);
  if (!ctx) throw new Error("useSavedCoaches must be used within SavedCoachesProvider");
  return ctx;
}
