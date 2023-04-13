import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import Greetings from "../Greetings/Greetings";
import "./Home.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";

// Home component subscribed to token presence => if no token its return greetings page, 
// else its routes user to home page. Using that technique, if user will logout in other part of app, 
// home component automatically re-route it to greetings page.
function Home(): JSX.Element {
    
    const [isToken,setIsToken] = useState<string>(authStore.getState().token);    
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    useEffect(()=>{
        
        const unsubscribe = authStore.subscribe(()=>{
            setIsToken(authStore.getState().token);
        });
        
        if(isToken){dataService.getAllVacations()
            .then((vacations)=>{setVacations(vacations)})
            .catch((e)=>{notifyService.error(e)});
        }
        
        return () => unsubscribe();

    },[]);

    console.log(vacations);

    if(!isToken) {
        return <Greetings />;
    }


    return (
        <div className="Home">
            <h2>Home page...</h2>
        </div>
    );
}

export default Home;
