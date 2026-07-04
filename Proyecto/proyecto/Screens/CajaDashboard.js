import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import StatCard from '../components/StatCard';
import BrownButton from '../components/BrownButton';
import SmallButton from '../components/SmallButton';
import SectionHeader from '../components/SectionHeader';
import MovementRow from '../components/MovementRow';
import { movements } from '../data/mockData';
import { pesos } from '../utils/helpers';
import { styles } from '../styles/coffeeStyles';

export default function CajaDashboard({ orders, onChangeScreen }) {
  const todayTotal = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingPayment = orders.filter(order => order.status !== 'Pagado').length;

  return (
    <Screen>
      <Text style={styles.screenTitle}>Ventas del día</Text>
      <View style={styles.moneyCard}>
        <Text style={styles.moneyValue}>{pesos(todayTotal)}</Text>
        <Text style={styles.mutedText}>Ingresos acumulados</Text>
      </View>
      <View style={styles.statsGrid}>
        <StatCard title="Gastos" value="$120" tone="red" />
        <StatCard title="Ganancia" value="$330" tone="green" />
      </View>
      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>Acciones rápidas</Text>
        <BrownButton label="Cobrar Pedido" onPress={() => onChangeScreen('cajaCobrar')} />
        <View style={styles.rowButtons}>
          <SmallButton label="Registrar gasto" onPress={() => onChangeScreen('cajaGasto')} />
          <SmallButton label="Ver finanzas" onPress={() => onChangeScreen('cajaFinanzas')} outline />
        </View>
      </View>
      <SectionHeader title="Últimos movimientos" action={`${pendingPayment} pendientes`} />
      {movements.map(item => (
        <MovementRow key={item.title} item={item} />
      ))}
    </Screen>
  );
}
