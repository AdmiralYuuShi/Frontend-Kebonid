import {combineReducers} from 'redux';

// import all reducer
import products from './products';
import auth from './auth';
import users from './users';

const rootReducer = combineReducers({
  products,
  auth,
  users,
});

export default rootReducer;
