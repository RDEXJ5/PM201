from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Rol, Usuario

router = APIRouter(prefix="/roles", tags=["Roles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def listar_roles(db: Session = Depends(get_db)):
    return db.query(Rol).order_by(Rol.id_rol).all()

@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_rol(data: dict, db: Session = Depends(get_db)):
    nombre = (data.get("nombre") or "").strip()
    if not nombre:
        raise HTTPException(status_code=422, detail="El nombre del rol es obligatorio")
    existe = db.query(Rol).filter(Rol.nombre == nombre).first()
    if existe:
        raise HTTPException(status_code=400, detail="El rol ya existe")
    rol = Rol(nombre=nombre)
    db.add(rol)
    db.commit()
    db.refresh(rol)
    return {"message": "Rol creado correctamente", "rol": rol}

@router.put("/{id_rol}")
def actualizar_rol(id_rol: int, data: dict, db: Session = Depends(get_db)):
    rol = db.query(Rol).filter(Rol.id_rol == id_rol).first()
    if not rol:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    nombre = (data.get("nombre") or rol.nombre).strip()
    if not nombre:
        raise HTTPException(status_code=422, detail="El nombre del rol es obligatorio")
    rol.nombre = nombre
    db.commit()
    db.refresh(rol)
    return {"message": "Rol actualizado correctamente", "rol": rol}

@router.delete("/{id_rol}")
def eliminar_rol(id_rol: int, db: Session = Depends(get_db)):
    rol = db.query(Rol).filter(Rol.id_rol == id_rol).first()
    if not rol:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    asignado = db.query(Usuario).filter(Usuario.id_rol == id_rol).first()
    if asignado:
        raise HTTPException(status_code=400, detail="No se puede eliminar un rol asignado a usuarios")
    db.delete(rol)
    db.commit()
    return {"message": "Rol eliminado correctamente"}
