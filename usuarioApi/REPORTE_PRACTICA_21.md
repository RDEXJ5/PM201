# Práctica No. 21

## Conexión móvil API y navegación Stack: Update y Delete

## Objetivo

Implementar la navegación Stack y completar las acciones de actualización y eliminación de usuarios en la aplicación móvil conectada a la API.

## Desarrollo

La aplicación utiliza Expo Router, que organiza las pantallas mediante archivos. La pantalla principal contiene las pestañas Alta y Consulta. Desde Consulta se muestran los usuarios obtenidos con una petición GET a la API.

Al iniciar la aplicación se solicita la dirección IP de la computadora donde se ejecuta FastAPI. La aplicación comprueba la conexión antes de mostrar las pestañas y conserva la URL durante la sesión. Esto permite cambiar de red sin modificar las cuatro pantallas del CRUD.

Cada tarjeta de usuario incluye la opción **Ver detalles**. Al presionarla se usa `router.push` para abrir la pantalla `detalleUsuario` dentro del Stack y se envían el identificador, el nombre y la edad del usuario.

La pantalla de detalle muestra los datos recibidos y contiene los botones Actualizar y Eliminar. El botón Actualizar abre otro elemento del Stack llamado `actualizarUsuario`. Su formulario inicia con el nombre y la edad precargados y envía una petición PUT al guardar los cambios.

El botón Eliminar abre un componente `Modal`. La petición DELETE solo se ejecuta cuando el usuario presiona **Sí, eliminar**. Si selecciona Cancelar, el modal se cierra y no se modifica la base de datos.

## Archivos principales

- `app/_layout.js`: configuración de la navegación Stack.
- `app/index.js`: ruta inicial para configurar la conexión.
- `config/api.js`: dirección de la API compartida por las pantallas.
- `app/(tabs)/_layout.js`: pestañas Alta y Consulta.
- `screens/ConfigurarApiScreen.js`: captura y comprobación de la IP.
- `screens/ConsultaUsuariosScreen.js`: consulta y opción Ver detalles.
- `screens/DetalleUsuarioScreen.js`: datos del usuario y modal de confirmación.
- `screens/ActualizarUsuarioScreen.js`: formulario precargado y petición PUT.
- `screens/AltaUsuariosScreen.js`: registro de usuarios mediante POST.
- `app/routers/usuarios.py`: operaciones CRUD de la API.

## Pruebas que se deben mostrar en el video

1. Iniciar la API y la base de datos.
2. Abrir la aplicación desde el teléfono.
3. Entrar a Consulta y seleccionar Ver detalles.
4. Presionar Actualizar, modificar los datos y guardar.
5. Comprobar en Consulta que aparecen los datos actualizados.
6. Abrir nuevamente el detalle y presionar Eliminar.
7. Probar primero Cancelar y comprobar que el usuario continúa registrado.
8. Confirmar la eliminación y comprobar que el usuario desaparece de Consulta.

## Resultado

Se implementaron la navegación entre Consulta, Detalle y Actualización, el formulario con datos precargados y el modal de confirmación para la eliminación. Las operaciones POST, GET, PUT y DELETE se realizan mediante `fetch` y utilizan las rutas existentes de la API.

## Evidencias pendientes de anexar

- Capturas propias de la aplicación funcionando.
- Enlace al video grabado desde el teléfono. El video debe comenzar mostrando el fondo de pantalla.
- Enlace del repositorio donde se entregará la práctica.

## Conclusión

La práctica permitió completar un CRUD móvil conectado a FastAPI y PostgreSQL. Expo Router administra el cambio entre pestañas y pantallas del Stack, mientras que las peticiones HTTP mantienen sincronizados los datos mostrados por la aplicación con la base de datos.
