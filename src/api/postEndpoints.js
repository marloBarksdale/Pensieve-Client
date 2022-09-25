export const getPosts = () => {
  return {
    query: () => '/',
    providesTags: (results = [], error, arg) => [
      'Post',
      'LIKE',
      ...results.map(({ _id }) => ({ type: 'Post', id: _id })),
    ],
  };
};
