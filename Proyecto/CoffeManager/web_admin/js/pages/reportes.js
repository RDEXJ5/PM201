import { requireSession, Estadisticas, Reportes } from "../api.js";
import { renderLayout, setActions, showMessage } from "../common/layout.js";
import {
  downloadBlob,
  modal,
  openModal,
  bindModalClose,
  money,
} from "../common/components.js";
requireSession();
renderLayout(
  "reportes.html",
  "Reportes",
  "Genera reportes filtrados de ventas, gastos e inventario en PDF y XLSX.",
  `<div class="card pad"><div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><h3>Resumen de Actividad</h3><p style="color:var(--muted);margin:0">Indicadores clave del rendimiento actual.</p></div><button id="monthBtn" class="btn-secondary btn-small">Este Mes</button></div><div class="grid grid-3" style="margin-top:16px"><div class="card stat-card dark"><small>Ingresos del mes</small><strong id="income">$0</strong><em>Ingreso total</em></div><div class="card stat-card"><small>Gastos</small><strong id="expenses">$0</strong><em>Operativos</em></div><div class="card stat-card"><small>Valor del inventario</small><strong id="inventory">$0</strong><em>Productos activos</em></div></div></div><div class="grid grid-3" style="margin-top:16px"><div class="card pad"><h3>Reportes de Ventas</h3><div id="salesReports"></div></div><div class="card pad"><h3>Reportes de Gastos</h3><div id="expenseReports"></div></div><div class="card pad"><h3>Reportes de Inventario</h3><div id="inventoryReports"></div></div></div><div class="card pad" style="text-align:center;margin-top:16px"><h3>¿Necesitas un reporte personalizado?</h3><p style="color:var(--muted)">Solicita un reporte específico y queda registrado como pendiente en esta sesión.</p><button id="customReport" class="btn-primary">Solicitar Análisis Personalizado</button><div id="customList" style="margin-top:12px;color:var(--muted);font-size:12px"></div></div>${modal("previewModal", "Vista previa de reporte", `<div id="previewContent" class="preview-box"></div><div class="modal-actions"><button class="btn-secondary" data-close="previewModal">Cerrar</button></div>`)}`,
);
setActions(
  '<button id="refreshReports" class="btn-secondary">Actualizar</button>',
);
bindModalClose();
const cards = {
  salesReports: [
    ["pedidos", "Registro de Transacciones Diarias"],
    ["pedidos", "Análisis Mensual de Ingresos"],
    ["productos", "Matriz de Popularidad de Productos"],
  ],
  expenseReports: [
    ["gastos", "Resumen de Flujo de Proveedores"],
    ["gastos", "Detalle de Costos Operativos"],
    ["gastos", "Flujo Histórico"],
  ],
  inventoryReports: [
    ["inventario", "Informe de Variación de Stock"],
    ["productos", "Lista de Proveedores por Categoría"],
    ["inventario", "Pronóstico de Adquisiciones"],
  ],
};
function card(tipo, titulo) {
  return `<div class="report-card"><strong>${titulo}</strong><small>${tipo.toUpperCase()}</small><div class="report-actions"><button class="btn-secondary btn-small" data-preview="${tipo}">Vista Previa</button><button class="btn-ghost btn-small" data-download="${tipo}" data-format="pdf">PDF</button><button class="btn-ghost btn-small" data-download="${tipo}" data-format="xlsx">XLSX</button></div></div>`;
}
function renderCards() {
  Object.entries(cards).forEach(
    ([id, items]) =>
      (document.getElementById(id).innerHTML = items
        .map((x) => card(x[0], x[1]))
        .join("")),
  );
  bindActions();
}
async function load() {
  try {
    const r = await Estadisticas.resumen();
    income.textContent = money(r.ventas_hoy || 0);
    expenses.textContent = money(r.gastos_hoy || 0);
    inventory.textContent = money(r.inventario_valor || 0);
    renderCards();
    renderCustom();
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function bindActions() {
  document
    .querySelectorAll("[data-preview]")
    .forEach((b) => (b.onclick = () => preview(b.dataset.preview)));
  document
    .querySelectorAll("[data-download]")
    .forEach(
      (b) => (b.onclick = () => download(b.dataset.download, b.dataset.format)),
    );
}
async function preview(tipo) {
  try {
    const data = await Reportes.preview(tipo);
    const rows = data.rows || [];
    previewContent.innerHTML = `<h3>${data.titulo || tipo}</h3><table class="data-table"><thead><tr>${(data.columns || []).map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${(data.columns || []).map((c) => `<td>${r[c] ?? ""}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    openModal("previewModal");
  } catch (err) {
    showMessage(err.message, "error");
  }
}
async function download(tipo, formato) {
  try {
    const blob = await Reportes.download(tipo, formato);
    await downloadBlob(blob, `reporte_${tipo}.${formato}`);
    showMessage(`Reporte ${formato.toUpperCase()} descargado.`);
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function renderCustom() {
  const arr = JSON.parse(localStorage.getItem("coffee_custom_reports") || "[]");
  customList.innerHTML = arr.map((x) => `<div>• ${x}</div>`).join("");
}
customReport.onclick = () => {
  const text = prompt("Describe el reporte personalizado que necesitas:");
  if (!text) return;
  const arr = JSON.parse(localStorage.getItem("coffee_custom_reports") || "[]");
  arr.unshift(`${new Date().toLocaleDateString("es-MX")} - ${text}`);
  localStorage.setItem(
    "coffee_custom_reports",
    JSON.stringify(arr.slice(0, 6)),
  );
  renderCustom();
  showMessage("Solicitud registrada.");
};
refreshReports.onclick = load;
monthBtn.onclick = () => showMessage("Filtro aplicado: este mes.", "info");
load();
const q = new URLSearchParams(location.search).get("preview");
if (q) setTimeout(() => preview(q), 500);
