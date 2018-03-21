import { Todo } from '../models/todo';
import { TodoRequestType, TodoRequestActions } from '../actions/todo.action';

// 这里相当于本地的状态库
export interface State {
  todos: Todo[];
}

export const initialState: State = {
  todos: []
};
// 这里的Action是我们在todo.action里面导出的TodoRequestActions
export const todoReducer = (state = initialState, action: TodoRequestActions) => {
  switch (action.type) {
    case TodoRequestType.ADD_TODO:
      return {
        todos: [
          ...state.todos,
          action.payload
        ]
      };
    case TodoRequestType.REMOVE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    case TodoRequestType.TOGGLE_TODO:
      return {
        todos: state.todos.map(todo => {
                  if (todo.id !== action.payload.id) {
                    return todo;
                  }
                  return Object.assign({}, todo, {completed: !todo.completed});
               })
      };
    case TodoRequestType.TOGGLE_ALL:
      return {
        todos: state.todos.map(todo => {
                 return Object.assign({}, todo, {completed: !todo.completed});
               })
      };
    case TodoRequestType.CLEAR_COMPLETED:
      return {
        todos: state.todos.filter(todo => !todo.completed)
      };
    case TodoRequestType.FETCH_FROM_API:
      return {
        todos: [
          ...action.payload
        ]
    };
    default:
      return state;
  }
};

export const getTodos = (state: State) => state.todos;
