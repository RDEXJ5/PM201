from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import BytesIO
from app.database import SessionLocal
from app.models import Producto, Pedido, Gasto, Insumo

router = APIRouter(prefix="/reportes", tags=["Reportes"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def money(value):
    return float(value or 0)

def dataset(tipo: str, db: Session):
    tipo = tipo.lower()
    if tipo == "productos":
        cols = ["id", "nombre", "descripcion", "precio", "categoria", "disponible", "activo"]
        rows = [{"id": p.id_producto, "nombre": p.nombre, "descripcion": p.descripcion, "precio": money(p.precio), "categoria": p.id_categoria, "disponible": p.disponible, "activo": p.activo} for p in db.query(Producto).all()]
        return "Reporte de Productos", cols, rows
    if tipo == "pedidos":
        cols = ["id", "mesa", "mesero", "estado", "fecha", "total", "notas"]
        rows = [{"id": p.id_pedido, "mesa": p.id_mesa, "mesero": p.id_mesero, "estado": p.id_estado, "fecha": str(p.fecha), "total": money(p.total), "notas": p.notas} for p in db.query(Pedido).all()]
        return "Reporte de Pedidos", cols, rows
    if tipo == "gastos":
        cols = ["id", "concepto", "categoria", "monto", "fecha", "usuario"]
        rows = [{"id": g.id_gasto, "concepto": g.concepto, "categoria": g.id_categoria_gasto, "monto": money(g.monto), "fecha": str(g.fecha), "usuario": g.id_usuario} for g in db.query(Gasto).all()]
        return "Reporte de Gastos", cols, rows
    if tipo == "inventario":
        cols = ["id", "nombre", "unidad", "stock_actual", "stock_minimo"]
        rows = [{"id": i.id_insumo, "nombre": i.nombre, "unidad": i.unidad_medida, "stock_actual": money(i.stock_actual), "stock_minimo": money(i.stock_minimo)} for i in db.query(Insumo).all()]
        return "Reporte de Inventario", cols, rows
    raise HTTPException(status_code=404, detail="Tipo de reporte no válido")

def make_xlsx(title, cols, rows):
    from openpyxl import Workbook
    wb = Workbook()
    ws = wb.active
    ws.title = title[:31]
    ws.append(cols)
    for row in rows:
        ws.append([row.get(c, "") for c in cols])
    for column in ws.columns:
        ws.column_dimensions[column[0].column_letter].width = max(14, min(35, max(len(str(c.value or "")) for c in column) + 2))
    bio = BytesIO()
    wb.save(bio)
    bio.seek(0)
    return bio

def make_pdf(title, cols, rows):
    from reportlab.lib.pagesizes import letter, landscape
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet
    bio = BytesIO()
    doc = SimpleDocTemplate(bio, pagesize=landscape(letter), leftMargin=24, rightMargin=24, topMargin=24, bottomMargin=24)
    styles = getSampleStyleSheet()
    data = [cols] + [[str(row.get(c, "")) for c in cols] for row in rows]
    table = Table(data, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#755139")),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("GRID", (0,0), (-1,-1), 0.4, colors.HexColor("#ead9ca")),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 8),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, colors.HexColor("#fff4ec")]),
    ]))
    doc.build([Paragraph(title, styles["Title"]), Spacer(1, 12), table])
    bio.seek(0)
    return bio

@router.get("/{tipo}")
def reporte(tipo: str, formato: str = "json", db: Session = Depends(get_db)):
    title, cols, rows = dataset(tipo, db)
    formato = formato.lower()
    if formato == "json":
        return {"titulo": title, "columns": cols, "rows": rows}
    if formato == "xlsx":
        bio = make_xlsx(title, cols, rows)
        return StreamingResponse(bio, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": f"attachment; filename=reporte_{tipo}.xlsx"})
    if formato == "pdf":
        bio = make_pdf(title, cols, rows)
        return StreamingResponse(bio, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=reporte_{tipo}.pdf"})
    raise HTTPException(status_code=422, detail="Formato no válido. Usa json, pdf o xlsx")
