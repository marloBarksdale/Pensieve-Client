import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const Login = () => {
  return (
    <>
      <Typography variant='h5' textAlign={'center'}>
        Login
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='email'
              variant='standard'
              label='Email'
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='password'
              type='password'
              label='Password'
              fullWidth
              variant='standard'
              required
            />
          </Grid>

          <Button type='submit' fullWidth>
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default Login;
