import React, {useState} from 'react'
import {Alert, Button, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';

export default function Repaso1() {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [semestre, setSemestre] = useState('');
    const [taller, setTaller] = useState(false);
    const [documento, setDocumento ] = useState(false);
    const [deportivo, setDeportivo] = useState(false);

    const mostrarMensaje = (titulo, mensaje) => {
        if (Platform.OS === 'web') {
            window.alert(`${titulo}\n\n${mensaje}`);
        } else {
            Alert.alert(titulo, mensaje);
        }
    };

    const guardarRegistro = () => {
        if (nombre.trim() === '' || 
            carrera.trim() === '' ||
            semestre.trim() === '') {
            mostrarMensaje(
                'Los campos están vacíos',
                'Por favor, rellena los campos.'
            );
            return;
        }

        mostrarMensaje(
            'Registro Enviado',
            `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\nTaller: ${taller ? 'Sí' : 'No'}\nConstancia: ${documento ? 'Sí' : 'No'}\nDeportes: ${deportivo ? 'Sí' : 'No'}`
        );

        setNombre('');
        setCarrera('');
        setSemestre('');
        setTaller(false);
        setDocumento(false);
        setDeportivo(false);
    };

    return (
        <View style={styles.container}>
                <Text style={styles.titulo}>Registro de Evento Universitario</Text>

                <Text style={styles.etiqueta}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    autoCapitalize="words"
                    maxLength={50}
                    placeholder="Escribe tu nombre"
                    placeholderTextColor="#9ea3ae"
                />

                <Text style={styles.etiqueta}>Carrera:</Text>
                <TextInput
                    style={styles.input}
                    value={carrera}
                    onChangeText={setCarrera}
                    autoCapitalize="words"
                    maxLength={60}
                    placeholder="Escribe tu carrera"
                    placeholderTextColor="#9ea3ae"
                />

                <Text style={styles.etiqueta}>Semestre:</Text>
                <TextInput
                    style={styles.input}
                    value={semestre}
                    onChangeText={(texto) => {
                        setSemestre(texto.replace(/[^0-9]/g, ''));
                    }}
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="Escribe tu semestre"
                    placeholderTextColor="#9ea3ae"
                />

                <View style={styles.fila}>
                    <Text style={styles.Opciones}>¿Asistirá al taller?</Text>
                    <Switch
                        value={taller}
                        onValueChange={setTaller}
                        trackColor={{ false: '#d1d5db', true: '#80cbc4' }}
                        thumbColor={taller ? '#009688' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.fila}>
                    <Text style={styles.etiquetaOpciones}>¿Requiere constancia?</Text>
                    <Switch
                        value={documento}
                        onValueChange={setDocumento}
                        trackColor={{ false: '#d1d5db', true: '#80cbc4' }}
                        thumbColor={documento ? '#009688' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.fila}>
                    <Text style={styles.etiquetaOpciones}>¿Participará en deportes?</Text>
                    <Switch
                        value={deportivo}
                        onValueChange={setDeportivo}
                        trackColor={{ false: '#d1d5db', true: '#80cbc4' }}
                        thumbColor={deportivo ? '#009688' : '#f4f3f4'}
                    />
                </View>
                    
                <View style={styles.boton}>
                    <Button
                        title='Guardar Registro' 
                        onPress={guardarRegistro} 
                        color= '#007bff'
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef2f7',
        padding: 20,
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 22,
        textAlign: 'center',
    },
    etiqueta: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
    },
    subtitulo: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
        marginTop: 24,
        marginBottom: 16,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    Opciones: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
        marginRight: 12,
    },
    boton: {
        marginTop: 40
    },
});
