import { Create } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
    dispatch(setOpenModal(false));
  }, [location, dispatch]);

  return (
    <Box display='flex'>
      <LeftNav />
      <Posts />

      <RightNav />

      <AddPost />

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
          icon={<SpeedDialIcon />}
          // onClose={handleClose}
          // onOpen={handleOpen}
          // open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                dispatch(setOpenModal(true));
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
};

export default Home;
