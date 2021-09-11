import { createSlice } from '@reduxjs/toolkit';

const initState = {
  username: localStorage.getItem('username') || '',
  welcomeMessage: 'click btn to retrieve message',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    login: (state, { payload }) => {
      state.username = payload;
      localStorage.setItem('username', payload);
    },
    logout: (state) => {
      state.username = '';
      localStorage.removeItem('username');
      state.welcomeMessage = initState.welcomeMessage;
    },
    retrieveMsg: (state) => {
      state.welcomeMessage = 'hardcoded message';
    },
    deleteMsg: (state) => {
      state.welcomeMessage = initState.welcomeMessage;
    },
  },
});

export const {
  login, logout, retrieveMsg, deleteMsg,
} = userSlice.actions;

export default userSlice.reducer;
