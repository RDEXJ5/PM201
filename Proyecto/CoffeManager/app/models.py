from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, TIMESTAMP, Numeric
from app.database import Base
import datetime


class Rol(Base):
    __tablename__ = "roles"

    id_rol = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    apellido = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    id_rol = Column(Integer, ForeignKey("roles.id_rol"))
    activo = Column(Boolean, default=True)
    fecha_registro = Column(TIMESTAMP, default=datetime.datetime.utcnow)


class Producto(Base):
    __tablename__ = "productos"

    id_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    descripcion = Column(String(250))
    precio = Column(Float)
    id_categoria = Column(Integer)
    disponible = Column(Boolean, default=True)
    activo = Column(Boolean, default=True)


class Pedido(Base):
    __tablename__ = "pedidos"

    id_pedido = Column(Integer, primary_key=True, index=True)
    id_mesa = Column(Integer)
    id_mesero = Column(Integer)
    id_estado = Column(Integer)
    fecha = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    total = Column(Float)
    notas = Column(String(250))


class Gasto(Base):
    __tablename__ = "gastos"

    id_gasto = Column(Integer, primary_key=True, index=True)
    concepto = Column(String(150))
    id_categoria_gasto = Column(Integer)
    monto = Column(Float)
    fecha = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))


class Insumo(Base):
    __tablename__ = "insumos"

    id_insumo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    unidad_medida = Column(String(20))
    stock_actual = Column(Numeric(10,2))
    stock_minimo = Column(Numeric(10,2))