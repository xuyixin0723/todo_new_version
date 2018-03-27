// 这里将此todo模块的所有reducer进行合并
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromTodos from './todo.reducer';
import * as fromFilter from './todo.filter.reducer';

// 将此模块的所有state进行了合并,统一为一个State
export interface TodosState {
    todos: fromTodos.State;
    todoFilter: fromFilter.State;
}
// 汇总state
export interface State {
    todoState: TodosState;
}
// 这个地方报的错误,是可以正常使用的
export const reducers: ActionReducerMap<TodosState> = {
    todos: fromTodos.todoReducer,
    todoFilter: fromFilter.todoFilterReducer
};

// 注册一个状态库名字为auth,这个名字是在modul里面注册的名字,需要一样
export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodoStatusState = createSelector(
    selectTodosState,
    (state: TodosState) => state.todos
);

export const getTodos = createSelector(
    selectTodoStatusState,
    fromTodos.getTodos
);

export const selectTodoFilterState = createSelector(
    selectTodosState,
    (state: TodosState) => state.todoFilter
);

export const getTodoFilter = createSelector(
    selectTodoFilterState,
    fromFilter.getTodoFilter
);
