import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function SelectorDashboard() {
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("requests");
  const token = localStorage.getItem("token");

  // 🔥 Fetch pending coaches
  const fetchCoaches = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/approval/coaches/pending",
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
          "Failed to load pending coaches (check your approval status)"
      );
    }
  }, [token]);

  useEffect(() => {
    fetchCoaches();
  }, [fetchCoaches]);

  // ✅ Approve coach (selector step)
  const approveCoach = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/approval/coach/selector-approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCoaches();
    } catch (error) {
      console.error("Approve failed:", error);
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
    } catch (error) {
      console.error("Reject failed:", error);
    }
  };

  return (
    <DashboardLayout role="selector">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wider text-indigo-100">Selector Dashboard</p>
          <h2 className="mt-2 text-3xl font-bold">Coach Screening Panel</h2>
          <p className="mt-2 max-w-3xl text-indigo-100">
            Evaluate new coach applications and move approved candidates to the final admin
            review stage.
          </p>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending coaches</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{coaches.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Evaluation status</p>
            <p className="mt-2 text-sm font-semibold text-indigo-600">
              {error ? "Action needed" : "Ready to review"}
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
                  ? "bg-indigo-600 text-white"
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
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              See Requests
            </button>
          </div>
        </section>

        {error && (
          <p className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {activeView === "overview" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Selector Review Overview</h3>
            <p className="mt-2 text-sm text-slate-600">
              Open <span className="font-semibold">See Requests</span> to inspect full coach registration
              details before forwarding to admin.
            </p>
          </div>
        ) : coaches.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-700">No pending coaches</p>
            <p className="mt-2 text-sm text-slate-500">
              New coach registration requests will appear here.
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
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
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

export default SelectorDashboard;