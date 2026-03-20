import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SelectorDashboard() {
  const [coaches, setCoaches] = useState([]);
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
    } catch (error) {
      console.error("Error fetching coaches:", error);
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
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Pending Coaches</h2>

        {coaches.length === 0 ? (
          <p className="text-gray-500">No pending coaches</p>
        ) : (
          coaches.map((c) => (
            <div
              key={c._id}
              className="border p-4 mb-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">
                  {c.experience} years experience
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => approveCoach(c._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectCoach(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SelectorDashboard;