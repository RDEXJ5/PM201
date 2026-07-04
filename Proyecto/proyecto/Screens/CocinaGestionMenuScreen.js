import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Chip from '../components/Chip';
import SmallButton from '../components/SmallButton';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import { showMessage, pesos } from '../utils/helpers';
import { styles } from '../styles/coffeeStyles';

export default function CocinaGestionMenuScreen({ products, toggleProduct }) {
  const activos = products.filter(product => product.available).length;
  const inactivos = products.length - activos;

  return (
    <Screen>
      <View style={styles.rowBetween}>
        <Text style={styles.screenTitle}>Catálogo de Menú</Text>
        <SmallButton label="+ Agregar" onPress={() => showMessage('Menú', 'Aquí se agregaría un nuevo producto.')} />
      </View>
      <View style={styles.tabRow}>
        <Chip label="Todos" active />
        <Chip label="Cafés" />
        <Chip label="Comidas" />
        <Chip label="Postres" />
      </View>
      {products.map(product => (
        <View key={product.id} style={styles.productRow}>
          <View style={styles.productImage}><Text style={styles.productEmoji}>{product.img}</Text></View>
          <View style={styles.flex1}>
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={styles.mutedText}>{pesos(product.price)} · {product.category}</Text>
            <StatusPill status={product.available ? 'Disponible' : 'Inactivo'} />
          </View>
          <Pressable onPress={() => toggleProduct(product.id)} style={styles.editBtn}>
            <Text style={styles.editText}>{product.available ? '×' : '✓'}</Text>
          </Pressable>
        </View>
      ))}
      <View style={styles.statsGrid}>
        <StatCard title="Activos" value={activos} tone="brown" />
        <StatCard title="Inactivos" value={inactivos} tone="orange" />
      </View>
    </Screen>
  );
}
