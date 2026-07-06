from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Pedido, Producto, Insumo

router = APIRouter(prefix="/cocina", tags=["Cocina"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# PEDIDOS EN COCINA
# =========================

@router.get("/pedidos")
def pedidos_pendientes(db: Session = Depends(get_db)):
    return db.query(Pedido).all()


@router.put("/pedido/{id_pedido}/estado")
def cambiar_estado(id_pedido: int, estado: int, db: Session = Depends(get_db)):
    pedido = db.query(Pedido).filter(
        Pedido.id_pedido == id_pedido
    ).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    pedido.id_estado = estado

    db.commit()
    db.refresh(pedido)

    return {
        "message": "Estado actualizado correctamente",
        "pedido": pedido
    }


# =========================
# INVENTARIO (INSUMOS)
# =========================

@router.get("/insumos")
def ver_insumos(db: Session = Depends(get_db)):
    return db.query(Insumo).all()


@router.put("/insumo/{id}")
def actualizar_stock(id: int, cantidad: float, db: Session = Depends(get_db)):
    insumo = db.query(Insumo).filter(
        Insumo.id_insumo == id
    ).first()

    if not insumo:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")

    insumo.stock_actual = cantidad

    db.commit()
    db.refresh(insumo)

    return {
        "message": "Stock actualizado correctamente",
        "insumo": insumo
    }


# =========================
# PRODUCTOS (MENÚ)
# =========================

@router.get("/productos")
def ver_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()