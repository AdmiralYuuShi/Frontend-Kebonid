import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import product from './product';
import auth from './auth';
import users from './users';
import payment from './payment';
import store from './store';
const rootReducer = combineReducers({
  products,
  product,
  auth,
  users,
  payment,
  store,
});

export default rootReducer;
