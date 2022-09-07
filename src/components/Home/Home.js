import { Box } from '@mui/material';
import React from 'react';
import { Route } from 'react-router-dom';
import LeftNav from '../LeftNav/LeftNav';
import PostDetail from '../Posts/PostDetail';
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

export default Home;
