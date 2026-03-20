import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CoachDashboard() {
  const [players, setPlayers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchPlayers = async () => {
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

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

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
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Pending Players</h2>

        {players.map((p) => (
          <div
            key={p._id}
            className="border p-4 mb-3 rounded flex justify-between"
          >
            <div>
              <p>{p.name}</p>
              <p className="text-sm text-gray-500">{p.sportType}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approvePlayer(p._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => rejectPlayer(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoachDashboard;