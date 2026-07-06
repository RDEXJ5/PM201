import { API_URL } from "./config.js";

export function getToken() {
  return localStorage.getItem("coffee_token") || "";
}
export function setSession(data) {
  if (data?.access_token)
    localStorage.setItem("coffee_token", data.access_token);
  if (data?.usuario)
    localStorage.setItem("coffee_user", JSON.stringify(data.usuario));
}
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("coffee_user") || "{}");
  } catch {
    return {};
  }
}
export function clearSession() {
  localStorage.removeItem("coffee_token");
  localStorage.removeItem("coffee_user");
}
export function requireSession() {
  if (!getToken()) location.href = "login.html";
}
function jsonHeaders(extra = {}) {
  const h = { "Content-Type": "application/json", ...extra };
  const t = getToken();
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: jsonHeaders(options.headers || {}),
  });
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);
  if (!res.ok) {
    throw new Error(
      data?.detail || data?.message || data || `Error ${res.status}`,
    );
  }
  return data;
}
export async function apiBlob(path) {
  const h = {};
  if (getToken()) h.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${API_URL}${path}`, { headers: h });
  if (!res.ok) {
    let msg = `No se pudo descargar (${res.status})`;
    try {
      const data = await res.json();
      msg = data.detail || data.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.blob();
}
export async function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
export const Usuarios = {
  all: () => apiFetch("/usuarios/"),
  create: (u) =>
    apiFetch("/usuarios/", { method: "POST", body: JSON.stringify(u) }),
  update: (id, u) =>
    apiFetch(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(u) }),
  deactivate: (id) => apiFetch(`/usuarios/${id}`, { method: "DELETE" }),
};
export const Roles = {
  all: () => apiFetch("/roles/"),
  create: (r) =>
    apiFetch("/roles/", { method: "POST", body: JSON.stringify(r) }),
  update: (id, r) =>
    apiFetch(`/roles/${id}`, { method: "PUT", body: JSON.stringify(r) }),
  remove: (id) => apiFetch(`/roles/${id}`, { method: "DELETE" }),
};
export const Estadisticas = {
  resumen: () => apiFetch("/estadisticas/resumen"),
  ventas: (periodo = "7") => apiFetch(`/estadisticas/ventas?dias=${periodo}`),
  productos: () => apiFetch("/estadisticas/productos"),
  inventario: () => apiFetch("/estadisticas/inventario"),
};
export const Reportes = {
  preview: (tipo) => apiFetch(`/reportes/${tipo}?formato=json`),
  download: (tipo, formato) => apiBlob(`/reportes/${tipo}?formato=${formato}`),
};
export const Inventario = {
  insumos: () => apiFetch("/cocina/insumos"),
  update: (id, cantidad) =>
    apiFetch(`/cocina/insumo/${id}?cantidad=${encodeURIComponent(cantidad)}`, {
      method: "PUT",
    }),
};
export const Productos = {
  all: () => apiFetch("/productos/"),
  create: (p) =>
    apiFetch("/productos/", { method: "POST", body: JSON.stringify(p) }),
  update: (id, p) =>
    apiFetch(`/productos/${id}`, { method: "PUT", body: JSON.stringify(p) }),
  remove: (id) => apiFetch(`/productos/${id}`, { method: "DELETE" }),
};
export const Pedidos = { all: () => apiFetch("/pedidos/") };
export const Caja = { gastos: () => apiFetch("/caja/gastos") };
