// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
//utils
import { getToken } from "../utils/storage"; // Usar la utilidad

function ProtectedRoute({ children }) {
  const token = getToken(); // Usar la función de utilidad

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;