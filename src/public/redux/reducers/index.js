import {combineReducers} from 'redux';

// import all reducer
import products from './products';

const rootReducer = combineReducers({
  products,
});

export default rootReducer;
