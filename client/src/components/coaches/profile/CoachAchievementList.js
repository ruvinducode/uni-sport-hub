import SectionCard from "../shared/SectionCard";

function CoachAchievementList({ achievements, certifications }) {
  return (
    <SectionCard kicker="Credentials" title="Achievements & certifications">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Achievements</p>
          <ul className="mt-2 space-y-2">
            {achievements.map((a) => (
              <li key={a} className="flex gap-2 text-sm font-semibold text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Certifications</p>
          <ul className="mt-2 space-y-2">
            {certifications.map((c) => (
              <li key={c} className="flex gap-2 text-sm font-semibold text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

export default CoachAchievementList;
