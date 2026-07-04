import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors, styles } from '../styles/coffeeStyles';

export default function Input({ label, icon, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputBox}>
        {icon && <Text style={styles.inputIcon}>{icon}</Text>}
        <TextInput
          {...props}
          placeholderTextColor={colors.muted}
          style={[styles.input, props.multiline && styles.inputMultiline]}
        />
      </View>
    </View>
  );
}
