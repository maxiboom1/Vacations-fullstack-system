import "./Greetings.css";
import img from "../../../Assets/Images/home-image1.jpg"
import Button from '@mui/material/Button';
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

function Greetings(): JSX.Element {
    
    const navigate = useNavigate();
    
    if(authStore.getState().token = null) {navigate("/home")};
    
    return (
        
        <div className="Greetings">
            
            <div className="welcome">
                <img src={img} alt="" />
                <Container className= "centered" sx={{fontFamily:"cursive", color:"AppWorkspace", position:"absolute"}}>
                    <h2>Welcome to vacation mania web site! </h2>
                    <h4>Are you ready to your next vacation?</h4>
                    <div className="authButtons">
                        <Button variant="contained" color="success" sx={{width: 200}} onClick={() => navigate("/login")}>Login</Button>
                        <Button variant="contained" color="primary" sx={{width: 200}} onClick={() => navigate("/register")}>Register</Button> 
                    </div>                   
                </Container> 
            </div>
            
            <div>
                <h1 className="collageGallery">asd</h1>
            </div>
        </div>
    );
}

export default Greetings;
