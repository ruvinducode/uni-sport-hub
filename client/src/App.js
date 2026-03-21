import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachDashboard from "./pages/coach/CoachDashboard";
import SelectorDashboard from "./pages/selector/SelectorDashboard";
import PlayerDashboard from "./pages/player/PlayerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach"
          element={
            <ProtectedRoute allowedRoles={["coach"]} selectorMode="coach">
              <CoachDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/selector"
          element={
            <ProtectedRoute allowedRoles={["coach"]} selectorMode="selector">
              <SelectorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/player"
          element={
            <ProtectedRoute allowedRoles={["player"]}>
              <PlayerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;