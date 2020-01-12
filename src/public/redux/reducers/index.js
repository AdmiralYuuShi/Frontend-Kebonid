import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import product from './product';
import auth from './auth';
import users from './users';
import payment from './payment';
import transaction from './transaction'
import wishlist from './wishlist';
import wishlists from './wishlists';
import cart from './cart';
import store from './store';

const rootReducer = combineReducers({
  products,
  product,
  auth,
  users,
  payment,
  transaction,
  wishlist,
  wishlists,
  cart,
  store,
});

export default rootReducer;
