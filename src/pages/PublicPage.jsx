// pages/PublicPage.jsx
import { useNavigate } from "react-router-dom";

export default function PublicPage() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🌐 Bienvenido a Domain Manager</h1>
        <p style={styles.subtitle}>
          Gestiona tus dominios de forma fácil y rápida
        </p>

        <button 
          onClick={handleGoToLogin}
          style={styles.button}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  content: {
    maxWidth: "900px",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "3rem",
    opacity: 0.9,
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 40px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};