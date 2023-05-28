import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
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
    
    // formState: { errors } used by MUI to print validation errors on form UI.
    const {register, handleSubmit, formState: { errors }} = useForm<UserModel>();

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
                        
                            <TextField 
                                margin="dense" 
                                fullWidth 
                                label="First name"   
                                {...register("firstName", {
                                    required: "First name is required",
                                    minLength: {value: 2, message: "First name must be at least 2 characters long"},
                                    maxLength: {value: 30, message: "First name must not exceed 30 characters long"},
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "First name must contain only letters",
                                    }
                                    
                                })}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName?.message} 
                                autoComplete="First name" 
                                autoFocus 
                            />
                            
                            <TextField 
                                margin="dense" 
                                fullWidth 
                                label="Last name" 
                                {...register("lastName", { 
                                    required: "Last name is required", 
                                    minLength: {value: 2, message: "Last name must be at least 2 characters long"},
                                    maxLength: {value: 30, message: "Last name must not exceed 30 characters long"},
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "First name must contain only letters",
                                    }
                                })} 
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message} 
                                autoComplete="Last name" 
                            />

                            <TextField 
                                margin="normal" 
                                fullWidth 
                                label="Email" 
                                {...register("email", { 
                                    required: "Email is required",
                                    minLength: {value: 5, message: "Email must be at least 5 characters long"},
                                    maxLength: {value: 50, message: "Email must not exceed 50 characters long"},
                                    pattern: { 
                                    value: /^\S+@\S+\.\S+$/, 
                                    message: "Invalid email address"
                                    } 
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message} 
                            />

                            <TextField 
                                margin="normal" 
                                fullWidth 
                                type="password" 
                                label="Password" 
                                {...register("password", { 
                                    required: "Password is required", 
                                    minLength: {value:4, message:"Password must be at least 4 symbols"},
                                    maxLength: {value: 30, message: "Password must not exceed 30 characters long"},
                                })} 
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message} 
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
                            
                            <NavLink to={"/login"}> Have an account? Login! </NavLink>

                        </Box>

                    </Box>

                </Container>

            </ThemeProvider>

        </div>
    );
}

export default Register;


