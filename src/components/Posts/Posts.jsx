import { CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../../api';
import { selectUser } from '../../features/users/userSlice';
import Post from './Post/Post';

const Posts = () => {
  const user = useSelector((state) => selectUser(state));
  const [skip, setSkip] = useState(true);
  console.log('posts');
  //Stop query if there is no user present
  useEffect(() => {
    if (user) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [user]);
  const { isLoading, data: posts, isFetching } = useGetPostsQuery('', { skip });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {' '}
      <Stack
        flex={4}
        direction='column'
        padding={2}
        gap={3}
        className={isFetching ? 'disabled' : ''}
      >
        {posts?.map((post) => (
          <Post {...post} key={post._id} />
        ))}
      </Stack>
    </>
  );
};

export default React.memo(Posts);
