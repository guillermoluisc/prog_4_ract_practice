// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getToken } from "../utils/storage";

function ProtectedRoute({ children }) {
  // Leer desde Redux
  const { isAuthenticated, token: reduxToken } = useSelector((state) => state.auth);
  
  // ✨ NUEVO: También verificar localStorage como fallback
  const localToken = getToken();
  
  // Usuario está autenticado si:
  // 1. Redux dice que sí Y hay token en Redux
  // 2. O hay token en localStorage (para cuando se recarga la página)
  const hasValidToken = (isAuthenticated && reduxToken) || localToken;

    // const hasValidToken = isAuthenticated && reduxToken;
  if (!hasValidToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;