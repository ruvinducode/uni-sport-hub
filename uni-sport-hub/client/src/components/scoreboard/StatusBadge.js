const MAP = {
  live: { label: "Live", className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  upcoming: { label: "Upcoming", className: "border-sky-200 bg-sky-50 text-sky-800" },
  completed: { label: "Finished", className: "border-slate-200 bg-slate-100 text-slate-800" },
  delayed: { label: "Delayed", className: "border-amber-200 bg-amber-50 text-amber-900" },
};

function StatusBadge({ status }) {
  const cfg = MAP[status] || MAP.upcoming;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide ${cfg.className}`}
    >
      {status === "live" && (
        <span className="mr-1.5 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
      )}
      {cfg.label}
    </span>
  );
}

export default StatusBadge;
