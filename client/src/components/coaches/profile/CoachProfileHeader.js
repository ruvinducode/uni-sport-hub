import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";
import { sessionTypeLabel } from "../finder/SessionTypeLabel";

function CoachProfileHeader({ coach, onBook, onSave, saved }) {
  const modes = [];
  if (coach.coachingModes.includes("in-person")) modes.push("In-person");
  if (coach.coachingModes.includes("online")) modes.push("Online");
  if (coach.coachingModes.includes("both")) modes.push("Both");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <img
          src={coach.avatar}
          alt=""
          className="h-32 w-32 shrink-0 rounded-3xl object-cover ring-4 ring-emerald-50 lg:h-40 lg:w-40"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {coach.fullName}
            </h1>
            {coach.verified && <StatusBadge variant="success">Verified</StatusBadge>}
            {coach.topRated && <StatusBadge variant="warning">Top rated</StatusBadge>}
            {coach.youthSpecialist && <StatusBadge variant="info">Youth specialist</StatusBadge>}
          </div>
          <p className="mt-2 text-lg font-bold text-emerald-700">{coach.sport}</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">{coach.specialization}</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {coach.province} · {coach.district} · {coach.area}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {coach.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-bold text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">
            Modes: {modes.join(" · ")} · Sessions:{" "}
            {coach.sessionTypes.map(sessionTypeLabel).join(", ")}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-56 lg:shrink-0">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Session fee</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              LKR {coach.pricePerSession.toLocaleString()}
            </p>
            <p className="text-[11px] font-semibold text-slate-500">per session (mock)</p>
          </div>
          <button
            type="button"
            onClick={onBook}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-700"
          >
            Book Session
          </button>
          <button
            type="button"
            onClick={onSave}
            className={`w-full rounded-2xl border px-4 py-3 text-sm font-extrabold shadow-sm transition ${
              saved
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
            }`}
          >
            {saved ? "Saved" : "Save Coach"}
          </button>
          <Link
            to="/coaches"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Back to Coaches
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CoachProfileHeader;
