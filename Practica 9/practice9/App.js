import React, { useState } from 'react';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');

  const guardarRegistro = () => {
    if (nombre.trim() === '' || carrera.trim() === '') {
      Alert.alert(
        'Campos incompletos',
        'Por favor, ingresa el nombre y la carrera.'
      );

      return;
    }

    Alert.alert(
      'Registro guardado',
      `El estudiante ${nombre} de la carrera ${carrera} fue registrado correctamente.`,
      [
        {
          text: 'Aceptar',
          onPress: () => {
            setNombre('');
            setCarrera('');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Registro de estudiantes</Text>

        <Text style={styles.descripcion}>
          Ingresa los datos solicitados.
        </Text>

        <Text style={styles.etiqueta}>Nombre del estudiante</Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: Juan Pérez"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          maxLength={50}
        />

        <Text style={styles.etiqueta}>Carrera</Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: Ingeniería en Sistemas"
          value={carrera}
          onChangeText={setCarrera}
          autoCapitalize="words"
          maxLength={60}
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={guardarRegistro}
        >
          <Text style={styles.textoBoton}>Guardar registro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#eaf2f8',
    justifyContent: 'center',
    padding: 20,
  },

  formulario: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f4e79',
    textAlign: 'center',
    marginBottom: 10,
  },

  descripcion: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 25,
  },

  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 16,
    marginBottom: 20,
  },

  boton: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
