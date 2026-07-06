from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Producto
from app.schemas import ProductoCreate

router = APIRouter(prefix="/productos", tags=["Productos"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_producto(data: ProductoCreate, db: Session = Depends(get_db)):
    producto = Producto(**data.dict())
    db.add(producto)
    db.commit()
    db.refresh(producto)

    return {
        "message": "Producto creado correctamente",
        "producto": producto
    }


@router.put("/{id_producto}")
def update_producto(id_producto: int, data: ProductoCreate, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter(
        Producto.id_producto == id_producto
    ).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    for key, value in data.dict().items():
        setattr(producto, key, value)

    db.commit()
    db.refresh(producto)

    return {
        "message": "Producto actualizado correctamente",
        "producto": producto
    }


@router.delete("/{id_producto}")
def delete_producto(id_producto: int, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter(
        Producto.id_producto == id_producto
    ).first()

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    db.delete(producto)
    db.commit()

    return {
        "message": "Producto eliminado correctamente"
    }