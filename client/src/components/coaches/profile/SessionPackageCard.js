import SectionCard from "../shared/SectionCard";

function SessionPackageCard({ packages }) {
  return (
    <SectionCard kicker="Packages" title="Session options">
      <div className="grid gap-4 sm:grid-cols-2">
        {packages.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
          >
            <p className="text-sm font-extrabold text-slate-900">{p.title}</p>
            <p className="mt-2 text-2xl font-extrabold text-emerald-700">LKR {p.price.toLocaleString()}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{p.sessions} sessions</p>
            {p.note && <p className="mt-3 text-sm font-semibold text-slate-600">{p.note}</p>}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default SessionPackageCard;
