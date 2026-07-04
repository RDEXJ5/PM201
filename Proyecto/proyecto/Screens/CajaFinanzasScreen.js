import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import SectionHeader from '../components/SectionHeader';
import MovementRow from '../components/MovementRow';
import { movements } from '../data/mockData';
import { styles } from '../styles/coffeeStyles';

export default function CajaFinanzasScreen() {
  return (
    <Screen>
      <Text style={styles.screenTitle}>Consulta de Ganancias</Text>
      <Text style={styles.mutedText}>Resumen financiero del día.</Text>
      <View style={styles.moneyCard}>
        <Text style={styles.moneyLabel}>Ventas totales</Text>
        <Text style={styles.moneyValue}>$4,250.00</Text>
      </View>
      <View style={styles.moneyCardLight}>
        <Text style={styles.moneyLabel}>Gastos</Text>
        <Text style={styles.moneyValueRed}>$1,120.50</Text>
      </View>
      <View style={styles.moneyCardDark}>
        <Text style={styles.moneyLabelLight}>Ganancia neta</Text>
        <Text style={styles.moneyValueLight}>$3,129.50</Text>
      </View>
      <SectionHeader title="Transacciones recientes" action="Ver todo" />
      {movements.map(item => <MovementRow key={item.title} item={item} />)}
    </Screen>
  );
}
