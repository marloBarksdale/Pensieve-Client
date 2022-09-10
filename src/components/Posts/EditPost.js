import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEditPostsMutation } from '../../api';
import { setOpenModal } from '../../features/posts/postsSlice';
import StyledModal from '../StyledModal';
import ImageUpload from './ImageUpload';

const EditPost = (post) => {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const navigate = useNavigate();
  const [editPost, { isLoading }] = useEditPostsMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = await editPost({ id: post._id, title, text }).unwrap();

      if (payload.author) {
        dispatch(setOpenModal(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledModal>
      <Typography variant='h5' textAlign={'center'}>
        Say something...
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='title'
              variant='standard'
              label='Title'
              fullWidth
              autoFocus={true}
              required
              value={title}
              onChange={(e) => setTitle(() => e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='text'
              label='Text'
              minRows={5}
              multiline
              maxRows={10}
              fullWidth
              variant='outlined'
              value={text}
              onChange={(e) => setText(() => e.target.value)}
            />
          </Grid>
          {post.image && <ImageUpload imageUrl={post.image.imageUrl} />}
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent={'center'}
            flexDirection='column'
            alignItems={'center'}
            gap={2}
          >
            {isLoading ? (
              <>
                <CircularProgress />
                <Typography variant='subtitle1'>Adding Post....</Typography>
              </>
            ) : (
              <Button
                type='submit'
                fullWidth
                sx={{ marginTop: 3 }}
                variant='outlined'
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </StyledModal>
  );
};

export default EditPost;
