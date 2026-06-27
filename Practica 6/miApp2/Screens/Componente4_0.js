import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

export const Componente4_0 = () => {  

  const [texto, setTexto] = useState('');
  const [numero, setNumero] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      <Text style={styles.title}> Hola RN: Componente propio </Text>
      <Text style={styles.subtitle}>Ejemplo de varios TextInput con State</Text>

      <TextInput
        placeholder="Escribe algo..."
        value={texto}
        onChangeText={setTexto}
        maxLength={20}
        autoCapitalize="words"
        style={styles.input}
      />

      <TextInput
        placeholder="Ingresa un número"
        value={numero}
        onChangeText={(text) => setNumero(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        maxLength={10}
        style={styles.input}
      />

      <TextInput
        placeholder="Ingresa tu correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
        style={styles.input}
      />

      <TextInput
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />

      <Text style={styles.subtitle}>Valores almacenados:</Text>
      <Text style={styles.result}>Texto: {texto}</Text>
      <Text style={styles.result}>Número: {numero}</Text>
      <Text style={styles.result}>Correo: {correo}</Text>
      <Text style={styles.result}>Contraseña: {password}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
  },
  result: {
    fontSize: 15,
    color: '#333',
    marginTop: 5,
  },
});