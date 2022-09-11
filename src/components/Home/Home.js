import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { setOpenModal } from '../../features/posts/postsSlice';
import RightNav from '../RightNav/RightNav';
import Sidenav from '../SideNav/Sidenav';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setOpenModal(false));
  }, [location, dispatch]); //Closes modal whenever the location changes

  return (
    <Box display='flex' marginTop={1.5} marginBottom={4}>
      <Sidenav />
      <Outlet />

      <RightNav />

      {/* {modal && <AddPost />} */}
    </Box>
  );
};

export default Home;
