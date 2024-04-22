import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, MenuItem, ListItemIcon, Menu } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { Box, Drawer, List, ListItem, ListItemButton,  ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Dashboard} from '@mui/icons-material'; 
import CallIcon from '@mui/icons-material/Call';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';



const Navbar: React.FC = ()=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#f1f1f1' }}>
      <Toolbar>
     
        <div className='flex justify-between container'>
        <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
          <MenuIcon sx={{color:'black'}}/>
      </IconButton>
        <Typography variant="h6" component="div">
          <span className='text-black'>Task Tracker</span>
        </Typography>
        <div>
          <Button
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
            onClick={handleClick}
          >
            Logout
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose} sx={{textAlign:'left'}}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
        </div>
      </Toolbar>
    </AppBar>   
    <Drawer
    variant="persistent"
    anchor="left"
    open={drawerOpen}
    onClose={handleDrawerToggle}
  >
    <Typography sx={{textAlign:'right', my:'15px', mx:"10px", fontWeight:'800', cursor:'pointer' }} onClick={handleDrawerToggle}> &lt;</Typography>
    <List>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <CallIcon />
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SubscriptionsIcon />
        </ListItemIcon>
        <ListItemText primary="Filters" />
      </ListItemButton>
    </List>
  </Drawer>
  </>
  )
}

 export default Navbar