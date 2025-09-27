// hooks/useAuth.js

// useDispatch: sirve para ejecutar acciones en Redux (ejemplo: loginStart, logout).
// useSelector: sirve para leer datos que están en Redux (ejemplo: si el usuario está autenticado).
// useNavigate: permite redirigir al usuario a otra ruta (por ejemplo, al "/home" después de login).
// useEffect: para ejecutar lógica al cargar el hook (ejemplo: restaurar el token).

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

// Redux actions
// Son funciones que cambian el estado global en Redux.
// Ejemplo: loginStart() pone isLoading=true.
// Ejemplo: loginSuccess() guarda token y user en Redux.
// Ejemplo: logoutAction() borra la sesión en Redux.
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout as logoutAction,
  restoreToken 
} from '../store/slices/authSlice';

// Services
//Devuelve un token y un user.
import { loginUser } from "../services/authService";

// Utils
// Guardan, leen y borran el token del localStorage.
// Esto asegura que si recargas la página, el usuario no pierda la sesión.
import { saveToken, getToken, removeToken } from "../utils/storage";

// Constants
import { MESSAGES } from "../utils/constants";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // CAMBIO PRINCIPAL: Leer estado desde Redux
  // Aquí se lee lo que Redux tiene guardado.
  // Ejemplo: token = “123abc”, isLoading = true/false, etc.
  const { 
    token, 
    isLoading, 
    error, 
    isAuthenticated 
  } = useSelector((state) => state.auth);

  // Nuevo: aqui se mira si hay toquen en localStorage
  //si existe lo mete en redux
  //resultado el usuario sigue logueado aunque recargue la pagina
  //si esto no esta al recargar se cierra la sesion
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken && !token) {
      dispatch(restoreToken(savedToken));
    }
  }, [dispatch, token]);


// 1) Pone isLoading=true.
// 2) Llama al backend (loginUser).
// 3) Guarda el token en localStorage (persistencia).
// 4) Guarda el token y user en Redux (estado global).
// 5) Redirige al usuario al "/home".
// 6) Si falla, guarda el error en Redux (loginFailure).


  const login = async (email, password) => {
    // CAMBIO: Usar Redux dispatch en lugar de setState (envia acciones a Redux)
    dispatch(loginStart());

    try {
      const data = await loginUser(email, password);
      
      // Guardar en localStorage (persistencia)
      //si esto no esta al recargar se cierra la sesion
      saveToken(data.token);
      
      // CAMBIO: Guardar en Redux
      dispatch(loginSuccess({ 
        token: data.token, 
        user: data.user || null 
      }));
      
      // Navegar al home
      navigate("/home");
      
      return data;
    } catch (err) {
      const errorMessage = err.message || MESSAGES.CONNECTION_ERROR;
      
      // CAMBIO: Dispatch error a Redux
      dispatch(loginFailure(errorMessage));
      
      throw new Error(errorMessage);
    }
    // ✨ NOTA: No necesitamos finally porque Redux maneja el isLoading automáticamente
  };

  const logout = () => {
    // Limpiar localStorage
    //si esto no esta al recargar se cierra la sesion
    removeToken();
    
    // CAMBIO: Dispatch logout a Redux
    dispatch(logoutAction());
    
    // Navegar al login
    navigate("/");
  };

  // CAMBIO: Usar el estado de Redux directamente
  //Función rápida para verificar si el usuario está logueado.
  const isAuthenticatedCheck = () => {
    return isAuthenticated && token !== null;
  };



// Te devuelve todo lo que necesitas para usarlo en tus componentes:
// login(), logout()
// El token
// El error
// Si está isLoading
// Si está autenticado
// Recordemos que esto es un hook, así que puede tener su propio estado y lógica. 


  return {
    token,        // NUEVO: Ahora también retornamos el token
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: isAuthenticatedCheck
  };
}