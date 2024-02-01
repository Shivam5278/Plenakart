import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import LineHeart from '../assets/Heart1.svg';
import SolidHeart from '../assets/Heart2.svg';
import {useDispatch} from 'react-redux';
import {addToCart, productFavourited} from '../redux/ProductSlice';
import Icon from './Icon';

function ProductCard({item, onPress}) {
  const [favourite, setFavourite] = useState(item.favourite);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productFavourited({id: item.id, favourite}));
  }, [favourite]);

  function AddToCart(id) {
    dispatch(addToCart({id, quantity: 1}));
  }

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{uri: item.images[item.images.length - 1]}}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setFavourite(!favourite)}>
          {!favourite ? <LineHeart width={15} /> : <SolidHeart width={15} />}
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <AppText style={styles.price} numberOfLines={1}>
            ${item.price}
          </AppText>
          <AppText style={styles.name} numberOfLines={1}>
            {item.title}
          </AppText>
        </View>
        <View style={styles.detailsSection}>
          <Icon
            onPress={() => AddToCart(item.id)}
            name={'plus'}
            backgroundColor={colors.primary}
            size={24}
            iconColor={colors.white}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: colors.light,
    overflow: 'hidden',
    width: 160,
    height: 194,
    marginHorizontal: 10,
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  image: {
    height: 110,
    resizeMode: 'contain',
    borderRadius: 20,
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  detailsSection: {
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
    bottom: 36,
  },
  price: {
    color: colors.fontDark,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  name: {
    color: colors.fontGrey,
    fontSize: 12,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  favoriteButton: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 50,
    zIndex: 1,
    padding: 5,
    margin: 8,
  },
});

export default ProductCard;
