import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useLoginMutation } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/users/userSlice';

export default function InputWithIcon() {
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
    <form onSubmit={handleSubmit}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <FormControl variant='standard'>
          <InputLabel htmlFor='input-with-icon-adornment'>Email</InputLabel>
          <Input
            id='input-with-icon-adornment'
            startAdornment={
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            }
            inputRef={emailRef}
          />
        </FormControl>

        <FormControl variant='standard'>
          <InputLabel htmlFor='input-with-icon-adornment'>Password</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            }
            type='password'
            inputRef={passwordRef}
          />
        </FormControl>
      </Box>
      <Button type='submit' variant='contained'>
        Sumbit
      </Button>
    </form>
  );
}
