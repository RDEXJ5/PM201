import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors, styles } from '../styles/coffeeStyles';

export default function SearchBar({ placeholder }) {
  return (
    <View style={styles.searchBox}>
      <Text style={styles.inputIcon}>⌕</Text>
      <TextInput placeholder={placeholder} placeholderTextColor={colors.muted} style={styles.input} />
    </View>
  );
}
