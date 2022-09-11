import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const MenuPopupState = ({ Icon, menuItems, popupState }) => {
  const handleClose = () => {
    popupState.close();
  };

  return (
    <div>
      <IconButton {...bindTrigger(popupState)}>{Icon}</IconButton>

      <Menu {...bindMenu(popupState)}>{menuItems}</Menu>
    </div>
  );
};

export default MenuPopupState;
