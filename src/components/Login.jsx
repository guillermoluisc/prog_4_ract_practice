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
    <div style={ styles.nav }>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            //cuando cambia el input setea en la variable email el valor e.target.value (el target es el apuntado)
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            //lo mismo ocurre con el password
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;

const styles = {
  nav: {
    display: "flex",         
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center",     
    height: "100vh",          
    color: "#c7b22fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  
    gap: "10px",           
  },
};

