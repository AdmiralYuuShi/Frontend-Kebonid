import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import product from './product';
import auth from './auth';
import users from './users';
import payment from './payment';
import wishlist from './wishlist';
import wishlists from './wishlists';

const rootReducer = combineReducers({
  products,
  product,
  auth,
  users,
  payment,
  wishlist,
  wishlists,
});

export default rootReducer;
