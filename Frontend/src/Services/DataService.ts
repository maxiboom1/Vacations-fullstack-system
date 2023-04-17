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

    public async updateFollow(vacationId: number, action:number): Promise<void> {
        
        const data = { vacationId, action };
        
        await axios.post(appConfig.followURL, data);
        
    }
}

const dataService = new DataService();

export default dataService;
