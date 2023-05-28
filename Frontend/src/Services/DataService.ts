import axios from "axios";
import VacationModel from "../Models/VacationsModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class DataService {
    
    // Get all vacations
    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsURL);
        const vacations = response.data; 
        vacationsStore.dispatch({type: VacationsActionType.SaveVacations, payload:vacations});
        return vacations;
    }
    
    // Get one vacation
    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationsURL + vacationId);
        const vacation = response.data; 
        return vacation;
    }

    // Update vacation
    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" }; // Header to send img
        const response = await axios.put<VacationModel>(appConfig.vacationsURL + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;
        vacationsStore.dispatch({type:VacationsActionType.UpdateVacation, payload: updatedVacation});
    }

    // Add vacation
    public async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" }; // Header to send img
        const response = await axios.post<VacationModel>(appConfig.vacationsURL, vacation, { headers });
        const addedVacation = response.data;
        vacationsStore.dispatch({type:VacationsActionType.AddVacation, payload: addedVacation});
    }
    
    // Follow update: expected input is vacationId, action [1 or 0]
    public async updateFollow(vacationId: number, action:number): Promise<void> {
        const data = { vacationId, action }; // Contain data 
        await axios.post(appConfig.followURL, data);
    }

    // Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsURL + vacationId);
        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: vacationId});
    }
}

const dataService = new DataService();

export default dataService;
