import { requireSession, Roles, Usuarios } from "../api.js";
import { renderLayout, setActions, showMessage } from "../common/layout.js";
import {
  bindModalClose,
  closeModal,
  modal,
  openModal,
  roleBadge,
} from "../common/components.js";
requireSession();
renderLayout(
  "roles.html",
  "Roles y Permisos",
  "Administra roles activos, permisos por módulo y asignación de usuarios.",
  `<div class="grid grid-3" style="align-items:start"><div class="card pad"><h3>Roles Activos</h3><div id="rolesList"></div></div><div class="card pad"><h3 id="permTitle">Permisos del rol</h3><div class="permission-grid" id="permissionsBox"></div><div class="modal-actions"><button id="savePermissions" class="btn-primary">Guardar Permisos</button></div></div><div class="grid"><div class="card pad"><h3>Asignar Usuarios</h3><select id="assignUser" class="select-input"></select><select id="assignRole" class="select-input" style="margin-top:8px"></select><button id="assignBtn" class="btn-primary btn-full" style="margin-top:8px">Asignar Nuevo Usuario</button></div><div class="card pad"><h3>Historial de Actividad</h3><div id="activityList" style="font-size:12px;color:var(--muted)"></div></div></div></div>${modal("roleModal", "Rol", `<form id="roleForm" class="modal-form"><input type="hidden" id="roleId"><div><label class="form-label">Nombre del rol</label><input id="roleName" class="text-input" required></div><div class="modal-actions"><button type="button" class="btn-secondary" data-close="roleModal">Cancelar</button><button class="btn-primary" type="submit">Guardar</button></div></form>`)}`,
);
setActions(
  '<button id="newRole" class="btn-primary">+ Crear Nuevo Rol</button>',
);
bindModalClose();
const permNames = [
  "Procesar reembolsos",
  "Ver reportes",
  "Modificar precios",
  "Aplicar descuentos masivos",
  "Reconciliación de stock",
  "Gestión de proveedores",
  "Eliminar item de inventario",
  "Ajuste manual de caja",
];
let roles = [],
  users = [],
  selected = null;
