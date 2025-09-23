// hooks/useDomains.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDomains } from "../services/domainService";
import { getToken, removeToken } from "../utils/storage";

export function useDomains() {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchDomains = async () => {
    const token = getToken();
    
    if (!token) {
      navigate("/");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchDomains(token);
      setDomains(data);
    } catch (err) {
      setError(err.message);
      setDomains([]);
      
      // Si el token es inválido, redirigir al login
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearDomains = () => {
    setDomains([]);
    setError(null);
  };

  return {
    domains,
    isLoading,
    error,
    searchDomains,
    clearDomains
  };
}