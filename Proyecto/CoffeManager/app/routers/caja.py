from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Gasto
from app.schemas import GastoCreate

router = APIRouter(prefix="/caja", tags=["Caja"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/gastos")
def crear_gasto(data: GastoCreate, db: Session = Depends(get_db)):
    gasto = Gasto(**data.dict())
    db.add(gasto)
    db.commit()
    return {"message": "Gasto registrado"}

@router.get("/gastos")
def listar_gastos(db: Session = Depends(get_db)):
    return db.query(Gasto).all()