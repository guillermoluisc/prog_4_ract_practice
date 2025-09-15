//Aqui solo se exportan funciones que serán utilizadas por los componentes
//Cuando hacemos Export se pueden utilizar en los componentes
//Estos sirven para conecciones con las apis
export async function fetchSearchDomains(token) {
  const response = await fetch("http://localhost:91/domains", {
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
