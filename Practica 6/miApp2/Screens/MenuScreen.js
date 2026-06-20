/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';
import Formulario from './Formulario';



/* Zona 2: Main – Componentes */
export default function App() {

    const [screen,setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas': 
            return <TarjetasScreen/>
        
        case 'componente1':
            return <Componente1/>

        
        case 'formulario':
            return (
                <FormularioScreen
                onVolver={() => setScreen('menu')}
                />
            );

        

        case 'menu':
            default:

        return (
            <View>
                <Text>Aqui va la primer Practica de Componentes Nativos</Text>

                <Button title="Practica Tarjetas" onPress={()=>setScreen('tarjetas')}/>

                
                <Button title="Practica Componente1" onPress={()=>setScreen('componente1')}/>

                <Button title="Practica Formulario" onPress={()=>setScreen('formulario')}/>
            </View>
        );
    }
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
});