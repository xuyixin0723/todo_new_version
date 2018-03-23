import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

// export const GO_LOGIN = '[router] GO_LOGIN';
// export const GO_TODO = '[router] GO_TODO';
export const GO = '[router] GO';
export const BACK = '[router] BACK';
export const FORWARD = '[router] FORWARD';

export class Go implements Action {
    readonly type = GO;
    constructor(
        // 这个参数就是router.navigate()的参数
        // navigate(['user', 1],{ queryParams: { id: 1 } });
        // 路由中传参数 /user/1?id=1
        public payload: {
            path: any[];
            query?: Object;
            extras?: NavigationExtras // 支持更多的查询方式,可以跳转定义
        }
    ) { }
}
// 后退
export class Back implements Action {
    readonly type = BACK;
}
// 前进
export class Forward implements Action {
    readonly type = FORWARD;
}

export type Actions =
    | Go
    | Back
    | Forward;
