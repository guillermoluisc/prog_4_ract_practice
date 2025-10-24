// hooks/useDomains.js
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Redux actions
import { 
  fetchDomainsStart, 
  fetchDomainsSuccess, 
  fetchDomainsFailure, 
  clearDomains,
  updateDomainStart,    // ← Importar nuevas acciones
  updateDomainSuccess,
  updateDomainFailure
} from '../store/slices/domainSlice';
import { logout as logoutAction } from '../store/slices/authSlice';

// Services
import { fetchDomains, updateDomain } from "../services/domainService"; // ← Importar updateDomain

// Utils
import { removeToken } from "../utils/storage";

export function useDomains() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Leer desde Redux
  const { domains, isLoading, error } = useSelector((state) => state.domains);
  const { token } = useSelector((state) => state.auth);

  const searchDomains = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    dispatch(fetchDomainsStart());

    try {
      const data = await fetchDomains(token);
      dispatch(fetchDomainsSuccess(data));
    } catch (err) {
      dispatch(fetchDomainsFailure(err.message));
      
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        dispatch(logoutAction());
        navigate("/");
      }
    }
  };

  // 🆕 NUEVA FUNCIÓN - Actualizar un dominio
  const editDomain = async (id, name, code) => {
    if (!token) {
      navigate("/");
      return;
    }

    dispatch(updateDomainStart());

    try {
      await updateDomain(id, name, code, token);
      
      // ✨ Redux: Actualizar el estado
      dispatch(updateDomainSuccess({ id, name, code }));
      
      return true; // Indica éxito
    } catch (err) {
      dispatch(updateDomainFailure(err.message));
      throw err; // Para que el componente pueda manejar el error
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
    editDomain,          // ← Exportar nueva función
    clearDomains: clearDomainsData
  };
}