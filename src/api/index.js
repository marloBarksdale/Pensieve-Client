import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPosts } from './postEndpoints';

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
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => [
        'LIKE2',
        { type: 'Post', id: arg },
      ],
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
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.get('id') },
      ],
    }),
    likePost2: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/${postId}/like`,
        method: 'PATCH',
      }),

      async onQueryStarted({ userId, postId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getPost', postId, (draft) => {
            if (draft.likes.includes(userId)) {
              draft.likes = draft.likes.filter((like) => like !== userId);
            } else {
              draft.likes.push(userId);
            }
          }),
        );

        try {
          await queryFulfilled;
          console.log(result);
        } catch (error) {
          result.undo();
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'LIKE' }],
    }),
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/${postId}/like`,
        method: 'PATCH',
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getPosts', '', (draft) => {
            const post = draft.find((post) => post._id === postId);

            if (post) {
              if (post.likes.includes(userId)) {
                post.likes = post.likes.filter((like) => like !== userId);
              } else {
                post.likes.push(userId);
              }
            }
          }),

          // apiSlice.util.updateQueryData('getPost', postId, (draft) => {
          //   if (draft.likes.includes(userId)) {
          //     draft.likes = draft.likes.filter((like) => like !== userId);
          //   } else {
          //     draft.likes.push(userId);
          //   }
          // }),
        );

        try {
          await queryFulfilled;
          console.log(result);
        } catch (error) {
          result.undo();
        }
      },
      invalidatesTags: (result, error, arg) => ['LIKE2'],
    }),

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
