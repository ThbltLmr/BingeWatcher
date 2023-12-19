import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { logout } from '../services/authService';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const [auth, setAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth(false);
    }
  }, [])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

  const handleCloseLogout = () => {
    handleClose();
    logout();
    navigate("/");
    setAuth(false);
  };

  const navBarlogout = () => {
    logout();
    navigate("/");
    setAuth(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Link to="/"><MenuItem onClick={handleClose}>Home</MenuItem></Link>
            <Link to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
            <Link to="/shows"><MenuItem onClick={handleClose}>My shows</MenuItem></Link>
            {auth &&
            <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>}
            {!auth &&
            <Link to="/login"><MenuItem onClick={handleClose}>Login</MenuItem></Link>}
          </Menu>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            BingeWatcher
          </Typography>
          {auth &&
          <Button size="large" color="inherit" onClick={navBarlogout}>Logout</Button>
          }
          {!auth &&
          <Link to="/login"><Button size="large" color="inherit">Login</Button></Link>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
