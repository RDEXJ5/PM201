/* PERFIL usando Desestructuración */

import { Text, View, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export const Perfil = ({ nombre, carrera, materia, cuatrimestre, style }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View style={[estilos.tarjeta, style]}>
      
      <Text style={estilos.nombre}> {nombre} </Text>

      {mostrar && 
      <>  
      <Text style={estilos.carrera}> {carrera} </Text>
      <Text style={estilos.otroTexto}> {materia} </Text>
      <Text style={estilos.otroTexto}> {cuatrimestre} </Text>
      </>
       }
    <Button title=" Ver Perfil"  onPress={() => setMostrar(!mostrar)} />


    </View>
  );
}

const estilos= StyleSheet.create({
  nombre:{
    fontSize: 24,
    fontWeight: 600,
    textTransform: 'upercase',   
  },
  carrera:{
    fontSize:18,
    color:'green',
  },
  otroTexto:{
    fontSize:12,
    fontFamily:'Courier',
    fontStyle:'italic',
  },
  tarjeta:{
    borderWidth:2,
    padding:25,
    margin:20,
    backgroundColor:'lightblue',
  },

});