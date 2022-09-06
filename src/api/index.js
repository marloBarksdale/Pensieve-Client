import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        console.log(token);
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/',
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
  }),
});

export const { useGetPostsQuery, useLoginMutation, useLogoutMutation } =
  apiSlice;
