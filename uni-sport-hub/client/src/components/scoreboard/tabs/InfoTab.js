import InfoList from "../InfoList";

function InfoTab({ match }) {
  const items = [
    { label: "Venue", value: match.venue },
    { label: "Date", value: new Date(match.date).toLocaleDateString() },
    { label: "Start time", value: match.time },
    { label: "Competition", value: match.leagueName },
    { label: "Round / stage", value: match.roundStage },
    { label: "Officials", value: match.referee },
    { label: "Weather", value: match.weather },
    { label: "Attendance", value: match.attendance },
    { label: "Match ID", value: match.id },
    { label: "Created", value: match.createdAt && new Date(match.createdAt).toLocaleString() },
    { label: "Last updated", value: match.updatedAt && new Date(match.updatedAt).toLocaleString() },
  ];
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <InfoList items={items} />
    </div>
  );
}

export default InfoTab;
