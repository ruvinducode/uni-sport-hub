import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import TeamAvatar from "./TeamAvatar";

const detailPath = (id) => `/scoreboard/${id}`;

function sportLabel(s) {
  if (s === "football") return "Football";
  if (s === "cricket") return "Cricket";
  if (s === "basketball") return "Basketball";
  if (s === "rugby") return "Rugby";
  return s;
}

function ScoreMatchCard({ match, onToggleFavorite }) {
  const scoreOrVs = () => {
    if (match.status === "upcoming") return "vs";
    if (match.sportType === "cricket" && match.status === "upcoming") return "vs";
    return `${match.teamA.score} — ${match.teamB.score}`;
  };

  return (
    <article className="group relative rounded-3xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={detailPath(match.id)}
        className="block p-5 outline-none ring-emerald-500/0 focus-visible:ring-2"
        aria-label={`Open match center: ${match.teamA.name} vs ${match.teamB.name}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{match.leagueName}</p>
            <p className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-700">
              {match.sportLabel || sportLabel(match.sportType)}
            </p>
          </div>
          <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
            <button
              type="button"
              aria-label={match.favorite ? "Remove favorite" : "Add favorite"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite?.(match.id);
              }}
              className="relative z-10 rounded-xl border border-slate-200 bg-white p-2 text-amber-500 hover:bg-slate-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill={match.favorite ? "currentColor" : "none"} stroke="currentColor">
                <path
                  strokeWidth="2"
                  d="M12 3l2.9 6.12L21 10.2l-5 4.9L17.18 21 12 17.77 6.82 21 8 15.1l-5-4.9 6.1-.92L12 3z"
                />
              </svg>
            </button>
            <StatusBadge status={match.status} />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <TeamAvatar shortName={match.teamA.shortName} />
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-slate-900 group-hover:text-emerald-800">{match.teamA.name}</p>
              <p className="text-[11px] font-semibold text-slate-500">{match.teamA.shortName}</p>
            </div>
          </div>
          <div className="shrink-0 text-center">
            <p className="text-2xl font-extrabold tabular-nums text-slate-900">{scoreOrVs()}</p>
            <p className="mt-1 text-[11px] font-bold text-slate-500">{match.matchStateText}</p>
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-3 text-right">
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-slate-900 group-hover:text-emerald-800">{match.teamB.name}</p>
              <p className="text-[11px] font-semibold text-slate-500">{match.teamB.shortName}</p>
            </div>
            <TeamAvatar shortName={match.teamB.shortName} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
          <span>{match.venue}</span>
          <span>
            {new Date(match.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })} · {match.time}
          </span>
        </div>

        <span className="mt-4 flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-slate-800">
          Open match center
        </span>
      </Link>
    </article>
  );
}

export default ScoreMatchCard;
