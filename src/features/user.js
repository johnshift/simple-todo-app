import { createSlice } from '@reduxjs/toolkit';

const initState = {
  username: '',
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
    logout: () => initState,
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
