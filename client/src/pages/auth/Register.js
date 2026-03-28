import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

const API_BASE = "http://localhost:5001/api/auth";

const roleConfig = {
  player: {
    title: "Player Registration",
    subtitle: "Create your player profile and submit for coach approval.",
    badge: "Player",
  },
  coach: {
    title: "Coach Registration",
    subtitle: "Create your coach profile and submit for selector/admin approval.",
    badge: "Coach",
  },
};

function Register() {
  const { role } = useParams();
  const navigate = useNavigate();
  const safeRole = role === "coach" ? "coach" : "player";
  const cfg = roleConfig[safeRole];

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    universityId: "",
    universityName: "",
    sportType: "",
    age: "",
    gender: "",
    workingUniversities: "",
    experience: "",
    qualifications: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const requiredHints = useMemo(() => {
    if (safeRole === "coach") {
      return "Required: name, email, password, phone, address, sport type, experience, working universities.";
    }
    return "Required: name, email, password, phone, address, university ID, sport type, age, gender.";
  }, [safeRole]);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: safeRole,
      phoneNumber: form.phoneNumber.trim(),
      address: form.address.trim(),
      sportType: form.sportType.trim(),
    };

    if (safeRole === "player") {
      payload.universityId = form.universityId.trim();
      payload.universityName = form.universityName.trim();
      payload.age = Number(form.age);
      payload.gender = form.gender;
    } else {
      payload.workingUniversities = form.workingUniversities.trim();
      payload.experience = form.experience.trim();
      if (form.qualifications.trim()) payload.qualifications = form.qualifications.trim();
      if (form.description.trim()) payload.description = form.description.trim();
    }

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please check the form.");
        return;
      }

      setSuccess(data.message || "Registration submitted successfully.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError("Connection failed. Please ensure backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-bold text-emerald-700 hover:text-emerald-800">
            ← Back to Home
          </Link>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {cfg.badge} Registration
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{cfg.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{cfg.subtitle}</p>
          <p className="mt-2 text-xs font-semibold text-slate-500">{requiredHints}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
              <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Password" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required placeholder="Phone number" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
              <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="sm:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
              <input name="sportType" value={form.sportType} onChange={handleChange} required placeholder="Sport type (Football / Rugby / Cricket)" className="sm:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            {safeRole === "player" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="universityId" value={form.universityId} onChange={handleChange} required placeholder="University ID" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
                <input name="universityName" value={form.universityName} onChange={handleChange} placeholder="University name (optional)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
                <input name="age" type="number" min="1" value={form.age} onChange={handleChange} required placeholder="Age" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
                <select name="gender" value={form.gender} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="workingUniversities" value={form.workingUniversities} onChange={handleChange} required placeholder="Working universities" className="sm:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
                <input name="experience" value={form.experience} onChange={handleChange} required placeholder="Experience (e.g. 5 years)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
                <input name="qualifications" value={form.qualifications} onChange={handleChange} placeholder="Qualifications (optional)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Short description (optional)" className="sm:col-span-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            )}

            {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}
            {success && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</div>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={loading} className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-60">
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
              <Link to="/login" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                Go to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
