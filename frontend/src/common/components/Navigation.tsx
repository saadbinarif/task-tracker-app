import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, MenuItem, ListItemIcon, Menu, Box, Drawer, List, ListItem, ListItemButton,  ListItemText } from '@mui/material';
import { FilterAlt, Logout, Dashboard, ArrowBack, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';





const Navigation: React.FC = ()=>{
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
    <div>
    <AppBar position="static" sx={{ backgroundColor: '#1aac83' }}>
      <Toolbar>
     
        <div className='flex justify-between container'>
        <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
          <MenuIcon />
      </IconButton>
        <Typography variant="h6" component="div">
          <span className='text-white font-bold text-3xl'>Task Tracker</span>
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
    </div>  
    <div>
    <Drawer
    variant="persistent"
    anchor="left"
    open={drawerOpen}
    onClose={handleDrawerToggle}
  >
    {/* <Typography sx={{textAlign:'right', my:'15px', mx:"10px", fontWeight:'800', cursor:'pointer' }} onClick={handleDrawerToggle}> &lt;</Typography> */}
    <Box sx={{textAlign:'right', my:'20px'}}>
      <ArrowBack onClick={handleDrawerToggle}/>
    </Box>
    <hr />
    <List>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Notifications />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <FilterAlt />
        </ListItemIcon>
        <ListItemText primary="Filters" />
      </ListItemButton>
    </List>
  </Drawer>
  </div>
  </>
  )
}

 export default Navigation