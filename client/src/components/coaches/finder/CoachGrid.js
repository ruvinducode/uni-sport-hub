import CoachCard from "./CoachCard";

function CoachGrid({ coaches }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
      {coaches.map((c) => (
        <CoachCard key={c.id} coach={c} />
      ))}
    </div>
  );
}

export default CoachGrid;
