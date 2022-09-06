import { Box } from '@mui/material';

import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import InputWithIcon from './components/Auth/Auth';
import LeftNav from './components/LeftNav/LeftNav';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import RightNav from './components/RightNav/RightNav';
import { selectUser } from './features/users/userSlice';

const App = () => {
  const user = useSelector((state) => selectUser(state));

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={!user ? <InputWithIcon /> : <Navigate to='/' replace />}
        />
        <Route
          path='/'
          element={
            user ? (
              <Box display='flex'>
                <LeftNav />
                <Posts />
                <RightNav />
              </Box>
            ) : (
              <Navigate to='/login' replace />
            )
          }
        ></Route>
      </Routes>
    </Box>
  );
};

export default App;
