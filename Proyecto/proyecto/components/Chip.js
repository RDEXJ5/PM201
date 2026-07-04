import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function Chip({ label, active }) {
  return (
    <View style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </View>
  );
}
