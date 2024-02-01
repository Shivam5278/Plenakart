import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();
const FeedNavigator = ({navigation, route}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={AppNavigator} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
