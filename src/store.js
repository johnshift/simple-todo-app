import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import userReducer from './features/user';
import todoReducer from './features/todo';

const reducers = combineReducers({
  user: userReducer,
  todo: todoReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'todo'], // persist list
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
