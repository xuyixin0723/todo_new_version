// 这里负责login模块的所有reducer进行汇总
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
    auth: fromAuth.State;
}
// 使用ActionReducerMap,防止后面的人追加的时候不知道如何追加
export const reducers: ActionReducerMap<AuthState> = {
    auth: fromAuth.authReducer
};

// 注册一个状态库名字为auth,这个名字是在modul里面注册的名字,需要一样
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 返回状态库的其中一个状态,这里是auth
export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth
);

export const getAuth = createSelector(
    selectAuthStatusState, // fromAuth.State,也就是interface State { auth: Auth; }
    fromAuth.getAuth // 这个是在fromAuth里面导出的箭头函数,返回getAuth
);
