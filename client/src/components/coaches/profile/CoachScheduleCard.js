import SectionCard from "../shared/SectionCard";

function CoachScheduleCard({ availabilityDays }) {
  const all = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <SectionCard kicker="Schedule" title="Available days">
      <div className="flex flex-wrap gap-2">
        {all.map((d) => {
          const on = availabilityDays.includes(d);
          return (
            <span
              key={d}
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                on
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-slate-50 text-slate-400 line-through"
              }`}
            >
              {d.slice(0, 3)}
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500">
        Final times are confirmed after your booking request is accepted.
      </p>
    </SectionCard>
  );
}

export default CoachScheduleCard;
