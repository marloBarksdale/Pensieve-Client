import { createSelector, createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user-payload'))?.user || null;
const token = JSON.parse(localStorage.getItem('user-payload'))?.token || null;

const initialState = { user, token };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user-payload', JSON.stringify(action.payload));
    },
    clearUser: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user.user,
);

export const selectToken = createSelector(
  (state) => state.user,
  (user) => user.token,
);

const userReducer = userSlice.reducer;
export default userReducer;
