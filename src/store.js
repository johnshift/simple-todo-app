import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user';
import todoReducer from './features/todo';

import { userApi } from './services/user';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
