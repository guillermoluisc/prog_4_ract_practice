// hooks/useDomains.js
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Redux actions
import { 
  fetchDomainsStart, 
  fetchDomainsSuccess, 
  fetchDomainsFailure, 
  clearDomains 
} from '../store/slices/domainSlice';
import { logout as logoutAction } from '../store/slices/authSlice';

// Services
import { fetchDomains } from "../services/domainService";

// Utils
import { removeToken } from "../utils/storage";

export function useDomains() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✨ CAMBIO: Leer desde Redux
  const { domains, isLoading, error } = useSelector((state) => state.domains);
  const { token } = useSelector((state) => state.auth);

  const searchDomains = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    // ✨ CAMBIO: Dispatch a Redux
    dispatch(fetchDomainsStart());

    try {
      const data = await fetchDomains(token);
      
      // ✨ CAMBIO: Success a Redux
      dispatch(fetchDomainsSuccess(data));
    } catch (err) {
      // ✨ CAMBIO: Error a Redux
      dispatch(fetchDomainsFailure(err.message));
      
      // Si el token es inválido, hacer logout completo
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        dispatch(logoutAction());
        navigate("/");
      }
    }
  };

  const clearDomainsData = () => {
    dispatch(clearDomains());
  };

  return {
    domains,
    isLoading,
    error,
    searchDomains,
    clearDomains: clearDomainsData
  };
}