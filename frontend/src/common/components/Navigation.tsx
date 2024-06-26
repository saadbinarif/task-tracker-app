import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Typography, IconButton, Button, MenuItem, ListItemIcon, Menu, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FilterAlt, Logout, Dashboard, ArrowBack, Notifications, AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../hooks/useAuth"





const Navigation: React.FC = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();
  const AuthToken = useSelector((state: any) => state.auth.AuthToken)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false); //to open and close sidebar

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    setDrawerOpen(false);

  }

  

  //styles
  const backgroundColor = AuthToken ? '#1aac83' : '#ffffff';
  const color = AuthToken ? '' : '#1aac83'

  return (
    <>
      <div className='bg-[#1aac83]'>
        <AppBar position="static" sx={{ backgroundColor, color }}>
          <Toolbar>

            <div className='flex justify-between container'>
              <div className='flex gap-1 items-center'>
                {AuthToken && <IconButton edge="start" color="inherit" onClick={()=>setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>}
                <Typography variant="h6" component="div">
                  <span className=' font-bold text-3xl'>Task Tracker</span>
                </Typography>

              </div>

              {
                !AuthToken ?
                  (
                    <div className='flex gap-2 items-center'>
                      <p className='cursor-pointer hover:text-black' onClick={() => navigate('/signup')}>Signup</p>
                      <p className='cursor-pointer hover:text-black' onClick={() => navigate('/signin')}>Login</p>
                    </div>
                  )
                  : (
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={anchorEl ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <AccountCircle sx={{ color: 'white' }} />
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
                        <MenuItem onClick={handleLogout} sx={{ textAlign: 'left' }}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  )
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {
        AuthToken && <div>
          <Drawer
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            onClose={()=>setDrawerOpen(false)}
          >
            {/* <Typography sx={{textAlign:'right', my:'15px', mx:"10px", fontWeight:'800', cursor:'pointer' }} onClick={handleDrawerToggle}> &lt;</Typography> */}
            <Box sx={{ textAlign: 'right', my: '20px' }}>
              <ArrowBack onClick={()=>setDrawerOpen(false)} />
            </Box>
            <hr />
            <List>
              <ListItemButton onClick={()=>navigate('/dashboard')}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>

              <ListItemButton onClick={()=>navigate('/taskpage')}>
                <ListItemIcon>
                  <FilterAlt />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </List>
          </Drawer>
        </div>
      }
    </>
  )
}

export default Navigation