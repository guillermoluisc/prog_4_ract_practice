import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
        <button onClick={() => alert("Search pendiente...")}>Search</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Bienvenido 🎉</h1>
    </div>
  );
}

export default Home;
