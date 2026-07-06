import {
  requireSession,
  Estadisticas,
  Inventario,
  Reportes,
  Productos,
} from "../api.js";
import { renderLayout, setActions, showMessage } from "../common/layout.js";
import {
  bindModalClose,
  closeModal,
  downloadBlob,
  modal,
  money,
  openModal,
} from "../common/components.js";
requireSession();
renderLayout(
  "estadisticas-inventario.html",
  "Estadísticas de Inventario",
  "Visualiza inventario disponible, productos críticos y movimientos recientes.",
  `<div class="toolbar"><div class="toolbar-left"><input id="searchInv" class="search-field" placeholder="Buscar por producto, SKU o categoría..."><select id="filterInv" class="select-input" style="width:130px"><option value="all">Filtro</option><option value="low">Stock bajo</option><option value="ok">Stock correcto</option></select></div></div><div class="grid grid-3"><div class="card stat-card"><small>Total de productos</small><strong id="totalItems">0</strong><em>Activos</em></div><div class="card stat-card"><small>Valor total inventario</small><strong id="inventoryValue">$0</strong><em>Estimado</em></div><div class="card stat-card negative"><small>Artículos con stock crítico</small><strong id="criticalItems">0</strong><em>Atención requerida</em></div></div><div class="grid grid-3" style="margin-top:16px;align-items:start"><div class="card pad"><h3>Alertas de Stock</h3><div id="alertsBox"></div><button id="seeAlerts" class="btn-ghost btn-small btn-full">Ver todas las alertas</button></div><div class="card table-card" style="grid-column:span 2"><div style="padding:16px 16px 0;display:flex;justify-content:space-between"><h3>Movimientos Recientes</h3><button id="exportInvSmall" class="btn-ghost btn-small">Exportar</button></div><div class="table-scroll"><table class="data-table"><thead><tr><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Fecha</th><th>Acción</th></tr></thead><tbody id="movRows"></tbody></table></div><div id="paginationBox"></div></div></div>${modal("productModal", "Crear producto", `<form id="productForm" class="modal-form"><div><label class="form-label">Nombre</label><input id="prodName" class="text-input" required></div><div><label class="form-label">Descripción</label><input id="prodDesc" class="text-input" required></div><div class="grid grid-2"><div><label class="form-label">Precio</label><input id="prodPrice" type="number" step="0.01" class="text-input" required></div><div><label class="form-label">Categoría</label><input id="prodCat" type="number" class="text-input" value="1" required></div></div><div class="modal-actions"><button type="button" class="btn-secondary" data-close="productModal">Cancelar</button><button class="btn-primary" type="submit">Guardar</button></div></form>`)}${modal("stockModal", "Actualizar stock", `<form id="stockForm" class="modal-form"><input type="hidden" id="stockId"><div><label class="form-label">Producto</label><input id="stockName" class="text-input" disabled></div><div><label class="form-label">Nueva cantidad</label><input id="stockQty" type="number" step="0.01" class="text-input" required></div><div class="modal-actions"><button type="button" class="btn-secondary" data-close="stockModal">Cancelar</button><button class="btn-primary" type="submit">Guardar</button></div></form>`)}`,
);
setActions(
  '<button id="newProductBtn" class="btn-primary">+ Crear Producto Nuevo</button>',
);
bindModalClose();
let data = null,
  list = [];
async function load() {
  try {
    data = await Estadisticas.inventario();
    list = data.movimientos || [];
    render();
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function render() {
  totalItems.textContent = data.total_productos || 0;
  inventoryValue.textContent = money(data.valor_total || 0);
  criticalItems.textContent = data.criticos || 0;
  const alerts = data.alertas || [];
  alertsBox.innerHTML =
    alerts
      .map(
        (a) =>
          `<div class="product-row"><div class="thumb">📦</div><div><strong>${a.nombre}</strong><br><small>${a.stock_actual} ${a.unidad_medida || ""} restantes</small></div></div>`,
      )
      .join("") || '<div class="empty">No hay alertas.</div>';
  const q = searchInv.value.toLowerCase();
  const f = filterInv.value;
  const rows = list.filter((x) => {
    const ok = (x.nombre || "").toLowerCase().includes(q);
    const low = Number(x.stock_actual) <= Number(x.stock_minimo);
    return ok && (f === "all" || (f === "low" && low) || (f === "ok" && !low));
  });
  movRows.innerHTML =
    rows
      .map(
        (x) =>
          `<tr><td>${x.nombre}</td><td>${Number(x.stock_actual) <= Number(x.stock_minimo) ? '<span class="badge red">Bajo stock</span>' : '<span class="badge green">Correcto</span>'}</td><td>${x.stock_actual} ${x.unidad_medida || ""}</td><td>${new Date().toLocaleDateString("es-MX")}</td><td><button class="btn-secondary btn-small" data-stock="${x.id_insumo}">Actualizar</button></td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="5" class="empty">Sin movimientos registrados.</td></tr>';
  document
    .querySelectorAll("[data-stock]")
    .forEach((b) => (b.onclick = () => editStock(Number(b.dataset.stock))));
}
function editStock(id) {
  const x = list.find((i) => Number(i.id_insumo) === id);
  if (!x) return;
  stockId.value = x.id_insumo;
  stockName.value = x.nombre;
  stockQty.value = x.stock_actual;
  openModal("stockModal");
}
stockForm.onsubmit = async (e) => {
  e.preventDefault();
  try {
    await Inventario.update(stockId.value, stockQty.value);
    closeModal("stockModal");
    showMessage("Stock actualizado.");
    await load();
  } catch (err) {
    showMessage(err.message, "error");
  }
};
searchInv.oninput = render;
filterInv.onchange = render;
seeAlerts.onclick = () => {
  filterInv.value = "low";
  render();
};
async function exportInv() {
  try {
    const blob = await Reportes.download("inventario", "xlsx");
    await downloadBlob(blob, "inventario.xlsx");
    showMessage("Inventario exportado.");
  } catch (err) {
    showMessage(err.message, "error");
  }
}
exportInvSmall.onclick = exportInv;
newProductBtn.onclick = () => {
  productForm.reset();
  prodCat.value = 1;
  openModal("productModal");
};
productForm.onsubmit = async (e) => {
  e.preventDefault();
  try {
    await Productos.create({
      nombre: prodName.value.trim(),
      descripcion: prodDesc.value.trim(),
      precio: Number(prodPrice.value),
      id_categoria: Number(prodCat.value),
      disponible: true,
      activo: true,
    });
    closeModal("productModal");
    showMessage("Producto creado correctamente.");
    await load();
  } catch (err) {
    showMessage(err.message, "error");
  }
};
load();
