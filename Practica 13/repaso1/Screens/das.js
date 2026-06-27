/* Zona 1: importaciones de archivos y componentes */
import React, { useState } from 'react';

import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


/* Zona 2: Main – Componentes */
export default function FormularioScreen({ onVolver }) {

  /* Estados de cada campo */
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [edad, setEdad] = useState('');
  const [comentarios, setComentarios] = useState('');


  /* Limpia todos los campos del formulario */
  const limpiarFormulario = () => {
    setNombre('');
    setCarrera('');
    setCorreo('');
    setTelefono('');
    setContrasena('');
    setConfirmarContrasena('');
    setEdad('');
    setComentarios('');
  };


  /*
    Muestra un mensaje dependiendo de la plataforma.

    En web utiliza window.alert().
    En Android o iOS utiliza Alert.alert().
  */
  const mostrarMensaje = (titulo, mensaje, alAceptar) => {

    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);

      if (alAceptar) {
        alAceptar();
      }

      return;
    }

    Alert.alert(
      titulo,
      mensaje,
      [
        {
          text: 'Aceptar',
          onPress: () => {
            if (alAceptar) {
              alAceptar();
            }
          },
        },
      ]
    );
  };


  /* Valida los datos y guarda el registro */
  const guardarRegistro = () => {

    /* Validación de campos obligatorios */
    if (
      nombre.trim() === '' ||
      carrera.trim() === '' ||
      correo.trim() === '' ||
      telefono.trim() === '' ||
      contrasena.trim() === '' ||
      confirmarContrasena.trim() === '' ||
      edad.trim() === ''
    ) {
      mostrarMensaje(
        'Campos incompletos',
        'Por favor, completa todos los campos obligatorios.'
      );

      return;
    }


    /* Validación sencilla del correo electrónico */
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(correo.trim())) {
      mostrarMensaje(
        'Correo no válido',
        'Ingresa un correo electrónico válido.'
      );

      return;
    }


    /* Validación del teléfono */
    if (telefono.length !== 10) {
      mostrarMensaje(
        'Teléfono no válido',
        'El número telefónico debe contener 10 dígitos.'
      );

      return;
    }


    /* Validación de la contraseña */
    if (contrasena.length < 6) {
      mostrarMensaje(
        'Contraseña no válida',
        'La contraseña debe tener al menos 6 caracteres.'
      );

      return;
    }


    /* Comparación de contraseñas */
    if (contrasena !== confirmarContrasena) {
      mostrarMensaje(
        'Las contraseñas no coinciden',
        'Verifica que ambas contraseñas sean iguales.'
      );

      return;
    }


    /* Validación de la edad */
    const edadNumero = Number(edad);

    if (edadNumero < 1 || edadNumero > 120) {
      mostrarMensaje(
        'Edad no válida',
        'Ingresa una edad entre 1 y 120 años.'
      );

      return;
    }


    /* Mensaje de registro exitoso */
    mostrarMensaje(
      'Registro guardado',
      `El registro de ${nombre} fue guardado correctamente.

Carrera: ${carrera}
Correo: ${correo}
Teléfono: ${telefono}
Edad: ${edad} años`,
      limpiarFormulario
    );
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.formulario}>

          <Text style={styles.titulo}>
            Registro de estudiantes
          </Text>

          <Text style={styles.descripcion}>
            Completa los siguientes datos.
          </Text>


          {/* Campo: nombre completo */}
          <Text style={styles.etiqueta}>
            Nombre completo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Cristian Corona"
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
            maxLength={60}
          />


          {/* Campo: carrera */}
          <Text style={styles.etiqueta}>
            Carrera
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Ingeniería en Sistemas"
            value={carrera}
            onChangeText={setCarrera}
            autoCapitalize="words"
            maxLength={60}
          />


          {/* Campo: correo electrónico */}
          <Text style={styles.etiqueta}>
            Correo electrónico
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={80}
          />


          {/* Campo: número telefónico */}
          <Text style={styles.etiqueta}>
            Número telefónico
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ejemplo: 4421234567"
            value={telefono}
            onChangeText={(texto) => {
              setTelefono(texto.replace(/[^0-9]/g, ''));
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />


          {/* Campo: contraseña */}
          <Text style={styles.etiqueta}>
            Contraseña
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
          />


          {/* Campo: confirmar contraseña */}
          <Text style={styles.etiqueta}>
            Confirmar contraseña
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Vuelve a escribir la contraseña"
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
          />


          {/* Campo: edad */}
          <Text style={styles.etiqueta}>
            Edad
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ejemplo: 21"
            value={edad}
            onChangeText={(texto) => {
              setEdad(texto.replace(/[^0-9]/g, ''));
            }}
            keyboardType="numeric"
            maxLength={3}
          />


          {/* Campo: comentarios */}
          <Text style={styles.etiqueta}>
            Comentarios
          </Text>

          <TextInput
            style={[styles.input, styles.areaComentarios]}
            placeholder="Escribe algún comentario adicional"
            value={comentarios}
            onChangeText={setComentarios}
            multiline={true}
            numberOfLines={4}
            maxLength={250}
            textAlignVertical="top"
          />

          <Text style={styles.contador}>
            {comentarios.length}/250 caracteres
          </Text>


          {/* Botón de guardado */}
          <View style={styles.espacioBoton}>
            <Button
              title="Guardar registro"
              onPress={guardarRegistro}
            />
          </View>


          {/* Botón para regresar */}
          <View style={styles.espacioBoton}>
            <Button
              title="Volver al menú"
              onPress={onVolver}
              color="#666666"
            />
          </View>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#eaf2f8',
  },

  contenido: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  formulario: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f4e79',
    textAlign: 'center',
    marginBottom: 10,
  },

  descripcion: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 25,
  },

  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },

  areaComentarios: {
    minHeight: 110,
    marginBottom: 5,
  },

  contador: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
    marginBottom: 15,
  },

  espacioBoton: {
    marginTop: 10,
  },

});
