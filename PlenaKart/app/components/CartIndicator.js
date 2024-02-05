import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import AppText from './AppText';
import CartIcon from '../assets/icons/bag.svg';
import {getCartQuantity} from '../redux/ProductSlice';
import {useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';

function CartIndicator({iconColor}) {
  const navigation = useNavigation();
  const count = useSelector(getCartQuantity);
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.5, {stiffness: 100}),
      withDelay(200, withSpring(1, {stiffness: 100})),
    );
  }, [count]);

  const animatedIndicatorStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      {count !== 0 ? (
        <Animated.View style={[styles.cartIndicator, animatedIndicatorStyles]}>
          <AppText
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: 'Manrope Semibold',
            }}>
            {count}
          </AppText>
        </Animated.View>
      ) : (
        <></>
      )}
      <CartIcon stroke={colors[iconColor]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  cartIndicator: {
    backgroundColor: colors.secondary,
    width: 22,
    height: 22,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1,
    top: -8,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartIndicator;
