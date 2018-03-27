import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../login/reducers';
import * as fromTodos from '../todo/reducers';
import * as fromRouter from './router.reducers';
import * as fromPcbview from '../pcbview/reducers';

export interface AppState {
    auth: fromAuth.AuthState;
    todo: fromTodos.State;
    router: fromRouter.RouterState;
    componnets: fromPcbview.ComponentState;
}

export { fromAuth };
export { fromTodos };
export { fromRouter };
export { fromPcbview };

export { CustomeSerializer } from './router.reducers';

export const reducers: ActionReducerMap<any> = {
    router: fromRouter.reducer
};

