import TeamAvatar from "./TeamAvatar";

function TeamScoreBlock({ team, align = "left" }) {
  const isRight = align === "right";
  return (
    <div className={`flex items-center gap-3 ${isRight ? "flex-row-reverse text-right" : ""}`}>
      <TeamAvatar shortName={team.shortName} />
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-slate-900">{team.name}</p>
        <p className="text-[11px] font-semibold text-slate-500">{team.shortName}</p>
      </div>
    </div>
  );
}

export default TeamScoreBlock;
