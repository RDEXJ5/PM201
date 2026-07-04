import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function Screen({ children }) {
  return <ScrollView contentContainerStyle={styles.screen}>{children}</ScrollView>;
}
