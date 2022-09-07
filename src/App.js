import { Box } from '@mui/material';

import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import InputWithIcon from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetail from './components/Posts/PostDetail';
import { selectUser } from './features/users/userSlice';

const App = () => {
  const user = useSelector((state) => selectUser(state));

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <InputWithIcon />} />
        <Route
          path='/login'
          element={!user ? <InputWithIcon /> : <Navigate to='/posts' replace />}
        />

        <Route path='posts/:id' element={<PostDetail />} />
        <Route
          path='posts'
          element={user ? <Home /> : <Navigate to='/login' />}
        ></Route>
      </Routes>
    </Box>
  );
};

export default App;
