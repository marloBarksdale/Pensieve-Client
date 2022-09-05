import { Box, Stack } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import Post from './Post/Post';

const Posts = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <Stack flex={4} direction='column' padding={2} gap={3}>
      <Post />
      <Post />
      <Post />
      <Post />
    </Stack>
  );
};

export default Posts;
