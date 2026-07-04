import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import OrderMiniCard from '../components/OrderMiniCard';
import { styles } from '../styles/coffeeStyles';

export default function CocinaDashboard({ orders, onChangeScreen }) {
  const pendientes = orders.filter(order => order.status === 'Pendiente').length;
  const preparando = orders.filter(order => order.status === 'En preparación').length;
  const listo = orders.filter(order => order.status === 'Listo').length;

  return (
    <Screen>
      <Text style={styles.screenTitle}>Dashboard Cocina</Text>
      <View style={styles.statsGrid}>
        <StatCard title="Pendientes" value={pendientes} tone="red" />
        <StatCard title="En preparación" value={preparando} tone="yellow" />
        <StatCard title="Listos" value={listo} tone="green" />
      </View>

      <SectionHeader title="Actividad reciente" action="Ver todos" onPress={() => onChangeScreen('cocinaPedidos')} />
      {orders.slice(0, 3).map(order => (
        <OrderMiniCard key={order.id} order={order} />
      ))}

      <View style={styles.performanceCard}>
        <View>
          <Text style={styles.cardTitle}>Datos de cocina</Text>
          <Text style={styles.mutedText}>Rendimiento del día</Text>
          <Text style={styles.smallText}>Promedio de preparación: 12 min</Text>
        </View>
        <View style={styles.percentCircle}>
          <Text style={styles.percentText}>68%</Text>
        </View>
      </View>
    </Screen>
  );
}
