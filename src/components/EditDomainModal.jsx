// components/EditDomainModal.jsx
import { useState, useEffect } from "react";

export default function EditDomainModal({ domain, onSave, onCancel, isLoading }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  // Cargar los valores iniciales cuando se abre el modal
  useEffect(() => {
    if (domain) {
      setName(domain.name);
      setCode(domain.code);
    }
  }, [domain]);

  const validate = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }
    
    if (!code.trim()) {
      newErrors.code = "El código es obligatorio";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    onSave(domain.id, name, code);
  };

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Editar Dominio</h2>
          <button style={styles.closeButton} onClick={onCancel}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              disabled={isLoading}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Código:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={styles.input}
              disabled={isLoading}
            />
            {errors.code && <span style={styles.error}>{errors.code}</span>}
          </div>
          
          <div style={styles.buttonContainer}>
            <button 
              type="button" 
              onClick={onCancel} 
              style={styles.cancelButton}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px"
  },
  title: {
    margin: 0,
    color: "#333"
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "14px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px"
  },
  error: {
    color: "#dc3545",
    fontSize: "12px"
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "10px"
  },
  cancelButton: {
    padding: "10px 20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "14px"
  },
  saveButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "14px"
  }
};