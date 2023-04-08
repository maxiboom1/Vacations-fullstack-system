import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

export class AuthState {
    
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if(this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user; // Extract user from token.
        }
    }
}

