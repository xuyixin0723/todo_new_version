import { reducers } from './../login/reducers/index';

import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../login/reducers';
import * as fromTodos from '../todo/reducers';

export interface AppState {
    auth: fromAuth.AuthState;
    todo: fromTodos.State;
}

export { fromAuth };
export { fromTodos };

