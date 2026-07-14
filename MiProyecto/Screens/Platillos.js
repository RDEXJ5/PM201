import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Switch,
  Alert,
} from 'react-native';

export default function TarjetaPlatilloScreen() {
  const platillos = [
    {
      id: '1',
      nombre: 'Enchiladas',
      precio: 12.99,
      paisdeOrigen: 'México',
    },
    {
      id: '2',
      nombre: 'Tacos',
      precio: 8.99,
      paisdeOrigen: 'México',
    },
    {
      id: '3',
      nombre: 'Pastel de Chocolate',
      precio: 5.99,
      paisdeOrigen: 'México',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Menú del Restaurante</Text>

      <View style={styles.lista}>
        {platillos.map((platillo) => (
          <TarjetaPlatillo
            key={platillo.id}
            nombre={platillo.nombre}
            precio={platillo.precio}
            paisOrigen={platillo.paisdeOrigen}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}