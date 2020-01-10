import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {store, persistor} from './src/public/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
// screens
import BottomNavbar from './src/screens/BottomNavbar';
import Home from './src/screens/Home';
import Wishlist from './src/screens/Wishlist';
import Cart from './src/screens/Cart';
import Profile from './src/screens/Profile';
import Sort from './src/screens/Sort';
import Filter from './src/screens/Filter';
import Product from './src/screens/Product';
import Start from './src/screens/Start';
import Login from './src/screens/Login';
import Register from './src/screens/SignUp';
import EditPhotoUser from './src/screens/EditPhotoUser';
import AddProduct from './src/screens/AddProduct';
import EditProduct from './src/screens/EditProduct';
import ProductStore from './src/screens/ProductStore';
import EditUser from './src/screens/EditUser';
import AddStoreAccount from './src/screens/AddStoreAccount';
import Splash from './src/screens/Splash';
const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
    },
    Start: {
      screen: Start,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    EditUser: {
      screen: EditUser,
    },
    EditPhotoUser: {
      screen: EditPhotoUser,
    },
    AddStoreAccount: {
      screen: AddStoreAccount,
    },
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
    Sort: {
      screen: Sort,
    },
    Filter: {
      screen: Filter,
    },
    Product: {
      screen: Product,
    },
    AddProduct: {
      screen: AddProduct,
    },
    EditProduct: {
      screen: EditProduct,
    },
    ProductStore: {
      screen: ProductStore,
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
    return (
      <MenuProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </MenuProvider>
    );
  }
}
