import React, { useEffect, useState, useContext } from 'react';
import { Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { apiService } from '../services/api';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';

export const ProductDetailScreen = ({ route }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    apiService.getProductById(productId).then(setProduct);
  }, [productId]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image source={{ uri: product.image }} style={{ height: 300 }} />
      <Text>{product.title}</Text>
      <Text>{product.price} €</Text>
      <Text>{product.description}</Text>

      <TouchableOpacity
        onPress={() => {
          addToCart(product);
          alert('Produit ajouté au panier');
        }}
      >
        <Text style={{ fontSize: 18, color: 'blue' }}>
          Ajouter au panier
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
