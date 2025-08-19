import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/" replace />;
  }

  // Si hay token, muestra el componente protegido
  return children;
}

export default ProtectedRoute;
