import { createSlice } from '@reduxjs/toolkit';
// import * as api from '../../api';
const initialState = {
  posts: [],

  openModal: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
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
export const { setOpenModal } = postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
