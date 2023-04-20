import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from "../../../Assets/Logo/logo-dark.png";
import { useNavigate } from 'react-router-dom';
import { AuthActionType, authStore } from '../../../Redux/AuthState';

interface Props {
  window?: () => Window;
}

function Menu(props: Props):JSX.Element {
  
  enum MenuItems {LOGIN = "Login", LOGOUT = "Logout", ABOUT = "About"};
  const navigate = useNavigate();
  
  // Drawer config --------------------------------------------------------------------
  const drawerWidth = 340;
  const navItems: MenuItems[] = [MenuItems.LOGIN, MenuItems.LOGOUT, MenuItems.ABOUT];  const { window } = props; // We secure the values with enum, so nobody will run here not valid values..
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {setMobileOpen((prevState) => !prevState);}; 
  const container = window !== undefined ? () => window().document.body : undefined;

  // Menu events ---------------------------------------------------------------------- 
  const menuEvents = {
    login: () => navigate("/login"),
    logout: ()=> {
      authStore.dispatch({type:AuthActionType.Logout});
      navigate("/greetings");
    },
    about: ()=> alert('About in dev now... try later'),

  }
  
  const handleMenuClick = (event:string) => {menuEvents[event.toLowerCase() as keyof typeof menuEvents]()}

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          
          {/* Hamburger Icon on small resolutions */}
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />{" "}
          </IconButton>

          {/* Site Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <img width={270} src={logo} alt="Logo" />
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }} onClick={()=> handleMenuClick(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },}}>
        
        {/* Drawer HTML */}
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          {/* Site Logo */}
          <Box sx={{ my: 1 }}><img width={270} src={logo} alt="Logo" /></Box>      
          <Divider />
          <List>{navItems.map((item) => (
            <ListItem key={item} disablePadding> 
              <ListItemButton sx={{ textAlign: "center" }} onClick={()=> handleMenuClick(item)} ><ListItemText primary={item}  /> </ListItemButton> 
            </ListItem> ))}
          </List>
        </Box>
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>{" "}<Toolbar />{" "}</Box>
    </Box>
  );
}

export default Menu;
