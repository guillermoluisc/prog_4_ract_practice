import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDomains } from "../services/domainService";
import DomainList from "./DomainList";
import Spinner from "./Snipper";

export default function HomeContainer() {
  const navigate = useNavigate();
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setDomains([]);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      const data = await fetchDomains(token);
      setDomains(data);
    } catch (error) {
      alert(error.message);
      setDomains([]);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar implementado directamente */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Menú</h3>
        <div style={styles.buttonContainer}>
          <button 
            onClick={handleSearch} 
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? "Buscando..." : "Search"}
          </button>
          <button 
            onClick={handleLogout}
            style={styles.button}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={styles.mainContent}>
        <h1 style={styles.welcomeTitle}>Bienvenido 🎉</h1>
        {isLoading ? <Spinner styles={styles}/> : <DomainList domains={domains} />}
      </div>
    </div>
  );
}

// Estilos basados en tu código anterior de Home.js
const styles = {
    container: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",

  },
  sidebarTitle: {
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "600"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "500",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f8f9fa"
  },
  welcomeTitle: {
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "600"
  },
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
};