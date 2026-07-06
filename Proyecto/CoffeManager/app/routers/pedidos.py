from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Pedido
from app.schemas import PedidoCreate

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def listar_pedidos(db: Session = Depends(get_db)):
    return db.query(Pedido).all()


@router.get("/{id_pedido}")
def obtener_pedido(id_pedido: int, db: Session = Depends(get_db)):
    pedido = db.query(Pedido).filter(
        Pedido.id_pedido == id_pedido
    ).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return pedido


@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_pedido(data: PedidoCreate, db: Session = Depends(get_db)):
    pedido = Pedido(**data.dict())

    db.add(pedido)
    db.commit()
    db.refresh(pedido)

    return {
        "message": "Pedido creado correctamente",
        "pedido": pedido
    }


@router.put("/{id_pedido}")
def actualizar_pedido(id_pedido: int, data: PedidoCreate, db: Session = Depends(get_db)):
    pedido = db.query(Pedido).filter(
        Pedido.id_pedido == id_pedido
    ).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    for key, value in data.dict().items():
        setattr(pedido, key, value)

    db.commit()
    db.refresh(pedido)

    return {
        "message": "Pedido actualizado correctamente",
        "pedido": pedido
    }


@router.delete("/{id_pedido}")
def eliminar_pedido(id_pedido: int, db: Session = Depends(get_db)):
    pedido = db.query(Pedido).filter(
        Pedido.id_pedido == id_pedido
    ).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    db.delete(pedido)
    db.commit()

    return {
        "message": "Pedido eliminado correctamente"
    }