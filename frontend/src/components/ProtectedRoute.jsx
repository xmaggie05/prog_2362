import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  // FIX: Look for the individual string 'user_role' instead of the 'user' object
  const userRole = localStorage.getItem("user_role");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required permission
  if (role && userRole !== role) {
    return <Navigate to={userRole === "admin" ? "/admin/dashboard" : "/employee/dashboard"} replace />;
  }

  return children;
}

export default ProtectedRoute;
