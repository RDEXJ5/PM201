import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function SmallButton({ label, onPress, outline }) {
  return (
    <Pressable onPress={onPress} style={[styles.smallBtn, outline && styles.smallBtnOutline]}>
      <Text style={[styles.smallBtnText, outline && styles.smallBtnTextOutline]}>{label}</Text>
    </Pressable>
  );
}
