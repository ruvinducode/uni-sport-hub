import StatusBadge from "../shared/StatusBadge";
import { SESSION_TYPE_OPTIONS, COACH_LEVEL_OPTIONS } from "../../../data/coachConstants";

function chipLabel(map, value) {
  if (!value) return null;
  const found = map.find((x) => x.value === value);
  return found?.label || value;
}

function FilterSummaryBar({ filters, onClearAll, onRemove }) {
  const items = [];
  if (filters.province) items.push({ key: "province", label: filters.province });
  if (filters.district) items.push({ key: "district", label: filters.district });
  if (filters.area) items.push({ key: "area", label: filters.area });
  if (filters.sport) items.push({ key: "sport", label: filters.sport });
  const cl = chipLabel(COACH_LEVEL_OPTIONS, filters.coachLevel);
  if (cl) items.push({ key: "coachLevel", label: cl });
  const st = chipLabel(SESSION_TYPE_OPTIONS, filters.sessionType);
  if (st) items.push({ key: "sessionType", label: st });
  if (filters.genderPref === "male") items.push({ key: "genderPref", label: "Male coach" });
  if (filters.genderPref === "female") items.push({ key: "genderPref", label: "Female coach" });
  if (filters.experienceLevel) items.push({ key: "experienceLevel", label: `Exp: ${filters.experienceLevel}` });
  if (filters.priceRange) items.push({ key: "priceRange", label: `Price: ${filters.priceRange}` });
  filters.availabilityDays.forEach((d) => items.push({ key: `day:${d}`, label: d }));

  if (!items.length) return null;

  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Active:</span>
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            onClick={() => onRemove(it.key)}
            className="group"
          >
            <StatusBadge variant="default" className="pr-1">
              {it.label}
              <span className="ml-1 text-slate-400 group-hover:text-slate-700">×</span>
            </StatusBadge>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="shrink-0 text-xs font-extrabold text-emerald-700 hover:text-emerald-800"
      >
        Clear all
      </button>
    </div>
  );
}

export default FilterSummaryBar;
