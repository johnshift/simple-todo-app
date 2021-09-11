import { createSlice } from '@reduxjs/toolkit';

const initState = {
  username: '',
  welcomeMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    login: (state, action) => ({
      ...state,
      username: action.payload,
    }),
    logout: () => initState,
    retrieveMsg: (state) => ({
      ...state,
      welcomeMessage: '"hardcoded welcome message"',
    }),
  },
});

export const { login, logout, retrieveMsg } = userSlice.actions;

export default userSlice.reducer;
