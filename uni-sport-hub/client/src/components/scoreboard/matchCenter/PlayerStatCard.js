function Chip({ children }) {
  return (
    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-extrabold text-slate-700">
      {children}
    </span>
  );
}

function PlayerStatCard({ player, sportType }) {
  const st = player.stats || {};
  const fb = st.football;
  const cr = st.cricket;
  const bb = st.basketball;

  const statusClass =
    player.status === "active"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : player.status === "substituted"
        ? "bg-amber-50 text-amber-900 border-amber-200"
        : player.status === "benched"
          ? "bg-slate-100 text-slate-700 border-slate-200"
          : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-white text-sm font-extrabold text-slate-800">
          {player.number ?? "—"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-extrabold text-slate-900">{player.name}</p>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase ${statusClass}`}>
              {player.status}
            </span>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">
            {player.position} · {player.role}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sportType === "football" && fb && (
          <>
            <Chip>G {fb.goals}</Chip>
            <Chip>A {fb.assists}</Chip>
            <Chip>Sh {fb.shots}</Chip>
            <Chip>Pas {fb.passes}</Chip>
            <Chip>Tck {fb.tackles}</Chip>
            <Chip>Min {fb.minutesPlayed}</Chip>
            {(fb.yellowCards > 0 || fb.redCards > 0) && (
              <Chip>
                Y/R {fb.yellowCards}/{fb.redCards}
              </Chip>
            )}
          </>
        )}
        {sportType === "cricket" && cr && (
          <>
            <Chip>R {cr.runs}</Chip>
            <Chip>B {cr.balls}</Chip>
            <Chip>4s/6s {cr.fours}/{cr.sixes}</Chip>
            <Chip>W {cr.wickets}</Chip>
            <Chip>O {cr.overs}</Chip>
            <Chip>Eco {cr.economy}</Chip>
          </>
        )}
        {sportType === "basketball" && bb && (
          <>
            <Chip>PTS {bb.points}</Chip>
            <Chip>REB {bb.rebounds}</Chip>
            <Chip>AST {bb.assists}</Chip>
            <Chip>STL {bb.steals}</Chip>
            <Chip>BLK {bb.blocks}</Chip>
            <Chip>MIN {bb.minutesPlayed}</Chip>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerStatCard;
