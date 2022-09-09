import { Modal } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../features/posts/postsSlice';
import { StyledPaper } from './Auth/styles';
const StyledModal = ({ children }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.posts.openModal);

  return (
    <Modal
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
      open={open}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') dispatch(setOpenModal(false));
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledPaper>{children}</StyledPaper>
    </Modal>
  );
};

export default StyledModal;
