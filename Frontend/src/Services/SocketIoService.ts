import { io } from "socket.io-client";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

const socketService = io(appConfig.socketURL);

// Socket service that listens to update msg from server, and pass it to redux store
async function startSocketListener(){
    
    // expected data example: { vacationId: 9, userId: 27, isFollowing: 0 }
    socketService.on('update', (data:any) => {

        vacationsStore.dispatch({type: VacationsActionType.UpdateFollow, payload:{
            vacationId: data.vacationId, 
            isFollowing: data.isFollowing,
            userId: data.userId
        }
        });
              
    });

}

export default startSocketListener;
