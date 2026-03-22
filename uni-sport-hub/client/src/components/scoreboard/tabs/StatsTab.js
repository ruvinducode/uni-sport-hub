import SectionCard from "../SectionCard";
import StatComparisonRow from "../StatComparisonRow";

function StatsTab({ match }) {
  const items = match.stats?.items || [];
  return (
    <SectionCard title="Match statistics" kicker="Comparison">
      <div className="grid gap-3 lg:grid-cols-2">
        {items.map((it) => (
          <StatComparisonRow key={it.id} label={it.label} home={it.home} away={it.away} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-sm font-semibold text-slate-600">Stats will appear once tracking begins.</p>
      )}
    </SectionCard>
  );
}

export default StatsTab;
