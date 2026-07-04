import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function SmallChip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.smallChip, active && styles.smallChipActive]}>
      <Text style={[styles.smallChipText, active && styles.smallChipTextActive]}>{label}</Text>
    </Pressable>
  );
}
