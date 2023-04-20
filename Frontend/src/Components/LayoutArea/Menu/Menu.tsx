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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Props {
  window?: () => Window;
}

function Menu(props: Props):JSX.Element {
  const drawerWidth = 340;
  const navItems = ["Login", "Logout", "About"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Function exp => Toggles open/close drawer
  const handleDrawerToggle = () => {setMobileOpen((prevState) => !prevState);}; 

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ my: 2 }}>MUI</Typography>
      <Divider />
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding> 
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          
          {/* Hamburger Icon on small resolutions */}
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />{" "}
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } } } >
            MUI
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        {" "}
        <Toolbar />{" "}
      </Box>
    </Box>
  );
}

export default Menu;



// import { useNavigate } from "react-router-dom";
// import "./Menu.css";
// import { AuthActionType, authStore } from "../../../Redux/AuthState";
// import Button from '@mui/material/Button';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import logo from "../../../Assets/Logo/logo-dark.png";

// function Menu(): JSX.Element {
    
//     const navigate = useNavigate();
//     function logout(){
//         authStore.dispatch({type:AuthActionType.Logout});
//         navigate("/greetings");
//     }
//     return (    
        
//         <div className="Menu">
//            <Box>
//                 <AppBar sx={{ color:"red" }}>
//                  <Toolbar className="menuBox">   
                    
//                         <img className="navbarLogo" src={logo}/>
//                         <Button variant="text" sx={{ color:"white",fontSize: "16px" }} onClick={logout}>Logout</Button>
                   
//                 </Toolbar>
//                 </AppBar>
			
//             </Box>
//         </div>
        
//     );
// }

// export default Menu;
