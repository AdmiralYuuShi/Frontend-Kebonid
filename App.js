import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// screens
import BottomNavbar from './src/screens/BottomNavbar';
import Home from './src/screens/Home';
import Wishlist from './src/screens/Wishlist';
import Cart from './src/screens/Cart';
import Profile from './src/screens/Profile';

const AppNavigator = createStackNavigator(
  {
    BottomNavbar: {
      screen: BottomNavbar,
    },
    Home: {
      screen: Home,
    },
    Wishlist: {
      screen: Wishlist,
    },
    Cart: {
      screen: Cart,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

// wrap all component with redux Provider and the store
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
