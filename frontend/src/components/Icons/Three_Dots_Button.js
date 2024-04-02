import * as React from 'react';
import PropTypes from 'prop-types';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Three_Dots_Button({ onSave, onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSave = (event) => {
    event.preventDefault();
    handleClose();
    onSave(event);
  };

  const handleClickDelete = (event) => {
    event.preventDefault();
    handleClose();
    onDelete(event);
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton aria-label="Example" onClick={handleClick}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickSave}>Save</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
      </Menu>
    </Stack>
  );
}