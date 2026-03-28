import SectionCard from "../shared/SectionCard";

function CoachAboutSection({ coach }) {
  return (
    <SectionCard kicker="About" title="Coach story">
      {coach.schoolOrUniversityExperience && (
        <p className="text-sm font-bold text-emerald-800">
          {coach.schoolOrUniversityExperience}
        </p>
      )}
      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">{coach.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {coach.languages.map((lang) => (
          <span
            key={lang}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
          >
            {lang}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}

export default CoachAboutSection;
