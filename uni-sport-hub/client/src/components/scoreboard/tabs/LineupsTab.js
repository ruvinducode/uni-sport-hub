import SectionCard from "../SectionCard";

function LineupsTab({ match }) {
  const L = match.lineups || { home: [], away: [] };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title={match.teamA.name} kicker="Home">
        <ul className="space-y-2">
          {(L.home || []).map((p, i) => (
            <li key={i} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              {p}
            </li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard title={match.teamB.name} kicker="Away">
        <ul className="space-y-2">
          {(L.away || []).map((p, i) => (
            <li key={i} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              {p}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

export default LineupsTab;
