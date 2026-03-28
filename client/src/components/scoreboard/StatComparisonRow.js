function StatComparisonRow({ label, home, away }) {
  const h = Number(home) || 0;
  const a = Number(away) || 0;
  const sum = h + a || 1;
  const pctH = Math.round((h / sum) * 100);
  const pctA = 100 - pctH;

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div className="flex items-center justify-between gap-3 text-xs font-extrabold text-slate-600">
        <span className="tabular-nums text-slate-900">{home}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <span className="tabular-nums text-slate-900">{away}</span>
      </div>
      <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="bg-emerald-500" style={{ width: `${pctH}%` }} aria-hidden />
        <div className="bg-slate-400" style={{ width: `${pctA}%` }} aria-hidden />
      </div>
    </div>
  );
}

export default StatComparisonRow;
