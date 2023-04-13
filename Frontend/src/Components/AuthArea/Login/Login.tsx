import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Login.css";
import axios from "axios";
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
