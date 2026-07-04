import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import StatCard from '../components/StatCard';
import SmallButton from '../components/SmallButton';
import SearchBar from '../components/SearchBar';
import StatusPill from '../components/StatusPill';
import { inventory } from '../data/mockData';
import { showMessage } from '../utils/helpers';
import { styles } from '../styles/coffeeStyles';

export default function CocinaInventarioScreen() {
  return (
    <Screen>
      <View style={styles.rowBetween}>
        <Text style={styles.screenTitle}>Inventario</Text>
        <SmallButton label="+ Agregar insumo" onPress={() => showMessage('Inventario', 'Aquí se agregaría un nuevo insumo.')} />
      </View>
      <View style={styles.statsGrid}>
        <StatCard title="Alertas" value="3 bajos" tone="red" />
        <StatCard title="Total artículos" value="42" tone="brown" />
      </View>
      <SearchBar placeholder="Buscar insumo..." />
      {inventory.map(item => (
        <View key={item.name} style={styles.inventoryCard}>
          <View style={[styles.sideLine, item.level === 'critical' && styles.sideLineRed, item.level === 'low' && styles.sideLineYellow]} />
          <View style={styles.flex1}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <StatusPill status={item.level === 'good' ? 'Disponible' : item.level === 'low' ? 'Stock bajo' : 'Crítico'} />
            </View>
            <Text style={styles.mutedText}>{item.desc}</Text>
            <Text style={styles.stockText}>{item.stock}</Text>
          </View>
        </View>
      ))}
    </Screen>
  );
}
