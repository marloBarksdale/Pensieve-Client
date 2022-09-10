import { Create } from '@mui/icons-material';
import { SpeedDial } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setOpenModal } from '../../features/posts/postsSlice';

const AddPostButton = () => {
  const dispatch = useDispatch();
  return (
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
  );
};

export default AddPostButton;
