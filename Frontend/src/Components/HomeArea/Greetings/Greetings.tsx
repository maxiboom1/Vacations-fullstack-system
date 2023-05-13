import "./Greetings.css";
import img from "../../../Assets/Images/home-image1.jpg"
import {  Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { useEffect } from "react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function Greetings(): JSX.Element {
        
    const navigate = useNavigate();
    
    // If token exists, redirect to home
    useEffect(()=>{
        
        if(authStore.getState().token !== null) {
            navigate("/home")
        };

    },[]);
    
    function srcset(image: string, size: number, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
      }


    
      
    const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },


    ];
    return (
        
        <div className="Greetings">
            
            <div className="welcome">
                <img src={img} alt="" />
                <Container className= "centered" sx={{color:"AppWorkspace", position:"absolute"}}>
                    
                    <h2>Welcome to vacation Express </h2>
                    <h4>Are you ready to your next vacation?</h4>   
 
                </Container> 
            </div>
          
            <div className="collage">
                <ImageList sx={{ width: "100%", heigth:"100%"}} variant="quilted" cols={4} rowHeight={121}>
                    
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))}

                </ImageList>
            </div>
        </div>
    );
}

export default Greetings;
