export function money(value) {
  return Number(value || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
}
export function fmtDate(value) {
  if (!value) return "Sin fecha";
  const d = new Date(value);
  return isNaN(d)
    ? String(value)
    : d.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
}
export function initials(name = "Usuario") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "US"
  );
}
export function badge(text, type = "gray") {
  return `<span class="badge ${type}">${text}</span>`;
}
export function roleName(id, roles = []) {
  const r = roles.find((x) => Number(x.id_rol) == Number(id));
  return r?.nombre || `Rol ${id || "-"}`;
}
export function roleBadge(id, roles = []) {
  const n = roleName(id, roles);
  const low = n.toLowerCase();
  const cls =
    low.includes("admin") || low.includes("gerente")
      ? "orange"
      : low.includes("caja")
        ? "blue"
        : low.includes("coc")
          ? "green"
          : "gray";
  return badge(n, cls);
}
export function activeBadge(v) {
  return v !== false ? badge("Activo", "green") : badge("Inactivo", "red");
}
export function tableFooter(page, total, onPrev, onNext) {
  return `<div class="table-footer"><span>Página ${page} de ${total}</span><div class="pagination"><button data-page-action="prev">‹</button><button class="active">${page}</button><button data-page-action="next">›</button></div></div>`;
}
export function bars(items = []) {
  const max = Math.max(1, ...items.map((i) => Number(i.value || 0)));
  return `<div class="bars">${items
    .map((i) => {
      const h = Math.max(8, Math.round((Number(i.value || 0) / max) * 100));
      return `<div class="bar-wrap"><div class="bar ${i.active ? "active" : ""}" style="height:${h}%"></div><label>${i.label}</label></div>`;
    })
    .join("")}</div>`;
}
export function modal(id, title, body) {
  return `<div class="modal-backdrop" id="${id}"><div class="modal"><div class="modal-head"><h2>${title}</h2><button class="btn-ghost btn-small" data-close="${id}">Cerrar</button></div>${body}</div></div>`;
}
export function openModal(id) {
  document.getElementById(id)?.classList.add("show");
}
export function closeModal(id) {
  document.getElementById(id)?.classList.remove("show");
}
export function bindModalClose() {
  document
    .querySelectorAll("[data-close]")
    .forEach((b) => (b.onclick = () => closeModal(b.dataset.close)));
  document.querySelectorAll(".modal-backdrop").forEach(
    (m) =>
      (m.onclick = (e) => {
        if (e.target === m) closeModal(m.id);
      }),
  );
}
export async function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
