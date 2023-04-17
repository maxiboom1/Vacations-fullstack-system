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

    useEffect(()=>{

        dataService.getAllVacations()
            .then((v)=>{setVacations(v); originalData.push(v);})
            .catch((e)=>{
                notifyService.error(e); 
                navigate("/greetings"); // If no token, drop the bastard.
                }
            );
    },[]);

        
    socketService.on('update', (data:any) => {
        
        vacationsStore.dispatch({type: VacationsActionType.UpdateFollow, payload:{
            vacationId: data.vacationId, 
            isFollowing:data.isFollowing}
        });
        
    });
  
    
    const originalData = []; // store original vacations once onload, so  you always have complete array on data
    let activeFilters:string[] = []; // array that stores selected filters

    function handleFilterChange(name: string, checked: boolean){
        // First, lets update our local 'activeFilter' array that stores selected filters:        
        if(checked){
            activeFilters.push(name);
        } else {
            activeFilters = activeFilters.filter(f => f !== name); // here we remove unselected filter from our array
        }
        
        let result = [];
        
        // her we run over activefilters array and build result array with filtered vacations: 
        for(const filter of activeFilters){
            console.log(filter);
            if (filter === "isFollowing") {
                // add to result array isfollowing vacations
            }
            if (filter === "actualVacations") {
                // add to result array actual vacations
            }
            if (filter === "startedVacations") {
                // add to result array started vacations
            }
        }

        // Here, use setVacations(result) to render the result...
    }
        
    return (
        
        <div className="Home">
            
            <h2>Our vacations offer:</h2>                      
            <div className="filterMenu">
                <label>
                    <input type="checkbox" name="filter1" onChange={(event) => handleFilterChange('isFollowing', event.target.checked)} />
                    Filter 1
                </label>
                <label>
                    <input type="checkbox" name="filter2" onChange={(event) => handleFilterChange('actualVacations', event.target.checked)} />
                    Filter 2
                </label>
                <label>
                    <input type="checkbox" name="filter3" onChange={(event) => handleFilterChange('startedVacations', event.target.checked)} />
                    Filter 3
                </label>
            </div>
            {vacations.map((v) => (<CardUI data={v} key={v.vacationId} />))}

        </div>
    );
}

export default Home;
