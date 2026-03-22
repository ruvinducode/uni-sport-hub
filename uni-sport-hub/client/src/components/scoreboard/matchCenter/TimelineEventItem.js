const TYPE_STYLES = {
  goal: "bg-emerald-100 text-emerald-900 border-emerald-200",
  card: "bg-amber-100 text-amber-900 border-amber-200",
  wicket: "bg-rose-100 text-rose-900 border-rose-200",
  boundary: "bg-sky-100 text-sky-900 border-sky-200",
  timeout: "bg-slate-100 text-slate-800 border-slate-200",
  score: "bg-emerald-100 text-emerald-900 border-emerald-200",
  end: "bg-slate-200 text-slate-900 border-slate-300",
  info: "bg-white text-slate-800 border-slate-200",
  substitution: "bg-violet-100 text-violet-900 border-violet-200",
};

function TimelineEventItem({ event, teamAName, teamBName }) {
  const side =
    event.teamSide === "home" ? teamAName : event.teamSide === "away" ? teamBName : "Match";
  const badge = TYPE_STYLES[event.type] || TYPE_STYLES.info;

  return (
    <article className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-900 text-white">
        <span className="text-[10px] font-bold uppercase text-slate-300">Time</span>
        <span className="text-xs font-extrabold tabular-nums">{event.minuteOrTime}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${badge}`}>
            {event.type}
          </span>
          <span className="text-[11px] font-bold text-slate-500">{side}</span>
        </div>
        <h3 className="mt-1 text-sm font-extrabold text-slate-900">{event.title}</h3>
        <p className="mt-0.5 text-sm font-semibold text-slate-600">{event.description}</p>
        {event.player && (
          <p className="mt-1 text-xs font-bold text-slate-500">
            Player: {event.player}
            {event.playerId && <span className="ml-1 font-mono text-slate-400">({event.playerId})</span>}
          </p>
        )}
      </div>
    </article>
  );
}

export default TimelineEventItem;
