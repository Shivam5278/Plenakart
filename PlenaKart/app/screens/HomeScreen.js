import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import Screen from '../components/Screen';
import ProductCard from '../components/ProductCard';
import productsApi from '../api/products';
import colors from '../config/styles';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

function HomeScreen(props) {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   loadProducts();
  // }, []);

  // const loadProducts = async () => {
  //   console.log('calles');
  //   const response = await productsApi.getProducts();
  //   console.log(response.data);
  //   setProducts(response.data);
  // };
  return (
    <Screen>
      <View style={styles.topBar}></View>
      <View>
        <AppText style={styles.header}>Recommended</AppText>
        <View>
          <FlatList
            data={products}
            keyExtractor={product => product.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <ProductCard price={item.price} name={item.title} />
            )}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  topBar: {
    backgroundColor: colors.colors.primary,
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: 30,
    lineHeight: 38,
    color: colors.colors.fontDark,
    padding: 15,
  },
});

export default HomeScreen;

const products = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
    images: [
      'https://cdn.dummyjson.com/product-images/1/1.jpg',
      'https://cdn.dummyjson.com/product-images/1/2.jpg',
      'https://cdn.dummyjson.com/product-images/1/3.jpg',
      'https://cdn.dummyjson.com/product-images/1/4.jpg',
      'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
    ],
  },
  {
    id: 2,
    title: 'Galaxy S20',
    description: 'A powerful Samsung smartphone with cutting-edge features',
    price: 699,
    discountPercentage: 15.25,
    rating: 4.85,
    stock: 82,
    brand: 'Samsung',
    category: 'smartphones',
    thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    images: [
      'https://cdn.dummyjson.com/product-images/2/1.jpg',
      'https://cdn.dummyjson.com/product-images/2/2.jpg',
      'https://cdn.dummyjson.com/product-images/2/3.jpg',
      'https://cdn.dummyjson.com/product-images/2/4.jpg',
      'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    ],
  },
  {
    id: 3,
    title: 'Pixel 5',
    description:
      "Google's latest flagship phone with exceptional camera capabilities",
    price: 649,
    discountPercentage: 10.5,
    rating: 4.75,
    stock: 67,
    brand: 'Google',
    category: 'smartphones',
    thumbnail: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
    images: [
      'https://cdn.dummyjson.com/product-images/3/1.jpg',
      'https://cdn.dummyjson.com/product-images/3/2.jpg',
      'https://cdn.dummyjson.com/product-images/3/3.jpg',
      'https://cdn.dummyjson.com/product-images/3/4.jpg',
      'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
    ],
  },
  {
    id: 4,
    title: 'OnePlus 9',
    description: 'A high-performance flagship killer from OnePlus',
    price: 699,
    discountPercentage: 8.75,
    rating: 4.8,
    stock: 75,
    brand: 'OnePlus',
    category: 'smartphones',
    thumbnail: 'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg',
    images: [
      'https://cdn.dummyjson.com/product-images/4/1.jpg',
      'https://cdn.dummyjson.com/product-images/4/2.jpg',
      'https://cdn.dummyjson.com/product-images/4/3.jpg',
      'https://cdn.dummyjson.com/product-images/4/4.jpg',
      'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg',
    ],
  },
  {
    id: 5,
    title: 'Xperia 1 III',
    description:
      "Sony's flagship phone with a stunning 4K display and advanced camera system",
    price: 1099,
    discountPercentage: 5.0,
    rating: 4.9,
    stock: 50,
    brand: 'Sony',
    category: 'smartphones',
    thumbnail: 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
    images: [
      'https://cdn.dummyjson.com/product-images/5/1.jpg',
      'https://cdn.dummyjson.com/product-images/5/2.jpg',
      'https://cdn.dummyjson.com/product-images/5/3.jpg',
      'https://cdn.dummyjson.com/product-images/5/4.jpg',
      'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
    ],
  },
];
