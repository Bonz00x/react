import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';

export const CartScreen = () => {
  const { cart, updateQuantity, getTotalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return <Text style={{ padding: 20 }}>Panier vide</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      {cart.map(item => (
        <View key={item.product.id}>
          <Text>{item.product.title}</Text>
          <Text>Qty: {item.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              updateQuantity(item.product.id, item.quantity + 1)
            }
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text>Total: {getTotalPrice()} €</Text>
    </View>
  );
};
