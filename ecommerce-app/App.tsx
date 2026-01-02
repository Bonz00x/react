import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </FavoritesProvider>
    </CartProvider>
  );
}
