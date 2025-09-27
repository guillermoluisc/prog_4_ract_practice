// main.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// NUEVO: Importar Redux
import { Provider } from 'react-redux';
import store from './store/store';

// Importar páginas
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// Componentes
import ProtectedRoute from "./components/ProtectedRoute";

// Estilos
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* NUEVO: Envolver con Provider de Redux */}
    {/* El Provider de Redux es el puente que conecta la aplicación React con el store global de Redux. */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
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