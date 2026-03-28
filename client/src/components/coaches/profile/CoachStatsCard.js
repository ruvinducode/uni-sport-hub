import SectionCard from "../shared/SectionCard";

function CoachStatsCard({ coach }) {
  const stats = [
    { label: "Experience", value: `${coach.experienceYears}+ years` },
    { label: "Rating", value: `★ ${coach.rating}` },
    { label: "Reviews", value: String(coach.reviewCount) },
    { label: "Sport", value: coach.sport },
  ];
  return (
    <SectionCard kicker="Snapshot" title="At a glance">
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{s.label}</p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default CoachStatsCard;
