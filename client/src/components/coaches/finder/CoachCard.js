import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";
import { sessionTypeLabel } from "./SessionTypeLabel";

function ModeChips({ modes }) {
  const labels = [];
  if (modes.includes("in-person")) labels.push("In-person");
  if (modes.includes("online")) labels.push("Online");
  if (modes.includes("both")) labels.push("Both");
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {labels.map((m) => (
        <span
          key={m}
          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600"
        >
          {m}
        </span>
      ))}
    </div>
  );
}

function CoachCard({ coach }) {
  const sessionPreview = coach.sessionTypes.slice(0, 2).map(sessionTypeLabel).join(" · ");

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-4">
        <img
          src={coach.avatar}
          alt=""
          className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-2 ring-slate-100"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-extrabold text-slate-900">{coach.fullName}</h3>
            {coach.verified && <StatusBadge variant="success">Verified</StatusBadge>}
            {coach.topRated && <StatusBadge variant="warning">Top rated</StatusBadge>}
            {coach.youthSpecialist && <StatusBadge variant="info">Youth</StatusBadge>}
          </div>
          <p className="mt-1 text-sm font-bold text-emerald-700">{coach.sport}</p>
          <p className="mt-0.5 text-xs font-semibold text-slate-600 line-clamp-2">{coach.specialization}</p>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold text-slate-500">
        {coach.district} · {coach.area}
      </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {coach.experienceYears}+ yrs
            {coach.coachLevel === "school" && " · School focus"}
            {coach.coachLevel === "university" && " · Campus focus"}
            {coach.coachLevel === "both" && " · School & campus"}
          </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-extrabold text-slate-900">LKR {coach.pricePerSession.toLocaleString()}</p>
          <p className="text-[11px] font-bold text-slate-500">per session</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-extrabold text-slate-900">★ {coach.rating}</p>
          <p className="text-[11px] font-semibold text-slate-500">{coach.reviewCount} reviews</p>
        </div>
      </div>

      <p className="mt-2 text-[11px] font-semibold text-slate-500">Sessions: {sessionPreview}</p>
      <ModeChips modes={coach.coachingModes} />

      <div className="mt-4 grid flex-1 grid-cols-2 gap-2">
        <Link
          to={`/coaches/${coach.id}`}
          className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-center text-xs font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          View Profile
        </Link>
        <Link
          to={`/coaches/${coach.id}/book`}
          className="flex items-center justify-center rounded-2xl bg-slate-900 px-3 py-2.5 text-center text-xs font-extrabold text-white shadow-sm transition hover:bg-slate-700"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}

export default CoachCard;
