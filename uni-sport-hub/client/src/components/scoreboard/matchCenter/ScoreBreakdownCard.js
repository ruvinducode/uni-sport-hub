import SectionCard from "../SectionCard";

function FootballBreakdown({ breakdown, homeName, awayName }) {
  const b = breakdown || {};
  return (
    <div className="space-y-4">
      <SectionCard title="Half-by-half" kicker="Football">
        <div className="gap-2 space-y-2">
          {(b.halves || []).map((h) => (
            <div key={h.name} className="flex justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold">
              <span>{h.name}</span>
              <span className="font-extrabold tabular-nums">
                {h.home} — {h.away}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Goals" kicker="Scorers">
        <ul className="space-y-2 text-sm font-semibold text-slate-700">
          {(b.goals || []).map((g, i) => (
            <li key={i}>
              {g.minute} · {g.player} ({g.team === "home" ? homeName : awayName})
            </li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard title="Cards & substitutions">
        <div className="grid gap-4 lg:grid-cols-2">
          <ul className="space-y-1 text-sm font-semibold text-slate-700">
            {(b.cards || []).map((c, i) => (
              <li key={i}>
                {c.minute} {c.kind} · {c.player}
              </li>
            ))}
          </ul>
          <ul className="space-y-1 text-sm font-semibold text-slate-700">
            {(b.subs || []).map((s, i) => (
              <li key={i}>
                {s.minute} {s.off} → {s.on}
              </li>
            ))}
          </ul>
        </div>
      </SectionCard>
    </div>
  );
}

function CricketBreakdown({ breakdown }) {
  const b = breakdown || {};
  return (
    <div className="space-y-4">
      <SectionCard title="Innings" kicker="Cricket">
        {(b.innings || []).length === 0 ? (
          <p className="text-sm font-semibold text-slate-600">Scorecard populates when innings start.</p>
        ) : (
          <div className="space-y-4">
            {b.innings.map((inn, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-extrabold text-slate-900">
                  {inn.team} — {inn.runs}/{inn.wickets} ({inn.overs} ov)
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
          <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm font-semibold">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">RR: {b.projected.runRate}</div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">Par: {b.projected.parScore}</div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function BasketballBreakdown({ breakdown }) {
  const b = breakdown || {};
  return (
    <div className="space-y-4">
      <SectionCard title="Quarter scores" kicker="Basketball">
        <div className="space-y-2">
          {(b.quarters || []).map((q) => (
            <div key={q.name} className="flex justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold">
              <span>{q.name}</span>
              <span className="font-extrabold tabular-nums">
                {q.home} — {q.away}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
      {b.topPerformer && (
        <SectionCard title="Top performer">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-extrabold text-emerald-900">
            {b.topPerformer.name} — {b.topPerformer.points} PTS
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function ScoreBreakdownCard({ match }) {
  const sb = match.scoreBreakdown || { type: match.sportType };
  if (sb.type === "football" || match.sportType === "football") {
    return <FootballBreakdown breakdown={sb} homeName={match.teamA.shortName} awayName={match.teamB.shortName} />;
  }
  if (sb.type === "cricket" || match.sportType === "cricket") {
    return <CricketBreakdown breakdown={sb} />;
  }
  if (sb.type === "basketball" || match.sportType === "basketball") {
    return <BasketballBreakdown breakdown={sb} />;
  }
  return <p className="text-sm font-semibold text-slate-600">No breakdown for this sport.</p>;
}

export default ScoreBreakdownCard;
