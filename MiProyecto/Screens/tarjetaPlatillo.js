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
import { platillos } from './platillosData';

const TarjetaPlatillo = ({ nombre, precio, paisOrigen }) => {
  const [observaciones, setObservaciones] = useState('');
  const [observacionGuardada, setObservacionGuardada] = useState('');
  const [meGusta, setMeGusta] = useState(false);

  const guardarObservacion = () => {
    const textoGuardado = observaciones.trim() || 'Sin observaciones';
    setObservacionGuardada(textoGuardado);

    Alert.alert(
      'Observación guardada',
      `Platillo: ${nombre}\nObservación: ${textoGuardado}`
    );
  };

  const enviarObservacion = () => {
    const textoEnviar =
      observacionGuardada || observaciones.trim() || 'No escribiste ninguna observación';

    Alert.alert(
      'Observación enviada',
      `Tu observación para ${nombre} fue:\n\n${textoEnviar}`
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>

      <Text style={styles.texto}>Precio: ${precio.toFixed(2)}</Text>
      <Text style={styles.texto}>País de origen: {paisOrigen}</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.texto}>Me gusta</Text>

        <Switch
          value={meGusta}
          onValueChange={setMeGusta}
          trackColor={{
            false: '#767577',
            true: '#81b0ff',
          }}
          thumbColor={meGusta ? '#2196F3' : '#f4f3f4'}
        />
      </View>

      <Text style={styles.etiqueta}>Observaciones</Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: sin cebolla, poco picante..."
        value={observaciones}
        onChangeText={setObservaciones}
        autoCapitalize="sentences"
        maxLength={80}
      />

      <Pressable style={styles.botonGuardar} onPress={guardarObservacion}>
        <Text style={styles.textoBoton}>Guardar observación</Text>
      </Pressable>

      <Pressable style={styles.botonEnviar} onPress={enviarObservacion}>
        <Text style={styles.textoBoton}>Enviar</Text>
      </Pressable>

      {observacionGuardada ? (
        <View style={styles.resumenObservacion}>
          <Text style={styles.etiquetaResumen}>Observación guardada:</Text>
          <Text style={styles.textoResumen}>{observacionGuardada}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  lista: {
    gap: 8,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  texto: {
    fontSize: 15,
    color: '#444',
    marginVertical: 2,
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  botonGuardar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  botonEnviar: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resumenObservacion: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  etiquetaResumen: {
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  textoResumen: {
    color: '#1b5e20',
  },
});