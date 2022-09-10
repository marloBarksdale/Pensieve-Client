import { Box, CardMedia, Grid } from '@mui/material';
import React, { useState } from 'react';

const ImageUpload = ({ imageUrl }) => {
  const [file, setFile] = useState(imageUrl.toString() || null);
  console.log(file);
  return (
    <Grid width={'100%'} display='flex' item justifyContent={'center'}>
      <Box>
        {' '}
        <CardMedia
          component='img'
          sx={{ maxHeight: '300px' }}
          src={file && file}
          image={file}
        />
      </Box>
    </Grid>
  );
};

export default ImageUpload;
