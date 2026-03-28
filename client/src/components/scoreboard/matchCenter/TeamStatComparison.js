function TeamStatComparison({ rows, homeLabel, awayLabel }) {
  if (!rows?.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-600">
        No team stats available yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const h = Number(row.home) || 0;
        const a = Number(row.away) || 0;
        const sum = h + a || 1;
        const pctH = Math.round((h / sum) * 100);
        return (
          <div
            key={row.id || row.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 text-sm font-extrabold tabular-nums text-slate-900">
              <span className="min-w-0 truncate text-left">{homeLabel}</span>
              <span className="shrink-0 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {row.label}
              </span>
              <span className="min-w-0 truncate text-right">{awayLabel}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-lg font-extrabold tabular-nums">
              <span>{row.home}</span>
              <span>{row.away}</span>
            </div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="bg-emerald-500 transition-all" style={{ width: `${pctH}%` }} />
              <div className="bg-slate-400" style={{ width: `${100 - pctH}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TeamStatComparison;
