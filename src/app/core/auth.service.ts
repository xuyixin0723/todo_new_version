import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Auth, AppState } from '../domain/state';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActionType } from './todo/actions/auth.action';
@Injectable()
export class AuthService {
  // auth: Auth = { user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in' };

  // subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

  constructor(private http: Http,
              private userService: UserService,
              private store$: Store<AppState>,
              private router: Router) {
    // this.subject.next(this.auth); // 必须要考虑到没有login直接在浏览器输入其它路由的情况，如果这里没有就会导致无法获得auth
  }

  getAuth(): Observable<Auth> {
    return this.store$.select( appState => appState.auth );
  }
  unAuth(): void {
    this.store$.dispatch({type: AuthActionType.LOGOUT});
  }

  register(username: string, password: string): void {
    const toAddUser = {
      id: null, // json-server 会自增长id的
      username: username,
      password: password
    };
    this.userService
      .findUser(username)
      .subscribe( user => {
        if (user != null) {
          this.store$.dispatch({type: AuthActionType.REGISTER_FAILED_EXISTED});
        } else {
          this.store$.dispatch({type: AuthActionType.REGISTER, payload: {
            user: toAddUser,
            hasError: false,
            errMsg: null,
            redirectUrl: null
          }});
        }
      });
  }

  loginWithCredentials(username: string, password: string): void {
    this.userService
      .findUser(username)
      .subscribe(user => {
        if ( null === user ) {
          this.store$.dispatch({
            type: AuthActionType.LOGIN_FAILED_NOT_EXISTED
          });
        } else if ( password !== user.password) {
          this.store$.dispatch({
            type: AuthActionType.LOGIN_FAILED_NOT_MATCH
          });
        } else { // 如果用户存在,密码又匹配那么就可以直接进入todo界面了
          this.store$.dispatch({
            type: AuthActionType.LOGIN,
            payload: {
              user: user,
              hasError: false,
              errMsg: null,
              redirectUrl: null
            }
          });
          this.router.navigate(['todo']);
        }
      });
  }
}
