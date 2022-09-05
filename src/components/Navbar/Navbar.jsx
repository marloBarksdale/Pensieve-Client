import {
  ChatBubble,
  Coronavirus,
  Mail,
  Notifications,
} from '@mui/icons-material';
import { Avatar, Badge, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { StyledAppBar } from './styles';

const Navbar = () => {
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
          {' '}
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
