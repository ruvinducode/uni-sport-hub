function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900">{value ?? "—"}</dd>
    </div>
  );
}

function InfoList({ items }) {
  return (
    <dl className="divide-y divide-slate-100">
      {items.map((it) => (
        <Row key={it.label} label={it.label} value={it.value} />
      ))}
    </dl>
  );
}

export default InfoList;
