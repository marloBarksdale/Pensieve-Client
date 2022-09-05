import { Box, CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPostsQuery } from '../../api';
import { fetchPosts } from '../../features/posts/postsSlice';
import Post from './Post/Post';

const Posts = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);

  const { isSuccess, isLoading, data: posts, isError } = useGetPostsQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Stack flex={4} direction='column' padding={2} gap={3}>
      {posts.map((post) => (
        <Post {...post} key={post._id} />
      ))}
    </Stack>
  );
};

export default Posts;
