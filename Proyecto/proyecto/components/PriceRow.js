import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';
import { pesos } from '../utils/helpers';

export default function PriceRow({ label, value, strong, count }) {
  return (
    <View style={styles.priceRow}>
      <Text style={[styles.priceLabel, strong && styles.priceStrong]}>{label}</Text>
      <Text style={[styles.priceValue, strong && styles.priceStrong]}>{count ? value : pesos(value)}</Text>
    </View>
  );
}
