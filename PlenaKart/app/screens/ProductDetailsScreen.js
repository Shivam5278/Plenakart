import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';

function ProductDetailsScreen(props) {
  return (
    <View style={styles.container}>
      <View>
        <AppText>Product Name</AppText>
        <AppText>Rating</AppText>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/Test/jacket.jpg')}
      />
      <View style={styles.buttonContainer}>
        <AppButton title={'Add to cart'} type="secondary" />
        <AppButton title={'Buy now'} />
      </View>
      <View style={styles.detailsContainer}>
        <AppText style={styles.detailsHeader} numberOfLines={1}>
          Details
        </AppText>
        <AppText style={styles.details}>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Nullam quis risus eget urna mollis ornare vel eu leo.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
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
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    // backgroundColor: 'red',
  },
});

export default ProductDetailsScreen;
