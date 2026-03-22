import SectionCard from "../SectionCard";

function OverviewTab({ match }) {
  const s = match.summary || {};
  const keys = match.overview?.keyHighlights || [];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard kicker="Snapshot" title="Match summary">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">Score</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">
            {match.teamA.score} <span className="text-slate-400">—</span> {match.teamB.score}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{match.phaseText || match.matchStateText}</p>
        </div>
        <div className="mt-4 space-y-2">
          {(s.recentUpdates || []).slice(0, 4).map((u) => (
            <div key={u.id} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              {u.text}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard kicker="Highlights" title="Key performers & indicators">
        <div className="grid gap-3 sm:grid-cols-2">
          {keys.map((k) => (
            <div key={k.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{k.label}</p>
              <p className="mt-1 text-sm font-extrabold text-slate-900">{k.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Momentum</p>
          <ul className="mt-2 space-y-2">
            {(s.highlights || []).map((h) => (
              <li key={h.id} className="flex gap-2 text-sm font-semibold text-slate-700">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                {h.text}
              </li>
            ))}
          </ul>
        </div>
      </SectionCard>

      <SectionCard kicker="Form" title="Quick stats" className="lg:col-span-2">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(s.miniStats || []).map((m) => (
            <div key={m.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{m.label}</p>
              <p className="mt-1 text-base font-extrabold text-slate-900">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {(s.progression || []).map((p) => (
            <div key={p.label} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm font-semibold">
              <span className="text-slate-600">{p.label}</span>
              <span className="font-extrabold text-slate-900">{p.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default OverviewTab;
