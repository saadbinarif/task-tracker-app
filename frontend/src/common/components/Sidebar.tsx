import React from 'react';
import { AppBar, Box, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Dashboard} from '@mui/icons-material'; 
import CallIcon from '@mui/icons-material/Call';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Navbar from './Navbar';


const Sidebar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        {/* <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              My App
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Navbar />
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
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
              <ListItemText primary="Contact" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary="Subscription" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Add your main content here */}
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;