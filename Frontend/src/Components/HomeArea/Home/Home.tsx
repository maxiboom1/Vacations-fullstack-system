import { useEffect, useState } from "react";
import "./Home.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { useNavigate } from "react-router-dom";

import { vacationsStore } from "../../../Redux/VacationsState";

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
        
        const currentVacations = activeFilters.length === 0 ? vacationsStore.getState().vacations :  vacations;
        let filteredVacations = [...currentVacations];
        const now = new Date();

        // Here we run over activeFilters array and filter vacations based on filter: 
        for(const filter of activeFilters){
            
            // Filter vacations that user didn't followed
            if (filter === "isFollowing") {
                filteredVacations = filteredVacations.filter(v=> v.isFollowing === 1);
            }
            
            // Filter all past vacations
            else if (filter === "actualVacations") {
                filteredVacations = filteredVacations.filter(v=> new Date(v.startDate) > now);
            }

            // Filter all past and all future vacations
            else if (filter === "startedVacations") {
                filteredVacations = filteredVacations.filter( v=> (new Date(v.startDate) < now) && (new Date(v.endDate) > now) );   
            }             
        }

        setVacations(filteredVacations);

    },[activeFilters]);

    // User check action will setActiveFilter state, and that will trigger useEffect that subscribed to activeFilters state (see above).
    function handleFilterChange(name: string, checked: boolean){
        if(checked){
            setActiveFilters(prevFilters => [...prevFilters, name]); // Our state is arr, that way we add member to this state arr(use setState arg with prevValue and spread opr.)
        } else {
            setActiveFilters(prevFilters => prevFilters.filter(f => f !== name)); // Here we filter unchecked filter
        }
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