import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CartScreen from '../screens/CartScreen';
import CustomBottomTab from './CustomBottomTab';
import Icon, {Icons} from '../components/Icons';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator
    tabBar={props => <CustomBottomTab {...props} />}
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        height: 70,
      },
    }}>
    {Tabs.map((item, index) => {
      return (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarLabel: item.label,

            tabBarIcon: ({color, size}) => (
              <Icon
                height={size}
                width={size}
                color={color}
                type={item.type}
                name={item.icon}
              />
            ),
          }}
        />
      );
    })}
  </Tab.Navigator>
);

const Tabs = [
  {
    route: 'Feed',
    label: 'Feed',
    type: Icons.Feather,
    icon: 'home',
    component: HomeScreen,
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
    icon: 'heart',
    component: FavouriteScreen,
  },
  {
    route: 'Cart',
    label: 'Cart',
    type: Icons.Feather,
    icon: 'shopping-cart',
    component: CartScreen,
  },
];

export default AppNavigator;
