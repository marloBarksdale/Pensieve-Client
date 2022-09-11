import { CameraAlt, Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';

const ImageUpload = ({ imageUrl, file, setFile }) => {
  const [originalFile, setOriginal] = useState(imageUrl);
  const changeImage = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <Grid
      width={'100%'}
      display='flex'
      gap={1}
      item
      justifyContent={'center'}
      flexDirection='column'
    >
      <Box justifyContent={'center'} display='flex'>
        <Button
          variant='contained'
          component='label'
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <CameraAlt /> Select Image
          <input type='file' hidden onChange={changeImage} />
        </Button>
      </Box>

      <Box
        component={Container}
        position={'relative'}
        disableGutters
        sx={{ width: { xs: '100%', md: '60%' } }}
      >
        <CardMedia
          component='img'
          sx={{ maxHeight: '300px' }}
          src={
            (file && URL.createObjectURL(file)) ||
            (originalFile && originalFile)
          }
        />
        {file && (
          <IconButton
            sx={{ margin: '1rem', position: 'absolute', top: 0, right: 0 }}
            onClick={() => setFile(null)}
          >
            {' '}
            <Clear color='error' />
          </IconButton>
        )}
      </Box>
    </Grid>
  );
};

export default ImageUpload;
