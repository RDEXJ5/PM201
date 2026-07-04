import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import Chip from '../components/Chip';
import SmallButton from '../components/SmallButton';
import StatusPill from '../components/StatusPill';
import { styles } from '../styles/coffeeStyles';

export default function CocinaPedidosScreen({ orders, updateOrderStatus }) {
  return (
    <Screen>
      <Text style={styles.screenTitle}>Pedidos Pendientes</Text>
      <View style={styles.tabRow}>
        <Chip label="Pendientes" active />
        <Chip label="Preparando" />
        <Chip label="Listos" />
      </View>

      {orders.map(order => (
        <View key={order.id} style={styles.orderCardLarge}>
          <View style={styles.orderTopRow}>
            <Text style={styles.orderCode}>Order {order.code}</Text>
            <StatusPill status={order.status} />
          </View>
          <Text style={styles.mutedText}>{order.table} · {order.time}</Text>
          {order.items.map((item, index) => (
            <Text key={`${order.id}-${item}`} style={styles.itemLine}>{index + 1}. {item}</Text>
          ))}
          <Text style={styles.noteText}>Nota: {order.notes}</Text>
          <View style={styles.rowButtons}>
            <SmallButton label="Preparar" onPress={() => updateOrderStatus(order.id, 'En preparación')} />
            <SmallButton label="Listo" onPress={() => updateOrderStatus(order.id, 'Listo')} outline />
          </View>
        </View>
      ))}
    </Screen>
  );
}
