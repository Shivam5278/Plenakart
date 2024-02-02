import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  productFavourited,
  selectProductById,
  getCartQuantity,
} from '../redux/ProductSlice';

import LineHeart from '../assets/Heart1.svg';
import SolidHeart from '../assets/Heart2.svg';
import StarIcon from '../components/StarRating';
import Icon from '../components/Icon';
import ImageSlider from '../components/ImageSlider';

import CartIndicator from '../components/CartIndicator';

function ProductDetailsScreen({route, navigation}) {
  const {id} = route.params;
  let loading = true;
  const product = useSelector(state => selectProductById(state, id));
  const count = useSelector(getCartQuantity);

  const [favourite, setFavourite] = useState(product.favourite);

  const dispatch = useDispatch();

  useEffect(() => {
    loading = false;
    dispatch(productFavourited({id, favourite}));
  }, [favourite]);

  function AddToCart(id) {
    dispatch(addToCart({id, quantity: 1}));
  }

  return (
    <Screen style={styles.container}>
      {loading && (
        <ScrollView>
          <View style={styles.headerContainer}>
            <Icon name={'chevron-left'} onPress={() => navigation.goBack()} />
            <CartIndicator iconColor={'black'} />
          </View>
          <View>
            <AppText style={styles.title}>{product.title}</AppText>
            <View style={styles.starRating}>
              <StarIcon rating={product.rating} />
              <AppText style={styles.reviews}>
                {Math.floor(Math.random() * (200 - 40 + 1)) + 40} Reviews
              </AppText>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <ImageSlider style={styles.image} images={product.images} />
            <Pressable
              style={styles.favoriteButton}
              onPress={() => setFavourite(!favourite)}>
              {!favourite ? (
                <LineHeart width={15} />
              ) : (
                <SolidHeart width={15} />
              )}
            </Pressable>
          </View>
          <View style={styles.priceContainer}>
            <AppText style={styles.price}>${product.price}</AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title={'Add to cart'}
              type="secondary"
              onPress={() => AddToCart(product.id)}
            />
            <AppButton title={'Buy now'} />
          </View>
          <View style={styles.detailsContainer}>
            <AppText style={styles.detailsHeader} numberOfLines={1}>
              Details
            </AppText>
            <AppText style={styles.details}>{product.description}</AppText>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 50,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  starRating: {
    paddingLeft: 26,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviews: {
    fontSize: 14,
    color: '#A1A1AB',
    paddingLeft: 5,
  },
  priceContainer: {
    paddingHorizontal: 20,
    paddingTop: 26,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {},
  image: {
    width: '90%',
    height: 207,
  },
  detailsContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
  },
  detailsHeader: {
    color: colors.fontDark,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 6,
  },
  details: {
    color: colors.fontLight,
    fontSize: 16,
    lineHeight: 24,
  },
  favoriteButton: {
    padding: 17,
    backgroundColor: colors.white,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 1,
    right: 35,
    top: 14,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 35,
    marginHorizontal: 24,
  },
});

export default ProductDetailsScreen;
