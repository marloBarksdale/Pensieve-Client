import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addPost,
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
    getPosts: builder.query(getPosts()),
    getPost: builder.query(getPost()),
    addPost: builder.mutation(addPost()),
    editPosts: builder.mutation(editPost()),
    likePost2: builder.mutation(likePost2()),
    likePost: builder.mutation(likePost()),

    deletePost: builder.mutation({
      query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Post'],
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: '/user/login',
        body: loginData,
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/user/logout',

        method: 'POST',
      }),
    }),
    signup: builder.mutation({
      query: (signupData) => ({
        url: '/user/signup',
        method: 'POST',
        body: signupData,
      }),
    }),
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
