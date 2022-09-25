import { apiSlice } from '.';

export const getPosts = () => ({
  query: () => '/',
  providesTags: (results = [], error, arg) => [
    'Post',
    'LIKE',
    ...results.map(({ _id }) => ({ type: 'Post', id: _id })),
  ],
});

export const getPost = () => ({
  query: (id) => `/posts/${id}`,
  providesTags: (result, error, arg) => ['LIKE2', { type: 'Post', id: arg }],
});

export const addPost = () => ({
  query: (postBody) => ({
    url: '/posts',
    body: postBody,
    method: 'POST',
  }),
  invalidatesTags: ['Post'],
});

export const editPost = () => ({
  query: (post) => ({
    url: `/posts/${post.get('id')}`,
    method: 'PATCH',
    body: post,
  }),
  invalidatesTags: (result, error, arg) => [
    { type: 'Post', id: arg.get('id') },
  ],
});

export const likePost2 = () => ({
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
});
export const likePost = () => ({
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
    );

    try {
      await queryFulfilled;
      console.log(result);
    } catch (error) {
      result.undo();
    }
  },
  invalidatesTags: (result, error, arg) => ['LIKE2'],
});
