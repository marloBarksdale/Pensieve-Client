import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api';
import ImageUpload from '../Posts/ImageUpload';

const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const first_name = firstNameRef.current.value;
    const last_name = lastNameRef.current.value;

    try {
      const payload = await signup({
        email,
        password,
        first_name,
        last_name,
      }).unwrap();

      if (payload.user) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant='h5' textAlign={'center'}>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name='first_name'
              variant='standard'
              label='First Name'
              fullWidth
              required
              inputRef={firstNameRef}
            />
          </Grid>{' '}
          <Grid item xs={12} sm={6}>
            <TextField
              name='last_name'
              variant='standard'
              label='Last Name'
              fullWidth
              required
              inputRef={lastNameRef}
            />
          </Grid>{' '}
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
          <ImageUpload file={file} setFile={setFile} />
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

export default Signup;
