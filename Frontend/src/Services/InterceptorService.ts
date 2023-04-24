import axios from "axios";
import { AuthActionType, authStore } from "../Redux/AuthState";

class InterceptorService {

    public create(): void {

        // Token insert to any request:
        axios.interceptors.request.use(requestObject => {

            // If we have a token: 
            if(authStore.getState().token) {
                requestObject.headers['Authorization'] = "Bearer " + authStore.getState().token;
            }

            // Return the updated request object:
            return requestObject;
        });

        // Token refresh:
        axios.interceptors.response.use(responseObject => {
            
            //Here we catch Authorization header with fresh token:
            if(responseObject.headers['Authorization']){
                console.log('We got NEW token on client!');
                //  Get new token from header: 
                const refreshedToken = responseObject.headers['Authorization'].substring(7);
                
                // Store new token:
                authStore.dispatch({ type: AuthActionType.Refresh, payload: refreshedToken });

            }

            return responseObject;
        });

    }
}

const interceptorService = new InterceptorService();

export default interceptorService;
