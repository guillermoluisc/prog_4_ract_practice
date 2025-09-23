// pages/LoginPage.jsx
import { useState } from "react";
//hooks
import { useAuth } from "../hooks/useAuth";
//utils
import { validateLoginForm } from "../utils/validation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario con el utils que definimos 
    //pues como es algo "generico" lo usamos
    //es mas como es utils
    //lo podemos usar desde cualquier lugar
    const { isValid, errors } = validateLoginForm(email, password);
    
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }
    
    // Limpiar errores de validación
    setValidationErrors({});
    
    try {
      await login(email, password);
      //console.log("Usuario logueado:", userData.user.name); 
      //ejemplo de uso de lo que retornaría el login
      // El hook ya maneja la navegación
    } catch (error) {
      // El hook ya maneja el error
      console.error("Error en login:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Iniciar Sesión</h2>
          <p style={styles.subtitle}>Accede a tu cuenta</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            {validationErrors.email && (
              <span style={styles.error}>{validationErrors.email}</span>
            )}
          </div>
          
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            {validationErrors.password && (
              <span style={styles.error}>{validationErrors.password}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
          
          {error && (
            <div style={styles.error}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}

// Importar los estilos (los mismos que teníamos)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5"
  },
  loginCard: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px"
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem"
  },
  title: {
    color: "#333",
    marginBottom: "0.5rem"
  },
  subtitle: {
    color: "#666",
    margin: 0
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem"
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer"
  },
  error: {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginTop: "0.25rem"
  }
};
