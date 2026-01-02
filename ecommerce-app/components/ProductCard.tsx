import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types';
import { FavoritesContext } from '../context/FavoritesContext';

export const ProductCard = ({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) => {
  const favoritesCtx = useContext(FavoritesContext);

  // ✅ SAFETY CHECK (PREVENTS CRASH)
  if (!favoritesCtx) {
    return null;
  }

  const { toggleFavorite, isFavorite } = favoritesCtx;
  const liked = isFavorite(product.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
      }}
    >
      {/* ❤️ LIKE BUTTON */}
      <TouchableOpacity
        onPress={() => toggleFavorite(product)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          {liked ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={{ height: 120 }}
        resizeMode="contain"
      />

      <Text numberOfLines={2}>{product.title}</Text>
      <Text style={{ color: 'green' }}>
        {product.price} €
      </Text>
    </TouchableOpacity>
  );
};
