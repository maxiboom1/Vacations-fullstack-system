import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import Greetings from "../Greetings/Greetings";
import "./Home.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import CardUI from "../CardUI/CardUI";

// Home component subscribed to token presence => if no token its return greetings page, 
// else its routes user to home page. Using that technique, if user will logout in other part of app, 
// home component automatically re-route it to greetings page.
function Home(): JSX.Element {
    
    const [isTokenExists,setIsTokenExists] = useState<string>(authStore.getState().token);    
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    useEffect(()=>{
        
        const unsubscribe = authStore.subscribe(()=>{
            setIsTokenExists(authStore.getState().token);
        });
        
        // If user not logged in, bypass vacations query.
        if(isTokenExists){dataService.getAllVacations()
            .then((vacations)=>{setVacations(vacations)})
            .catch((e)=>{notifyService.error(e)});
        }
        
        return () => unsubscribe();

    },[]);

    
    if(!isTokenExists) {
        return <Greetings />;
    }

    return (
        
        <div className="Home">
            
            <h2>Our vacations offer:</h2>                      

            {vacations.map((v) => (<CardUI data={v} key={v.vacationId} />))}

        </div>
    );
}

export default Home;
