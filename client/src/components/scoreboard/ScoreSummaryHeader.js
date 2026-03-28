import StatusBadge from "./StatusBadge";
import TeamAvatar from "./TeamAvatar";

function ScoreSummaryHeader({ match }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-5 py-8 text-white shadow-lg sm:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_0%,rgba(52,211,153,0.35),transparent_50%)]" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-200/90">
            {match.leagueName}
          </p>
          <StatusBadge status={match.status} />
        </div>

        <div className="mt-6 grid items-center gap-6 lg:grid-cols-3">
          <div className="flex items-center gap-4">
            <TeamAvatar shortName={match.teamA.shortName} className="border-white/10 bg-white/10 text-white" />
            <div>
              <p className="text-lg font-extrabold">{match.teamA.name}</p>
              <p className="text-xs font-semibold text-slate-300">{match.teamA.shortName}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-4xl font-extrabold tabular-nums sm:text-5xl">
              {match.status === "upcoming" ? (
                <span className="text-slate-200">vs</span>
              ) : (
                <>
                  {match.teamA.score} <span className="text-slate-400">—</span> {match.teamB.score}
                </>
              )}
            </p>
            <p className="mt-2 text-sm font-bold text-emerald-200">{match.phaseText || match.matchStateText}</p>
            {match.scoreSummary && (
              <p className="mt-1 text-sm font-bold text-emerald-100/95">{match.scoreSummary}</p>
            )}
            <p className="mt-1 text-xs font-semibold text-slate-300">{match.summaryText}</p>
          </div>

          <div className="flex items-center justify-end gap-4 lg:text-right">
            <div>
              <p className="text-lg font-extrabold">{match.teamB.name}</p>
              <p className="text-xs font-semibold text-slate-300">{match.teamB.shortName}</p>
            </div>
            <TeamAvatar shortName={match.teamB.shortName} className="border-white/10 bg-white/10 text-white" />
          </div>
        </div>

        <div className="mt-6 grid gap-2 border-t border-white/10 pt-6 text-xs font-semibold text-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          <p>
            <span className="text-slate-400">Venue </span>
            {match.venue}
          </p>
          <p>
            <span className="text-slate-400">Date </span>
            {new Date(match.date).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric" })}{" "}
            · {match.time}
          </p>
          <p>
            <span className="text-slate-400">Officials </span>
            {match.referee || "—"}
          </p>
          <p>
            <span className="text-slate-400">Note </span>
            {match.matchNote || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScoreSummaryHeader;
