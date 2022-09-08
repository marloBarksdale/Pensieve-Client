import React from 'react';
import { Modal } from '@mui/material';
import { StyledPaper } from './Auth/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setAddPost } from '../features/posts/postsSlice';
const StyledModal = ({ children }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.posts.addPost);

  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={open}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') dispatch(setAddPost(false));
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledPaper>{children}</StyledPaper>
    </Modal>
  );
};

export default StyledModal;
