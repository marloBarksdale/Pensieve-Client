import { Box, Stack } from '@mui/material';
import React from 'react';
import Post from './Post/Post';

const Posts = () => {
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
