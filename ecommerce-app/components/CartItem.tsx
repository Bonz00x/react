import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../types';

export const CartItem = ({ item, onUpdateQuantity, onRemove }: {
  item: CartItemType;
  onUpdateQuantity: (q: number) => void;
  onRemove: () => void;
}) => (
  <View style={{ flexDirection: 'row', marginBottom: 12 }}>
    <Image source={{ uri: item.product.image }} style={{ width: 80, height: 80 }} />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text numberOfLines={2}>{item.product.title}</Text>
      <Text>{item.product.price.toFixed(2)} €</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.quantity - 1)}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.quantity + 1)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={onRemove}>
      <Text>🗑️</Text>
    </TouchableOpacity>
  </View>
);
