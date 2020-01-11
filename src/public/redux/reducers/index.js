import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import product from './product';
import auth from './auth';
import payment from './payment';

const rootReducer = combineReducers({
  products,
  product,
  auth,
  payment,
});

export default rootReducer;
