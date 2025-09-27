// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import domainReducer from './slices/domainSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    domains: domainReducer
  },
  // Configuraciones opcionales
  devTools: process.env.NODE_ENV !== 'production', // Redux DevTools solo en desarrollo
});

export default store;