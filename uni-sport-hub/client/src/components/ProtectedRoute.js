import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles, selectorMode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  let decoded = null;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    // Token is invalid/expired; clear it so the user must login again.
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  const userRole = decoded?.role;
  const userIsSelector = decoded?.isSelector;

  // If role is not allowed for this page, route the user to their correct dashboard.
  if (Array.isArray(allowedRoles) && !allowedRoles.includes(userRole)) {
    if (userRole === "admin") return <Navigate to="/admin" />;
    if (userRole === "coach") {
      return userIsSelector ? <Navigate to="/selector" /> : <Navigate to="/coach" />;
    }
    if (userRole === "player") return <Navigate to="/player" />;
    return <Navigate to="/login" />;
  }

  // SelectorMode helps distinguish selector-coaches from normal coaches.
  // - "selector": allow only coaches with isSelector=true
  // - "coach": allow only coaches with isSelector=false
  if (selectorMode === "selector") {
    if (!(userRole === "coach" && userIsSelector === true)) {
      return userRole === "coach" ? <Navigate to="/coach" /> : <Navigate to="/login" />;
    }
  } else if (selectorMode === "coach") {
    if (!(userRole === "coach" && userIsSelector === false)) {
      return userRole === "coach" ? <Navigate to="/selector" /> : <Navigate to="/login" />;
    }
  }

  return children;
}

export default ProtectedRoute;