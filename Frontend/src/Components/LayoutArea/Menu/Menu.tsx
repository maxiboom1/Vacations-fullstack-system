import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { AuthActionType, authStore } from "../../../Redux/AuthState";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from "../../../Assets/Logo/logo-dark.png";

function Menu(): JSX.Element {
    
    const navigate = useNavigate();

    function logout(){
        authStore.dispatch({type:AuthActionType.Logout});
        navigate("/greetings");
    }
    return (    
        
        <div className="Menu">
           <Box>
                <AppBar sx={{ color:"red" }}>
                 <Toolbar className="menuBox" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>   
                    
                        <img className="navbarLogo" src={logo}/>
                        <Button sx={{ color:"white" }} onClick={logout}>Logout</Button>
                   
                </Toolbar>
                </AppBar>
			
            </Box>
        </div>
        
    );
}

export default Menu;
