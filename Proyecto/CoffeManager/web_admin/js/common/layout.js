import { clearSession, getUser } from "../api.js";
const pages = [
  ["dashboard.html", "▦", "Panel de Control"],
  ["usuarios.html", "👥", "Usuarios"],
  ["roles.html", "⚙", "Roles"],
  ["estadisticas-ventas.html", "▣", "Estadísticas de Ventas"],
  ["estadisticas-inventario.html", "▤", "Estadísticas de Inventario"],
  ["reportes.html", "▧", "Reportes"],
];
export function renderLayout(active, title, subtitle, content) {
  const u = getUser();
  const name = `${u.nombre || "Administrador"} ${u.apellido || ""}`.trim();
  const nav = pages
    .map(
      ([h, i, l]) =>
        `<a href="${h}" class="${active === h ? "active" : ""}"><span>${i}</span>${l}</a>`,
    )
    .join("");
  document.body.innerHTML = `<div class="app-shell"><aside class="sidebar"><div class="brand"><h2>Coffee Manager</h2><span>Consola de Administración</span></div><nav class="nav">${nav}</nav><div class="user-box"><div class="avatar">${name.slice(0, 1).toUpperCase()}</div><div><strong>${name}</strong><span>v1.2.0</span></div></div></aside><main class="content"><header class="topbar"><div class="topbar-title">${title}</div><button id="logoutBtn" class="btn-ghost btn-small">Cerrar sesión</button></header><section class="main-section"><div class="section-head"><div><h1>${title}</h1><p>${subtitle}</p></div><div id="pageActions" class="actions"></div></div><div id="pageMessage" class="message"></div>${content}</section></main></div>`;
  document.getElementById("logoutBtn").onclick = () => {
    clearSession();
    location.href = "login.html";
  };
}
export function setActions(html) {
  const e = document.getElementById("pageActions");
  if (e) e.innerHTML = html;
}
export function showMessage(text, type = "ok") {
  const b = document.getElementById("pageMessage");
  if (!b) {
    alert(text);
    return;
  }
  b.textContent = text;
  b.className = `message ${type} show`;
  setTimeout(() => b.classList.remove("show"), 3500);
}
