import { useEffect, useState } from "react";

const empty = {
  minuteOrTime: "",
  type: "info",
  title: "",
  description: "",
  teamSide: "neutral",
  player: "",
};

function EventFormModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(empty);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const emsg = {};
    if (!form.title.trim()) emsg.title = "Required";
    if (!form.minuteOrTime.trim()) emsg.minuteOrTime = "Required";
    setErrors(emsg);
    if (Object.keys(emsg).length) return;
    onSave({
      minuteOrTime: form.minuteOrTime.trim(),
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim(),
      teamSide: form.teamSide,
      player: form.player.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/60 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-extrabold text-slate-900">Add timeline event</h2>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Time / minute</label>
              <input
                value={form.minuteOrTime}
                onChange={(e) => setForm({ ...form, minuteOrTime: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
                placeholder="e.g. 64' or Q2 03:10"
              />
              {errors.minuteOrTime && <p className="mt-1 text-xs text-rose-600">{errors.minuteOrTime}</p>}
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                <option value="goal">Goal</option>
                <option value="card">Card</option>
                <option value="wicket">Wicket</option>
                <option value="boundary">Boundary</option>
                <option value="timeout">Timeout</option>
                <option value="score">Score</option>
                <option value="end">End</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
            {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Side</label>
              <select
                value={form.teamSide}
                onChange={(e) => setForm({ ...form, teamSide: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                <option value="home">Home</option>
                <option value="away">Away</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Player (optional)</label>
              <input
                value={form.player}
                onChange={(e) => setForm({ ...form, player: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
              Add event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventFormModal;
