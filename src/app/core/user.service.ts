import { Observable } from 'rxjs/Observable'; // 作者导入了rxjs/Rx，可以恢复演示一下tslint提示
import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from '../domain/entities';

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000/users';

  constructor(private http: Http) { }

  getUser(userId: number): Observable<User> {
    const url = `${this.api_url}/${userId}`;
    return this.http.get(url)
      .map(res => res.json() as User);
  }
  findUser(username: string): Observable<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.http.get(url)
      .map(res => {
        const users = res.json() as User[];
        return (users.length > 0) ? users[0] : null;
      });
  }
  // 这里把原先的异常的处理的函数删除了
  // 主要是因为Rxjs处理异常的默认位置应该是在subscribe处
  // 作者没有写 记得结合教材特别交代一下应该写在哪里
}
