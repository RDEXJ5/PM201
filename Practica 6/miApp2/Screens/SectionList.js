import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

export default function SectionListScreen() {
  const datos = [
    {
      title: 'Ingeniería en Sistemas',
      data: [
        { nombre: 'Cristian' },
        { nombre: 'Itzel' }
      ]
    },
    {
      title: 'Tecnologías de Información',
      data: [
        { nombre: 'Alejandro' },
        { nombre: 'Samantha' }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Estudiantes por carrera
      </Text>

      <SectionList
        sections={datos}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nombre}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#90caf9',
    padding: 10
  },
  item: {
    padding: 15
  }
});