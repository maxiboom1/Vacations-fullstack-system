import "./Greetings.css";
import img from "../../../Assets/Images/home-image1.jpg"
import {  Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

function Greetings(): JSX.Element {
    
    const navigate = useNavigate();
    
    if(authStore.getState().token = null) {navigate("/home")};
    
    return (
        
        <div className="Greetings">
            
            <div className="welcome">
                <img src={img} alt="" />
                <Container className= "centered" sx={{color:"AppWorkspace", position:"absolute"}}>
                    
                    <h2>Welcome to vacation Express </h2>
                    <h4>Are you ready to your next vacation?</h4>   
 
                </Container> 
            </div>
          
        </div>
    );
}

export default Greetings;
