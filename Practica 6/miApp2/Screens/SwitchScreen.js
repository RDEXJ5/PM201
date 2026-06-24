import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default function SwitchScreen() {

    const [encendido, setEncendido] = useState(false);

    return (

        <View style={[
            styles.container,
            {
                backgroundColor:
                    encendido ? '#222' : '#FFF'
            }
        ]}>

            <Text
                style={{
                    color:
                        encendido ? 'white' : 'black'
                }}
            >
                {encendido
                    ? 'Modo Oscuro Activado'
                    : 'Modo Oscuro Desactivado'}
            </Text>

            <Switch
                value={encendido}
                onValueChange={setEncendido}
                trackColor={{
                    false: '#767577',
                    true: '#81b0ff'
                }}
                thumbColor={
                    encendido
                        ? '#2196F3'
                        : '#f4f3f4'
                }
            />

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    }

});