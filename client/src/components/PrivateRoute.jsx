import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ अगर login नहीं है
  if (!token) {
    return <Navigate to="/" />;
  }

  // ❌ अगर role match नहीं कर रहा
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  // ✅ access allowed
  return children;
}

export default PrivateRoute;