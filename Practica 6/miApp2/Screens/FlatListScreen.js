import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Importamos el componente Estudiante que creamos
// en el archivo Estudiante.js.
import { Estudiante } from '../components/Estudiante';

export default function FlatListScreen() {

    // Aquí se crea un arreglo.
    // Dentro hay tres objetos, cada uno representa un estudiante.
    const estudiantes = [
        {
            id: '1',
            nombre: 'Cristian',
            carrera: 'ISC'
        },

        {
            id: '2',
            nombre: 'Itzel',
            carrera: 'IQB'
        },

        {
            id: '3',
            nombre: 'Alejandro',
            carrera: 'LD'
        }
    ];

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Lista de estudiantes
            </Text>

            {/* Se crea una lista utilizando FlatList */}
            <FlatList

                // Le dice a FlatList cuáles son los datos
                // que va a mostrar.
                data={estudiantes}

                // Cada vez que FlatList encuentra un estudiante,
                // lo guarda en la variable "item".
                renderItem={({ item }) => (

                    <Estudiante
                        nombre={item.nombre}
                        carrera={item.carrera}
                    />

                )}

                // Se recomienda agregar esta propiedad para que
                // cada elemento tenga un identificador único.
                keyExtractor={(item) => item.id}

            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    titulo: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    card: {
        backgroundColor: '#d4f1f4',
        padding: 15,
        margin: 10,
        borderRadius: 10
    }

});