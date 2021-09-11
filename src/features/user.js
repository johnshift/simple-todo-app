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
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
