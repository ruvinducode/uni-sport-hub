import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function CoachDashboard() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("requests");

  const token = localStorage.getItem("token");

  const fetchPlayers = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/approval/players/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPlayers(res.data.players);
      setError(null);

    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.message ||
          "Failed to load pending players (check your approval status)"
      );
    }
  }, [token]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const approvePlayer = async (id) => {
    await axios.put(
      `http://localhost:5001/api/approval/player/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchPlayers();
  };

  const rejectPlayer = async (id) => {
    await axios.put(
      `http://localhost:5001/api/approval/player/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchPlayers();
  };

  return (
    <DashboardLayout role="coach">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wider text-emerald-100">Coach Dashboard</p>
          <h2 className="mt-2 text-3xl font-bold">Player Approval Center</h2>
          <p className="mt-2 max-w-3xl text-emerald-100">
            Review player registration requests and decide who can join your team program.
          </p>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending players</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{players.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Review status</p>
            <p className="mt-2 text-sm font-semibold text-emerald-600">
              {error ? "Action needed" : "All systems normal"}
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
                  ? "bg-emerald-600 text-white"
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
                  ? "bg-emerald-600 text-white"
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
            <h3 className="text-xl font-bold text-slate-900">Approval Overview</h3>
            <p className="mt-2 text-sm text-slate-600">
              Use <span className="font-semibold">See Requests</span> to review full player registration
              details and take approve/reject action.
            </p>
          </div>
        ) : players.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-700">No pending players</p>
            <p className="mt-2 text-sm text-slate-500">
              New player requests will appear here for your approval.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {players.map((p) => (
              <article
                key={p._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{p.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{p.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => approvePlayer(p._id)}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectPlayer(p._id)}
                      className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Sport" value={p.sportType} />
                  <Detail label="Phone" value={p.phoneNumber} />
                  <Detail label="Address" value={p.address} />
                  <Detail label="University ID" value={p.universityId} />
                  <Detail label="University" value={p.universityName} />
                  <Detail label="Age" value={p.age} />
                  <Detail label="Gender" value={p.gender} />
                  <Detail label="Status" value={p.status} />
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

export default CoachDashboard;