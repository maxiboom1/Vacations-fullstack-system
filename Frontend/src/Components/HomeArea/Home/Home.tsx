import "./Home.css";
import img from "../../../Assets/Images/home-image1.jpg"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import NightlifeIcon from '@mui/icons-material/Nightlife';

function Home(): JSX.Element {
    
    return (
        <div className="Home">

            <Box>
                <AppBar sx={{ borderRadius: 3, color:"AppWorkspace", mt:0.5}}>
                 <Toolbar>   
                <Grid container spacing={2}>
                    <Grid item xs={2}> 
                    <NightlifeIcon sx={{ display: { md: 'flex' }, mt: 0.5 }} />
                    </Grid>
                    <Grid item xs={8}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily:"cursive", color:"AppWorkspace"}}>Vacation Mania</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Button sx={{ fontFamily:"cursive", color:"AppWorkspace", ml:10}} >Login</Button>
                    <Button sx={{ fontFamily:"cursive", color:"AppWorkspace"}} >Register</Button>
                    </Grid>
                </Grid>
                </Toolbar>
                </AppBar>
			
            </Box>
            
            <div className="greetings">
                <img src={img} alt="" />
                <Container className= "centered" sx={{fontFamily:"cursive", color:"AppWorkspace", position:"absolute"}}>
                    
                    <h2>Welcome to vacation mania web site! </h2>
                    <h5>Are you ready to your next vacation?</h5>
                    <h2>Log in to start</h2>
                    
                </Container>
            </div>

        </div>
    );
}

export default Home;
