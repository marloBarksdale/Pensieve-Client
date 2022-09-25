import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login, logout, signup } from './authEndpoints';
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
  likePost,
  likePost2,
} from './postEndpoints';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.0.124:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //Post enpoints
    getPosts: builder.query(getPosts()),
    getPost: builder.query(getPost()),
    addPost: builder.mutation(addPost()),
    editPosts: builder.mutation(editPost()),
    likePost2: builder.mutation(likePost2()),
    likePost: builder.mutation(likePost()),
    deletePost: builder.mutation(deletePost()),

    //Auth endpoints
    login: builder.mutation(login()),
    logout: builder.mutation(logout()),
    signup: builder.mutation(signup()),
  }),
});

export const {
  useGetPostsQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetPostQuery,
  useSignupMutation,
  useAddPostMutation,
  useEditPostsMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useLikePost2Mutation,
} = apiSlice;
