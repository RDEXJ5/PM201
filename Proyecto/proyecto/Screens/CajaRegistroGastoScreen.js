import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import Input from '../components/Input';
import BrownButton from '../components/BrownButton';
import SmallChip from '../components/SmallChip';
import StatCard from '../components/StatCard';
import { showMessage, pesos } from '../utils/helpers';
import { styles } from '../styles/coffeeStyles';

export default function CajaRegistroGastoScreen() {
  const [concepto, setConcepto] = useState('');
  const [categoria, setCategoria] = useState('Suministros');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('03/06/2026');

  const save = () => {
    if (!concepto.trim() || !monto.trim()) {
      showMessage('Faltan datos', 'Escribe el concepto y el monto del gasto.');
      return;
    }
    showMessage('Gasto registrado', `Se guardó el gasto de ${pesos(monto)} en ${categoria}.`);
    setConcepto('');
    setMonto('');
  };

  return (
    <Screen>
      <Text style={styles.screenTitle}>Registrar Gasto</Text>
      <Text style={styles.mutedText}>Documenta gastos operativos del negocio.</Text>
      <View style={styles.formCard}>
        <Input label="Concepto" value={concepto} onChangeText={setConcepto} placeholder="Ej. Pedido de leche" />
        <Text style={styles.inputLabel}>Categoría</Text>
        <View style={styles.roleRow}>
          {['Suministros', 'Servicios', 'Otros'].map(item => (
            <SmallChip key={item} label={item} active={categoria === item} onPress={() => setCategoria(item)} />
          ))}
        </View>
        <Input label="Monto" value={monto} onChangeText={setMonto} placeholder="0.00" keyboardType="numeric" />
        <Input label="Fecha" value={fecha} onChangeText={setFecha} placeholder="dd/mm/aaaa" />
        <BrownButton label="Guardar Gasto" onPress={save} />
      </View>
      <View style={styles.statsGrid}>
        <StatCard title="Hoy" value="$4,250.00" tone="brown" />
        <StatCard title="Gastos" value="$320.50" tone="red" />
      </View>
    </Screen>
  );
}
