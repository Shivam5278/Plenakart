import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AppText from '../components/AppText';
import ProductCard from '../components/ProductCard';
import productApi from '../api/products';
import Screen from '../components/Screen';
import colors from '../config/colors';
import SearchTextInput from '../components/SearchTextInput';
import Icon from '../components/Icon';
import {useDispatch} from 'react-redux';
import {addProducts} from '../redux/ProductSlice';
import CartIndicator from '../components/CartIndicator';

function SearchedProducts({route, navigation}) {
  const dispatch = useDispatch();
  const {search, type} = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (type === 'category') {
          const response = await productApi.getProductsFromCategory(search);
          if (response.ok) {
            dispatch(addProducts(response.data.products));
            setLoading(false);
            setProducts(response.data.products);
          } else {
            console.error('Error fetching products:', response.error);
          }
        } else if (type === 'search') {
          const response = await productApi.getProductsBySearch(search);
          if (response.ok) {
            dispatch(addProducts(response.data.products));

            setLoading(false);
            setProducts(response.data.products);
          } else {
            console.error('Error fetching products:', response.error);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, type]);
  const renderItem = ({item}) => (
    // isFocused && (
    <ProductCard
      item={item}
      price={item.price}
      name={item.title}
      imageUrl={item.images[0]}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          id: item.id,
        })
      }
    />
  );

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Icon name={'chevron-left'} onPress={() => navigation.goBack()} />
        {type === 'category' ? (
          <AppText style={styles.header}>{search}</AppText>
        ) : (
          <>
            <View style={{width: '70%'}}>
              <AppText style={styles.search}>
                Search results for {search}
              </AppText>
            </View>
          </>
        )}
        <CartIndicator iconColor={'black'} />
      </View>
      {loading ? (
        <>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size={'large'} color={colors.secondary} />
          </View>
        </>
      ) : (
        <>
          {!products.length ? (
            <View style={styles.emptyView}>
              <AppText>No products found</AppText>
            </View>
          ) : (
            <FlatList
              data={products}
              keyExtractor={product => product.id.toString()}
              numColumns={2}
              maxToRenderPerBatch={4}
              windowSize={5}
              renderItem={renderItem}
            />
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginVertical: 30,
    marginHorizontal: 24,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  search: {
    color: colors.fontDark,
    fontSize: 16,
    paddingLeft: 20,
  },
});

export default SearchedProducts;
