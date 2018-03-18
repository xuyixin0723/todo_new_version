import { Auth } from '../../../domain/entities';
import { AuthActionType, AuthActions } from '../actions/auth.action';

export const authReducer = (state: Auth = {
    user: null,
    hasError: true,
    errMsg: null,
    redirectUrl: null},
    action: AuthActions) => {
    switch (action.type) {
      case AuthActionType.LOGIN:
        return Object.assign({}, action.payload, {hasError: false});
      case AuthActionType.LOGIN_FAILED_NOT_EXISTED:
        return Object.assign({}, state, {
                                user: null,
                                hasError: true,
                                errMsg: 'Username not existed'
                            });
      case AuthActionType.LOGIN_FAILED_NOT_MATCH:
        return Object.assign({}, state, {
                                user: null,
                                hasError: true,
                                errMsg: 'Password not match'
                            });
      case AuthActionType.LOGOUT:
        return Object.assign({}, state, {
                                user: null,
                                hasError: true,
                                errMsg: 'no credentials',
                                redirectUrl: '/login'
                            });
      case AuthActionType.REGISTER:
        return Object.assign({}, action.payload, {hasError: false});
      case AuthActionType.REGISTER_FAILED_EXISTED:
        return Object.assign({}, state, {
                                user: null,
                                hasError: true,
                                errMsg: 'username existed'
                            });
      default:
        return state;
    }
};
