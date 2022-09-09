import { Create } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setOpenModal } from '../../features/posts/postsSlice';
import LeftNav from '../LeftNav/LeftNav';
import AddPost from '../Posts/AddPost';
import Posts from '../Posts/Posts';
import RightNav from '../RightNav/RightNav';

const actions = [{ icon: <Create />, name: 'Create' }];

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const modal = useSelector((state) => state.posts.openModal);
  useEffect(() => {
    dispatch(setOpenModal(false));
  }, [location, dispatch]); //Closes modal whenever the location changes

  return (
    <Box display='flex' gap={2} marginTop={1.5} justifyContent='center'>
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
