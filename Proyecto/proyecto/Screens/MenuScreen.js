import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { colors, styles } from '../styles/coffeeStyles';
import { showMessage } from '../utils/helpers';
import { initialOrders, initialProducts } from '../data/mockData';

import LoginScreen from './LoginScreen';
import CocinaDashboard from './CocinaDashboard';
import CocinaPedidosScreen from './CocinaPedidosScreen';
import CocinaInventarioScreen from './CocinaInventarioScreen';
import CocinaGestionMenuScreen from './CocinaGestionMenuScreen';
import CajaDashboard from './CajaDashboard';
import CajaCobrarPedidoScreen from './CajaCobrarPedidoScreen';
import CajaRegistroGastoScreen from './CajaRegistroGastoScreen';
import CajaFinanzasScreen from './CajaFinanzasScreen';
import MeseroDashboard from './MeseroDashboard';
import MeseroRegistroPedidoScreen from './MeseroRegistroPedidoScreen';
import MeseroEstadoPedidosScreen from './MeseroEstadoPedidosScreen';

export default function MenuScreen() {
  const [role, setRole] = useState(null);
  const [screen, setScreen] = useState('login');
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);

  const goToRoleHome = selectedRole => {
    setRole(selectedRole);
    if (selectedRole === 'cocina') setScreen('cocinaDashboard');
    if (selectedRole === 'caja') setScreen('cajaDashboard');
    if (selectedRole === 'mesero') setScreen('meseroDashboard');
  };

  const logout = () => {
    setRole(null);
    setScreen('login');
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(order => (order.id === id ? { ...order, status } : order)));
    showMessage('Estado actualizado', `El pedido ahora está como: ${status}`);
  };

  const toggleProduct = id => {
    setProducts(prev => prev.map(product => (product.id === id ? { ...product, available: !product.available } : product)));
  };

  const addOrder = newOrder => {
    setOrders(prev => [newOrder, ...prev]);
  };

  if (!role) {
    return <LoginScreen onLogin={goToRoleHome} />;
  }

  const title = role === 'cocina' ? 'Cocina' : role === 'caja' ? 'Caja' : 'Mesero';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <Header title={title} onLogout={logout} />
      <View style={styles.appBody}>{renderScreen()}</View>
      <BottomNav role={role} active={screen} onChange={setScreen} />
    </SafeAreaView>
  );

  function renderScreen() {
    if (screen === 'cocinaDashboard') return <CocinaDashboard orders={orders} onChangeScreen={setScreen} />;
    if (screen === 'cocinaPedidos') return <CocinaPedidosScreen orders={orders} updateOrderStatus={updateOrderStatus} />;
    if (screen === 'cocinaInventario') return <CocinaInventarioScreen />;
    if (screen === 'cocinaMenu') return <CocinaGestionMenuScreen products={products} toggleProduct={toggleProduct} />;

    if (screen === 'cajaDashboard') return <CajaDashboard orders={orders} onChangeScreen={setScreen} />;
    if (screen === 'cajaCobrar') return <CajaCobrarPedidoScreen orders={orders} updateOrderStatus={updateOrderStatus} />;
    if (screen === 'cajaGasto') return <CajaRegistroGastoScreen />;
    if (screen === 'cajaFinanzas') return <CajaFinanzasScreen />;

    if (screen === 'meseroDashboard') return <MeseroDashboard orders={orders} onChangeScreen={setScreen} />;
    if (screen === 'meseroRegistro') return <MeseroRegistroPedidoScreen products={products} addOrder={addOrder} onChangeScreen={setScreen} />;
    if (screen === 'meseroEstados') return <MeseroEstadoPedidosScreen orders={orders} updateOrderStatus={updateOrderStatus} />;

    return <MeseroDashboard orders={orders} onChangeScreen={setScreen} />;
  }
}
