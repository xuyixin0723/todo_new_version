import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { TodoService } from './todo.service';
import { Todo } from './models/todo';

import { TodoService } from './todo.service';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { TodoRequestType } from './actions/todo.action';
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

  constructor(
    private service: TodoService,
    private route: ActivatedRoute) {
      this.todos = this.service.getTodosState(route);
    }
    ngOnInit() {
    }

    addTodo(desc: string): void {
      this.service.addTodo(desc);
    }
    toggleTodo(todo: Todo): void {
      this.service.toggleTodo(todo);
    }
    removeTodo(todo: Todo): void {
      this.service.deleteTodo(todo);
    }
    toggleAll(): void {
      this.service.toggleAll();
    }
    clearCompleted(): void {
      this.service.clearCompleted();
    }
}
