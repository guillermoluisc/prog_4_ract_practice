// main.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';

// Páginas
import PublicPage from "./pages/PublicPage"; // ← NUEVO
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// Componentes de rutas
import ProtectedRoute from "./components/ProtectedRoute";

// Estilos
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: Landing/Home público */}
          <Route path="/" element={<PublicPage />} />

          {/* Ruta pública: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta privada: Home (Dashboard) */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);