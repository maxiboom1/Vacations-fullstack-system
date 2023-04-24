import { createStore } from "redux";
import VacationModel from "../Models/VacationsModel";
import { authStore } from "./AuthState";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    SaveVacations,
    UpdateFollow,
    DeleteVacations
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.SaveVacations: // Here, the payload is a token
            newState.vacations = action.payload;
            break;

        case VacationsActionType.DeleteVacations:
            newState.vacations = [];
            break;
        case VacationsActionType.UpdateFollow:
            const currentUser = authStore.getState().user;
            const index = newState.vacations.findIndex((v)=> v.vacationId === action.payload.vacationId);
            console.log('redux payload: ',action.payload);
            //console.log('redux current user: ',currentUser.userId);

            // isFollow state update
            if(action.payload.userId === currentUser.userId){
                newState.vacations[index].isFollowing = action.payload.isFollowing;
            }
            
            // followersCount update
            if(action.payload.isFollowing === 1){
                console.log('++');
                ++newState.vacations[index].followersCount;
            } else {
                --newState.vacations[index].followersCount;
                console.log('--');
            }
            break;
    }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer);