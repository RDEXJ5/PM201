import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import Chip from '../components/Chip';
import BrownButton from '../components/BrownButton';
import StatusPill from '../components/StatusPill';
import { styles } from '../styles/coffeeStyles';

export default function MeseroEstadoPedidosScreen({ orders, updateOrderStatus }) {
  return (
    <Screen>
      <Text style={styles.screenTitle}>Estado de Pedidos</Text>
      <View style={styles.tabRow}>
        <Chip label="Todos" active />
        <Chip label="En cocina" />
        <Chip label="En preparación" />
      </View>
      {orders.map(order => (
        <View key={order.id} style={styles.orderCardLarge}>
          <View style={styles.orderTopRow}>
            <Text style={styles.orderCode}>Pedido {order.code}</Text>
            <StatusPill status={order.status} />
          </View>
          <Text style={styles.mutedText}>{order.table} · {order.time}</Text>
          <Text style={styles.itemLine}>{order.items.join(', ')}</Text>
          <Text style={styles.noteText}>{order.notes}</Text>
          {order.status === 'Listo' && <BrownButton label="Entregar Pedido" onPress={() => updateOrderStatus(order.id, 'Entregado')} />}
        </View>
      ))}
    </Screen>
  );
}
