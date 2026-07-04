# Coffee Manager Mobile - estructura tipo Práctica 6

Este prototipo divide cada interfaz móvil en su propio archivo, parecido a la estructura usada en la Práctica 6 del repositorio.

## Estructura principal

- `App.js`: carga `MenuScreen`.
- `Screens/MenuScreen.js`: controla el cambio de pantallas y roles.
- `Screens/`: contiene una pantalla por interfaz.
- `components/`: contiene tarjetas, botones, inputs, navbar y elementos reutilizables.
- `data/mockData.js`: datos simulados de pedidos, productos, inventario y movimientos.
- `utils/helpers.js`: alertas y formato de dinero.
- `styles/coffeeStyles.js`: colores y estilos generales.

## Uso en tu práctica

Copia las carpetas `Screens`, `components`, `data`, `utils`, `styles` y el archivo `App.js` dentro de tu proyecto Expo, por ejemplo en `Practica 6/miApp2`.

Después ejecuta:

```bash
npm install
npx expo start
```

No tiene conexión a API todavía. Funciona con datos simulados para que primero se vea la interfaz.
