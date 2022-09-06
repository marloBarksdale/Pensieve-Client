import { CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPostsQuery } from '../../api';
import Post from './Post/Post';

const Posts = () => {
  const { isLoading, data: posts } = useGetPostsQuery();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Stack flex={4} direction='column' padding={2} gap={3}>
      {posts?.map((post) => (
        <Post {...post} key={post._id} />
      ))}
    </Stack>
  );
};

export default Posts;
