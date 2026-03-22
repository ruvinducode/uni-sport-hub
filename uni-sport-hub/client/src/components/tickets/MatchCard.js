import { Link } from "react-router-dom";
import { formatMatchDate } from "../../data/matches";

function MatchCard({ match }) {
  return (
    <article className="group flex flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{match.league}</p>
          <h3 className="mt-2 text-lg font-extrabold text-slate-900">
            {match.homeTeam}{" "}
            <span className="font-bold text-slate-400">vs</span> {match.awayTeam}
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-600">{match.venue}</p>
        </div>
        <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase text-emerald-800">
          {match.sport}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kickoff</p>
          <time className="text-sm font-extrabold text-slate-900" dateTime={match.dateISO}>
            {formatMatchDate(match.dateISO)}
          </time>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">From</p>
          <p className="text-lg font-extrabold tabular-nums text-emerald-700">
            ${match.priceFrom}
          </p>
        </div>
      </div>
      <Link
        to={`/matches/${match.id}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        View &amp; book
      </Link>
    </article>
  );
}

export default MatchCard;
