import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const FeedNavigator = ({navigation, route}) => {
  // React.useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   const tabHiddenRoutes = ['ProductDetails', 'Cart'];
  //   if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
  //     navigation.setOptions({tabBarStyle: {display: 'none'}});
  //   } else {
  //     navigation.setOptions({tabBarStyle: {display: 'flex', height: 90}});
  //   }
  // }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{tabBarVisible: false}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
