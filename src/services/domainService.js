// services/domainService.js
import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants";

export async function fetchDomains(token) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOMAINS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
  });

  if (!response.ok) {
    throw new Error("Token inválido o sesión expirada");
  }

  const data = await response.json();
  return data.data || data;
}

// 🆕 NUEVA FUNCIÓN - Actualizar un dominio
export async function updateDomain(id, name, code, token) {
  console.log(`${API_BASE_URL}${API_ENDPOINTS.DOMAINS}/${id}`);
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DOMAINS}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": token },
    body: JSON.stringify({ name, code }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Error al actualizar el dominio");
  }

  return { success: true };
}