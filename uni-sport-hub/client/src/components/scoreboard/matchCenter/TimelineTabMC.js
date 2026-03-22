import TimelineEventItem from "./TimelineEventItem";

function TimelineTabMC({ events, match }) {
  const list = [...(events || [])].reverse();

  return (
    <div className="space-y-3">
      {list.length === 0 ? (
        <p className="text-sm font-semibold text-slate-600">No events recorded.</p>
      ) : (
        list.map((e) => (
          <TimelineEventItem
            key={e.id}
            event={e}
            teamAName={match.teamA.shortName}
            teamBName={match.teamB.shortName}
          />
        ))
      )}
    </div>
  );
}

export default TimelineTabMC;
