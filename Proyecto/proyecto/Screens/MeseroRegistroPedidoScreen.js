import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Chip from '../components/Chip';
import SmallChip from '../components/SmallChip';
import Input from '../components/Input';
import BrownButton from '../components/BrownButton';
import PriceRow from '../components/PriceRow';
import { showMessage, pesos } from '../utils/helpers';
import { styles } from '../styles/coffeeStyles';

export default function MeseroRegistroPedidoScreen({ products, addOrder, onChangeScreen }) {
  const [selectedTable, setSelectedTable] = useState('Mesa 03');
  const [notes, setNotes] = useState('');
  const [cart, setCart] = useState({});

  const selectedProducts = products.filter(product => cart[product.id]);
  const total = selectedProducts.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const addToCart = id => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const confirm = () => {
    if (!selectedProducts.length) {
      showMessage('Pedido vacío', 'Agrega al menos un producto al pedido.');
      return;
    }
    const newOrder = {
      id: `o${Date.now()}`,
      code: `#${Math.floor(2400 + Math.random() * 90)}`,
      table: selectedTable,
      client: `Cliente ${selectedTable}`,
      items: selectedProducts.map(product => `${cart[product.id]} ${product.name}`),
      total,
      time: 'Ahora',
      status: 'Pendiente',
      notes: notes || 'Sin observaciones',
    };
    addOrder(newOrder);
    setCart({});
    setNotes('');
    showMessage('Pedido confirmado', 'El pedido fue enviado a cocina.');
    onChangeScreen('meseroEstados');
  };

  return (
    <Screen>
      <Text style={styles.screenTitle}>Registro de pedido</Text>
      <View style={styles.tabRow}>
        <Chip label="Cafés" active />
        <Chip label="Repostería" />
        <Chip label="Desayunos" />
      </View>
      <View style={styles.productGrid}>
        {products.filter(item => item.available).slice(0, 4).map(product => (
          <Pressable key={product.id} style={styles.productTile} onPress={() => addToCart(product.id)}>
            <Text style={styles.tileEmoji}>{product.img}</Text>
            <Text style={styles.tileTitle}>{product.name}</Text>
            <Text style={styles.tilePrice}>{pesos(product.price)}</Text>
            <Text style={styles.addText}>+ Añadir</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.inputLabel}>Mesa del cliente</Text>
      <View style={styles.roleRow}>
        {['Mesa 01', 'Mesa 03', 'Mesa 06'].map(table => (
          <SmallChip key={table} label={table} active={selectedTable === table} onPress={() => setSelectedTable(table)} />
        ))}
      </View>
      <Input label="Notas especiales" value={notes} onChangeText={setNotes} placeholder="Ej. Sin azúcar, para llevar..." multiline />
      <View style={styles.paymentCard}>
        <PriceRow label="Productos" value={selectedProducts.length} count />
        <PriceRow label="Subtotal" value={total} strong />
        <BrownButton label="Confirmar Pedido  ▶" onPress={confirm} />
      </View>
    </Screen>
  );
}
