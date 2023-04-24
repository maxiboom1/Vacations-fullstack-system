import { io } from "socket.io-client";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

const socketService = io(appConfig.socketURL);

async function startSocketListener(){
    
    socketService.on('update', (data:any) => {
                        
        vacationsStore.dispatch({type: VacationsActionType.UpdateFollow, payload:{
            vacationId: data.vacationId, 
            isFollowing:data.isFollowing}
        });
        
        
        setTimeout(()=>{console.log('socket after dispatch: ', vacationsStore.getState().vacations[data.vacationId]);},500)
    });

}

export default startSocketListener;
