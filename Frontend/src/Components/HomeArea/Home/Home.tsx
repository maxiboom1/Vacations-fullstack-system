import { useEffect, useState } from "react";
import "./Home.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { authStore } from "../../../Redux/AuthState";
import { useNavigate } from "react-router-dom";

function Home(): JSX.Element {
    
    const navigate = useNavigate();    
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
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
