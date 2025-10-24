// pages/HomePage.jsx
import { useState } from "react"; // ← Agregar useState

// Hooks
import { useDomains } from "../hooks/useDomains";
import { useAuth } from "../hooks/useAuth";

// Components
import DomainList from "../components/DomainList";
import Spinner from "../components/Snipper";
import EditDomainModal from "../components/EditDomainModal"; // ← Importar modal

// Utils
import { capitalize } from "../utils/formatters";

export default function HomePage() {
  const { domains, isLoading, error, searchDomains, editDomain } = useDomains();
  const { logout } = useAuth();
  
  // Estados para el modal
  const [editingDomain, setEditingDomain] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    logout();
  };

  // Abrir modal de edición
  const handleEdit = (domain) => {
    setEditingDomain(domain);
    setSuccessMessage("");
  };

  // Guardar cambios
  const handleSave = async (id, name, code) => {
    try {
      await editDomain(id, name, code);
      setEditingDomain(null);
      setSuccessMessage("✅ Dominio actualizado correctamente");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditingDomain(null);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Menú</h3>
        <div style={styles.buttonContainer}>
          <button 
            onClick={searchDomains} 
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
        <h1 style={styles.welcomeTitle}>{capitalize("bienvenido")} 🎉</h1>
        
        {successMessage && (
          <div style={styles.success}>
            {successMessage}
          </div>
        )}
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        
        {isLoading ? (
          <Spinner styles={styles} />
        ) : (
          <DomainList 
            domains={domains} 
            onEdit={handleEdit}
          />
        )}
      </div>
      
      {/* Modal de edición */}
      {editingDomain && (
        <EditDomainModal
          domain={editingDomain}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh"
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRight: "1px solid #dee2e6"
  },
  sidebarTitle: {
    color: "#333",
    marginBottom: "20px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  mainContent: {
    flex: 1,
    padding: "20px"
  },
  welcomeTitle: {
    color: "#333",
    marginBottom: "20px"
  },
  error: {
    color: "#dc3545",
    padding: "10px",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "4px",
    marginBottom: "20px"
  },
  welcomeTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '300'
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