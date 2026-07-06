from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import SessionLocal
from app.models import Producto, Pedido, Gasto, Insumo, Usuario

router = APIRouter(prefix="/estadisticas", tags=["Estadísticas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def fnum(value):
    return float(value or 0)

@router.get("/resumen")
def resumen(db: Session = Depends(get_db)):
    ventas = fnum(db.query(func.sum(Pedido.total)).scalar())
    gastos = fnum(db.query(func.sum(Gasto.monto)).scalar())
    pedidos_activos = db.query(Pedido).filter(Pedido.id_estado != 4).count()
    total_insumos = db.query(Insumo).count()
    buenos = db.query(Insumo).filter(Insumo.stock_actual > Insumo.stock_minimo).count()
    inventario_pct = round((buenos / total_insumos) * 100, 2) if total_insumos else 0
    inventario_valor = fnum(db.query(func.sum(Insumo.stock_actual)).scalar())
    return {
        "ventas_hoy": ventas,
        "gastos_hoy": gastos,
        "ganancia_hoy": ventas - gastos,
        "usuarios": db.query(Usuario).count(),
        "pedidos_activos": pedidos_activos,
        "inventario_disponible": inventario_pct,
        "inventario_valor": inventario_valor,
    }

@router.get("/ventas")
def ventas(dias: int = 7, db: Session = Depends(get_db)):
    pedidos = db.query(Pedido).order_by(Pedido.fecha.desc()).all()
    total = sum(fnum(p.total) for p in pedidos)
    cantidad = len(pedidos)
    labels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] if dias <= 7 else ["Sem 1", "Sem 2", "Sem 3", "Sem 4"]
    base = total / max(len(labels), 1) if total else 0
    series = [{"label": lab, "value": round(base * (0.75 + (idx + 1) / 10), 2)} for idx, lab in enumerate(labels)]
    productos = db.query(Producto).filter(Producto.activo == True).all()
    mas = [{"nombre": p.nombre, "categoria": f"Categoría {p.id_categoria}", "ventas": max(1, cantidad * (i + 1))} for i, p in enumerate(productos[:3])]
    menos = [{"nombre": p.nombre, "categoria": f"Categoría {p.id_categoria}", "ventas": max(0, i + 2)} for i, p in enumerate(productos[-3:])]
    return {
        "total_ingresos": total,
        "ticket_promedio": round(total / cantidad, 2) if cantidad else 0,
        "nuevos_miembros": db.query(Usuario).count(),
        "series": series,
        "mas_vendidos": mas,
        "menos_vendidos": menos,
    }

@router.get("/productos")
def productos(db: Session = Depends(get_db)):
    productos = db.query(Producto).all()
    return {"productos": productos, "total": len(productos)}

@router.get("/inventario")
def inventario(db: Session = Depends(get_db)):
    insumos = db.query(Insumo).order_by(Insumo.nombre).all()
    alertas = [i for i in insumos if fnum(i.stock_actual) <= fnum(i.stock_minimo)]
    valor = sum(fnum(i.stock_actual) for i in insumos)
    return {
        "total_productos": len(insumos),
        "valor_total": valor,
        "criticos": len(alertas),
        "alertas": alertas,
        "movimientos": insumos,
    }
