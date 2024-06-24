import { Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu'

interface HeaderProps {
  onLogout: () => void;
  onSidebarOpen: () => void;
  isSidebarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onLogout, onSidebarOpen, isSidebarOpen }) => {
  return (
    <header className='flex items-center justify-between text-white bg-gray-800 p-4 shadow-md'>
      <IconButton
        edge="start"
        color='inherit'
        aria-label='menu'
        onClick={onSidebarOpen}
        className={`mr-4 ${isSidebarOpen ? 'hidden' : ''}`}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6'>
        My Application
      </Typography>

      <Button onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
};

export default Header;