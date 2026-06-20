/*Zona 1: Importacion de archivos y componentes*/ 

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

/*Zona 2: Main -Componentes

export default function App() {
  return (

    <View style={styles.container}>

      <Image source= {require('./assets/wave.png')}/>
    

      <Text>Hola Mundo Reac Native </Text>
      <Text>------------------------------</Text>
      <Saludo/>
      <Text>------------------------------</Text>
      <Saludo2/>
      <StatusBar style="auto" />


    </View>
  );
}
  */

export default function App(){
  return(

<<<<<<< Updated upstream
=======
      <Perfil style={{ backgroundColor: 'lightgreen' }} nombre="Cristian" carrera="ing" materia="programacion movil" cuatri="Noveno"></Perfil>

      <Perfil style={{ backgroundColor: 'lightcoral' }} nombre="Emiliano" carrera="ing" materia="programacion movil" cuatri="cuarto"></Perfil>


      <Perfil style={{ backgroundColor: 'lightgreen' }} nombre="Cristian" carrera="ing" materia="programacion movil" cuatri="Noveno"></Perfil>


    </View>
>>>>>>> Stashed changes
  )
}


/*Zona 3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row', 
  },
});

tarjetaVerde:{backgroundColor:'lightgreen', '#6BCB77'}
tarjetaRoja:{backgroundColor:'lightgreen', '#FF6B6B'
  
}