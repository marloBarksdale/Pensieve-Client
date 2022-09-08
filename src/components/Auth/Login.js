import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api';
import { setUser } from '../../features/users/userSlice';

const Login = () => {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [login, { isLoading, data }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const payload = await login({ email, password }).unwrap();

      if (payload.user) {
        dispatch(setUser(payload));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant='h5' textAlign={'center'}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='email'
              variant='standard'
              label='Email'
              fullWidth
              required
              inputRef={emailRef}
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
              inputRef={passwordRef}
            />
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <>
                <CircularProgress />
                <Typography variant='subtitle1'>Signing in....</Typography>
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
    </>
  );
};

export default Login;
