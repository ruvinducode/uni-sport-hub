import TimelineEventCard from "../TimelineEventCard";

function TimelineTab({ events }) {
  const list = events || [];
  return (
    <div className="space-y-3">
      {list.length === 0 ? (
        <p className="text-sm font-semibold text-slate-600">No events yet.</p>
      ) : (
        list.map((e) => <TimelineEventCard key={e.id} event={e} />)
      )}
    </div>
  );
}

export default TimelineTab;
