import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddPostMutation } from '../../api';
import StyledModal from '../StyledModal';
import ImageUpload from './ImageUpload';

const AddPost = () => {
  const textRef = useRef();
  const titleRef = useRef();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [addPost, { isLoading }] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const text = textRef.current.value;

    const formData = new FormData();

    if (file) {
      formData.append('image', file);
    }

    formData.append('title', title);
    formData.append('text', text);

    try {
      const payload = await addPost(formData).unwrap();

      if (payload.author) {
        navigate('/');
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
              inputRef={titleRef}
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
              inputRef={textRef}
            />
          </Grid>
          <ImageUpload setFile={setFile} file={file} />
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

export default AddPost;
