from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Usuario
from app.auth import verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(
        Usuario.email == data["email"],
        Usuario.activo == True
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    if not verify_password(data["password"], usuario.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Contraseña incorrecta"
        )

    token = create_token({
        "id_usuario": usuario.id_usuario,
        "id_rol": usuario.id_rol,
        "email": usuario.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": {
            "id_usuario": usuario.id_usuario,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "email": usuario.email,
            "id_rol": usuario.id_rol
        }
    }