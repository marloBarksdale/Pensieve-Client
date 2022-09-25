export const getComments = () => ({
  query: (postId) => `/posts/${postId}/comments`,
  providesTags: (result, error, arg) => [{ type: 'Comments', id: arg }],
});
