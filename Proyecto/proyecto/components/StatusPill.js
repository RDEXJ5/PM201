import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function StatusPill({ status }) {
  const statusStyle =
    status === 'Listo' || status === 'Disponible' || status === 'Pagado' || status === 'Entregado'
      ? styles.pillGreen
      : status === 'En preparación' || status === 'Stock bajo'
        ? styles.pillYellow
        : status === 'Retrasado' || status === 'Crítico' || status === 'Inactivo'
          ? styles.pillRed
          : styles.pillBrown;

  return (
    <View style={[styles.pill, statusStyle]}>
      <Text style={styles.pillText}>{status}</Text>
    </View>
  );
}
