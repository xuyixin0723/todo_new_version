import { AuthService } from './../core/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

import { Todo } from '../domain/entities';

@Injectable()
export class TodoService {

  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userId: number; // 为配合使用auth替代localStorage时用户筛选仍然有效而新增

  constructor(private http: Http, private authService: AuthService) {
    // 作者在chap06仍未将用户真正实现，所以作者代码会显示所有用户的待办事项
    // 而如果基于我们自己写得chap05，那么用户信息因为作者改用auth在内存中的实现替代localStorage
    // 这意味着只要用户关闭页面就意味着要重新登录，但是这也意味着userId始终为0，无法正常显示每个用户的待办事项
    // 所以如下修改是本章书本中代码没有自行补充的
    this.authService.getAuth()
      .filter(auth => auth.user != null)
      .subscribe(auth => this.userId = auth.user.id); // 异常处理可以改到此处来
  }
  // POST /todos
  addTodo(desc: string): Promise<Todo> {
    // “+”是一个简易方法可以把string转成number
    // 下面直接写userID，就会自动添加key和value
    const todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: this.userId
    };
    return this.http
      .post(this.api_url, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Todo)
      .catch(this.handleError);
  }
  // It was PUT /todos/:id before
  // But we will use PATCH /todos/:id instead
  // Because we don't want to waste the bytes those don't change
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.http
      .patch(url, JSON.stringify({ completed: !todo.completed }), { headers: this.headers })
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }
  // DELETE /todos/:id
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  // GET /todos
  getTodos(): Promise<Todo[]> {
    // 作者截止到chap06未做修改实现用户筛选，同时将storage改用内存保存用户信息
    // 从嗯个人导致进入显示内容有误 令人发指为在本章实现用户筛选必须注销下面这句，并使用新增的this.userId成员变量
    // const userId = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${this.userId}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json() as Todo[])
      .catch(this.handleError);
  }
  // GET /todos?completed=true/false
  filterTodos(filter: string): Promise<Todo[]> {
    // const userId: number = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${this.userId}`;
    switch (filter) {
      case 'ACTIVE': return this.http
        .get(`${url}&completed=false`)
        .toPromise()
        .then(res => res.json() as Todo[])
        .catch(this.handleError);
      case 'COMPLETED': return this.http
        .get(`${url}&completed=true`)
        .toPromise()
        .then(res => res.json() as Todo[])
        .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
