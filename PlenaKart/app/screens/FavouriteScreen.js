import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import colors from '../config/colors';
import Screen from '../components/Screen';
import {useIsFocused} from '@react-navigation/native';
import {View} from 'react-native';
import AppText from '../components/AppText';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';

import SolidHeart from '../assets/Heart2.svg';
import {selectAllProducts} from '../redux/ProductSlice';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

function FavouritesScreen({navigation}) {
  const bottomTabHeight = useBottomTabBarHeight();
  const products = useSelector(selectAllProducts);
  const favouriteProducts = products.filter(
    product => product.favourite === true,
  );
  const isFocused = useIsFocused();
  return (
    <Screen style={[styles.screen, {marginBottom: bottomTabHeight}]}>
      {isFocused && (
        <>
          <View style={styles.headerContainer}>
            <AppText style={styles.header}>Favourites</AppText>
            <SolidHeart height={'30'} width={'30'} />
          </View>
          {!favouriteProducts.length == 0 ? (
            <FlatList
              data={favouriteProducts}
              keyExtractor={product => product.id.toString()}
              numColumns={2}
              renderItem={({item}) => (
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
              )}
            />
          ) : (
            <View style={styles.emptyView}>
              <AppText>No items favorited</AppText>
            </View>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 35,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 90,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default FavouritesScreen;
