import ScoreSummaryHeader from "../ScoreSummaryHeader";

/** Sticky hero header for Match Center — reuses ScoreSummaryHeader styling. */
function MatchHeader({ match }) {
  return (
    <div className="relative">
      <ScoreSummaryHeader match={match} />
    </div>
  );
}

export default MatchHeader;
