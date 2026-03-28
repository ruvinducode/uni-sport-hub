import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buildSeedMatches, uid } from "../data/scoreboardSeed";

const STORAGE_KEY = "scoreboard_matches_v2_sl";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  return buildSeedMatches();
}

const ScoreboardContext = createContext(null);

export function ScoreboardProvider({ children }) {
  const [matches, setMatches] = useState(loadInitial);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  }, [matches]);

  const showToast = useCallback((message, variant = "success") => {
    setToast({ message, variant, id: uid("toast") });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const getMatch = useCallback((id) => matches.find((m) => m.id === id) || null, [matches]);

  const createMatch = useCallback(
    (draft) => {
      const id = uid("sb_m");
      const row = {
        ...draft,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorite: false,
        weather: draft.weather ?? "—",
        attendance: draft.attendance ?? "—",
        stats: draft.stats || { items: [] },
        timeline: draft.timeline || [],
        scoreBreakdown: draft.scoreBreakdown || { type: draft.sportType },
        lineups: draft.lineups || { home: [], away: [] },
        summary: draft.summary || {
          highlights: [],
          recentUpdates: [],
          miniStats: [],
          progression: [],
        },
      };
      setMatches((prev) => [row, ...prev]);
      showToast("Match created");
      return id;
    },
    [showToast]
  );

  const updateMatch = useCallback(
    (id, patch) => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.id !== id) return m;
          const clean = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
          const next = { ...m, ...clean, updatedAt: new Date().toISOString() };
          if (clean.teamA) next.teamA = { ...m.teamA, ...clean.teamA };
          if (clean.teamB) next.teamB = { ...m.teamB, ...clean.teamB };
          return next;
        })
      );
      showToast("Match updated");
    },
    [showToast]
  );

  const deleteMatch = useCallback(
    (id) => {
      setMatches((prev) => prev.filter((m) => m.id !== id));
      showToast("Match deleted", "error");
    },
    [showToast]
  );

  const toggleFavorite = useCallback((id) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
  }, []);

  const addTimelineEvent = useCallback(
    (matchId, event) => {
      const ev = { ...event, id: event.id || uid("ev") };
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId
            ? {
                ...m,
                timeline: [ev, ...(m.timeline || [])],
                updatedAt: new Date().toISOString(),
              }
            : m
        )
      );
      showToast("Event added");
    },
    [showToast]
  );

  const deleteTimelineEvent = useCallback(
    (matchId, eventId) => {
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId
            ? {
                ...m,
                timeline: (m.timeline || []).filter((e) => e.id !== eventId),
                updatedAt: new Date().toISOString(),
              }
            : m
        )
      );
      showToast("Event removed", "error");
    },
    [showToast]
  );

  const replaceStats = useCallback(
    (matchId, items) => {
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId
            ? { ...m, stats: { items }, updatedAt: new Date().toISOString() }
            : m
        )
      );
      showToast("Stats saved");
    },
    [showToast]
  );

  const resetToSeed = useCallback(() => {
    setMatches(buildSeedMatches());
    showToast("Restored demo data");
  }, [showToast]);

  const value = useMemo(
    () => ({
      matches,
      toast,
      getMatch,
      createMatch,
      updateMatch,
      deleteMatch,
      toggleFavorite,
      addTimelineEvent,
      deleteTimelineEvent,
      replaceStats,
      resetToSeed,
    }),
    [
      matches,
      toast,
      getMatch,
      createMatch,
      updateMatch,
      deleteMatch,
      toggleFavorite,
      addTimelineEvent,
      deleteTimelineEvent,
      replaceStats,
      resetToSeed,
    ]
  );

  return (
    <ScoreboardContext.Provider value={value}>{children}</ScoreboardContext.Provider>
  );
}

export function useScoreboard() {
  const ctx = useContext(ScoreboardContext);
  if (!ctx) throw new Error("useScoreboard must be used within ScoreboardProvider");
  return ctx;
}
