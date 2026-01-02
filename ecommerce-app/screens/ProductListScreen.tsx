import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiService } from '../services/api';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [p, c] = await Promise.all([
      apiService.getAllProducts(),
      apiService.getCategories?.() ?? [],
    ]);

    setProducts(p);
    setCategories(['all', ...c]);
  };

  /** 🔍 FILTER + SEARCH */
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory;

      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            Boutique
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={{ fontSize: 20 }}>🛒</Text>
          </TouchableOpacity>
        </View>

        {/* 🔍 SEARCH */}
        <TextInput
          placeholder="Rechercher un produit..."
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: '#f0f0f0',
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        {/* 🏷️ CATEGORIES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor:
                  selectedCategory === category
                    ? '#3498db'
                    : '#e0e0e0',
              }}
            >
              <Text
                style={{
                  color:
                    selectedCategory === category ? '#fff' : '#333',
                  textTransform: 'capitalize',
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 🧾 PRODUCT LIST */}
      <FlatList
        style={{ flex: 1 }}
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            Aucun produit trouvé
          </Text>
        }
      />
    </SafeAreaView>
  );
};
