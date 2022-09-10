import { Create } from '@mui/icons-material';
import { Box, SpeedDial } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { setOpenModal } from '../../features/posts/postsSlice';
import LeftNav from '../LeftNav/LeftNav';
import AddPost from '../Posts/AddPost';
import Posts from '../Posts/Posts';
import RightNav from '../RightNav/RightNav';
import StyledModal from '../StyledModal';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const modal = useSelector((state) => state.posts.openModal);
  useEffect(() => {
    dispatch(setOpenModal(false));
  }, [location, dispatch]); //Closes modal whenever the location changes

  return (
    <Box display='flex' marginTop={1.5}>
      <LeftNav />
      <Posts />

      <RightNav />

      {modal && <AddPost />}

      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          left: { xs: 'calc(85% - 25px)', sm: 'calc(90% - 25px)', md: 30 },
        }}
      >
        <SpeedDial
          ariaLabel='SpeedDial'
          hidden={false}
          icon={<Create />}
          onClick={() => {
            dispatch(setOpenModal(true));
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
