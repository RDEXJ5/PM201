export const initialProducts = [
  { id: 'p1', name: 'Espresso', category: 'Café', price: 35, available: true, img: '☕' },
  { id: 'p2', name: 'Latte', category: 'Café', price: 48, available: true, img: '🥛' },
  { id: 'p3', name: 'Avocado Toast', category: 'Comida', price: 72, available: true, img: '🥑' },
  { id: 'p4', name: 'Croissant', category: 'Pan', price: 42, available: false, img: '🥐' },
  { id: 'p5', name: 'Capuccino', category: 'Café', price: 52, available: true, img: '☕' },
  { id: 'p6', name: 'Americano', category: 'Café', price: 32, available: true, img: '🍵' },
];

export const initialOrders = [
  {
    id: 'o1',
    code: '#2401',
    table: 'Mesa 03',
    client: 'Cliente mesa 03',
    items: ['Latte', 'Croissant de Almendras'],
    total: 124.5,
    time: '08:30 AM',
    status: 'Pendiente',
    notes: 'Sin azúcar, para llevar',
  },
  {
    id: 'o2',
    code: '#2402',
    table: 'Mesa 06',
    client: 'Cliente mesa 06',
    items: ['Capuccino', 'Muffin de Arándano'],
    total: 98,
    time: '08:35 AM',
    status: 'En preparación',
    notes: 'Caliente',
  },
  {
    id: 'o3',
    code: '#2403',
    table: 'Mesa 01',
    client: 'Cliente mesa 01',
    items: ['Espresso Doble', 'Bagel de Queso'],
    total: 156,
    time: '08:40 AM',
    status: 'Listo',
    notes: 'Entregar en barra',
  },
  {
    id: 'o4',
    code: '#2398',
    table: 'Mesa 04',
    client: 'Cliente mesa 04',
    items: ['Chocolate frío', 'Pan de chocolate'],
    total: 89,
    time: '07:50 AM',
    status: 'Retrasado',
    notes: 'Cliente esperando',
  },
];

export const inventory = [
  { name: 'Granos de Café', desc: 'Tueste medio - Origen Colombia', stock: '12.5 kg', level: 'good' },
  { name: 'Leche de Avena', desc: 'Marca Barista Professional', stock: '24 litros', level: 'low' },
  { name: 'Azúcar', desc: 'Refinada - Saco 5kg', stock: '25 kg', level: 'good' },
  { name: 'Servilletas', desc: 'Ecológicas - pack 1000', stock: '120 unidades', level: 'critical' },
];

export const movements = [
  { title: 'Venta #2401', detail: 'Pago en efectivo', amount: '+$124.50', type: 'in' },
  { title: 'Gasto Productos', detail: 'Compra de leche y vasos', amount: '-$320.50', type: 'out' },
  { title: 'Venta #2402', detail: 'Pago con tarjeta', amount: '+$98.00', type: 'in' },
];
