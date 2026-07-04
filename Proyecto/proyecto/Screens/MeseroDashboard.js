import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import StatCard from '../components/StatCard';
import BrownButton from '../components/BrownButton';
import SectionHeader from '../components/SectionHeader';
import OrderMiniCard from '../components/OrderMiniCard';
import { styles } from '../styles/coffeeStyles';

export default function MeseroDashboard({ orders, onChangeScreen }) {
  const activos = orders.filter(order => order.status !== 'Pagado').length;
  const listos = orders.filter(order => order.status === 'Listo').length;

  return (
    <Screen>
      <Text style={styles.screenTitle}>Turno actual</Text>
      <View style={styles.statsGrid}>
        <StatCard title="Pedidos activos" value={activos} tone="brown" />
        <StatCard title="Listos para entregar" value={listos} tone="orange" />
      </View>
      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>Registrar Pedido</Text>
        <Text style={styles.mutedText}>Crea una nueva comanda para una mesa.</Text>
        <BrownButton label="Nuevo Pedido  +" onPress={() => onChangeScreen('meseroRegistro')} />
      </View>
      <SectionHeader title="Estado de Mesas" action="Ver mapa" />
      {orders.slice(0, 4).map(order => <OrderMiniCard key={order.id} order={order} />)}
    </Screen>
  );
}
