import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user';
import todoReducer from './features/todo';

import { userApi } from './services/user';
import { todoApi } from './services/todo';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    [userApi.reducerPath]: userApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApi.middleware, todoApi.middleware),
});

export default store;
