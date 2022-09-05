import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import * as api from '../../api';
const initialState = {
  posts: [],
  status: 'idle',
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  //   extraReducers(builder) {
  //     builder
  //       .addCase(fetchPosts.pending, (state, action) => {
  //         state.status = 'loading';
  //       })
  //       .addCase(fetchPosts.fulfilled, (state, action) => {
  //         console.log(action.payload);
  //         state.status = 'succeeded';
  //         state.posts = [];
  //       });
  //   },
});

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   console.log('popo');
//   const res = await api.fetchPosts();
//   return res.data;
// });

const postReducer = postSlice.reducer;

export default postReducer;
