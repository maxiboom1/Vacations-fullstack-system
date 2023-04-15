import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { AuthActionType, authStore } from "../../../Redux/AuthState";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Menu(): JSX.Element {
    
    const navigate = useNavigate();

    function logout(){
        authStore.dispatch({type:AuthActionType.Logout});
        navigate("/greetings");
    }
    return (    
        
        <div className="Menu">
           <Box>
                <AppBar sx={{ color:"AppWorkspace" }}>
                 <Toolbar>   
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily:"cursive", color:"AppWorkspace"}}>Vacation Mania</Typography>
                </Toolbar>
                </AppBar>
			
            </Box>
        </div>
        
    );
}

export default Menu;
