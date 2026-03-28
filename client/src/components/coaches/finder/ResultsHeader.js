function ResultsHeader({ count }) {
  return (
    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Results</p>
        <p className="text-xl font-extrabold text-slate-900">
          {count} coach{count === 1 ? "" : "es"} found
        </p>
      </div>
    </div>
  );
}

export default ResultsHeader;
