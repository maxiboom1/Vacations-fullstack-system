import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

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

const theme = createTheme();

function Register(): JSX.Element {
    
    const {register, handleSubmit} = useForm<UserModel>();
    
    const navigate = useNavigate();

    async function send(user: UserModel){ 
        
        try{ 
            await authService.register(user); // don't forget await! it will cause uncaught in promise err 
            notifyService.success("Welcome, " + authStore.getState().user.firstName);
            navigate("/home");
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
                        
                        <Typography component="h1" variant="h5">Register</Typography>
                        
                        <Box component="form" onSubmit={handleSubmit(send)} noValidate sx={{ mt: 1 }}>
                        
                            <TextField margin="dense" required fullWidth label="First name"{...register("firstName")} autoComplete="First name" autoFocus />
                            
                            <TextField margin="dense" required fullWidth label="Last name" {...register("lastName")} autoComplete="Last name" autoFocus />

                            <TextField margin="normal" required fullWidth label="Email" {...register("email")} autoComplete="current-password"/>

                            <TextField margin="normal" required fullWidth label="Password" {...register("password")} type="password" autoComplete="current-password"/>

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
                            
                            <Link href="/login" variant="body2"> Have an account? Login! </Link>
                        
                        </Box>

                    </Box>

                    </Container>

            </ThemeProvider>

        </div>
    );
}

export default Register;


