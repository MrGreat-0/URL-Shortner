import { createSlice } from '@reduxjs/toolkit';
// import { fetchCurrentUser } from '../actions/auth.actions';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  // This version uses Redux's createAsyncThunk to manage async logic centrally ("fetchCurrentUser").
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCurrentUser.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isAuthenticated = true;
  //     })
  //     .addCase(fetchCurrentUser.rejected, (state) => {
  //       state.user = null;
  //       state.isAuthenticated = false;
  //     });
  // }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
