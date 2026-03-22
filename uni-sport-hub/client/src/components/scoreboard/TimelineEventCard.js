const TYPE = {
  goal: "border-emerald-200 bg-emerald-50 text-emerald-900",
  card: "border-amber-200 bg-amber-50 text-amber-900",
  wicket: "border-rose-200 bg-rose-50 text-rose-900",
  boundary: "border-sky-200 bg-sky-50 text-sky-900",
  timeout: "border-slate-200 bg-white text-slate-800",
  score: "border-emerald-200 bg-emerald-50 text-emerald-900",
  end: "border-slate-200 bg-slate-100 text-slate-800",
  info: "border-slate-200 bg-white text-slate-800",
};

function TimelineEventCard({ event }) {
  const badge = TYPE[event.type] || TYPE.info;
  return (
    <article className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase ${badge}`}>
          {event.type}
        </span>
        <span className="text-[11px] font-bold text-slate-500">{event.minuteOrTime}</span>
      </div>
      <h3 className="mt-2 text-sm font-extrabold text-slate-900">{event.title}</h3>
      <p className="mt-1 text-sm font-semibold text-slate-600">{event.description}</p>
      {event.player && (
        <p className="mt-2 text-xs font-bold text-slate-500">Player: {event.player}</p>
      )}
    </article>
  );
}

export default TimelineEventCard;
