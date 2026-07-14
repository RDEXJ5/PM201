import React from 'react';
import { StyleSheet } from 'react-native';
import TarjetaPlatilloScreen from './Screens/tarjetaPlatillo';

export default function App() {
  return <TarjetaPlatilloScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
