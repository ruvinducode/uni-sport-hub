import SectionCard from "../SectionCard";
import TeamStatComparison from "./TeamStatComparison";

function TeamStatsTab({ match }) {
  const rows = match.teamStatsRows || match.stats?.items || [];

  return (
    <SectionCard title="Side-by-side comparison" kicker="Team">
      <TeamStatComparison rows={rows} homeLabel={match.teamA.shortName} awayLabel={match.teamB.shortName} />
    </SectionCard>
  );
}

export default TeamStatsTab;
