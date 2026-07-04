import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function BrownButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.brownBtn, pressed && styles.pressed]}>
      <Text style={styles.brownBtnText}>{label}</Text>
    </Pressable>
  );
}
