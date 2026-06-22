/* Zona 1: importaciones de archivos y componentes */
import React, { useState } from 'react';

import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


/* Zona 2: Main – Componentes */
export default function FormularioScreen({ onVolver }) {

  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarRegistro = () => {

    if (nombre.trim() === '' || carrera.trim() === '') {
      mostrarMensaje(
        'Campos incompletos',
        'Por favor, ingresa el nombre y la carrera.'
      );

      return;
    }

    mostrarMensaje(
      'Registro guardado',
      `El estudiante ${nombre} de la carrera ${carrera} fue registrado correctamente.`
    );

    setNombre('');
    setCarrera('');
  };

  return (
    <View style={styles.container}>

      <View style={styles.formulario}>

        <Text style={styles.titulo}>
          Registro de estudiantes
        </Text>

        <Text style={styles.descripcion}>
          Ingresa el nombre y la carrera del estudiante.
        </Text>

        <Text style={styles.etiqueta}>
          Nombre del estudiante
        </Text>

        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          maxLength={50}
        />

        <Text style={styles.etiqueta}>
          Carrera
        </Text>

        <TextInput
          style={styles.input} 
          value={carrera}
          onChangeText={setCarrera}
          autoCapitalize="words"
          maxLength={60}
        />

        <View style={styles.espacioBoton}>
          <Button
            title="Guardar registro"
            onPress={guardarRegistro}
          />
        </View>

        <View style={styles.espacioBoton}>
          <Button
            title="Volver al menú"
            onPress={onVolver}
            color="#666666"
          />
        </View>

      </View>

    </View>
  );
}


/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#eaf2f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  formulario: {
    width: '100%',
    maxWidth: 450,
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

  espacioBoton: {
    marginTop: 10,
  },

});
