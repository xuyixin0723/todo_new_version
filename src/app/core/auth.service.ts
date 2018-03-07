
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Auth } from '../domain/entities';

@Injectable()
export class AuthService {
  // 作者代码没有user:null, 这种情况tslint是不接受的
  // 本来考虑过auth为static来实现浏览器输入路由不带#导致要重新进入app.component.ts中ngOnInit函数带来的用户验证失效问题，
  // 但发现这行为导致的是整个app重新载入，也就是从服务器重新下载重构，因此包括注入的全局服务等都是会跟着重构
  // 这就意味着AuthService也是作为新的进程重新创建一遍，
  // 因此就算是静态变量也是相当于重新初始化了
  // 如果要防用户在浏览器地址栏#前输入路由不需要也随之重新验证一遍的话
  // 还是要考虑利用localStorage
  auth: Auth = { user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in' };

  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

  constructor(private http: Http, private userService: UserService) {
    this.subject.next(this.auth); // 必须要考虑到没有login直接在浏览器输入其它路由的情况，如果这里没有就会导致无法获得auth
  }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }
  unAuth(): void {

    this.auth = Object.assign(// Object.assign是深复制，前端开发提倡函数式编程【正好提一下以前平进平出的概念】，所以不提倡数据修改，而是提倡新建修改好的一整套数据
      {},
      this.auth,
      { user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in' });
    this.subject.next(this.auth);
  }

  register(username: string, password: string): Observable<Auth> {
    const toAddUser = {
      id: null, // json-server 会自增长id的
      username: username,
      password: password
    };
    return this.userService
      .findUser(username)
      .filter(user => user === null)
      .switchMap(user => {
        return this.userService.addUser(toAddUser).map(u => {
          this.auth = Object.assign(
            {},
            { user: u, hasError: false, errMsg: null, redirectUrl: '' } // 作者写null是不应该，应该自动转到根路由
          );
          this.subject.next(this.auth);
          return this.auth;
        });
      });
  }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    return this.userService
      .findUser(username)
      .map(user => {
        const auth = new Auth();
        if (null === user) {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if (password === user.password) {
          auth.user = user;
          auth.hasError = false;
          auth.errMsg = null;
        } else {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }

        this.auth = Object.assign({}, auth);
        this.subject.next(this.auth); // 作为observer触发， 该subject是ReplaySubject类型，所以能够在subscribe时得到最近值
        return this.auth;

      }); // 这里也取消了异常处理
  }

}
