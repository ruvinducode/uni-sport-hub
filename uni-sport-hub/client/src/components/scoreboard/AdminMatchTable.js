import StatusBadge from "./StatusBadge";

function AdminMatchTable({ matches, onEdit, onDelete, onSelect, onAddEvent, selectedId }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3">League</th>
            <th className="px-4 py-3">Match</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {matches.map((m) => (
            <tr key={m.id} className={selectedId === m.id ? "bg-emerald-50/60" : ""}>
              <td className="px-4 py-3 font-semibold text-slate-700">{m.leagueName}</td>
              <td className="px-4 py-3 font-extrabold text-slate-900">
                {m.teamA.shortName} vs {m.teamB.shortName}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={m.status} />
              </td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-500">
                {new Date(m.updatedAt || m.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onSelect?.(m.id)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Manage
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddEvent?.(m.id)}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-100"
                  >
                    Event
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit?.(m)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete?.(m)}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-800 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMatchTable;
