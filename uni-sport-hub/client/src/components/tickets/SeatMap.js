const statusClass = (selected, unavailable) => {
  if (unavailable) return "border-slate-300 bg-slate-200 text-slate-400 cursor-not-allowed line-through";
  if (selected) return "border-emerald-600 bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-2";
  return "border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/80";
};

function SeatMap({
  rows,
  cols,
  unavailableSet,
  selectedIds,
  onToggle,
  maxSelectable = 8,
}) {
  const colLabels = Array.from({ length: cols }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <p id="seat-map-help" className="mb-3 text-xs font-semibold text-slate-600">
        Tap seats to select. Selected seats are highlighted in green. Unavailable seats are greyed out.
      </p>
      <div className="inline-block min-w-full">
        <div className="mb-2 flex justify-center">
          <div
            className="rounded-full border border-dashed border-slate-300 bg-white px-6 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500"
            role="img"
            aria-label="Field direction"
          >
            Pitch / stage
          </div>
        </div>
        <div className="flex">
          <div className="w-8 shrink-0" aria-hidden />
          <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {colLabels.map((c) => (
              <div key={c} className="text-center text-[10px] font-bold text-slate-400">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-1 space-y-1">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-1">
              <div className="w-8 shrink-0 text-center text-xs font-extrabold text-slate-500">{row}</div>
              <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {colLabels.map((col) => {
                  const seatId = `${row}-${col}`;
                  const unavailable = unavailableSet.has(seatId);
                  const selected = selectedIds.includes(seatId);
                  const disabled =
                    unavailable || (!selected && selectedIds.length >= maxSelectable);
                  return (
                    <button
                      key={seatId}
                      type="button"
                      disabled={disabled}
                      aria-pressed={selected}
                      aria-label={`Seat ${row}${col}${unavailable ? " unavailable" : selected ? " selected" : ""}`}
                      className={`flex h-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border text-[11px] font-bold transition sm:h-8 sm:min-h-0 sm:min-w-0 ${statusClass(selected, unavailable)}`}
                      onClick={() => !unavailable && onToggle(seatId)}
                    >
                      <span className="sr-only sm:not-sr-only">{col}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500" aria-live="polite">
        Up to {maxSelectable} seats per order (demo limit).
      </p>
    </div>
  );
}

export default SeatMap;
