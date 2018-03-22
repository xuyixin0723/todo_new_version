import { Action } from '@ngrx/store';
import { Auth } from '../models/auth';

// 这里将Auth验证进行了修改,更改为枚举的形式,这样就避免了导入的时候
// 写的很长,以后在写项目时,考虑尽量的分类
export enum AuthActionType {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED_NOT_EXISTED = 'LOGIN_FAILED_NOT_EXISTED',
    LOGIN_FAILED_NOT_MATCH = 'LOGIN_FAILED_NOT_MATCH',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    REGISTER_FAILED_EXISTED = 'REGISTER_FAILED_EXISTED'
}

// 登录这个动作会在payload中携带用户的数据,就是Auth类型
export class LoginAction implements Action {
    readonly type = AuthActionType.LOGIN;
    constructor( public payload: Auth ) {}
}

// 由于用户未找到导致的登录失败,这种情况下是不需要携带payload数据的
export class LoginFaildNotExistedAction implements Action {
    readonly type = AuthActionType.LOGIN_FAILED_NOT_EXISTED;
}

// 由于用户密码不匹配导致的登录失败,这种情况下同样无需携带payload数据
export class LoginFaildNotMatchAction implements Action {
    readonly type = AuthActionType.LOGIN_FAILED_NOT_MATCH;
}

// 注销登录,这种情况下,我们会直接返回一个新的状态,payload也不需要携带数据
export class LogoutAction implements Action {
    readonly type = AuthActionType.LOGOUT;
}

// 注册成功后需要携带Auth信息
export class RegisterAction implements Action {
    readonly type = AuthActionType.REGISTER;
    constructor( public payload: Auth ) {}
}
// 由于用户名已经存在而导致的注册失败,这种情况下无需携带payload数据
export class RegisterFailedExistedAction implements Action {
    readonly type = AuthActionType.REGISTER_FAILED_EXISTED;
}

export type AuthActions =
    | LoginAction
    | LoginFaildNotExistedAction
    | LoginFaildNotMatchAction
    | LogoutAction
    | RegisterAction
    | RegisterFailedExistedAction;
