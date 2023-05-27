import "./Greetings.css";
import img from "../../../Assets/Images/home-image1.jpg";

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MouseIcon from '@mui/icons-material/Mouse';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { useEffect } from "react";
import { Link } from "@mui/material";


function Greetings(): JSX.Element {
        
    const navigate = useNavigate();
    
    // If token exists, redirect to home
    useEffect(()=>{
        
        if(authStore.getState().token !== null) {
            navigate("/home")
        };

    },[]);



    return (
        
        <div className="Greetings ">
            
            <div className="welcome">
                <img src={img} alt=""/>
                <div className="centered ">  
                    <h1>Welcome to vacation Express </h1>
                    <br />
                    <h3>Are you ready to your next vacation?</h3>   
                </div> 
            </div>

            <div className="bottomTab">

                <div>
                    <MouseIcon style={{ fontSize: '40px', marginBottom: '10px' }} className="icon1" ></MouseIcon>
                    <h3>Choose vacation in 3 clicks</h3>
                    <p>Welcome to Paradise Getaways! 
                        Discover your dream vacation with us. From serene beaches to thrilling adventures,
                        we have it all. Unwind, explore, and indulge in unforgettable experiences. 
                        Let us turn your travel dreams into reality. Book now and create memories that last a lifetime.
                    </p>
                </div>   


                <div>
                    <PublishedWithChangesIcon style={{ fontSize: '40px', marginBottom: '10px' }} className="icon1" ></PublishedWithChangesIcon>
                    <h3>Change your mind?</h3>
                    <p>Our cancellation policy is designed to provide flexibility and peace of mind. We understand that plans can change. 
                        Rest assured, we offer flexible cancellation options to accommodate unexpected circumstances. 
                        Refer to our cancellation policy for more details on how to modify or cancel your booking.
                    </p>
                </div>   
                
                <div>
                    <SupportAgentIcon style={{ fontSize: '40px', marginBottom: '10px' }} className="icon1"></SupportAgentIcon>
                    <h3>We are here!</h3>
                    <p>Experience our exceptional service. We are here to assist you every step of the way. 
                        Contact us for any inquiries, support, or assistance you may need during your vacation planning. 
                        Our dedicated team is committed to ensuring your travel experience is seamless and memorable.
                    </p>
                </div> 
                    

             
                
            </div>
        <br /><br />
        <Link href="https://github.com/maxiboom1" style={{ fontSize: "16px" }} variant="body2"> Created By Alex. </Link>
        <br />
        </div>
    );
}

export default Greetings;
