Componente1.js

import React,{useState} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MiModal} from '../components/MiModal';
import { BottomSheet } from '../components/BottomSheet';

export default function Componente1() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style= {styles.titulo}>Practica : Modal y Bottom Sheet </Text>

      <Pressable
        style={[styles.boton, { backgroundColor: '#2a7e01' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botonTexto}>Mostrar Modal</Text>
      </Pressable>

      <Pressable
        style={[styles.boton, { backgroundColor: 'red' }]}
        onPress={() => setSheetVisible(true)}
      >
        <Text style={styles.botonTexto}>Abrir Bottom Sheet</Text>
      </Pressable>

      <MiModal
        visible={modalVisible}
        onCerrar={() => setModalVisible(false)}
        titulo="Modal"
      >
        <Text>Nombre: Cristian</Text>
        <Text>Carrera: Sistemas Computacionales</Text>
        <Text>Cuatrimestre: 9 </Text>
      </MiModal>

      <BottomSheet
        visible={sheetVisible}
        onCerrar={() => setSheetVisible(false)}
        titulo="Bottom Sheet"
      >
        <Text>Este sale desde abajo</Text>
        <Text>Se puede cerrar tocando el area oscura</Text>
      </BottomSheet>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 16,
  },
});