function stored() {
  try {
    return JSON.parse(localStorage.getItem("coffee_permissions") || "{}");
  } catch {
    return {};
  }
}
function saveStore(obj) {
  localStorage.setItem("coffee_permissions", JSON.stringify(obj));
}
function log(text) {
  const arr = JSON.parse(localStorage.getItem("coffee_role_activity") || "[]");
  arr.unshift(`${new Date().toLocaleString("es-MX")}: ${text}`);
  localStorage.setItem("coffee_role_activity", JSON.stringify(arr.slice(0, 8)));
  renderActivity();
}
function renderActivity() {
  const arr = JSON.parse(localStorage.getItem("coffee_role_activity") || "[]");
  activityList.innerHTML =
    arr.map((x) => `<p>• ${x}</p>`).join("") ||
    "<p>Sin actividad reciente.</p>";
}
async function load() {
  try {
    [roles, users] = await Promise.all([Roles.all(), Usuarios.all()]);
    selected = selected || roles[0]?.id_rol;
    render();
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function render() {
  rolesList.innerHTML = roles
    .map(
      (r) =>
        `<div class="role-card ${Number(selected) === Number(r.id_rol) ? "active" : ""}"><strong>${r.nombre}</strong><p style="margin:5px 0;color:var(--muted);font-size:12px">${desc(r.nombre)}</p><div style="display:flex;gap:6px;justify-content:flex-end"><button class="btn-ghost btn-small" data-select="${r.id_rol}">Ver</button><button class="btn-secondary btn-small" data-edit="${r.id_rol}">Editar</button><button class="btn-danger btn-small" data-del="${r.id_rol}">Eliminar</button></div></div>`,
    )
    .join("");
  assignRole.innerHTML = roles
    .map((r) => `<option value="${r.id_rol}">${r.nombre}</option>`)
    .join("");
  assignUser.innerHTML = users
    .map(
      (u) =>
        `<option value="${u.id_usuario}">${u.nombre} ${u.apellido} - ${u.email}</option>`,
    )
    .join("");
  renderPerms();
  renderActivity();
  document.querySelectorAll("[data-select]").forEach(
    (b) =>
      (b.onclick = () => {
        selected = Number(b.dataset.select);
        render();
      }),
  );
  document
    .querySelectorAll("[data-edit]")
    .forEach((b) => (b.onclick = () => editRole(Number(b.dataset.edit))));
  document
    .querySelectorAll("[data-del]")
    .forEach((b) => (b.onclick = () => delRole(Number(b.dataset.del))));
}
function desc(n) {
  n = (n || "").toLowerCase();
  if (n.includes("admin") || n.includes("gerente"))
    return "Acceso operativo completo a la consola.";
  if (n.includes("caja")) return "Permisos para cobros, gastos y ventas.";
  if (n.includes("coc")) return "Control de pedidos e inventario.";
  return "Levantamiento y seguimiento de pedidos.";
}
function renderPerms() {
  const role = roles.find((r) => Number(r.id_rol) === Number(selected));
  permTitle.textContent = `Permisos de ${role?.nombre || "rol"}`;
  const all = stored();
  const current = all[selected] || permNames.slice(0, 4);
  permissionsBox.innerHTML = permNames
    .map(
      (p) =>
        `<div class="permission"><label><input type="checkbox" value="${p}" ${current.includes(p) ? "checked" : ""}><span><strong>${p}</strong><br><small>Permite ${p.toLowerCase()}.</small></span></label></div>`,
    )
    .join("");
}
function editRole(id) {
  const r = roles.find((x) => Number(x.id_rol) === id);
  roleId.value = r.id_rol;
  roleName.value = r.nombre;
  openModal("roleModal");
}
async function delRole(id) {
  if (users.some((u) => Number(u.id_rol) === id)) {
    showMessage(
      "No se puede eliminar un rol asignado a usuarios. Cambia primero sus roles.",
      "error",
    );
    return;
  }
  if (!confirm("¿Eliminar este rol?")) return;
  try {
    await Roles.remove(id);
    log(`Rol ${id} eliminado`);
    selected = null;
    await load();
    showMessage("Rol eliminado.");
  } catch (err) {
    showMessage(err.message, "error");
  }
}
newRole.onclick = () => {
  roleForm.reset();
  roleId.value = "";
  openModal("roleModal");
};
roleForm.onsubmit = async (e) => {
  e.preventDefault();
  try {
    if (roleId.value)
      await Roles.update(roleId.value, { nombre: roleName.value.trim() });
    else await Roles.create({ nombre: roleName.value.trim() });
    closeModal("roleModal");
    log(`Rol ${roleName.value.trim()} guardado`);
    await load();
    showMessage("Rol guardado correctamente.");
  } catch (err) {
    showMessage(err.message, "error");
  }
};
savePermissions.onclick = () => {
  const all = stored();
  all[selected] = [...permissionsBox.querySelectorAll("input:checked")].map(
    (x) => x.value,
  );
  saveStore(all);
  log(`Permisos actualizados para rol ${selected}`);
  showMessage("Permisos guardados en la consola web.");
};
assignBtn.onclick = async () => {
  const id = assignUser.value;
  const role = Number(assignRole.value);
  const u = users.find((x) => Number(x.id_usuario) === Number(id));
  if (!u) return;
  try {
    await Usuarios.update(id, {
      nombre: u.nombre,
      apellido: u.apellido,
      email: u.email,
      id_rol: role,
    });
    log(
      `${u.nombre} asignado a ${roles.find((r) => Number(r.id_rol) === role)?.nombre}`,
    );
    showMessage("Usuario asignado correctamente.");
    await load();
  } catch (err) {
    showMessage(err.message, "error");
  }
};
load();
if (new URLSearchParams(location.search).get("action") === "assign")
  setTimeout(() => assignUser.focus(), 400);
