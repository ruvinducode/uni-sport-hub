export const MATCH_CENTER_TABS = [
  { id: "overview", label: "Overview" },
  { id: "players", label: "Player stats" },
  { id: "teams", label: "Team stats" },
  { id: "timeline", label: "Timeline" },
  { id: "lineups", label: "Lineups" },
  { id: "scorecard", label: "Scorecard" },
  { id: "info", label: "Match info" },
];

function MatchTabs({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Match center sections">
      {MATCH_CENTER_TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${
            value === t.id
              ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default MatchTabs;
