import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function AdminDashboard() {
  const [coaches, setCoaches] = useState([]);
  const [approvedCoaches, setApprovedCoaches] = useState([]);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("requests");
  const [feedback, setFeedback] = useState(null);
  const [selectorForm, setSelectorForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    sportType: "",
    experience: "",
  });
  const token = localStorage.getItem("token");

  // 🔥 Fetch coaches (selector-approved)
  const fetchCoaches = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/approval/coaches/selector-approved",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCoaches(res.data.coaches);
      setError(null);
    } catch (error) {
      console.error("Error fetching coaches:", error);
      setError(
        error?.response?.data?.message ||
          "Failed to load coaches (check your approval status)"
      );
    }
  }, [token]);

  const fetchApprovedCoaches = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/approval/coaches/approved",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setApprovedCoaches(res.data.coaches || []);
    } catch (err) {
      console.error("Error fetching approved coaches:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchCoaches();
    fetchApprovedCoaches();
  }, [fetchCoaches, fetchApprovedCoaches]);

  // ✅ Final approve
  const approveCoach = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/approval/coach/admin-approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCoaches();
      fetchApprovedCoaches();
      setFeedback({ type: "success", message: "Coach fully approved." });
    } catch (error) {
      console.error("Approve failed:", error);
      setFeedback({
        type: "error",
        message: error?.response?.data?.message || "Failed to approve coach.",
      });
    }
  };

  // ❌ Reject coach
  const rejectCoach = async (id) => {
    const confirm = window.confirm("Are you sure you want to reject this coach?");
    if (!confirm) return;

    try {
      await axios.put(
        `http://localhost:5001/api/approval/coach/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCoaches();
      fetchApprovedCoaches();
      setFeedback({ type: "success", message: "Coach rejected." });
    } catch (error) {
      console.error("Reject failed:", error);
      setFeedback({
        type: "error",
        message: error?.response?.data?.message || "Failed to reject coach.",
      });
    }
  };

  const handleSelectorInput = (e) => {
    setFeedback(null);
    setSelectorForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createSelector = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/api/approval/create-selector",
        {
          ...selectorForm,
          experience: Number(selectorForm.experience),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSelectorForm({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        sportType: "",
        experience: "",
      });
      setFeedback({
        type: "success",
        message: "Selector account created and email notification sent.",
      });
      fetchApprovedCoaches();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.message || "Failed to create selector.",
      });
    }
  };

  const promoteCoach = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/approval/promote-selector/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setFeedback({
        type: "success",
        message: "Coach promoted to selector and email notification sent.",
      });
      fetchApprovedCoaches();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.response?.data?.message || "Failed to promote coach.",
      });
    }
  };

  return (
    <DashboardLayout role="admin">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wider text-blue-100">Administrator Dashboard</p>
          <h2 className="mt-2 text-3xl font-bold">Final Approval Command Center</h2>
          <p className="mt-2 max-w-3xl text-blue-100">
            Perform the final decision on selector-approved coaches and manage onboarding quality.
          </p>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Awaiting final approval</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{coaches.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">System health</p>
            <p className="mt-2 text-sm font-semibold text-cyan-700">
              {error ? "Attention required" : "Operational"}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveView("overview")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeView === "overview"
                  ? "bg-cyan-700 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveView("requests")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeView === "requests"
                  ? "bg-cyan-700 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              See Requests
            </button>
            <button
              type="button"
              onClick={() => setActiveView("create-selector")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeView === "create-selector"
                  ? "bg-cyan-700 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Register Selector
            </button>
            <button
              type="button"
              onClick={() => setActiveView("promote-selector")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeView === "promote-selector"
                  ? "bg-cyan-700 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Promote Coaches
            </button>
          </div>
        </section>

        {error && (
          <p className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}
        {feedback && (
          <p
            className={`mb-6 rounded-xl border p-4 ${
              feedback.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {feedback.message}
          </p>
        )}

        {activeView === "overview" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Final Review Overview</h3>
            <p className="mt-2 text-sm text-slate-600">
              Open <span className="font-semibold">See Requests</span> to review complete coach details
              before final admin approval or rejection.
            </p>
          </div>
        ) : activeView === "create-selector" ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Register New Selector</h3>
            <p className="mt-1 text-sm text-slate-600">
              Create selector account directly from admin panel. A role-update email will be sent.
            </p>
            <form onSubmit={createSelector} className="mt-5 grid gap-4 sm:grid-cols-2">
              <input name="name" value={selectorForm.name} onChange={handleSelectorInput} required placeholder="Full name" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <input name="email" type="email" value={selectorForm.email} onChange={handleSelectorInput} required placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <input name="password" type="password" value={selectorForm.password} onChange={handleSelectorInput} required placeholder="Password" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <input name="phoneNumber" value={selectorForm.phoneNumber} onChange={handleSelectorInput} required placeholder="Phone number" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <input name="address" value={selectorForm.address} onChange={handleSelectorInput} required placeholder="Address" className="sm:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <input name="sportType" value={selectorForm.sportType} onChange={handleSelectorInput} required placeholder="Sport type" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <input name="experience" type="number" min="0" value={selectorForm.experience} onChange={handleSelectorInput} required placeholder="Experience (years)" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20" />
              <div className="sm:col-span-2">
                <button type="submit" className="rounded-xl bg-cyan-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-800">
                  Create Selector
                </button>
              </div>
            </form>
          </section>
        ) : activeView === "promote-selector" ? (
          approvedCoaches.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-700">No approved coaches for promotion</p>
              <p className="mt-2 text-sm text-slate-500">
                Approved coaches who are not selectors will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {approvedCoaches.map((coach) => (
                <article
                  key={coach._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{coach.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{coach.email}</p>
                    </div>
                    <button
                      onClick={() => promoteCoach(coach._id)}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                      Promote to Selector
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Detail label="Sport" value={coach.sportType} />
                    <Detail label="Experience" value={coach.experience} />
                    <Detail label="Phone" value={coach.phoneNumber} />
                    <Detail label="Address" value={coach.address} />
                    <Detail label="Status" value={coach.status} />
                  </div>
                </article>
              ))}
            </div>
          )
        ) : coaches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-700">No pending coaches</p>
            <p className="mt-2 text-sm text-slate-500">
              Coaches approved by selectors will be listed here for final action.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {coaches.map((c) => (
              <article
                key={c._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{c.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{c.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => approveCoach(c._id)}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectCoach(c._id)}
                      className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Sport" value={c.sportType} />
                  <Detail label="Experience" value={c.experience} />
                  <Detail label="Phone" value={c.phoneNumber} />
                  <Detail label="Address" value={c.address} />
                  <Detail label="Working Universities" value={c.workingUniversities} />
                  <Detail label="Qualifications" value={c.qualifications} />
                  <Detail label="Description" value={c.description} />
                  <Detail label="Selector Approved" value={c.selectorApproved ? "Yes" : "No"} />
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value || "Not provided"}</p>
    </div>
  );
}

export default AdminDashboard;