// store/slices/domainSlice.js
import { createSlice } from '@reduxjs/toolkit';

const domainSlice = createSlice({
  name: 'domains',
  initialState: {
    domains: [],
    isLoading: false,
    error: null
  },
  reducers: {
    fetchDomainsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDomainsSuccess: (state, action) => {
      state.isLoading = false;
      state.domains = action.payload;
      state.error = null;
    },
    fetchDomainsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearDomains: (state) => {
      state.domains = [];
      state.error = null;
    },
    clearDomainsError: (state) => {
      state.error = null;
    },
    // 🆕 NUEVAS ACCIONES PARA ACTUALIZAR
    updateDomainStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateDomainSuccess: (state, action) => {
      state.isLoading = false;
      // Actualizar el dominio en el array
      const { id, name, code } = action.payload;
      const index = state.domains.findIndex(domain => domain.id === id);
      if (index !== -1) {
        state.domains[index] = { ...state.domains[index], name, code };
      }
    },
    updateDomainFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  fetchDomainsStart, 
  fetchDomainsSuccess, 
  fetchDomainsFailure, 
  clearDomains,
  updateDomainStart,
  updateDomainFailure,
  updateDomainSuccess,
  clearDomainsError 
} = domainSlice.actions;

export default domainSlice.reducer;