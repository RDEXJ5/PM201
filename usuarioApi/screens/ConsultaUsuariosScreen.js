import React from 'react';
import {SafeAreaView,View,Text,FlatList,StyleSheet, Platform,
} from 'react-native';
import {useState, useEffect} from 'react';

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);

  const API_BASE_URL = Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://192.168.16.56:5000';

  const obtenerUsuarios = async () => {
    try{
      const respuesta = await fetch(`${API_BASE_URL}/v1/usuarios/`);

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      console.log(datos);
      setUsuarios(datos.usuarios);
    }catch(error){
      console.error('Error al obtener usuarios:', error);
    }};
    useEffect(() => {
      obtenerUsuarios();
    }, []);
  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

});