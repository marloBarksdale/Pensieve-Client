import { Box, Button } from '@mui/material';
import { AppBar, Typography } from '@mui/material';

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/system';
import LeftNav from './components/LeftNav/LeftNav';
import Posts from './components/Posts/Posts';
import RightNav from './components/RightNav/RightNav';
const App = () => {
  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box display='flex'>
        <LeftNav />
        <Posts />
        <RightNav />
      </Box>
    </>
  );
};

export default App;
