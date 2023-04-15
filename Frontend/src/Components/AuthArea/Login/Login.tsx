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

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className='login'>
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        
        <CssBaseline />
        
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
          
          <Typography component="h1" variant="h5">Login</Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="dense" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login </Button>
            <Link href="#" variant="body2"> Don't have an account? Sign Up </Link>
          </Box>

        </Box>

      </Container>

    </ThemeProvider>
    </div>
  );
}





/*import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Login.css";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";

function Login(): JSX.Element {
    
    const {register, handleSubmit} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel){ 
        
        try{ 
            await authService.login(credentials);
            notifyService.success("Welcome Back, " + authStore.getState().user.firstName);
            navigate("/home");
        }catch(e:any){
            notifyService.error(e);
        }

    }

    
    return (
        
        <div className="Login">
			    <form onSubmit={handleSubmit(send)}> 

                <label>Email:</label>
                <input type="text" {...register("email")} required minLength={5} maxLength={50} />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={2} />

                <button>Login</button>

            </form>
        </div>

    );
}

export default Login;
*/

