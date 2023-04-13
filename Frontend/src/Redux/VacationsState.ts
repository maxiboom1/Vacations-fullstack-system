import { createStore } from "redux";
import VacationModel from "../Models/VacationsModel";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    SaveVacations,
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

    }

    return newState;
}

export const vacationsStore = createStore(vacationsReducer);