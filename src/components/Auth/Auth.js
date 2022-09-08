import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api';
import { setUser } from '../../features/users/userSlice';
import { StyledPaper } from './styles';

const Auth = () => {
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (signUp) {
      navigate('/signup');
    } else {
      navigate('/');
    }
  }, [signUp]);

  return (
    <Container maxWidth='xs'>
      <StyledPaper>
        <Outlet />
        <Divider flexItem variant='fullWidth'>
          {signUp ? 'Already have an account?' : "Don't have an account?"}
        </Divider>
        <Button
          onClick={() => {
            setSignUp((prev) => !prev);
          }}
          color='secondary'
          variant='contained'
        >
          {signUp ? 'Login' : 'Create new account'}
        </Button>
      </StyledPaper>
    </Container>
  );
};

export default Auth;
