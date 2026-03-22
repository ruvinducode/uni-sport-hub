import { Navigate, useLocation } from "react-router-dom";

function TicketProtectedRoute({ children }) {
  const raw = localStorage.getItem("ticket_user");
  const location = useLocation();
  let ok = false;
  try {
    ok = !!raw && !!JSON.parse(raw)?.email;
  } catch {
    ok = false;
  }
  if (!ok) {
    return (
      <Navigate to="/tickets/login" replace state={{ from: location.pathname + location.search }} />
    );
  }
  return children;
}

export default TicketProtectedRoute;
