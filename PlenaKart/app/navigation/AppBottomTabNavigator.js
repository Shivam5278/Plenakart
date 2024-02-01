import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import FeedNavigator from './FeedNavigator';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavouritesScreen from '../screens/FavouriteScreen';
import CartScreen from '../screens/CartScreen';
import colors from '../config/colors';
import CustomBottomTab from './CustomBottomTab';

const TabArr = [
  {
    route: 'Feed',
    label: 'Feed',
    type: Icons.Feather,
    icon: 'home',
    component: FeedNavigator,
  },
  {
    route: 'Categories',
    label: 'Categories',
    type: Icons.Feather,
    icon: 'search',
    component: CategoriesScreen,
  },
  {
    route: 'Favourite',
    label: 'Favourite',
    type: Icons.Feather,
    icon: 'plus-square',
    component: FavouritesScreen,
  },
  {
    route: 'Cart',
    label: 'Cart',
    type: Icons.Feather,
    icon: 'heart',
    component: CartScreen,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {translateY: 7},
  0.92: {translateY: -24},
  1: {translateY: -7},
};
const animate2 = {
  0: {translateY: -24},
  1: {translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  1: {scale: 1},
};
const circle2 = {
  0: {scale: 1},
  1: {scale: 0},
};

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 0});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 1});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={300}
        style={styles.container}
        useNativeDriver={true}>
        <View style={styles.btn}>
          <Animatable.View
            useNativeDriver={true}
            ref={circleRef}
            style={styles.circle}
            duration={300}
          />
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? colors.secondary : '#3E4554'}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
      tabBar={CustomBottomTab}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabBar: {
    height: 80,
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fontDark,
    borderRadius: 30,
  },
  text: {
    bottom: 11,
    fontSize: 12,
    textAlign: 'center',
    color: colors.fontLight,
    fontFamily: 'Manrope-Medium',
  },
});
