import { TodoRequestActions, TodoRequestType } from './/actions/todo.action';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { TodoService } from './todo.service';
import { Todo } from './models/todo';
import { UUID } from 'angular2-uuid';
import { TodoService } from './todo.service';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/combineLatest';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Observable<Todo[]>;
  userId$: Observable<number>;
  constructor(
    private service: TodoService,
    private route: ActivatedRoute,
    private store$: Store<fromRoot.AppState>) {
      console.log('1.执行todo构造函数');
      this.todos = this.service.getTodosState(route);
    }
    ngOnInit() {
      console.log('1.执行todo ngOnInit');
    }

    addTodo(desc: string): void {
        const todoToAdd = {
          id: UUID.UUID(),
          desc: desc,
          completed: false,
          userId: this.todos.do(todos => todos[0].id)
        };
        this.store$.dispatch({
          type: TodoRequestType.ADD_TODO,
          payload: todoToAdd
        });
    }
    toggleTodo(todo: Todo): void {
      this.store$.dispatch({
        type: TodoRequestType.TOGGLE_TODO,
        payload: todo
      });
    }
    removeTodo(todo: Todo): void {
      this.store$.dispatch({
        type: TodoRequestType.REMOVE_TODO,
        payload: todo
      });
    }
    toggleAll(): void {
      this.store$.dispatch({
        type: TodoRequestType.TOGGLE_ALL
      });
    }
    clearCompleted(): void {
      this.store$.dispatch({
        type: TodoRequestType.CLEAR_COMPLETED
      });
    }
}
