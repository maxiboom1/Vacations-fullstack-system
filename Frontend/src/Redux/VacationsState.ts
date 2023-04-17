import { createStore } from "redux";
import VacationModel from "../Models/VacationsModel";

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
            const index = newState.vacations.findIndex((v)=> v.vacationId === action.payload.vacationId);
            newState.vacations[index].isFollowing = action.payload.newFollowState;
            break;

    }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer);