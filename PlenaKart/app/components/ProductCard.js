import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import LineHeart from '../assets/Heart1.svg';
import SolidHeart from '../assets/Heart2.svg';

function ProductCard({item, price, name, onPress, imageUrl}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={require('../assets/Test/jacket.jpg')}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}></TouchableOpacity>
        <View style={styles.detailsContainer}>
          <AppText style={styles.price} numberOfLines={1}>
            {price}
          </AppText>
          <AppText style={styles.name} numberOfLines={2}>
            {name}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    width: '100%',
    height: 130,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
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
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default ProductCard;
