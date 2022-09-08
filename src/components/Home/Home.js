import { Create } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';
import LeftNav from '../LeftNav/LeftNav';
import AddPost from '../Posts/AddPost';
import Posts from '../Posts/Posts';
import RightNav from '../RightNav/RightNav';

const actions = [{ icon: <Create />, name: 'Create' }];

const Home = () => {
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
          ariaLabel='SpeedDial tooltip example'
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
                // setOpen(false);
                // setOpenModal(true);
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
};

export default Home;
