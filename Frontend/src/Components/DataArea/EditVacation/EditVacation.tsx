import "./EditVacation.css";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VacationModel from "../../../Models/VacationsModel";
import { Grid } from "@mui/material";

const theme = createTheme();

function EditVacation(): JSX.Element {
    
    const {register, handleSubmit} = useForm<VacationModel>();
    
    async function send(vacation: VacationModel){ 
        
        try{ 
            //... send edited vacation to the service
        }catch(e:any){
            notifyService.error(e);
        }

    }
    
    return (
        <div className="Register">
				
            <ThemeProvider theme={theme}>
        
                <Container component="main" maxWidth="xs">
        
                    <CssBaseline />
            
                    <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                        
                        <Typography component="h1" variant="h5">Edit Vacation</Typography>
                        
                        <Box component="form" onSubmit={handleSubmit(send)} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            
                            <Grid item xs={12}>
                            <TextField margin="dense" required fullWidth label="Destination"{...register("destination")} autoComplete="Destination" autoFocus />
                            </Grid>

                            <Grid item xs={12}>
                            <TextField margin="dense" required fullWidth label="Price"{...register("price")} autoComplete="Price" autoFocus />
                            </Grid>

                            <Grid item xs={12}>
                            <TextField margin="dense" required multiline fullWidth label="Description" {...register("description")} autoComplete="Description" autoFocus />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <span>Start date:</span>
                                <TextField type="date" margin="normal" required fullWidth {...register("startDate")} />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}> 
                                <span>End date:</span>  
                                <TextField type="date" margin="normal" required fullWidth {...register("endDate")} />
                            </Grid>
                            
                            <Grid item xs={12}>   
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Edit</Button>
                            </Grid>
                            
                            <Grid item xs={12}>   
                            <Link href="/login" variant="body2"> What should we place here? </Link>
                            </Grid>

                        </Grid>
                        </Box>

                    </Box>

                    </Container>

            </ThemeProvider>

        </div>
    );
}


export default EditVacation;


