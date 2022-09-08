import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    getPosts: builder.query({
      query: () => '/',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    addPost: builder.mutation({
      query: (postBody) => ({
        url: '/posts',
        body: postBody,
        method: 'POST',
      }),
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
} = apiSlice;
