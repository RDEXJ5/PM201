import { requireSession, Estadisticas, Pedidos, Reportes } from "../api.js";
import { renderLayout, setActions, showMessage } from "../common/layout.js";
import { bars, downloadBlob, money } from "../common/components.js";
requireSession();
renderLayout(
  "dashboard.html",
  "Panel de Control",
  "Resumen general de ventas, pedidos activos e inventario bajo.",
  `<div id="statsGrid" class="grid grid-5"></div><div class="grid grid-2" style="margin-top:16px;align-items:start"><div class="card pad"><div style="display:flex;justify-content:space-between"><h3>Rendimiento de Ventas</h3><div><button class="btn-secondary btn-small" data-period="7">Semana</button><button class="btn-ghost btn-small" data-period="30">Mensual</button></div></div><div id="salesChart"></div></div><div class="grid"><div class="card pad"><h3>Acceso Rápido</h3><div class="quick-grid"><a class="quick-card" href="usuarios.html?action=new">Nuevo Usuario</a><a class="quick-card" href="reportes.html?preview=pedidos">Reporte de Hoy</a><button class="quick-card" id="closeDay">Cierre de Día</button><a class="quick-card" href="roles.html?action=assign">Asignar Permisos</a></div></div><div class="card dark pad"><h3>Revisión Mensual de Estado</h3><p style="margin:0;color:#f7e8dc">Consulta métricas de ventas, gastos y actividad reciente.</p></div></div></div><div class="card table-card" style="margin-top:16px"><div style="padding:16px 16px 0;display:flex;justify-content:space-between"><h3>Ventas Recientes</h3><button id="viewAllSales" class="btn-ghost btn-small">Ver todas las transacciones</button></div><div class="table-scroll"><table class="data-table"><thead><tr><th>ID de Pedido</th><th>Cliente</th><th>Artículo</th><th>Hora</th><th>Estado</th><th>Monto</th></tr></thead><tbody id="recentRows"></tbody></table></div></div>`,
);
setActions(
  '<button id="refreshDash" class="btn-secondary">Actualizar</button>',
);
async function load(period = "7") {
  try {
    const [r, v, pedidos] = await Promise.all([
      Estadisticas.resumen(),
      Estadisticas.ventas(period),
      Pedidos.all(),
    ]);
    statsGrid.innerHTML = [
      ["Ventas de Hoy", money(r.ventas_hoy || 0), "+12%"],
      ["Gastos", money(r.gastos_hoy || 0), "-6%"],
      ["Ganancia al Cierre", money(r.ganancia_hoy || 0), "+8%"],
      ["Pedidos Activos", r.pedidos_activos || 0, ""],
      ["Inv. en stock", `${r.inventario_disponible || 0}%`, ""],
    ]
      .map(
        (x) =>
          `<div class="card stat-card"><small>${x[0]}</small><strong>${x[1]}</strong><em>${x[2]}</em></div>`,
      )
      .join("");
    salesChart.innerHTML = bars(
      (v.series || []).map((x, i) => ({
        label: x.label,
        value: x.value,
        active: i === v.series.length - 3,
      })),
    );
    renderRows(pedidos || []);
  } catch (err) {
    showMessage(err.message, "error");
  }
}
function renderRows(list) {
  recentRows.innerHTML =
    (list || [])
      .slice(0, 6)
      .map((p, i) => {
        const estado =
          ["Pendiente", "En preparación", "Listo", "Pagado"][
            Number(p.id_estado || 1) - 1
          ] || "Pendiente";
        const cls =
          estado === "Pagado"
            ? "green"
            : estado === "Listo"
              ? "blue"
              : estado.includes("prepar")
                ? "orange"
                : "gray";
        return `<tr><td>#${p.id_pedido}</td><td>${p.cliente || "Invitado"}</td><td>${p.notas || "Pedido de cafetería"}</td><td>${p.fecha ? new Date(p.fecha).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) : "--:--"}</td><td><span class="badge ${cls}">${estado}</span></td><td>${money(p.total)}</td></tr>`;
      })
      .join("") ||
    '<tr><td colspan="6" class="empty">Sin transacciones registradas.</td></tr>';
}
document.getElementById("refreshDash").onclick = () => load();
document
  .querySelectorAll("[data-period]")
  .forEach((b) => (b.onclick = () => load(b.dataset.period)));
document.getElementById("viewAllSales").onclick = () =>
  (location.href = "reportes.html?preview=pedidos");
document.getElementById("closeDay").onclick = async () => {
  try {
    const blob = await Reportes.download("pedidos", "pdf");
    await downloadBlob(blob, "cierre_de_dia.pdf");
    showMessage("Cierre de día descargado.");
  } catch (err) {
    showMessage(err.message, "error");
  }
};
load();
