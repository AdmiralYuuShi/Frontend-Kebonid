import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import product from './product';
import auth from './auth';

const rootReducer = combineReducers({
  products,
  product,
  auth,
});

export default rootReducer;
