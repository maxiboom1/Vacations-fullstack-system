import { io } from "socket.io-client";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

const socketService = io(appConfig.socketURL);

function startSocketListener(){
    
    socketService.on('update', (data:any) => {
        
        vacationsStore.dispatch({type: VacationsActionType.UpdateFollow, payload:{
            vacationId: data.vacationId, 
            isFollowing:data.isFollowing}
        
        });
        
    });

}

export default startSocketListener;
