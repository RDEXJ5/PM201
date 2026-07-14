import React from 'react';
import { View, Text, StyleSheet, SectionList, SafeAreaView} from 'react-native';

export default function SectionListScreen() {
  const datos = [
    {
      title: 'Comida',
      data: [
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
      ],
    },
    {
      title: 'Postres',
      data: [
        {
          id: '3',
          nombre: 'Pastel de Chocolate',
          precio: 5.99,
          paisdeOrigen: 'México',
        },
        {
          id: '4',
          nombre: 'Flan',
          precio: 4.99,
          paisdeOrigen: 'México',
        },
      ],
    },
  ];



  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.itemPrice}>Precio: ${item.precio.toFixed(2)}</Text>
      <Text style={styles.itemOrigin}>País de origen: {item.paisdeOrigen}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menú del Restaurante</Text>

      <SectionList
        sections={datos}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    padding: 8,
    marginTop: 10,
    borderRadius: 5,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  itemOrigin: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
});