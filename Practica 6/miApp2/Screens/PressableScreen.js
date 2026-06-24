import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function PressableScreen() {

    const [contador, setContador] = useState(0);

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Componente Pressable
            </Text>

            <Pressable
                onPress={() => setContador(contador + 1)}
                onLongPress={() => setContador(0)}
                style={({ pressed }) => [
                    styles.boton,
                    {
                        backgroundColor:
                            pressed ? '#FF6B6B' : '#6BCB77'
                    }
                ]}
            >

                <Text style={styles.textoBoton}>
                    Presióname
                </Text>

            </Pressable>

            <Text >
                Contador: {contador}
            </Text>

            <Text>
                Mantén presionado para reiniciar
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    boton: {
        padding: 15,
        borderRadius: 10,
        width: 180,
        alignItems: 'center'
    },

    textoBoton: {
        color: 'white',
        fontWeight: 'bold'
    }

});