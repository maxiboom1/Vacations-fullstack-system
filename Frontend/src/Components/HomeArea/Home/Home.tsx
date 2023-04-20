import { useEffect, useState } from "react";
import "./Home.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { useNavigate } from "react-router-dom";

import { vacationsStore } from "../../../Redux/VacationsState";
import appConfig from "../../../Utils/AppConfig";

function Home(): JSX.Element {
  
    const navigate = useNavigate();     
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [activeFilters, setActiveFilters] = useState([]);
        
    useEffect(()=>{
        dataService.getAllVacations()
            .then((v)=>{setVacations(v);})
            .catch((e)=>{
                notifyService.error(e); 
                navigate("/greetings"); // If no token, drop the bastard.
                }
            );
    },[]);

    useEffect(()=>{
        
        const currentVacations:VacationModel[] = vacationsStore.getState().vacations;
        const now = new Date();
        
        const filterPredicates = {
            isFollowing: (v: VacationModel)=> v.isFollowing ===1,
            actualVacations: ()=> (v: VacationModel)=> new Date(v.startDate) > now,
            startedVacations: (v: VacationModel)=> (new Date(v.startDate) < now) && (new Date(v.endDate) > now),
        };
        
        const combinedFilter = (v:VacationModel) => {  
            return activeFilters.every((filter) => filterPredicates[filter as keyof typeof filterPredicates](v));
        };
        
        const filtered = currentVacations.filter(combinedFilter); 

        setVacations(filtered);

    },[activeFilters]);

    // User check action will setActiveFilter state, and that will trigger useEffect that subscribed to activeFilters state (see above).
    function handleFilterChange(name: string, checked: boolean){
        if(checked){
            setActiveFilters(prevFilters => [...prevFilters, name]); 
        } else {
            setActiveFilters(prevFilters => prevFilters.filter(f => f !== name));
        }
    }
    
    return (
        
        <div className="Home">
            
            <h2>Our vacations offer:</h2>                      
            <div className="filterMenu">
                <label>
                    <input type="checkbox" name="filter1" onChange={(event) => handleFilterChange(appConfig.filters.IS_FOLLOWING, event.target.checked)} />
                    Filter 1
                </label>
                <label>
                    <input type="checkbox" name="filter2" onChange={(event) => handleFilterChange(appConfig.filters.ACTUAL_VACATIONS, event.target.checked)} />
                    Filter 2
                </label>
                <label>
                    <input type="checkbox" name="filter3" onChange={(event) => handleFilterChange(appConfig.filters.STARTED_VACATIONS, event.target.checked)} />
                    Filter 3
                </label>
            </div>
            {vacations.map((v) => (<CardUI data={v} key={v.vacationId} />))}

        </div>
    );
}

export default Home;