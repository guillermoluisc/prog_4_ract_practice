// main.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Primer Cambio Para Adaptar a la estructura 
// Importar páginas en lugar de componentes
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

//Aqui si incorporamos Componentes
import ProtectedRoute from "./components/ProtectedRoute";

//Estilos
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* En el lugar "ir" a un componente, vamos ahora si a una págnia */}
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              {/* En el lugar "ir" a un componente, vamos ahora si a una págnia */}
              {/* Antes teniamos Home Container */}
              <HomePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);