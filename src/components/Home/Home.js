import { Box } from '@mui/material';
import React from 'react';
import LeftNav from '../LeftNav/LeftNav';
import Posts from '../Posts/Posts';
import RightNav from '../RightNav/RightNav';

const Home = () => {
  return (
    <Box display='flex'>
      <LeftNav />
      <Posts />
      <RightNav />
    </Box>
  );
};

export default React.memo(Home);
