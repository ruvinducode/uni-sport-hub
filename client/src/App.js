import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TicketProvider } from "./context/TicketContext";
import { ScoreboardProvider } from "./context/ScoreboardContext";

import HomePage from "./pages/home/HomePage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachDashboard from "./pages/coach/CoachDashboard";
import SelectorDashboard from "./pages/selector/SelectorDashboard";
import PlayerDashboard from "./pages/player/PlayerDashboard";

import MatchListPage from "./pages/tickets/MatchListPage";
import TicketMatchDetailPage from "./pages/tickets/MatchDetailPage";
import SeatSelectionPage from "./pages/tickets/SeatSelectionPage";
import CartPage from "./pages/tickets/CartPage";
import CheckoutPage from "./pages/tickets/CheckoutPage";
import BookingConfirmationPage from "./pages/tickets/BookingConfirmationPage";
import TicketLoginPage from "./pages/tickets/TicketLoginPage";
import TicketRegisterPage from "./pages/tickets/TicketRegisterPage";
import MyBookingsPage from "./pages/tickets/MyBookingsPage";

import ScoreboardPage from "./pages/scoreboard/ScoreboardPage";
import MatchDetailPage from "./pages/scoreboard/MatchDetailPage";
import ScorecardsAdminPage from "./pages/admin/ScorecardsAdminPage";

import CoachFinderPage from "./pages/coaches/CoachFinderPage";
import CoachProfilePage from "./pages/coaches/CoachProfilePage";
import BookingPage from "./pages/coaches/BookingPage";
import SavedCoachesPage from "./pages/coaches/SavedCoachesPage";

import { SavedCoachesProvider } from "./context/SavedCoachesContext";

import ProtectedRoute from "./components/ProtectedRoute";
import TicketProtectedRoute from "./components/TicketProtectedRoute";

function App() {
  return (
    <TicketProvider>
      <ScoreboardProvider>
      <Router>
        <SavedCoachesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/coaches" element={<CoachFinderPage />} />
          <Route path="/coaches/:coachId" element={<CoachProfilePage />} />
          <Route path="/coaches/:coachId/book" element={<BookingPage />} />
          <Route path="/saved-coaches" element={<SavedCoachesPage />} />


        {/* Marketplace (public browsing) */}
        <Route path="/marketplace" element={<MarketplacePage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />


          <Route path="/matches" element={<MatchListPage />} />
          <Route path="/matches/:matchId" element={<TicketMatchDetailPage />} />
          <Route path="/matches/:matchId/seats" element={<SeatSelectionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/booking/:bookingId/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/tickets/login" element={<TicketLoginPage />} />
          <Route path="/tickets/register" element={<TicketRegisterPage />} />
          <Route
            path="/my-bookings"
            element={
              <TicketProtectedRoute>
                <MyBookingsPage />
              </TicketProtectedRoute>
            }
          />

          <Route path="/scoreboard" element={<ScoreboardPage />} />
          <Route path="/scoreboard/:matchId" element={<MatchDetailPage />} />
          <Route path="/admin/scorecards/:matchId/edit" element={<ScorecardsAdminPage />} />
          <Route path="/admin/scorecards" element={<ScorecardsAdminPage />} />

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
        </SavedCoachesProvider>
      </Router>
      </ScoreboardProvider>
    </TicketProvider>
  );
}

export default App;
