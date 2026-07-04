import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native';
import Input from '../components/Input';
import BrownButton from '../components/BrownButton';
import SmallChip from '../components/SmallChip';
import { showMessage } from '../utils/helpers';
import { styles } from '../styles/coffeeStyles';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('manager@coffeeco.com');
  const [password, setPassword] = useState('12345678');
  const [selectedRole, setSelectedRole] = useState('mesero');

  const login = () => {
    if (!email.trim() || !password.trim()) {
      showMessage('Campos vacíos', 'Escribe correo y contraseña para iniciar sesión.');
      return;
    }
    onLogin(selectedRole);
  };

  return (
    <SafeAreaView style={styles.loginSafe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.loginContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>☕</Text>
        </View>
        <Text style={styles.loginTitle}>Coffee Manager</Text>
        <Text style={styles.loginSubtitle}>Administración y operaciones</Text>

        <View style={styles.loginCard}>
          <Input label="Email" value={email} onChangeText={setEmail} placeholder="manager@coffeeco.com" icon="✉" />
          <Input label="Password" value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry icon="🔒" />

          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.roleLabel}>Entrar como:</Text>
          <View style={styles.roleRow}>
            <SmallChip label="Mesero" active={selectedRole === 'mesero'} onPress={() => setSelectedRole('mesero')} />
            <SmallChip label="Cocina" active={selectedRole === 'cocina'} onPress={() => setSelectedRole('cocina')} />
            <SmallChip label="Caja" active={selectedRole === 'caja'} onPress={() => setSelectedRole('caja')} />
          </View>

          <BrownButton label="Iniciar sesión  →" onPress={login} />
          <Text style={styles.support}>¿Problemas para iniciar sesión? Contacta con soporte</Text>
        </View>

        <View style={styles.coffeeDecoration}>
          <Text style={styles.coffeeDecorationText}>☕</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
