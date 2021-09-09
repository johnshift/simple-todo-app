import { createSlice } from '@reduxjs/toolkit';

const initState = {
  value: {
    username: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initState.value;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
