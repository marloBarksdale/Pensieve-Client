import {
  ChatBubble,
  Coronavirus,
  Mail,
  Notifications,
} from '@mui/icons-material';
import { Avatar, Badge, Box, Button, Toolbar, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../api';
import {
  clearUser,
  selectToken,
  selectUser,
} from '../../features/users/userSlice';
import { StyledAppBar } from './styles';

const Navbar = () => {
  const user = useSelector((state) => selectUser(state));
  const token = useSelector((state) => selectToken(state));
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
  };
  useEffect(() => {
    (async () => {
      if (token) {
        if (jwtDecode(token).exp * 1000 < new Date().getTime()) {
          logout();
          dispatch(clearUser());
        }
      }
    })();
  }, [token]);

  return (
    <StyledAppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant='h2'
          component='a'
          href='/'
          sx={{
            mr: 2,
            display: { xs: 'none', sm: 'flex' },

            letterSpacing: '.6rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Pensieve{' '}
        </Typography>
        <Coronavirus sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}{' '}
          <Badge badgeContent={4} color='error'>
            <ChatBubble />
          </Badge>
          <Badge>
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: '30px', height: '30px' }}
            // onClick={() => setOpen((prev) => !prev)}
          />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
