import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function MovementRow({ item }) {
  return (
    <View style={styles.movementRow}>
      <View style={styles.movementIcon}>
        <Text>{item.type === 'in' ? '↗' : '↘'}</Text>
      </View>
      <View style={styles.flex1}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.mutedText}>{item.detail}</Text>
      </View>
      <Text style={[styles.amountText, item.type === 'out' && styles.amountOut]}>{item.amount}</Text>
    </View>
  );
}
