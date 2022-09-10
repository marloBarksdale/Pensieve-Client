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
      providesTags: (results = [], error, arg) => [
        'Post',
        ...results.map(({ _id }) => ({ type: 'Post', id: _id })),
      ],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addPost: builder.mutation({
      query: (postBody) => ({
        url: '/posts',
        body: postBody,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    editPosts: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.get('id')}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
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
} = apiSlice;
