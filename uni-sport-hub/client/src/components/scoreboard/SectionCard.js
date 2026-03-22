function SectionCard({ title, kicker, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      {(kicker || title) && (
        <div className="mb-4">
          {kicker && (
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{kicker}</p>
          )}
          {title && <h2 className="mt-1 text-lg font-extrabold text-slate-900">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}

export default SectionCard;
