import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function Header({ title, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>☕</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSub}>Coffee Manager</Text>
        </View>
      </View>
      <Pressable onPress={onLogout} style={styles.bellBtn}>
        <Text style={styles.bellText}>↩</Text>
      </Pressable>
    </View>
  );
}
