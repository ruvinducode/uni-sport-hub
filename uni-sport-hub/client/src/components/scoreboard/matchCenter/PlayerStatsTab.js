import { useState } from "react";
import PlayerStatsTable from "./PlayerStatsTable";

function PlayerStatsTab({ match }) {
  const [side, setSide] = useState("home");
  const team = side === "home" ? match.teamA : match.teamB;
  const players = team.players || [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSide("home")}
          className={`rounded-full border px-4 py-2 text-xs font-extrabold ${
            side === "home" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-800"
          }`}
        >
          {match.teamA.name}
        </button>
        <button
          type="button"
          onClick={() => setSide("away")}
          className={`rounded-full border px-4 py-2 text-xs font-extrabold ${
            side === "away" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-800"
          }`}
        >
          {match.teamB.name}
        </button>
      </div>
      <PlayerStatsTable players={players} sportType={match.sportType} title={`${team.shortName || team.name} — roster`} />
    </div>
  );
}

export default PlayerStatsTab;
