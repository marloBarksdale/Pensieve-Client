import { Box, CircularProgress, Container, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../../api';
import { selectUser } from '../../features/users/userSlice';
import Post from './Post/Post';

const Posts = () => {
  const user = useSelector((state) => selectUser(state));
  const [skip, setSkip] = useState(true);

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
    <Box flex={4}>
      <CircularProgress
        sx={{
          top: '50%',
          left: '50%',
          position: 'fixed',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    </Box>
  ) : (
    <Box
      flex={4}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      // alignItems='center'
    >
      {isFetching && (
        <Box width='100%' justifyContent='center' display='flex'>
          <CircularProgress sx={{ marginBottom: '1rem' }} />{' '}
        </Box>
      )}
      <Stack
        direction='column'
        gap={3}
        className={isFetching ? 'disabled' : ''}
        paddingLeft={1}
        paddingRight={1}
      >
        {posts?.map((post) => (
          <Post {...post} key={post._id} />
        ))}
      </Stack>
    </Box>
  );
};

export default React.memo(Posts);
