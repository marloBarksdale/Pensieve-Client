import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import postReducer from './features/posts/postsSlice';
import userReducer from './features/users/userSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
