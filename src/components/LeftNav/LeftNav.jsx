import { Box } from '@mui/material';
import React from 'react';

const LeftNav = () => {
  return (
    <Box
      flex={2}
      bgcolor='red'
      sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
    >
      LeftNav
    </Box>
  );
};

export default LeftNav;
