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

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get(appConfig.vacationsURL + vacationId);
        const vacation = response.data; 
        console.log('this', vacation)
        return vacation;
    }

    public async updateFollow(vacationId: number, action:number): Promise<void> {
        const data = { vacationId, action };
        await axios.post(appConfig.followURL, data);
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsURL + vacationId);
        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: vacationId});
    }
}

const dataService = new DataService();

export default dataService;
