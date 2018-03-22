import { Auth } from './../models/auth';
import { AuthActionType, AuthActions } from '../actions/auth.action';

export interface State {
  auth: Auth;
}

// 默认值
export const initialState: State = {
  auth: {
    user: null,
    hasError: true,
    errMsg: null,
    redirectUrl: null
  }
};

export const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
      case AuthActionType.LOGIN:
        return state;
      case AuthActionType.LOGIN_SUCCESS:
      return Object.assign({},
                          state,
                          {auth: action.payload});
      case AuthActionType.LOGIN_FAILED_NOT_EXISTED:
        return Object.assign({},
                            state,
                            {
                              auth: {
                                user: null,
                                hasError: true,
                                errMsg: 'Username not existed'
                              }
                            });
      case AuthActionType.LOGIN_FAILED_NOT_MATCH:
        return Object.assign({},
                            state,
                            {
                              auth: {
                                user: null,
                                hasError: true,
                                errMsg: 'Password not match'
                              }
                            });
      case AuthActionType.LOGOUT:
        return Object.assign({},
                            state,
                            {
                              auth: {
                                user: null,
                                hasError: true,
                                errMsg: 'no credentials',
                                redirectUrl: '/login'
                              }
                            });
      case AuthActionType.REGISTER:
        return state;
      case AuthActionType.REGISTER_SUCCESS:
      return Object.assign({},
                          state,
                          { auth: action.payload}
                          );
      case AuthActionType.REGISTER_FAILED_EXISTED:
        return Object.assign({},
                            state,
                            {
                              auth: {
                                user: null,
                                hasError: true,
                                errMsg: 'username existed'
                              }
                            });
      default:
        return state;
    }
};

// 获取状态库的子状态,俗称切面状态
export const getAuth = (state: State) => {
  console.log(state.auth);
  return state.auth;
};
