import { AuthService } from './../core/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Todo, AppState } from '../domain/state';
import { TodoRequestType } from './../core/todo/actions/todo.action';
@Injectable()
export class TodoService {

  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private auth$: Observable<number>;

  constructor(private http: Http,
              // private authService: AuthService,
              private router: Router,
              private store$: Store<AppState>) {
    // 在构造TodoService时要将此时的登录的用户Id拿到,才能继续
    // 否则是安全隐患的
    this.auth$ = this.store$
                     .select(appState => appState.auth)
                     .filter(auth => auth.user !== null)
                     .map(auth => auth.user.id);
  }

  // POST /todos
  addTodo(desc: string): void {
    this.auth$.flatMap( userId => {
      const todoToAdd = {
        id: UUID.UUID(),
        desc: desc,
        completed: false,
        userId: userId
      };
      return this.http
                 .post(this.api_url, JSON.stringify(todoToAdd), {headers: this.headers})
                 .map(res => res.json() as Todo);
    }).subscribe(todo => {
      this.store$.dispatch({
        type: TodoRequestType.ADD_TODO,
        payload: todo
      });
    });
  }

  toggleTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    this.http
        .patch(url, JSON.stringify({ completed: !todo.completed }), { headers: this.headers })
        // mapTo操作符是将Observable的对象映射成同一个值
        .mapTo(updatedTodo)
        .subscribe( _todo => {
          this.store$.dispatch({
            type: TodoRequestType.TOGGLE_TODO,
            payload: _todo
          });
      });
  }
  // DELETE /todos/:id
  deleteTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    this.http
        .delete(url, { headers: this.headers })
        .mapTo(Object.assign({}, todo))
        .subscribe( _todo => {
          this.store$.dispatch({
            type: TodoRequestType.REMOVE_TODO,
            payload: _todo
          });
      });
  }
  // GET /todos
  getTodos(): Observable<Todo[]> {
    return this.auth$
               .flatMap(userId => this.http.get(`${this.api_url}?userId=${userId}`))
               .map(res => res.json() as Todo[]);
  }

  toggleAll(): void {
    this.getTodos()
        // 这里的flatMap是将获取到的Observable<Todo[]>转换为
        // Todo[]数组内的所有子todo都变成Observable对象
        .flatMap(todos => Observable.from(todos))
        // 这里是将每一个todo都翻转
        .flatMap(todo => {
          const url = `${this.api_url}/${todo.id}`;
          const updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
          return this.http
                     .patch(url, JSON.stringify({completed: !todo.completed}), {headers: this.headers});
        }).subscribe( () => {
             // 这里调用refucer将本地的状态库内的todo全部反转
             this.store$.dispatch({
               type: TodoRequestType.TOGGLE_ALL
             });
        });
  }

  clearCompleted(): void {
    this.getTodos()
        .flatMap( todos => Observable.from(todos))
        .flatMap( todo => {
          const url = `${this.api_url}/${todo.id}`;
          return this.http
          .delete(url, {headers: this.headers});
        }).subscribe(() => {
          this.store$.dispatch({
            type: TodoRequestType.CLEAR_COMPLETED
          });
        });
  }

  private updateStoreAndSubject(todos) {
    this.dataStore.todos = [...todos];
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }

}
