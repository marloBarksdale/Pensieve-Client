import { Box, Button } from '@mui/material';
import { AppBar, Typography } from '@mui/material';

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/system';
import LeftNav from './components/LeftNav/LeftNav';
import Posts from './components/Posts/Posts';
import RightNav from './components/RightNav/RightNav';
import { Route, Router, Routes } from 'react-router-dom';
import InputWithIcon from './components/Auth/Auth';
const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path='/login' element={<InputWithIcon />} />
        <Route
          path='/'
          element={
            <Box display='flex'>
              <LeftNav />
              <Posts />
              <RightNav />
            </Box>
          }
        ></Route>
      </Routes>
    </Box>
  );
};

export default App;
