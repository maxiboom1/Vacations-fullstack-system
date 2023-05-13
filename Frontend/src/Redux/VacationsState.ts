import { createStore } from "redux";
import VacationModel from "../Models/VacationsModel";
import { authStore } from "./AuthState";

export class VacationsState {
    public vacations: VacationModel[] = [];
    public lastAction: string = ""; // add lastAction property
}

export enum VacationsActionType {
    SaveVacations,
    DeleteVacations,
    AddVacation,
    UpdateVacation,
    UpdateFollow,
    DeleteVacation
}

export interface VacationsAction {
    type: VacationsActionType;
    payload?: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };
    
    switch (action.type) {

        case VacationsActionType.SaveVacations: 
            newState.vacations = action.payload;
            break;

        case VacationsActionType.DeleteVacations: 
            newState.vacations = [];
            break;
        
        case VacationsActionType.AddVacation: 
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;
        
        case VacationsActionType.UpdateFollow:
            const currentUser = authStore.getState().user;
            const index = newState.vacations.findIndex((v)=> v.vacationId === action.payload.vacationId);

            // isFollow state update if this.userId === payload.userId (means current user clicked like)
            if(action.payload.userId === currentUser.userId){
                newState.vacations[index].isFollowing = action.payload.isFollowing;
            }
            
            // followersCount update
            if(action.payload.isFollowing === 1){
                ++newState.vacations[index].followersCount;
            } else {
                --newState.vacations[index].followersCount;
            }
            break;
        
        case VacationsActionType.DeleteVacation:
            const indexToRemove = newState.vacations.findIndex( v => v.vacationId === action.payload); // Here, the payload is vacationId to remove
            if(indexToRemove >= 0){ newState.vacations.splice(indexToRemove, 1); } 
            break;
    }
    
    newState.lastAction = VacationsActionType[action.type]; // set the value of lastAction to the current action type
    
    return newState;
}

export const vacationsStore = createStore(vacationsReducer);