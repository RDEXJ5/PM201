from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Usuario
from app.auth import hash_password

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_usuario(data: dict, db: Session = Depends(get_db)):
    existe = db.query(Usuario).filter(Usuario.email == data["email"]).first()

    if existe:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    nuevo = Usuario(
        nombre=data["nombre"],
        apellido=data["apellido"],
        email=data["email"],
        password=hash_password(data["password"]),
        id_rol=data["id_rol"],
        activo=True
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return {
        "message": "Usuario creado correctamente",
        "usuario": nuevo
    }


@router.get("/")
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()


@router.get("/{id_usuario}")
def obtener_usuario(id_usuario: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return usuario


@router.put("/{id_usuario}")
def actualizar_usuario(id_usuario: int, data: dict, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.nombre = data.get("nombre", usuario.nombre)
    usuario.apellido = data.get("apellido", usuario.apellido)
    usuario.email = data.get("email", usuario.email)
    usuario.id_rol = data.get("id_rol", usuario.id_rol)

    if "password" in data:
        usuario.password = hash_password(data["password"])

    db.commit()
    db.refresh(usuario)

    return {
        "message": "Usuario actualizado correctamente",
        "usuario": usuario
    }


@router.delete("/{id_usuario}")
def desactivar_usuario(id_usuario: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.activo = False

    db.commit()

    return {
        "message": "Usuario desactivado correctamente"
    }