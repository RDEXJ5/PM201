import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SplashScreenRepaso() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash-book.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.texto}>repaso2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
});
