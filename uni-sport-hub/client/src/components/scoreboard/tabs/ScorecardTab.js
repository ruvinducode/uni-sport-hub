import SectionCard from "../SectionCard";

function FootballCard({ breakdown, homeName, awayName }) {
  const b = breakdown || {};
  return (
    <div className="space-y-4">
      <SectionCard title="Half-by-half">
        <div className="grid gap-2">
          {(b.halves || []).map((h) => (
            <div
              key={h.name}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold"
            >
              <span className="text-slate-600">{h.name}</span>
              <span className="font-extrabold tabular-nums text-slate-900">
                {h.home} — {h.away}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Goal scorers">
        <ul className="space-y-2">
          {(b.goals || []).map((g, i) => (
            <li key={i} className="text-sm font-semibold text-slate-700">
              <span className="font-extrabold text-emerald-700">{g.minute}</span> {g.player} ({g.team === "home" ? homeName : awayName})
            </li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard title="Cards & subs">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase text-slate-500">Cards</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700">
              {(b.cards || []).map((c, i) => (
                <li key={i}>
                  {c.minute} {c.kind} · {c.player}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase text-slate-500">Substitutions</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700">
              {(b.subs || []).map((s, i) => (
                <li key={i}>
                  {s.minute} {s.off} → {s.on}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function CricketCard({ breakdown }) {
  const b = breakdown || {};
  return (
    <div className="space-y-4">
      <SectionCard title="Innings & projections">
        {(b.innings || []).length === 0 ? (
          <p className="text-sm font-semibold text-slate-600">Scorecard will populate once the match starts.</p>
        ) : (
          <div className="space-y-4">
            {b.innings.map((inn, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-extrabold text-slate-900">
                  {inn.team} — {inn.runs}/{inn.wickets} ({inn.overs} ov) · RR {inn.runRate}
                </p>
                <p className="mt-2 text-xs font-bold uppercase text-slate-500">Batting</p>
                <ul className="mt-1 text-sm font-semibold text-slate-700">
                  {(inn.batting || []).map((x, i) => (
                    <li key={i}>
                      {x.name} {x.r} ({x.b})
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs font-bold uppercase text-slate-500">Bowling</p>
                <ul className="mt-1 text-sm font-semibold text-slate-700">
                  {(inn.bowling || []).map((x, i) => (
                    <li key={i}>
                      {x.name} {x.fig} · Econ {x.econ}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {b.projected && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold">
              Run rate: {b.projected.runRate}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold">
              Par score: {b.projected.parScore}
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function BasketballCard({ breakdown }) {
  const b = breakdown || {};
  return (
    <div className="space-y-4">
      <SectionCard title="Quarter breakdown">
        <div className="grid gap-2">
          {(b.quarters || []).map((q) => (
            <div
              key={q.name}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold"
            >
              <span>{q.name}</span>
              <span className="font-extrabold tabular-nums text-slate-900">
                {q.home} — {q.away}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
      {b.topPerformer && (
        <SectionCard title="Top performer">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-extrabold text-emerald-900">{b.topPerformer.name}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-800">
              {b.topPerformer.points} PTS · {b.topPerformer.team === "home" ? "Home" : "Away"}
            </p>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function ScorecardTab({ match }) {
  const sb = match.scoreBreakdown || { type: match.sportType };
  if (sb.type === "football" || match.sportType === "football") {
    return <FootballCard breakdown={sb} homeName={match.teamA.shortName} awayName={match.teamB.shortName} />;
  }
  if (sb.type === "cricket" || match.sportType === "cricket") {
    return <CricketCard breakdown={sb} />;
  }
  if (sb.type === "basketball" || match.sportType === "basketball") {
    return <BasketballCard breakdown={sb} />;
  }
  return <p className="text-sm font-semibold text-slate-600">Score breakdown not available for this sport.</p>;
}

export default ScorecardTab;
