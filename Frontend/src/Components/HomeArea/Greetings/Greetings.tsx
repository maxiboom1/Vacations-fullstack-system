import "./Greetings.css";
import img from "../../../Assets/Images/home-image1.jpg"
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { useEffect } from "react";


function Greetings(): JSX.Element {
        
    const navigate = useNavigate();
    
    // If token exists, redirect to home
    useEffect(()=>{
        
        if(authStore.getState().token !== null) {
            navigate("/home")
        };

    },[]);



    return (
        
        <div className="Greetings container mt-5 ">
            
            <div className="welcome">
                <img src={img} alt=""/>
                <div className="centered ">  
                    <h1>Welcome to vacation Express </h1>
                    <br />
                    <h3>Are you ready to your next vacation?</h3>   
                </div> 
            </div>

            <div className="bottomTab">
                <p>Welcome to Paradise Getaways! 
                Discover your dream vacation with us. From serene beaches to thrilling adventures,
                we have it all. Unwind, explore, and indulge in unforgettable experiences. 
                 Let us turn your travel dreams into reality. Book now and create memories that last a lifetime.</p>
            </div>
            
        </div>
    );
}

export default Greetings;
