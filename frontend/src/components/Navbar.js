import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Navbar(props) {
  const {drawerWidth, content} = props
  const location = useLocation()
  const path = location.pathname

  const [open, setOpen] = React.useState(true);

  const changeOpenStatus = () => {
    setOpen(!open)
  }

  const myDrawer = (
    <div>
         <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
        
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/" selected={"/" === path}>
                <ListItemIcon>
                        <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                <ListItemIcon>
                        <PaidIcon/>
                </ListItemIcon>
                <ListItemText primary={"Expense Chart"} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                <ListItemIcon>
                        <BorderColorIcon/>
                </ListItemIcon>
                <ListItemText primary={"Create"} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component={Link} to="/budget-calendar" selected={"/budget-calendar" === path}>
                <ListItemIcon>
                        <CalendarMonthIcon/>
                </ListItemIcon>
                <ListItemText primary={"Budget Calendar"} />
                </ListItemButton>
            </ListItem>

        </List>
        
        </Box>

    </div>

  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,bgcolor: 'black'}}>
        <Toolbar>

          <IconButton 
                color = "inherit"
                onClick={changeOpenStatus}
                sx={{mr:2}}
                >
                <MenuIcon/>
          </IconButton>
       
          <Typography variant="h6" noWrap component="div">
            Our application
          </Typography>
        </Toolbar>
      </AppBar>

        <Drawer
            variant="permanent"
            open={open}
            sx={{
            display: {xs: open ? "block" : "none", sm: open ? "block" : "none"},
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              transition: 'width 1s' // Add this line
            },
            }}
            >

            {myDrawer}

        </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

            {content}
    
      </Box>
    </Box>
  );
}