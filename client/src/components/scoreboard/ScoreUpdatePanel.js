import { useEffect, useState } from "react";

function ScoreUpdatePanel({ match, onSave }) {
  const [status, setStatus] = useState(match.status);
  const [matchStateText, setMatchStateText] = useState(match.matchStateText);
  const [summaryText, setSummaryText] = useState(match.summaryText);
  const [scoreA, setScoreA] = useState(String(match.teamA.score));
  const [scoreB, setScoreB] = useState(String(match.teamB.score));
  const [venue, setVenue] = useState(match.venue);
  const [time, setTime] = useState(match.time);
  const [date, setDate] = useState(match.date?.slice?.(0, 10) || "");

  useEffect(() => {
    setStatus(match.status);
    setMatchStateText(match.matchStateText);
    setSummaryText(match.summaryText);
    setScoreA(String(match.teamA.score));
    setScoreB(String(match.teamB.score));
    setVenue(match.venue);
    setTime(match.time);
    setDate(match.date?.slice?.(0, 10) || "");
  }, [match]);

  const submit = (e) => {
    e.preventDefault();
    const sa = status === "upcoming" ? "—" : Number(scoreA) || 0;
    const sb = status === "upcoming" ? "—" : Number(scoreB) || 0;
    onSave({
      status,
      matchStateText,
      summaryText,
      venue,
      time,
      date: new Date(date + "T12:00:00").toISOString(),
      teamA: { ...match.teamA, score: sa },
      teamB: { ...match.teamB, score: sb },
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Quick score update</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
          >
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">State text</label>
          <input
            value={matchStateText}
            onChange={(e) => setMatchStateText(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Score {match.teamA.shortName}</label>
          <input
            type="number"
            value={scoreA === "—" ? "" : scoreA}
            onChange={(e) => setScoreA(e.target.value)}
            disabled={status === "upcoming"}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold disabled:bg-slate-100"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Score {match.teamB.shortName}</label>
          <input
            type="number"
            value={scoreB === "—" ? "" : scoreB}
            onChange={(e) => setScoreB(e.target.value)}
            disabled={status === "upcoming"}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold disabled:bg-slate-100"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-500">Summary</label>
          <textarea
            rows={2}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Venue</label>
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">Time</label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
            />
          </div>
        </div>
      </div>
      <button type="submit" className="w-full rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-700">
        Apply updates
      </button>
    </form>
  );
}

export default ScoreUpdatePanel;
