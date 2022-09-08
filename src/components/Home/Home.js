import { Create } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { setOpenModal } from '../../features/posts/postsSlice';
import LeftNav from '../LeftNav/LeftNav';
import AddPost from '../Posts/AddPost';
import EditPost from '../Posts/EditPost';
import Posts from '../Posts/Posts';
import RightNav from '../RightNav/RightNav';
import StyledModal from '../StyledModal';

const actions = [{ icon: <Create />, name: 'Create' }];

const Home = () => {
  const dispatch = useDispatch();
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
