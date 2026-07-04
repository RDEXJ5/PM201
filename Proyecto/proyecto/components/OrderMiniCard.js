import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';
import StatusPill from './StatusPill';

export default function OrderMiniCard({ order }) {
  return (
    <View style={styles.miniCard}>
      <View>
        <Text style={styles.cardTitle}>{order.code} · {order.table}</Text>
        <Text style={styles.mutedText}>{order.items.slice(0, 2).join(', ')}</Text>
      </View>
      <StatusPill status={order.status} />
    </View>
  );
}
