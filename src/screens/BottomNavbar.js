import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Profile from './Profile';

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <Icon
            name="home"
            size={20}
            color={!focused ? '#979A9A' : '#42B549'}
          />
        ),
      },
    },
    Wishlist: {
      screen: Wishlist,
      navigationOptions: {
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({focused}) => (
          <Icon
            name="heart"
            size={20}
            color={!focused ? '#979A9A' : '#42B549'}
          />
        ),
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: 'Keranjang',
        tabBarIcon: ({focused}) => (
          <Icon
            name="shopping-cart"
            size={20}
            color={!focused ? '#979A9A' : '#42B549'}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({focused}) => (
          <Icon
            name="user"
            size={20}
            color={!focused ? '#979A9A' : '#42B549'}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#42B549',
    inactiveColor: '#979A9A',
    barStyle: {backgroundColor: '#fff'},
  },
);
