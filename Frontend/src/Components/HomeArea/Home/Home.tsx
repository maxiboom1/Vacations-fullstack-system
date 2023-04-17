import { useEffect, useState } from "react";
import "./Home.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import appConfig from "../../../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";

const socketService = io(appConfig.socketURL);


function Home(): JSX.Element {
    
    const navigate = useNavigate();    
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    socketService.on('update', (data:any) => {
        
        vacationsStore.dispatch({type: VacationsActionType.UpdateFollow, payload:{
            vacationId: data.vacationId, 
            isFollowing:data.isFollowing}
        });
        
    });

    useEffect(()=>{

        dataService.getAllVacations()
            .then((vacations)=>{setVacations(vacations)})
            .catch((e)=>{
                notifyService.error(e); 
                navigate("/greetings"); // If no token, drop the bastard.
                }
            );
    },[]);
  
    return (
        
        <div className="Home">
            
            <h2>Our vacations offer:</h2>                      

            {vacations.map((v) => (<CardUI data={v} key={v.vacationId} />))}

        </div>
    );
}

export default Home;
