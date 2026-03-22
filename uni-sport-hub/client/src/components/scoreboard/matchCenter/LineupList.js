function Row({ player }) {
  const st =
    player.status === "starting"
      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
      : player.status === "substituted"
        ? "bg-amber-50 text-amber-900 border-amber-200"
        : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-extrabold text-white">
          {player.number}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-slate-900">{player.name}</p>
          <p className="text-[11px] font-semibold text-slate-500">{player.position}</p>
        </div>
      </div>
      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase ${st}`}>
        {player.status}
      </span>
    </div>
  );
}

function LineupList({ lineup }) {
  if (!lineup) {
    return <p className="text-sm font-semibold text-slate-600">Lineups not available.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{lineup.coach}</p>
      <div>
        <p className="mb-2 text-[11px] font-extrabold uppercase text-slate-500">Starters</p>
        <div className="space-y-2">
          {(lineup.starters || []).map((p) => (
            <Row key={p.id} player={p} />
          ))}
        </div>
      </div>
      {(lineup.bench || []).length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-extrabold uppercase text-slate-500">Bench / substitutes</p>
          <div className="space-y-2">
            {lineup.bench.map((p) => (
              <Row key={p.id} player={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LineupList;
