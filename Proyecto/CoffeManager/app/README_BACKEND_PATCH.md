# Backend Patch

Archivos para copiar al repositorio FastAPI `CoffeManager`.

## Archivos

```txt
app/main.py
app/routers/roles.py
app/routers/estadisticas.py
app/routers/reportes.py
```

## Cambios incluidos

- CORS para que la web pueda consumir la API.
- Router `/roles` con CRUD básico.
- Router `/estadisticas` para dashboard y gráficas.
- Router `/reportes` para descargar productos, pedidos e inventario en PDF/XLSX.

## Dependencias extra

```txt
openpyxl
reportlab
```

## Endpoints nuevos

```txt
GET    /roles/
POST   /roles/
GET    /roles/{id_rol}
PUT    /roles/{id_rol}
DELETE /roles/{id_rol}

GET /estadisticas/resumen
GET /estadisticas/gastos
GET /estadisticas/ganancias
GET /estadisticas/productos

GET /reportes/productos?formato=pdf|xlsx
GET /reportes/pedidos?formato=pdf|xlsx&fecha_inicio=&fecha_fin=&estado=
GET /reportes/inventario?formato=pdf|xlsx&stock_bajo=true|false
```
