import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import auth from './auth';

const rootReducer = combineReducers({
  products,
  auth,
});

export default rootReducer;
