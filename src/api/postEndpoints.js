export const getPosts = () => ({
  query: () => '/',
  providesTags: (results = [], error, arg) => [
    'Post',
    'LIKE',
    ...results.map(({ _id }) => ({ type: 'Post', id: _id })),
  ],
});

export const getPost = (id) => ({
  query: (id) => `/posts/${id}`,
  providesTags: (result, error, arg) => ['LIKE2', { type: 'Post', id: arg }],
});
