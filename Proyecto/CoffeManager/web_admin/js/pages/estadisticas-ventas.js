import { requireSession, Estadisticas, Reportes } from "../api.js";
import { renderLayout, setActions, showMessage } from "../common/layout.js";
import { bars, downloadBlob, money } from "../common/components.js";
requireSession();
renderLayout(
  "estadisticas-ventas.html",
  "Estadísticas de Ventas",
  "Consulta ingresos, ticket promedio, miembros nuevos y productos más vendidos.",
  `<div class="toolbar"><div class="toolbar-left"><select id="period" class="select-input"><option value="7">Últimos 7 días</option><option value="30">30 días</option><option value="90">90 días</option></select><button id="applyPeriod" class="btn-secondary">Aplicar</button></div></div><div class="grid grid-3"><div class="card pad" style="grid-column:span 2"><h3>Resumen de Ingresos</h3><div style="display:flex;justify-content:space-between;align-items:center"><p>Ganancias diarias por categoría de café</p><strong id="incomeTotal" style="font-size:36px"></strong></div><div id="incomeChart"></div></div><div class="grid"><div class="card stat-card"><small>Ticket Promedio</small><strong id="avgTicket"></strong><em>Objetivo mensual</em></div><div class="card dark stat-card"><small>Nuevos Miembros</small><strong id="members"></strong><em>Este crecimiento</em></div></div></div><div class="grid grid-2" style="margin-top:16px"><div class="card pad"><h3>↑ Productos más vendidos</h3><div id="topProducts"></div><button id="viewAllProducts" class="btn-ghost btn-small">Ver todos los productos</button></div><div class="card pad"><h3>↓ Productos menos vendidos</h3><div id="lowProducts"></div><button id="promoBtn" class="btn-ghost btn-small">Estrategia de promoción</button></div></div>`,
);
setActions(
  '<button id="exportSales" class="btn-secondary">Exportar informe</button>',
);
async function load() {
  try {
    const data = await Estadisticas.ventas(period.value);
    incomeTotal.textContent = money(data.total_ingresos || 0);
    avgTicket.textContent = money(data.ticket_promedio || 0);
    members.textContent = `+${data.nuevos_miembros || 0}`;
    incomeChart.innerHTML = bars(
      (data.series || []).map((x, i) => ({
        label: x.label,
        value: x.value,
        active: i === data.series.length - 3,
      })),
    );
    topProducts.innerHTML = productRows(data.mas_vendidos || [], true);
    lowProducts.innerHTML = productRows(data.menos_vendidos || [], false);
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function productRows(list, up) {
  return (
    (list || [])
      .map(
        (x) =>
          `<div class="product-row"><div class="thumb">☕</div><div style="flex:1"><strong>${x.nombre}</strong><br><small>${x.categoria || "Producto"}</small></div><span style="color:${up ? "var(--green)" : "var(--red)"}">${x.ventas || 0} ventas</span></div>`,
      )
      .join("") || '<div class="empty">Sin productos para mostrar.</div>'
  );
}
applyPeriod.onclick = load;
exportSales.onclick = async () => {
  try {
    const blob = await Reportes.download("pedidos", "pdf");
    await downloadBlob(blob, "estadisticas_ventas.pdf");
    showMessage("Informe descargado.");
  } catch (err) {
    showMessage(err.message, "error");
  }
};
viewAllProducts.onclick = () =>
  (location.href = "reportes.html?preview=productos");
promoBtn.onclick = () =>
  showMessage(
    "Estrategia sugerida: aplicar promoción a productos con menor rotación.",
    "info",
  );
load();
