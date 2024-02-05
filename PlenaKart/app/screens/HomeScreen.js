import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Screen from '../components/Screen';
import ProductCard from '../components/ProductCard';
import colors from '../config/styles';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import HomeScreenHeader from '../components/HomeScreenHeader';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, selectAllProducts} from '../redux/ProductSlice';
import {useIsFocused} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

function HomeScreen({navigation}) {
  const bottomTabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  let loading = false;

  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(state => state.products.status);
  const hasError = useSelector(state => state.products.error);

  if (productStatus === 'loading') {
    loading = true;
  } else if (productStatus === 'succeeded') {
    loading = false;
  } else if (productStatus === 'failed') {
    setError(hasError);
  }

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const isFocused = useIsFocused();
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
    <Screen style={[styles.container, {marginBottom: bottomTabHeight}]}>
      <>
        <View style={styles.bottom}>
          {products && (
            <FlatList
              ListHeaderComponent={
                <>
                  <HomeScreenHeader />

                  {error && (
                    <>
                      <View style={styles.error}>
                        <AppText>Couldn't retrieve the products. </AppText>
                        <AppButton
                          title={'Retry'}
                          onPress={() => dispatch(fetchProducts())}
                        />
                      </View>
                    </>
                  )}
                </>
              }
              data={products}
              keyExtractor={product => product.id.toString()}
              refreshing={loading}
              onRefresh={() => {
                loading = true;
                dispatch(fetchProducts());
              }}
              numColumns={2}
              maxToRenderPerBatch={4}
              windowSize={5}
              renderItem={renderItem}
            />
          )}
        </View>
      </>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 35,
  },
  topBar: {
    backgroundColor: colors.colors.primary,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: 30,
    lineHeight: 38,
    color: colors.colors.fontDark,
    padding: 15,
  },
  error: {
    padding: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
