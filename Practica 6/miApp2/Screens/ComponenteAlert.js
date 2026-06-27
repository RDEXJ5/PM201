import { StyleSheet, Text, Alert, Button, View, Platform, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

// Parche para que Alert funcione en web
if (Platform.OS === "web") {
  Alert.alert = (titular, mensaje, botones) => {
    if (botones && botones.length > 0) {
      const resultado = window.confirm(
        titular + (mensaje ? "\n" + mensaje : "")
      );

      if (resultado) {
        const aceptar = botones.find(b => b.text === "Aceptar");
        if (aceptar && aceptar.onPress) {
          aceptar.onPress();
        }
      } else {
        const cancelar = botones.find(b => b.style === "cancel");
        if (cancelar && cancelar.onPress) {
          cancelar.onPress();
        }
      }
    } else {
      window.alert(titular + (mensaje ? "\n" + mensaje : ""));
    }
  };
}
// Componente para mostrar alertas con dos o tres botones
const ComponenteAlert = () => {
  const [message, setMessage] = useState('Sin acción');

  const createTwoButtonAlert = () =>
    Alert.alert('Alerta de 2 botones', 'Elige una opción', [
      {
        text: 'Cancelar',
        onPress: () => {
          //console.log('Presiona cancelar');
          setMessage('Presionaste cancelar');
        },
        style: 'cancel',
      },
      {
        text: 'Aceptar',
        onPress: () => {
          //console.log('Presiona aceptar');
          setMessage('Presionaste aceptar');
        },
      },
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert(
      'Alerta de 3 botones',
      'Elige una opción',
      [
        {
          text: 'Pregúntame más tarde',
          onPress: () => setMessage('Pregúntame más tarde'),
        },
        {
          text: 'Cancelar',
          onPress: () => setMessage('Presionaste cancelar'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => setMessage('Presionaste aceptar'),
        },
      ],
      //Cuarto parametro de nuestra alerta 
      {
        cancelable: true,
        onDismiss: () => {
          setMessage('La alerta se cerró sin elegir botón');
        },
      }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Estado actual: {message}</Text>

      <View style={styles.button}>
        <Button title="Alerta de dos botones" onPress={createTwoButtonAlert} />
        <Button title="Alerta de 3 botones" onPress={createThreeButtonAlert} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%', 
  },
});

export default ComponenteAlert;