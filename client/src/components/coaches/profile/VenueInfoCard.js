import SectionCard from "../shared/SectionCard";

function VenueInfoCard({ venues }) {
  return (
    <SectionCard kicker="Venue" title="Training locations">
      <div className="space-y-3">
        {venues.map((v) => (
          <div key={v.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-extrabold text-slate-900">{v.name}</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">{v.address}</p>
            <span className="mt-2 inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
              {v.type}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Map</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Map preview — connect Google Maps / Mapbox when backend is ready.
        </p>
      </div>
    </SectionCard>
  );
}

export default VenueInfoCard;
