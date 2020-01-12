import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from '../reducers';

const logger = createLogger({});

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['products', 'users', 'products', 'payment'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(logger, promiseMiddleware),
);

let persistor = persistStore(store);

export {store, persistor};
