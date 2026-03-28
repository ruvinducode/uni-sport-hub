function BookingSummaryCard({ coach, sport, area, sessionTypeLabelText, date, time, fee, sessionType }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Booking summary</p>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <span className="font-semibold text-slate-500">Coach</span>
          <span className="text-right font-extrabold text-slate-900">{coach.fullName}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="font-semibold text-slate-500">Sport</span>
          <span className="text-right font-extrabold text-slate-900">{sport}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="font-semibold text-slate-500">Area</span>
          <span className="text-right font-extrabold text-slate-900">{area || "—"}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="font-semibold text-slate-500">Session type</span>
          <span className="text-right font-extrabold text-slate-900">{sessionTypeLabelText || "—"}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="font-semibold text-slate-500">Preferred</span>
          <span className="text-right font-extrabold text-slate-900">
            {date || "—"} {time ? `· ${time}` : ""}
          </span>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <div className="flex justify-between gap-3">
            <span className="font-semibold text-slate-500">Fee (guide)</span>
            <span className="font-extrabold text-emerald-700">LKR {fee?.toLocaleString?.() ?? fee}</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-400">
            Final pricing may vary by package.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingSummaryCard;
