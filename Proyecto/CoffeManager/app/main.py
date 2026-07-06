from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth2, caja, cocina, pedidos, productos, usuarios
from app.routers import roles, estadisticas, reportes

app = FastAPI(title="Coffee Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth2.router)
app.include_router(usuarios.router)
app.include_router(productos.router)
app.include_router(pedidos.router)
app.include_router(caja.router)
app.include_router(cocina.router)
app.include_router(roles.router)
app.include_router(estadisticas.router)
app.include_router(reportes.router)

@app.get("/")
def root():
    return {"message": "Coffee Manager API funcionando", "docs": "/docs"}
