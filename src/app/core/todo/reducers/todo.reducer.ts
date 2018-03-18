import { Action } from '@ngrx/store';
import { Todo } from '../../../domain/entities';
import { TodoRequestType, VisibilityFilters, TodoRequestActions } from '../actions/todo.action';

// 这里的Action是我们在todo.action里面导出的TodoRequestActions
export const todoReducer = (state: Todo[] = [], action: TodoRequestActions) => {
  switch (action.type) {
    case TodoRequestType.ADD_TODO:
      return [
          ...state,
          action.payload
          ];
    case TodoRequestType.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    case TodoRequestType.TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return Object.assign({}, todo, {completed: !todo.completed});
      });
    case TodoRequestType.TOGGLE_ALL:
      return state.map(todo => {
        return Object.assign({}, todo, {completed: !todo.completed});
      });
    case TodoRequestType.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);
    case TodoRequestType.FETCH_FROM_API:
      return [
        ...action.payload
      ];
    default:
      return state;
  }
};

export const todoFilterReducer = (state = (todo: Todo) => todo, action: Action) => {
  switch (action.type) {
    case VisibilityFilters.SHOW_ALL:
      return todo => todo;
    case VisibilityFilters.SHOW_ACTIVE:
      return todo => !todo.completed;
    case VisibilityFilters.SHOW_COMPLETED:
      return todo => todo.completed;
    default:
      return state;
  }
};
