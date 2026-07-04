import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/coffeeStyles';

export default function BottomNav({ role, active, onChange }) {
  const items = {
    cocina: [
      { key: 'cocinaDashboard', label: 'Inicio', icon: '⌂' },
      { key: 'cocinaPedidos', label: 'Pedidos', icon: '☰' },
      { key: 'cocinaInventario', label: 'Inventario', icon: '▦' },
      { key: 'cocinaMenu', label: 'Menú', icon: '✎' },
    ],
    caja: [
      { key: 'cajaDashboard', label: 'Inicio', icon: '⌂' },
      { key: 'cajaCobrar', label: 'Cobrar', icon: '$' },
      { key: 'cajaGasto', label: 'Gastos', icon: '−' },
      { key: 'cajaFinanzas', label: 'Finanzas', icon: '≡' },
    ],
    mesero: [
      { key: 'meseroDashboard', label: 'Inicio', icon: '⌂' },
      { key: 'meseroRegistro', label: 'Pedido', icon: '+' },
      { key: 'meseroEstados', label: 'Estado', icon: '✓' },
    ],
  }[role];

  return (
    <View style={styles.navbar}>
      {items.map(item => {
        const isActive = active === item.key;
        return (
          <Pressable key={item.key} style={styles.navItem} onPress={() => onChange(item.key)}>
            <View style={[styles.navIcon, isActive && styles.navIconActive]}>
              <Text style={[styles.navIconText, isActive && styles.navIconTextActive]}>{item.icon}</Text>
            </View>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
