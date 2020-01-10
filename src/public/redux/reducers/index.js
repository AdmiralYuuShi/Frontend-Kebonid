import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import product from './product';

const rootReducer = combineReducers({
  products,
  product,
});

export default rootReducer;
