import { AuthService } from './../core/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Todo } from '../domain/entities';

@Injectable()
export class TodoService {

  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userId: number; // 为配合使用auth替代localStorage时用户筛选仍然有效而新增

  private _todos: BehaviorSubject<Todo[]>;

  private dataStore: {
    todos: Todo[]
  };

  constructor(private http: Http, private authService: AuthService) {
    // 作者在chap06仍未将用户真正实现，所以作者代码会显示所有用户的待办事项
    // 而如果基于我们自己写得chap05，那么用户信息因为作者改用auth在内存中的实现替代localStorage
    // 这意味着只要用户关闭页面就意味着要重新登录，但是这也意味着userId始终为0，无法正常显示每个用户的待办事项
    // 所以如下修改是本章书本中代码没有自行补充的
    this.authService.getAuth()
      .filter(auth => auth.user != null)
      .subscribe(auth => this.userId = auth.user.id); // 异常处理可以改到此处来

    this.dataStore = { todos: [] };
    this._todos = new BehaviorSubject<Todo[]>([]);
  }


  // 为了方便todo.component.html中通过异步管道直接来绑定它
  get todos() {
    return this._todos.asObservable();
  }

  // POST /todos
  addTodo(desc: string)/*: Promise<Todo>*/ {
    // “+”是一个简易方法可以把string转成number
    // 下面直接写userID，就会自动添加key和value
    const todoToAdd = { // 这里改名是为了避免与subscribe中todo重名
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: this.userId
    };
    this.http
      .post(this.api_url, JSON.stringify(todoToAdd), { headers: this.headers })
      .map(res => res.json() as Todo)
      .subscribe(todo => {
        this.dataStore.todos = [...this.dataStore.todos, todo];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // It was PUT /todos/:id before
  // But we will use PATCH /todos/:id instead
  // Because we don't want to waste the bytes those don't change
  toggleTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo); // 需要知道它在dataStore中的序号
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    this.http
      .patch(url, JSON.stringify({ completed: !todo.completed }), { headers: this.headers })
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0, i),
          updatedTodo,
          ...this.dataStore.todos.slice(i + 1)
        ];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // DELETE /todos/:id
  deleteTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    this.http
      .delete(url, { headers: this.headers })
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0, i),
          ...this.dataStore.todos.slice(i + 1)
        ];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // GET /todos
  getTodos() {
    this.http.get(`${this.api_url}?userId=${this.userId}`)
      .map(res => res.json() as Todo[])
      .do(t => console.log(t))
      .subscribe(todos => this.updateStoreAndSubject(todos));
  }
  // GET /todos?completed=true/false
  filterTodos(filter: string) { //  利用这里作为契机讲解下使用@inject注入依赖项的另外一个弊端那就是查找引用也失去关联，会以为没有被引用
    switch (filter) {
      case 'ACTIVE':
        this.http
          .get(`${this.api_url}?completed=false&userId=${this.userId}`)
          .map(res => res.json() as Todo[])
          .subscribe(todos => this.updateStoreAndSubject(todos));
        break;
      case 'COMPLETED':
        this.http
          .get(`${this.api_url}?completed=true&userId=${this.userId}`)
          .map(res => res.json() as Todo[])
          .subscribe(todos => this.updateStoreAndSubject(todos));
        break;
      default:
        this.getTodos();
    }
  }

  // 以下函数都从todo.component.ts移过来了，因为todos都在本服务里面了
  toggleAll() {
    this.dataStore.todos.forEach(todo => this.toggleTodo(todo));
  }

  clearCompleted() {
    this.dataStore.todos
      .filter(todo => todo.completed)
      .forEach(todo => this.deleteTodo(todo));
  }
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // } // 作者这里都修改为subscribe后就没有使用异常，其实这里完全可以保留该函数，然后在每个subscribe中设定一个异常分支来调用该函数

  private updateStoreAndSubject(todos) {
    this.dataStore.todos = [...todos];
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }

}
