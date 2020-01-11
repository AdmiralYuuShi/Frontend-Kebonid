import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import auth from './auth';
import payment from './payment';

const rootReducer = combineReducers({
  products,
  auth,
  payment,
});

export default rootReducer;
