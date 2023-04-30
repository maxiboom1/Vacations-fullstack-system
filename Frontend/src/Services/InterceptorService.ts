import axios from "axios";
import { AuthActionType, authStore } from "../Redux/AuthState";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

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
        axios.interceptors.response.use(
            response => {
              return response;
            },
            error => {
              console.log(error);
              authStore.dispatch({type:AuthActionType.Logout});
              vacationsStore.dispatch({type: VacationsActionType.DeleteVacations});
            }
          );

    }
}

const interceptorService = new InterceptorService();

export default interceptorService;


