import { Button, Container, Divider } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  }, [signUp, navigate]);

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
