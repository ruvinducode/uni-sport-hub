import SectionCard from "../SectionCard";
import LineupList from "./LineupList";

function LineupsTabMC({ match }) {
  const L = match.lineupDetail;

  if (!L) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title={match.teamA.name} kicker="Home">
          <ul className="space-y-2">
            {(match.lineups?.home || []).map((line, i) => (
              <li key={i} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold">
                {line}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title={match.teamB.name} kicker="Away">
          <ul className="space-y-2">
            {(match.lineups?.away || []).map((line, i) => (
              <li key={i} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold">
                {line}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title={match.teamA.name} kicker="Home">
        <LineupList lineup={L.home} />
      </SectionCard>
      <SectionCard title={match.teamB.name} kicker="Away">
        <LineupList lineup={L.away} />
      </SectionCard>
    </div>
  );
}

export default LineupsTabMC;
