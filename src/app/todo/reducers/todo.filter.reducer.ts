import { VisibilityFilters } from './../actions/todo.filter.action';
import { Todo } from '../models/todo';
import { Action } from '@ngrx/store';

export interface State {
  todoFilter: any;
}
// 初始值
export const initialState: State = {
  todoFilter: (todo: Todo) => todo
};

export const todoFilterReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case VisibilityFilters.SHOW_ALL:
        return {
          todoFilter: (todo: Todo) => todo
        };
      case VisibilityFilters.SHOW_ACTIVE:
        return {
          todoFilter: (todo: Todo) => !todo.completed
        };
      case VisibilityFilters.SHOW_COMPLETED:
        return {
          todoFilter: (todo: Todo) => todo.completed
        };
      default:
        return state;
    }
};

export const getTodoFilter = (state: State) => state.todoFilter;
