import axios from "axios";
import VacationModel from "../Models/VacationsModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class DataService {
    
    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get(appConfig.vacationsURL);
        const vacations = response.data; 
        vacationsStore.dispatch({type: VacationsActionType.SaveVacations, payload:vacations});
        return vacations;
    }

    // Gets vacation id and action as optional arg. if action === "follow", server will add to DB, else delete
    public async updateFollow(vacationId: number, action?:string): Promise<void> {
        
        const data = {
            vacationId: vacationId, 
            action: action
        };
        
        await axios.post(appConfig.followURL, data);
        
    }
}

const dataService = new DataService();

export default dataService;
