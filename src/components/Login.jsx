import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook propio de navigate
  const navigate = useNavigate();

  // e es el evento que se dispara cuando se envia el formulario es un obj de tipo evento y
  // el prevent defoult previene que el formulario se envie de manera tradicional (recargando la página)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // async delante de la función indica que esa función va a manejar operaciones asíncronas y que puedes usar await dentro.
    // Operaciones asíncronas son aquellas que no se resuelven inmediatamente, como llamadas a un servidor o lectura de archivos.

    try {
      //El fetch al link que corresponda
      const response = await fetch("http://localhost:91/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      //^^^^^^ el primer parametro es a donde le pego, el segundo es el cuerpo de la peticion
      /**
       * en el cuerpo de la peticion tenemos varias cosas
       * metgod: "GET/POST"
       * headers: en este caso la peticion esta en formato json
       * body: propiamente el cuerpo de la peticion con el email y la password
       */

      /**si lass credenciales no coinciden */
      if (!response.ok) {
        alert("Error en las credenciales");
        return;
      }

      /**
       * convierte la respuesta a json y almacentamos en data lo que se supone que viene del fetch
       */
      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Si el backend también manda role, lo podés guardar aquí 
      // if (data.role) {
      //   localStorage.setItem("role", data.role);
      // }

      navigate("/home");
    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo conectar al servidor");
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
          </div>
          
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px"
  },
  loginCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center"
  },
  header: {
    marginBottom: "30px"
  },
  title: {
    color: "#2c3e50",
    fontSize: "28px",
    fontWeight: "600",
    margin: "0 0 8px 0"
  },
  subtitle: {
    color: "#7f8c8d",
    fontSize: "16px",
    margin: "0",
    fontWeight: "400"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "15px",
    fontSize: "16px",
    border: "2px solid #ecf0f1",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#2c3e50",
    transition: "all 0.3s ease",
    outline: "none"
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(52, 152, 219, 0.3)",
    marginTop: "10px"
  }
};