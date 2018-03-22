import { UserService } from './../../core/user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/auth.service';

import { Observable } from 'rxjs/Observable';

import * as fromAuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
    // effects的作用是作为粘合剂,将action与其他服务进行结合
    @Effect()
    login$ = this.actions$
        .ofType(fromAuthActions.AuthActionType.LOGIN)
        .map((action: fromAuthActions.LoginAction) => action.payload)
        // https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/switchmap.html
        .switchMap(user => {
            return this.authService.loginWithCredentials(user)
                .map(authUser => {
                    if (null === authUser) {
                        // 另一种写法,调用action
                        return new fromAuthActions.LoginFaildNotExistedAction();
                    } else if ( authUser.password !== user.password) {
                        return new fromAuthActions.LoginFaildNotMatchAction();
                    } else {
                        return new fromAuthActions.LoginSuccessAction({
                                user: authUser,
                                hasError: false,
                                errMsg: null,
                                redirectUrl: null
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType(fromAuthActions.AuthActionType.LOGIN_SUCCESS)
        .map((action: fromAuthActions.LoginSuccessAction) => {
            this.router.navigate(['todo']);
        });

    @Effect()
    register$ = this.actions$
        .ofType(fromAuthActions.AuthActionType.REGISTER)
        .map((action: fromAuthActions.RegisterAction) => action.payload)
        .switchMap(user => {
            return this.authService.register(user.username, user.password)
                       .map( authUser => { // 这里的authUser是访问服务器返回的
                            if (authUser !== null) {
                                return new fromAuthActions.RegisterFailedExistedAction();
                            } else {
                                const toAddUser = {
                                    id: null, // json-server 会自增长id的
                                    username: user.username,
                                    password: user.password
                                };
                                return new fromAuthActions.RegisterSuccessAction({
                                        user: toAddUser,
                                        hasError: false,
                                        errMsg: null,
                                        redirectUrl: null
                                });
                            }
                       });
        });
    // 标记dispatch为false,代表这个effects将不派发Actions,否则容易出错
    // effect如果必须返回一个Observable类型,哪怕是null,当我们没有返回的时候为null
    @Effect({ dispatch: false })
    registerSuccess$ = this.actions$
        .ofType(fromAuthActions.AuthActionType.REGISTER_SUCCESS)
        .map((action: fromAuthActions.RegisterSuccessAction) => {
            this.userService.addUser(action.payload.user);
        });
    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) {}
}
