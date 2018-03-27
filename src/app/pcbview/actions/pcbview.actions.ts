import { Components } from './../models/componentsDB';
import { Action } from '@ngrx/store';

export enum PcbViewActionsType {
    FETCH_FROM_API = 'FETCH_FROM_API_PCBVIEW',
    UPDATE_DATA_PCBVIEW = 'UPDATE_DATA_PCBVIEW',
    LOAD_LOCAL_DATA = 'LOAD_LOCAL_DATA',
    LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS'
}

export class FetchAction implements Action {
    readonly type = PcbViewActionsType.FETCH_FROM_API;
    constructor( public payload: Components[] ) {}
}

export class UpdateDataAction implements Action {
    readonly type = PcbViewActionsType.UPDATE_DATA_PCBVIEW;
    constructor() {}
}

export class LoadLocalDataAction implements Action {
    readonly type = PcbViewActionsType.LOAD_LOCAL_DATA;
    constructor() {}
}

export class LoadDataSuccessAction implements Action {
    readonly type = PcbViewActionsType.LOAD_DATA_SUCCESS;
    constructor(public payload: Components[]) {}
}
export type PcbViewActions =
    | FetchAction
    | UpdateDataAction
    | LoadLocalDataAction
    | LoadDataSuccessAction;
