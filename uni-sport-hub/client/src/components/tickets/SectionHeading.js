function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{kicker}</span>
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
