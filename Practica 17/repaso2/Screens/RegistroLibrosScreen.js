import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function RegistroLibrosScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const mostrarAlerta = (tituloAlerta, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${tituloAlerta}\n\n${mensaje}`);
      return;
    }

    Alert.alert(tituloAlerta, mensaje);
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setAutor('');
    setGenero('');
  };

  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      mostrarAlerta('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((listaActual) => [nuevoLibro, ...listaActual]);
      limpiarFormulario();
      setGuardando(false);
      mostrarAlerta('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  const renderLibro = ({ item }) => (
    <View style={styles.tarjetaLibro}>
      <Text style={styles.nombreLibro}>{item.titulo}</Text>
      <Text style={styles.detalleLibro}>Autor: {item.autor}</Text>
      <Text style={styles.detalleLibro}>Género: {item.genero}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/bg-libros.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <Text style={styles.titulo}>Catálogo de Libros</Text>

          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#777"
            value={titulo}
            onChangeText={setTitulo}
            editable={!guardando}
          />

          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#777"
            value={autor}
            onChangeText={setAutor}
            editable={!guardando}
          />

          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#777"
            value={genero}
            onChangeText={setGenero}
            editable={!guardando}
          />

          <Pressable
            onPress={agregarLibro}
            disabled={guardando}
            style={({ pressed }) => [
              styles.boton,
              pressed && !guardando ? styles.botonPresionado : null,
              guardando ? styles.botonDesactivado : null,
            ]}
          >
            <Text style={styles.textoBoton}>
              {guardando ? 'Guardando...' : 'Agregar Libro'}
            </Text>
          </Pressable>

          {guardando && (
            <View style={styles.cargando}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.textoCargando}>Guardando libro...</Text>
            </View>
          )}

          <Text style={styles.total}>Total de libros: {libros.length}</Text>

          <FlatList
            data={libros}
            keyExtractor={(item) => item.id}
            renderItem={renderLibro}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.lista}
            ListEmptyComponent={
              !guardando ? (
                <Text style={styles.listaVacia}>Aún no hay libros registrados.</Text>
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 28,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 22,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12,
    fontSize: 15,
    color: '#111',
  },
  boton: {
    backgroundColor: '#0d6fd1',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  botonPresionado: {
    backgroundColor: '#07509d',
    transform: [{ scale: 0.98 }],
  },
  botonDesactivado: {
    backgroundColor: '#a8a8a8',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cargando: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  textoCargando: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  total: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  lista: {
    paddingBottom: 40,
  },
  listaVacia: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 10,
    padding: 16,
    color: '#222',
    textAlign: 'center',
  },
  tarjetaLibro: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  nombreLibro: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },
  detalleLibro: {
    color: '#111',
    fontSize: 14,
  },
});
