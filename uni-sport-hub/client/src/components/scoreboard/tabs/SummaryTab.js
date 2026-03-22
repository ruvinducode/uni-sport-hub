import SectionCard from "../SectionCard";

function SummaryTab({ match }) {
  const s = match.summary || {};
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard kicker="Overview" title="Current picture">
        <p className="text-sm font-semibold leading-relaxed text-slate-700">{match.summaryText}</p>
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Result line</p>
          <p className="mt-2 text-lg font-extrabold text-slate-900">
            {match.teamA.name}{" "}
            <span className="tabular-nums text-emerald-700">
              {match.teamA.score} — {match.teamB.score}
            </span>{" "}
            {match.teamB.name}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-600">{match.matchNote}</p>
        </div>
      </SectionCard>

      <SectionCard kicker="Feed" title="Recent updates">
        <ul className="space-y-3">
          {(s.recentUpdates || []).map((u) => (
            <li key={u.id} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              {u.text}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard kicker="Highlights" title="Key moments">
        <ul className="space-y-2">
          {(s.highlights || []).map((h) => (
            <li key={h.id} className="flex gap-2 text-sm font-semibold text-slate-700">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              {h.text}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard kicker="Snapshot" title="Mini stats">
        <div className="grid gap-3 sm:grid-cols-2">
          {(s.miniStats || []).map((m) => (
            <div key={m.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{m.label}</p>
              <p className="mt-1 text-base font-extrabold text-slate-900">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {(s.progression || []).map((p) => (
            <div key={p.label} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 text-sm font-semibold">
              <span className="text-slate-600">{p.label}</span>
              <span className="font-extrabold text-slate-900">{p.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default SummaryTab;
