import { useEffect, useState } from "react";

const empty = {
  sportType: "football",
  leagueName: "",
  venue: "",
  date: "",
  time: "",
  status: "upcoming",
  teamAName: "",
  teamAShort: "",
  teamBName: "",
  teamBShort: "",
  scoreA: 0,
  scoreB: 0,
  summaryText: "",
  matchStateText: "",
  referee: "",
  matchNote: "",
  roundStage: "",
};

function MatchFormModal({ open, initial, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        sportType: initial.sportType,
        leagueName: initial.leagueName,
        venue: initial.venue,
        date: initial.date?.slice?.(0, 10) || "",
        time: initial.time || "",
        status: initial.status,
        teamAName: initial.teamA?.name || "",
        teamAShort: initial.teamA?.shortName || "",
        teamBName: initial.teamB?.name || "",
        teamBShort: initial.teamB?.shortName || "",
        scoreA: initial.teamA?.score === "—" ? 0 : Number(initial.teamA?.score) || 0,
        scoreB: initial.teamB?.score === "—" ? 0 : Number(initial.teamB?.score) || 0,
        summaryText: initial.summaryText || "",
        matchStateText: initial.matchStateText || "",
        referee: initial.referee || "",
        matchNote: initial.matchNote || "",
        roundStage: initial.roundStage || "",
      });
    } else {
      const t = new Date();
      setForm({
        ...empty,
        date: t.toISOString().slice(0, 10),
        time: "18:00",
        leagueName: "University League",
        venue: "Main Arena",
        teamAName: "Team A",
        teamAShort: "TMA",
        teamBName: "Team B",
        teamBShort: "TMB",
        matchStateText: "Scheduled",
      });
    }
    setErrors({});
  }, [open, initial]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.leagueName.trim()) e.leagueName = "Required";
    if (!form.teamAName.trim()) e.teamAName = "Required";
    if (!form.teamBName.trim()) e.teamBName = "Required";
    if (!form.venue.trim()) e.venue = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const teamScore = (s) => (form.status === "upcoming" ? "—" : Number(s) || 0);
    const payload = {
      sportType: form.sportType,
      leagueName: form.leagueName.trim(),
      venue: form.venue.trim(),
      date: new Date(form.date + "T12:00:00").toISOString(),
      time: form.time,
      status: form.status,
      teamA: {
        name: form.teamAName.trim(),
        shortName: form.teamAShort.trim() || form.teamAName.slice(0, 3).toUpperCase(),
        logo: null,
        score: teamScore(form.scoreA),
      },
      teamB: {
        name: form.teamBName.trim(),
        shortName: form.teamBShort.trim() || form.teamBName.slice(0, 3).toUpperCase(),
        logo: null,
        score: teamScore(form.scoreB),
      },
      summaryText: form.summaryText.trim(),
      matchStateText: form.matchStateText.trim(),
      referee: form.referee.trim(),
      matchNote: form.matchNote.trim(),
      roundStage: form.roundStage.trim(),
      scoreBreakdown: { type: form.sportType },
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-slate-950/60 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-extrabold text-slate-900">{initial ? "Edit match" : "Create match"}</h2>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sport</label>
            <select
              value={form.sportType}
              onChange={(e) => setForm({ ...form, sportType: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            >
              <option value="football">Football</option>
              <option value="cricket">Cricket</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">League</label>
            <input
              value={form.leagueName}
              onChange={(e) => setForm({ ...form, leagueName: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
            {errors.leagueName && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.leagueName}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            >
              <option value="live">Live</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Round / stage</label>
            <input
              value={form.roundStage}
              onChange={(e) => setForm({ ...form, roundStage: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Venue</label>
            <input
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
            {errors.venue && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.venue}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Time</label>
              <input
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Team A</label>
            <input
              value={form.teamAName}
              onChange={(e) => setForm({ ...form, teamAName: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
            {errors.teamAName && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.teamAName}</p>}
            <input
              placeholder="Short"
              value={form.teamAShort}
              onChange={(e) => setForm({ ...form, teamAShort: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Team B</label>
            <input
              value={form.teamBName}
              onChange={(e) => setForm({ ...form, teamBName: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
            {errors.teamBName && <p className="mt-1 text-xs font-semibold text-rose-600">{errors.teamBName}</p>}
            <input
              placeholder="Short"
              value={form.teamBShort}
              onChange={(e) => setForm({ ...form, teamBShort: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Score A</label>
            <input
              type="number"
              min="0"
              value={form.scoreA}
              onChange={(e) => setForm({ ...form, scoreA: e.target.value })}
              disabled={form.status === "upcoming"}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold disabled:bg-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Score B</label>
            <input
              type="number"
              min="0"
              value={form.scoreB}
              onChange={(e) => setForm({ ...form, scoreB: e.target.value })}
              disabled={form.status === "upcoming"}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold disabled:bg-slate-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Match state text</label>
            <input
              value={form.matchStateText}
              onChange={(e) => setForm({ ...form, matchStateText: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              placeholder="e.g. 45' or Q3 06:12"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Summary</label>
            <textarea
              rows={2}
              value={form.summaryText}
              onChange={(e) => setForm({ ...form, summaryText: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Officials</label>
            <input
              value={form.referee}
              onChange={(e) => setForm({ ...form, referee: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Match note</label>
            <input
              value={form.matchNote}
              onChange={(e) => setForm({ ...form, matchNote: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchFormModal;
