import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import BrownButton from '../components/BrownButton';
import SmallButton from '../components/SmallButton';
import StatusPill from '../components/StatusPill';
import PriceRow from '../components/PriceRow';
import { styles } from '../styles/coffeeStyles';

export default function CajaCobrarPedidoScreen({ orders, updateOrderStatus }) {
  const [selectedMethod, setSelectedMethod] = useState('Efectivo');
  const order = orders.find(item => item.status !== 'Pagado') || orders[0];
  const subtotal = order ? order.total / 1.16 : 0;
  const iva = subtotal * 0.16;

  if (!order) {
    return (
      <Screen>
        <Text style={styles.screenTitle}>Cobrar Pedido</Text>
        <Text style={styles.mutedText}>No hay pedidos pendientes.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.screenTitle}>Cobrar Pedido</Text>
      <View style={styles.orderCardLarge}>
        <View style={styles.orderTopRow}>
          <Text style={styles.orderCode}>Order {order.code}</Text>
          <StatusPill status={order.status} />
        </View>
        <Text style={styles.mutedText}>{order.table} · {order.time}</Text>
        {order.items.map(item => <Text key={item} style={styles.itemLine}>• {item}</Text>)}
      </View>

      <View style={styles.paymentCard}>
        <Text style={styles.cardTitle}>Resumen de Pago</Text>
        <PriceRow label="Subtotal" value={subtotal} />
        <PriceRow label="IVA 16%" value={iva} />
        <View style={styles.separator} />
        <PriceRow label="Total a pagar" value={order.total} strong />
        <Text style={styles.roleLabel}>Método de pago</Text>
        <View style={styles.rowButtons}>
          <SmallButton label="Efectivo" onPress={() => setSelectedMethod('Efectivo')} outline={selectedMethod !== 'Efectivo'} />
          <SmallButton label="Tarjeta" onPress={() => setSelectedMethod('Tarjeta')} outline={selectedMethod !== 'Tarjeta'} />
        </View>
        <BrownButton label={`Confirmar pago con ${selectedMethod}`} onPress={() => updateOrderStatus(order.id, 'Pagado')} />
      </View>
    </Screen>
  );
}
