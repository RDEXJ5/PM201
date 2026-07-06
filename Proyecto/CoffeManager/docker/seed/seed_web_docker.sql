USE coffee_manager;

-- Roles sin IDs manuales para evitar saltos 10 -> 100.
INSERT INTO roles (nombre)
SELECT 'Administrador' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre='Administrador');
INSERT INTO roles (nombre)
SELECT 'Cajero' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre='Cajero');
INSERT INTO roles (nombre)
SELECT 'Cocinero' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre='Cocinero');
INSERT INTO roles (nombre)
SELECT 'Mesero' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre='Mesero');

-- Usuarios. Se usa email como llave lógica. No se insertan IDs manualmente.
INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Alex','Thompson','admin@coffee.com','240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',(SELECT id_rol FROM roles WHERE nombre='Administrador'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='admin@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Elena','Rodríguez','caja@coffee.com','682b1787210953a4a1f91a9eed757bc3b3e8827fd464a2d970db063a24b1526a',(SELECT id_rol FROM roles WHERE nombre='Cajero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='caja@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Luis','Ramírez','cocina@coffee.com','17fb2b2ef0554390dfdcb2eb9099e1279e12bd4b4b01fb33a1d5f4c0ce15e85c',(SELECT id_rol FROM roles WHERE nombre='Cocinero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='cocina@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Ana','Serrano','mesero@coffee.com','51838d20209b0878a87141aa9f5c001db79c9c130a4c2f6192f1bcc5ced778cc',(SELECT id_rol FROM roles WHERE nombre='Mesero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='mesero@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Regina','Cortes Vargas','regina.cortes@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Mesero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='regina.cortes@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Daira Valeria','Curiel Morales','daira.curiel@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Cajero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='daira.curiel@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Dalixia Del Carmen','De La Torre Garcia','dalixia.de@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Cocinero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='dalixia.de@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Daniela Lisset','Elizalde Ortiz','daniela.elizalde@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Mesero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='daniela.elizalde@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Javier Guerson','Enriquez Escamilla','javier.enriquez@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Cajero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='javier.enriquez@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Karen','Esquivel Escalera','karen.esquivel@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Mesero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='karen.esquivel@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Emiliano','Figueroa Patraca','emiliano.figueroa@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Cocinero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='emiliano.figueroa@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Luis Alonso','Garcia Vazquez','luis.garcia@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Mesero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='luis.garcia@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Maria Isabel','Garcia Zarazua','maria.garcia@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Administrador'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='maria.garcia@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Josue Angel','Guerrero Resendiz','josue.guerrero@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Mesero'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='josue.guerrero@coffee.com');

INSERT INTO usuarios (nombre,apellido,email,password,id_rol,activo,fecha_registro)
SELECT 'Hector Josue','Hernandez Cruz','hector.hernandez@coffee.com','dfa7a2273567dcd1efffb9a46308e91c20fa13c44c3441bc69cd6a7869b3f7fd',(SELECT id_rol FROM roles WHERE nombre='Administrador'),1,NOW()
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email='hector.hernandez@coffee.com');

-- Productos sin IDs manuales.
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Espresso Yirgacheffe','Café espresso de origen Etiopía',45.00,1,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Espresso Yirgacheffe');
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Latte de Avena','Latte con bebida de avena',65.00,1,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Latte de Avena');
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Cold Brew 7h','Café frío infusionado por 7 horas',58.00,1,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Cold Brew 7h');
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Croissant Mantequilla','Pan artesanal de mantequilla',42.00,2,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Croissant Mantequilla');
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Muffin Zanahoria Vegano','Panqué individual vegano',38.00,2,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Muffin Zanahoria Vegano');
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Chocolate Caliente','Bebida caliente con cacao',50.00,3,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Chocolate Caliente');
INSERT INTO productos (nombre,descripcion,precio,id_categoria,disponible,activo)
SELECT 'Sandwich Pavo','Sandwich con pavo y queso',75.00,4,1,1 WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre='Sandwich Pavo');

-- Insumos sin IDs manuales.
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Sumatra Tostado Oscuro','kg',2.00,5.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Sumatra Tostado Oscuro');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Vasos Eco-Paper','unidades',140.00,100.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Vasos Eco-Paper');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Leche de Avena Orgánica','litros',8.00,12.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Leche de Avena Orgánica');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Filtro de Papel V60','paquetes',24.00,10.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Filtro de Papel V60');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Chocolate en Polvo','kg',3.00,5.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Chocolate en Polvo');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Leche Entera','litros',22.00,10.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Leche Entera');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Azúcar Refinada','kg',15.00,6.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Azúcar Refinada');
INSERT INTO insumos (nombre,unidad_medida,stock_actual,stock_minimo)
SELECT 'Hielo','bolsas',12.00,8.00 WHERE NOT EXISTS (SELECT 1 FROM insumos WHERE nombre='Hielo');

