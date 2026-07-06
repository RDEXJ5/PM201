from pydantic import BaseModel


class UsuarioLogin(BaseModel):
    email: str
    password: str


class ProductoCreate(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    id_categoria: int
    disponible: bool = True
    activo: bool = True


class PedidoCreate(BaseModel):
    id_mesa: int
    id_mesero: int
    id_estado: int
    total: float
    notas: str | None = None


class GastoCreate(BaseModel):
    concepto: str
    id_categoria_gasto: int
    monto: float
    id_usuario: int