import PlayerStatCard from "./PlayerStatCard";

function PlayerStatsTable({ players, sportType, title }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {(players || []).map((p) => (
          <PlayerStatCard key={p.id} player={p} sportType={sportType} />
        ))}
      </div>
      {(!players || players.length === 0) && (
        <p className="text-sm font-semibold text-slate-600">No player data for this match.</p>
      )}
    </div>
  );
}

export default PlayerStatsTable;
