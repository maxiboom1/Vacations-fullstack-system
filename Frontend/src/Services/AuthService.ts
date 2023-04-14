import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";


class AuthService{

    // Register - send user to register URL, get token and store it in authState
    public async register(user: UserModel): Promise<void>{
        
        const response = await axios.post<string>(appConfig.registerURL, user);

        const token = response.data;

        authStore.dispatch({type: AuthActionType.Register, payload: token});

    }

    // Login - send credentials to login URL, get token and store it in authState
    public async login(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(appConfig.loginURL, credentials);

        const token = response.data;

        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout - delete token from authState
    public logout(): void {
        
        authStore.dispatch({ type:AuthActionType.Logout });

    }

}

const authService = new AuthService();

export default authService;