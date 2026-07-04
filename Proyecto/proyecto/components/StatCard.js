import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function StatCard({ title, value, tone }) {
  const toneStyle = tone === 'red'
    ? styles.statRed
    : tone === 'green'
      ? styles.statGreen
      : tone === 'yellow'
        ? styles.statYellow
        : tone === 'orange'
          ? styles.statOrange
          : styles.statBrown;

  return (
    <View style={[styles.statCard, toneStyle]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}
