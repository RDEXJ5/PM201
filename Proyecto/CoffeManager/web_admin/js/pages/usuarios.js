import { requireSession, Usuarios, Roles } from "../api.js";
import { renderLayout, setActions, showMessage } from "../common/layout.js";
import {
  activeBadge,
  bindModalClose,
  closeModal,
  fmtDate,
  initials,
  modal,
  openModal,
  roleBadge,
  tableFooter,
} from "../common/components.js";
requireSession();
renderLayout(
  "usuarios.html",
  "Gestión de Usuarios",
  "Supervisa permisos de cuenta y el acceso administrativo para el personal de su cafetería.",
  `<div class="toolbar"><div class="toolbar-left"><input id="searchUsers" class="search-field" placeholder="Buscar por nombre, correo o rol..."><select id="filterStatus" class="select-input" style="width:150px"><option value="all">Filtros</option><option value="active">Activos</option><option value="inactive">Inactivos</option></select></div><span id="userCount" style="color:var(--muted);font-size:12px"></span></div><div class="card table-card"><div class="table-scroll"><table class="data-table"><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Fecha de ingreso</th><th>Estado</th><th>Acciones</th></tr></thead><tbody id="usersTable"></tbody></table></div><div id="paginationBox"></div></div><div class="grid grid-4" style="margin-top:16px"><div class="card stat-card"><small>Usuarios Totales</small><strong id="totalUsers">0</strong><em>Registrados</em></div><div class="card stat-card"><small>Activos ahora</small><strong id="activeUsers">0</strong><em>En vivo</em></div><div class="card stat-card"><small>Distribución de roles</small><strong id="rolePercent">0%</strong><em>Líder de personal</em></div><div class="card stat-card dark"><small>Estado del sistema</small><strong>Óptimo</strong><em>Todos los sistemas operativos</em></div></div>${modal("userModal", "Usuario", `<form id="userForm" class="modal-form"><input type="hidden" id="userId"><div class="grid grid-2"><div><label class="form-label">Nombre</label><input id="userName" class="text-input" required></div><div><label class="form-label">Apellido</label><input id="userLast" class="text-input" required></div></div><div><label class="form-label">Correo</label><input id="userEmail" type="email" class="text-input" required></div><div><label class="form-label">Contraseña</label><input id="userPassword" type="password" class="text-input" placeholder="Obligatoria al crear; opcional al editar"></div><div><label class="form-label">Rol</label><select id="userRole" class="select-input" required></select></div><div class="modal-actions"><button type="button" class="btn-secondary" data-close="userModal">Cancelar</button><button class="btn-primary" type="submit">Guardar</button></div></form>`)}`,
);
setActions('<button id="newUser" class="btn-primary">+ Crear Usuario</button>');
bindModalClose();
let users = [],
  roles = [],
  page = 1,
  perPage = 8;
const norm = (u) => ({
  id: u.id_usuario,
  nombre: u.nombre || "",
  apellido: u.apellido || "",
  email: u.email || u.correo || "",
  id_rol: u.id_rol,
  activo: u.activo !== false,
  fecha: u.fecha_registro,
});
function roleOptions() {
  userRole.innerHTML = roles
    .map((r) => `<option value="${r.id_rol}">${r.nombre}</option>`)
    .join("");
}
async function load() {
  try {
    [roles, users] = await Promise.all([Roles.all(), Usuarios.all()]);
    users = users.map(norm);
    roleOptions();
    render();
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function filtered() {
  const q = searchUsers.value.toLowerCase();
  const f = filterStatus.value;
  return users.filter((u) => {
    const rn = (
      roles.find((r) => Number(r.id_rol) === Number(u.id_rol))?.nombre || ""
    ).toLowerCase();
    const ok = `${u.nombre} ${u.apellido} ${u.email} ${rn}`
      .toLowerCase()
      .includes(q);
    const fs =
      f === "all" ||
      (f === "active" && u.activo) ||
      (f === "inactive" && !u.activo);
    return ok && fs;
  });
}
function render() {
  const list = filtered();
  const total = Math.max(1, Math.ceil(list.length / perPage));
  if (page > total) page = total;
  const rows = list.slice((page - 1) * perPage, page * perPage);
  userCount.textContent = `Mostrando ${rows.length} de ${list.length} usuarios`;
  usersTable.innerHTML =
    rows
      .map(
        (u) =>
          `<tr><td><div class="person"><div class="avatar-img">${initials(u.nombre + " " + u.apellido)}</div><strong>${u.nombre} ${u.apellido}</strong></div></td><td>${u.email}</td><td>${roleBadge(u.id_rol, roles)}</td><td>${fmtDate(u.fecha)}</td><td>${activeBadge(u.activo)}</td><td><button class="btn-secondary btn-small" data-edit="${u.id}">Editar</button> <button class="btn-danger btn-small" data-del="${u.id}">Desactivar</button></td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="6" class="empty">No se encontraron usuarios.</td></tr>';
  paginationBox.innerHTML = tableFooter(page, total);
  totalUsers.textContent = users.length;
  activeUsers.textContent = users.filter((u) => u.activo).length;
  rolePercent.textContent = users.length
    ? Math.round(
        (new Set(users.map((u) => u.id_rol)).size / roles.length) * 100,
      ) + "%"
    : "0%";
  bindRowActions();
}
function bindRowActions() {
  document
    .querySelectorAll("[data-edit]")
    .forEach((b) => (b.onclick = () => editUser(Number(b.dataset.edit))));
  document
    .querySelectorAll("[data-del]")
    .forEach((b) => (b.onclick = () => delUser(Number(b.dataset.del))));
  document.querySelectorAll("[data-page-action]").forEach(
    (b) =>
      (b.onclick = () => {
        if (b.dataset.pageAction === "prev" && page > 1) page--;
        if (
          b.dataset.pageAction === "next" &&
          page < Math.ceil(filtered().length / perPage)
        )
          page++;
        render();
      }),
  );
}
function editUser(id) {
  const u = users.find((x) => x.id === id);
  if (!u) return;
  userId.value = u.id;
  userName.value = u.nombre;
  userLast.value = u.apellido;
  userEmail.value = u.email;
  userPassword.value = "";
  userRole.value = u.id_rol;
  openModal("userModal");
}
async function delUser(id) {
  if (!confirm("¿Desactivar este usuario?")) return;
  try {
    await Usuarios.deactivate(id);
    showMessage("Usuario desactivado correctamente.");
    await load();
  } catch (err) {
    showMessage(err.message, "error");
  }
}
newUser.onclick = () => {
  userForm.reset();
  userId.value = "";
  openModal("userModal");
};
userForm.onsubmit = async (e) => {
  e.preventDefault();
  const id = userId.value;
  const payload = {
    nombre: userName.value.trim(),
    apellido: userLast.value.trim(),
    email: userEmail.value.trim(),
    id_rol: Number(userRole.value),
  };
  if (userPassword.value) payload.password = userPassword.value;
  if (!id && !payload.password) {
    showMessage("La contraseña es obligatoria al crear usuario.", "error");
    return;
  }
  try {
    if (id) await Usuarios.update(id, payload);
    else await Usuarios.create(payload);
    closeModal("userModal");
    showMessage("Usuario guardado correctamente.");
    await load();
  } catch (err) {
    showMessage(err.message, "error");
  }
};
searchUsers.oninput = () => {
  page = 1;
  render();
};
filterStatus.onchange = () => {
  page = 1;
  render();
};
load();
if (new URLSearchParams(location.search).get("action") === "new")
  setTimeout(() => newUser.click(), 300);
