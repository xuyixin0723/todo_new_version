import { Action } from '@ngrx/store';
import { Todo } from '../../../domain/entities';

// 这里将作者的代码进行了修改,更改为枚举的形式
export enum TodoRequestType {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  TOGGLE_ALL = 'TOGGLE_ALL',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
  FETCH_FROM_API = 'FETCH_FROM_API'
}
// 这里同样进行更改枚举的操作
export enum VisibilityFilters {
  SHOW_ALL = 'ALL',
  SHOW_COMPLETED = 'COMPLETED',
  SHOW_ACTIVE = 'ACTIVE'
}

// 手动实现Action的payload,AddTodo是添加一条新的todo,
// 所以负载payload是Todo类型
export class AddTodoAction implements Action {
  readonly type = TodoRequestType.ADD_TODO;
  constructor( public payload: Todo ) {}
}
// 需要携带被删除的一条todo
export class RemoveTodoAction implements Action {
  readonly type = TodoRequestType.REMOVE_TODO;
  constructor( public payload: Todo ) {}
}
// 需要携带被反转的一条todo
export class ToggleTodoAction implements Action {
  readonly type = TodoRequestType.TOGGLE_TODO;
  constructor( public payload: Todo ) {}
}

// 这里需要注意,toggleAll行为并没有携带数据给reducer
export class ToggleAllAction implements Action {
  readonly type = TodoRequestType.TOGGLE_ALL;
}

export class ClearCompletedAction implements Action {
  readonly type = TodoRequestType.CLEAR_COMPLETED;
}
// 从服务器上获取最新的todos所有数据,要初始化本地的todos
export class FetchTodosAction implements Action {
  readonly type = TodoRequestType.FETCH_FROM_API;
  constructor( public payload: Todo[] ) {}
}

export type TodoRequestActions =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction
  | ToggleAllAction
  | ClearCompletedAction
  | FetchTodosAction;
