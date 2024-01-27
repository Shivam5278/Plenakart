import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {addToCart, removeFromCart} from '../redux/ProductSlice';

function CartScreen({navigation}) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.products.cart);
  let deliveryCharge = 2;
  let totalBill = 0;
  if (cart.total > 100 || cart.total == 0) deliveryCharge = 0;
  if (cart.total > 0) {
    totalBill = deliveryCharge + cart.total;
  }
  let totalItems = 0;
  cart.items.map(item => {
    totalItems += item.quantity;
  });

  function AddToCart(id) {
    dispatch(addToCart({id, quantity: 1}));
  }
  function RemoveFromCart(id, quantity) {
    dispatch(removeFromCart({id, quantity}));
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name={'chevron-left'} onPress={() => navigation.goBack()} />
        <AppText style={styles.header}>Shopping Cart ({totalItems})</AppText>
      </View>
      <View style={styles.cartItems}>
        <FlatList
          data={cart.items}
          ItemSeparatorComponent={<ListItemSeparator />}
          renderItem={({item}) => {
            return (
              <ListItem
                title={item.title}
                subTitle={`$ ${item.price}`}
                imageUrl={item.images[0]}
                quantity={item.quantity}
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    id: item.id,
                  })
                }
                onPressPlus={() => AddToCart(item.id)}
                onPressMinus={() => RemoveFromCart(item.id, 1)}
              />
            );
          }}
        />
      </View>
      <View style={styles.cartDetailsSection}>
        <View style={styles.cartDetails}>
          <AppText style={styles.cartDetailsText}>Subtotal</AppText>
          <AppText style={styles.cartDetailsAmount}>$ {cart.total}</AppText>
        </View>
        <View style={styles.cartDetails}>
          <AppText style={styles.cartDetailsText}>
            Delivery (free above $ 100)
          </AppText>
          <AppText style={styles.cartDetailsAmount}>$ {deliveryCharge}</AppText>
        </View>
        <View style={styles.cartDetails}>
          <AppText style={styles.cartDetailsText}>Total</AppText>
          <AppText style={styles.cartDetailsAmount}>$ {totalBill}</AppText>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title={'Proceed to Checkout'} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  cartItems: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 24,
  },
  header: {
    marginLeft: 21,
    fontSize: 16,
    lineHeight: 24,
  },

  cartDetailsSection: {
    backgroundColor: colors.light,
    marginHorizontal: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 228,
    width: '96%',
    paddingVertical: 9,
  },
  cartDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    marginVertical: 8,
  },
  cartDetailsText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.fontGrey,
  },
  cartDetailsAmount: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.fontDark,
  },
  buttonContainer: {
    height: 76,
    marginTop: 17,
  },
});

export default CartScreen;
