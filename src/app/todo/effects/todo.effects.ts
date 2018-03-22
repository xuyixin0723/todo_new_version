import * as fromTodos from './../actions/todo.action';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { TodoService } from './../todo.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/concatMap';
@Injectable()
export class TodoEffects {
    // effects的作用是作为粘合剂,将action与其他服务进行结合

    @Effect({dispatch: false})
    addTodo$ = this.actions$
        .ofType(fromTodos.TodoRequestType.ADD_TODO)
        .map((action: fromTodos.AddTodoAction) => action.payload)
        // 一个一个值作为Observable发出
        .do((todo) => this.todoService.addTodo(todo));

    @Effect({dispatch: false})
    removeTodo$ = this.actions$
        .ofType(fromTodos.TodoRequestType.REMOVE_TODO)
        .map((action: fromTodos.RemoveTodoAction) => action.payload)
        .do((todo) => this.todoService.deleteTodo(todo));

    @Effect({dispatch: false})
    toggleTodo$ = this.actions$
        .ofType(fromTodos.TodoRequestType.TOGGLE_TODO)
        .map((action: fromTodos.ToggleTodoAction) => action.payload)
        .do((todo) => this.todoService.toggleTodo(todo));

    @Effect({dispatch: false})
    toggleAll$ = this.actions$
        .ofType(fromTodos.TodoRequestType.TOGGLE_ALL)
        .do(() => this.todoService.toggleAll());

    @Effect({dispatch: false})
    clearCompleted$ = this.actions$
        .ofType(fromTodos.TodoRequestType.CLEAR_COMPLETED)
        // .map((action: fromTodos.ClearCompletedAction) => action.payload)
        .do(() => this.todoService.clearCompleted());

    constructor(
        private actions$: Actions,
        private router: Router,
        private todoService: TodoService
    ) {}
}
