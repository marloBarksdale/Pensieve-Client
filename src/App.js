import { Box, createTheme, ThemeProvider } from '@mui/material';

import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetail from './components/Posts/PostDetail';
import Posts from './components/Posts/Posts';
import { selectUser } from './features/users/userSlice';

const App = () => {
  const user = useSelector((state) => selectUser(state));
  const [mode, setMode] = useState('light');

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#9d69a3',
        light: '#e85d75',
      },
      secondary: {
        main: '#f5fbef',
      },
      otherColor: {
        main: '#f09f',
      },
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={'background.default'}
        color={'text.primary'}
        minHeight='100vh'
      >
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Auth />}>
            {!user && (
              <>
                <Route index element={<Login />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
              </>
            )}
            {user && (
              <>
                <Route index element={<Posts />}></Route>
                <Route path='posts' element={<Posts />} />
                <Route
                  path='posts/:id'
                  element={user ? <PostDetail /> : <Navigate to='/login' />}
                />
              </>
            )}
          </Route>

          {/* <Route
          path='posts/:id'
          element={user ? <PostDetail /> : <Navigate to='/login' />}
        />
        <Route
          path='posts'
          element={user ? <Home /> : <Navigate to='/login' />}
        ></Route> */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
