import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import postReducer from './features/posts/postsSlice';

const store = configureStore({
  reducer: { posts: postReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
