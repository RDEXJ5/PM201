/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

import {Saludo} from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

/* Zona 2: Main – Componentes */
export default function App() {
  return (
    <View style={styles.container}>

      <Perfil style={styles.tarjetaRoja} nombre="Cristian Corona" carrera="ISC" materia="Móvil" cuatri="9"/>
      <Perfil style={styles.tarjetaVerde} nombre="Erasto Uribe" carrera="ISC" materia="Embebidos" cuatri="9"/>
      <Perfil style={styles.tarjetaAzul} nombre="COUC" carrera="ISC" materia="Negocios" cuatri="9"/>
      
      <StatusBar style="auto" /> 
      
    </View>
  );
}
/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tarjetaVerde:{backgroundColor: '#4dff65'},
  tarjetaRoja: {backgroundColor: '#ff2433'},
});