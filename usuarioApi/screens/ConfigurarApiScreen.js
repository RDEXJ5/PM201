import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  construirApiUrl,
  guardarApiUrl,
} from '../config/api';

export default function ConfigurarApiScreen() {
  const [ip, setIp] = useState('');
  const [conectando, setConectando] = useState(false);

  const router = useRouter();

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const ipEsValida = (valor) => {
    const partes = valor.trim().split('.');

    return (
      partes.length === 4 &&
      partes.every((parte) => {
        const numero = Number(parte);

        return (
          parte !== '' &&
          /^\d+$/.test(parte) &&
          numero >= 0 &&
          numero <= 255
        );
      })
    );
  };

  const conectar = async () => {
    if (!ipEsValida(ip)) {
      mostrarMensaje(
        'IP no válida',
        'Ingrese una dirección como 192.168.1.25'
      );
      return;
    }

    const url = construirApiUrl(ip);

    try {
      setConectando(true);

      const respuesta = await fetch(
        `${url}/v1/usuarios/`
      );

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
      }

      guardarApiUrl(url);
      router.replace('/alta');
    } catch (error) {
      console.error('Error de conexión:', error);

      mostrarMensaje(
        'Sin conexión',
        'No fue posible conectar con la API. Verifique la IP, la red y que el servidor esté encendido.'
      );
    } finally {
      setConectando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          Conectar con la API
        </Text>

        <Text style={styles.descripcion}>
          Ingrese la dirección IP de la computadora donde se está ejecutando FastAPI.
        </Text>

        <Text style={styles.etiqueta}>
          Dirección IP
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 192.168.1.25"
          value={ip}
          onChangeText={setIp}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!conectando}
          onSubmitEditing={conectar}
        />

        <Text style={styles.puerto}>
          Se utilizará el puerto 5000
        </Text>

        <Pressable
          style={[
            styles.boton,
            conectando && styles.botonDeshabilitado,
          ]}
          onPress={conectar}
          disabled={conectando}
        >
          {conectando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>
              Conectar
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },

  descripcion: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },

  etiqueta: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },

  puerto: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 8,
  },

  boton: {
    backgroundColor: '#2563EB',
    minHeight: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
