import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SESSION_TYPE_OPTIONS,
  SKILL_LEVELS,
  COACHING_MODE_OPTIONS,
  SPORTS,
} from "../../../data/coachConstants";
import { getAreasForDistrict } from "../../../data/locations";
import { labelClass, selectClass } from "../filters/selectStyles";

const initialForm = (coach) => ({
  playerName: "",
  schoolName: "",
  sport: coach.sport,
  preferredDate: "",
  preferredTime: "",
  area: coach.area,
  sessionType: coach.sessionTypes[0] || "",
  skillLevel: "",
  notes: "",
  coachingMode: coach.coachingModes.includes("online") && !coach.coachingModes.includes("in-person")
    ? "online"
    : coach.coachingModes.includes("in-person")
      ? "in-person"
      : "both",
});

function BookingForm({ coach, onSuccess, onChange }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(() => initialForm(coach));
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    onChange?.(form);
  }, [form, onChange]);

  const areaOptions = useMemo(() => getAreasForDistrict(coach.district), [coach.district]);

  const errors = useMemo(() => {
    const e = {};
    if (!form.playerName.trim()) e.playerName = "Required";
    if (!form.schoolName.trim()) e.schoolName = "Required";
    if (!form.sport) e.sport = "Required";
    if (!form.preferredDate) e.preferredDate = "Required";
    if (!form.preferredTime) e.preferredTime = "Required";
    if (!form.area) e.area = "Required";
    if (!form.sessionType) e.sessionType = "Required";
    if (!form.skillLevel) e.skillLevel = "Required";
    if (!form.coachingMode) e.coachingMode = "Required";
    return e;
  }, [form]);

  const valid = Object.keys(errors).length === 0;

  const set = (key, value) => {
    setDirty(true);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSuccess?.(form);
  };

  const handleReset = () => {
    setDirty(false);
    setForm(initialForm(coach));
  };

  const fieldError = (name) => dirty && errors[name];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Player full name</label>
          <input
            className={`${selectClass} ${fieldError("playerName") ? "border-red-300" : ""}`}
            value={form.playerName}
            onChange={(e) => set("playerName", e.target.value)}
            placeholder="e.g. Janith Perera"
          />
          {fieldError("playerName") && (
            <p className="mt-1 text-xs font-bold text-red-600">{errors.playerName}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>University / school</label>
          <input
            className={`${selectClass} ${fieldError("schoolName") ? "border-red-300" : ""}`}
            value={form.schoolName}
            onChange={(e) => set("schoolName", e.target.value)}
            placeholder="Institution name"
          />
          {fieldError("schoolName") && (
            <p className="mt-1 text-xs font-bold text-red-600">{errors.schoolName}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Sport</label>
          <select
            className={`${selectClass} ${fieldError("sport") ? "border-red-300" : ""}`}
            value={form.sport}
            onChange={(e) => set("sport", e.target.value)}
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {fieldError("sport") && <p className="mt-1 text-xs font-bold text-red-600">{errors.sport}</p>}
        </div>
        <div>
          <label className={labelClass}>Selected area</label>
          <select
            className={`${selectClass} ${fieldError("area") ? "border-red-300" : ""}`}
            value={form.area}
            onChange={(e) => set("area", e.target.value)}
          >
            <option value="">Choose area</option>
            {areaOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {fieldError("area") && <p className="mt-1 text-xs font-bold text-red-600">{errors.area}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Preferred training date</label>
          <input
            type="date"
            className={`${selectClass} ${fieldError("preferredDate") ? "border-red-300" : ""}`}
            value={form.preferredDate}
            onChange={(e) => set("preferredDate", e.target.value)}
          />
          {fieldError("preferredDate") && (
            <p className="mt-1 text-xs font-bold text-red-600">{errors.preferredDate}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Preferred time</label>
          <input
            type="time"
            className={`${selectClass} ${fieldError("preferredTime") ? "border-red-300" : ""}`}
            value={form.preferredTime}
            onChange={(e) => set("preferredTime", e.target.value)}
          />
          {fieldError("preferredTime") && (
            <p className="mt-1 text-xs font-bold text-red-600">{errors.preferredTime}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Session type</label>
          <select
            className={`${selectClass} ${fieldError("sessionType") ? "border-red-300" : ""}`}
            value={form.sessionType}
            onChange={(e) => set("sessionType", e.target.value)}
          >
            <option value="">Select</option>
            {SESSION_TYPE_OPTIONS.filter((o) => coach.sessionTypes.includes(o.value)).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {fieldError("sessionType") && (
            <p className="mt-1 text-xs font-bold text-red-600">{errors.sessionType}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Skill level</label>
          <select
            className={`${selectClass} ${fieldError("skillLevel") ? "border-red-300" : ""}`}
            value={form.skillLevel}
            onChange={(e) => set("skillLevel", e.target.value)}
          >
            <option value="">Select</option>
            {SKILL_LEVELS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {fieldError("skillLevel") && (
            <p className="mt-1 text-xs font-bold text-red-600">{errors.skillLevel}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Preferred coaching mode</label>
        <select
          className={`${selectClass} ${fieldError("coachingMode") ? "border-red-300" : ""}`}
          value={form.coachingMode}
          onChange={(e) => set("coachingMode", e.target.value)}
        >
          {COACHING_MODE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {fieldError("coachingMode") && (
          <p className="mt-1 text-xs font-bold text-red-600">{errors.coachingMode}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Special requests / notes</label>
        <textarea
          rows={4}
          className={`w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20`}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Injuries, goals, equipment needs…"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={!valid}
          className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit request
        </button>
      </div>
      {!valid && (
        <p className="text-center text-xs font-semibold text-slate-500">
          Complete all required fields to submit your request.
        </p>
      )}
    </form>
  );
}

export default BookingForm;
