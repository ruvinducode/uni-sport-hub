const OPTIONS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

function FilterTabs({ value, onChange, className = "" }) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="tablist"
      aria-label="Match status filter"
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              active
                ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
