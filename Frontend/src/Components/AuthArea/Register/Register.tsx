import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

function Register(): JSX.Element {
    
    const {register, handleSubmit} = useForm<UserModel>();
    
    const navigate = useNavigate();

    async function send(user: UserModel){ 
        
        try{ 
            await authService.register(user); // don't forget  await! it will cause  uncaught in promise err 
            notifyService.success("Welcome, " + authStore.getState().user.firstName);
            navigate("/home");
        }catch(e:any){
            notifyService.error(e);
        }

    }
    
    return (
        <div className="Register">
				
                <form onSubmit={handleSubmit(send)}> 

                    <label>First name:</label>
                    <input type="text" {...register("firstName")} required minLength={0} maxLength={50} />
                    <br />
                    <label>Last name:</label>
                    <input type="text" {...register("lastName")} required minLength={0} maxLength={50} />
                    <br />
                    <label>Email:</label>
                    <input type="text" {...register("email")} required minLength={0} maxLength={50} />
                    <br />
                    <label>Password:</label>
                    <input type="password" {...register("password")} required minLength={0} maxLength={50} />
                    <br />
                    <button>Register</button>

            </form>

        </div>
    );
}

export default Register;