-- Pedidos sin IDs manuales. Usa los IDs reales asignados por MySQL al mesero.
INSERT INTO pedidos (id_mesa,id_mesero,id_estado,fecha,total,notas)
SELECT 1, (SELECT id_usuario FROM usuarios WHERE email='mesero@coffee.com'), 4, '2026-07-01 08:12:00', 152.00, 'Seed Docker - 2 Lattes, 1 Croissant'
WHERE NOT EXISTS (SELECT 1 FROM pedidos WHERE notas='Seed Docker - 2 Lattes, 1 Croissant');
INSERT INTO pedidos (id_mesa,id_mesero,id_estado,fecha,total,notas)
SELECT 2, (SELECT id_usuario FROM usuarios WHERE email='mesero@coffee.com'), 2, '2026-07-01 08:25:00', 45.00, 'Seed Docker - 1 Espresso'
WHERE NOT EXISTS (SELECT 1 FROM pedidos WHERE notas='Seed Docker - 1 Espresso');
INSERT INTO pedidos (id_mesa,id_mesero,id_estado,fecha,total,notas)
SELECT 3, (SELECT id_usuario FROM usuarios WHERE email='regina.cortes@coffee.com'), 4, '2026-07-02 09:05:00', 141.00, 'Seed Docker - 1 Flat White, 2 Muffins'
WHERE NOT EXISTS (SELECT 1 FROM pedidos WHERE notas='Seed Docker - 1 Flat White, 2 Muffins');
INSERT INTO pedidos (id_mesa,id_mesero,id_estado,fecha,total,notas)
SELECT 4, (SELECT id_usuario FROM usuarios WHERE email='josue.guerrero@coffee.com'), 1, '2026-07-03 10:30:00', 174.00, 'Seed Docker - 3 Cold Brew'
WHERE NOT EXISTS (SELECT 1 FROM pedidos WHERE notas='Seed Docker - 3 Cold Brew');
INSERT INTO pedidos (id_mesa,id_mesero,id_estado,fecha,total,notas)
SELECT 5, (SELECT id_usuario FROM usuarios WHERE email='luis.garcia@coffee.com'), 3, '2026-07-04 11:10:00', 100.00, 'Seed Docker - Pedido listo para entrega'
WHERE NOT EXISTS (SELECT 1 FROM pedidos WHERE notas='Seed Docker - Pedido listo para entrega');

-- Gastos sin IDs manuales. Usa los IDs reales asignados por MySQL al usuario.
INSERT INTO gastos (concepto,id_categoria_gasto,monto,fecha,id_usuario)
SELECT 'Compra de leche de avena',1,620.00,'2026-07-01 11:00:00',(SELECT id_usuario FROM usuarios WHERE email='caja@coffee.com')
WHERE NOT EXISTS (SELECT 1 FROM gastos WHERE concepto='Compra de leche de avena');
INSERT INTO gastos (concepto,id_categoria_gasto,monto,fecha,id_usuario)
SELECT 'Mantenimiento de cafetera',2,850.00,'2026-07-01 12:00:00',(SELECT id_usuario FROM usuarios WHERE email='admin@coffee.com')
WHERE NOT EXISTS (SELECT 1 FROM gastos WHERE concepto='Mantenimiento de cafetera');
INSERT INTO gastos (concepto,id_categoria_gasto,monto,fecha,id_usuario)
SELECT 'Compra de vasos biodegradables',1,420.00,'2026-07-02 10:00:00',(SELECT id_usuario FROM usuarios WHERE email='daira.curiel@coffee.com')
WHERE NOT EXISTS (SELECT 1 FROM gastos WHERE concepto='Compra de vasos biodegradables');
INSERT INTO gastos (concepto,id_categoria_gasto,monto,fecha,id_usuario)
SELECT 'Pago de proveedor de granos',3,1250.00,'2026-07-02 13:00:00',(SELECT id_usuario FROM usuarios WHERE email='hector.hernandez@coffee.com')
WHERE NOT EXISTS (SELECT 1 FROM gastos WHERE concepto='Pago de proveedor de granos');
