import { AuthService } from './../core/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';
import { Todo } from './models/todo';
import { TodoRequestType } from './actions/todo.action';
import * as fromRoot from '../reducers';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
@Injectable()
export class TodoService {

  private api_url = 'http://192.168.2.75:3000/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userId$: Observable<number>;

  constructor(private http: Http,
              // private authService: AuthService,
              private router: Router,
              private store$: Store<fromRoot.AppState>) {
    // 在构造TodoService时要将此时的登录的用户Id拿到,才能继续
    // 否则是安全隐患的
    this.userId$ = this.store$
                     .select(fromRoot.fromAuth.getAuth)
                     .filter(auth => auth.user !== null)
                     .map(auth => auth.user.id);
  }

  getUserId(): Observable<number> {
    return this.userId$;
  }
  getTodosState(route: ActivatedRoute): Observable<Todo[]> {
    const fetchData$ = this.getTodos()
      .map(todos => {
        this.store$.dispatch({
          type: TodoRequestType.FETCH_FROM_API,
          payload: todos
        });
      })
      .flatMap( () => {
        return this.store$.select(fromRoot.fromTodos.getTodos);
      })
    // startWidth操作符为发出给定的第一个值
    // BehaviorSubject当然也可以做到,这里从一个空的数组开始,
      .startWith([]);

    // pluck操作符是获取对象的属性值,比如:
    /* const source = Rx.Observable.from([
        { name: 'Joe', age: 30 },
        { name: 'Sarah', age: 35 }
      ]);
      // 提取 name 属性
      const example = source.pluck('name');
      // 输出: "Joe", "Sarah"
      const subscribe = example.subscribe(val => console.log(val));
    */
    const filterData$ = route.params.pluck('filter')
    .do(value => {
      const filter = value as string;
      this.store$.dispatch({type: filter});
    })
    // select(...)为选择返回什么样的Observable数据
    .flatMap(_ => this.store$.select(fromRoot.fromTodos.getTodoFilter))
    .distinctUntilChanged(filter => filter); // 去除重复数据

    // 这里只有当fetchData$和filterData$都至少有一个值之后才会触发
    // 这里的第三个参数是projection 函数,projection的参数是所有Observable
    // 对象,当fetchData$和filterData$都有了值之后会调用这个函数
    return Observable.combineLatest(
      fetchData$,
      filterData$,
      (todos: Todo[], filter: any) => {
          console.log('3.执行 combineLatest');
          return todos.filter(filter);
      }
    );
  }
  // POST /todos
  addTodo(todoToAdd: Todo): Observable<Todo> {
      return this.http
                 .post(this.api_url, JSON.stringify(todoToAdd), {headers: this.headers})
                 .map(res => res.json() as Todo);
  }

  toggleTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    this.http
        .patch(url, JSON.stringify({ completed: !todo.completed }), { headers: this.headers });
  }
  // DELETE /todos/:id
  deleteTodo(todo: Todo): void {
    const url = `${this.api_url}/${todo.id}`;
    this.http
        .delete(url, { headers: this.headers });
  }
  // GET /todos
  getTodos(): Observable<Todo[]> {
    return this.userId$
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
        });
  }

  clearCompleted(): void {
    this.getTodos()
        .flatMap( todos => Observable.from(todos))
        .flatMap( todo => {
          const url = `${this.api_url}/${todo.id}`;
          return this.http
          .delete(url, {headers: this.headers});
        });
  }
}
