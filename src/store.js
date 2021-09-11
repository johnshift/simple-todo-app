import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user';
import todoReducer from './features/todo';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export default store;
