// 这里将此todo模块的所有reducer进行合并
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromTodos from './todo.reducer';
import * as fromFilter from './todo.filter.reducer';
import { TodoRequestType } from '../actions/todo.action';
import { VisibilityFilters } from '../actions/todo.filter.action';

// 将此模块的所有state进行了合并,统一为一个State
export interface TodosState {
    todos: fromTodos.State;
    todoFilter: fromFilter.State;
}
// 汇总state
export interface State {
    todoState: TodosState;
}
export const TODOS = 'todos';
export type TODOS = 'todos';
export const TODOFILTER = 'todoFilter';
export type TODOFILTER = 'todoFilter';
const todoRequestType: TodoRequestType = null;
const visibilityFilters: VisibilityFilters = null;

export function getReducers(): ActionReducerMap<TodosState> {
    return {
        todos: fromTodos.todoReducer,
        todoFilter: fromFilter.todoFilterReducer
    };
}

export function createNamedWrapperReducer<T>(
    reducerFunction: ( ( state, action ) => T ), reducerName: string ): ( ( state, action ) => T ) {
    return ( state, action ) => {
        const { name } = action;
        const isInitializationCall = state === undefined;
        if ( name !== reducerName && !isInitializationCall ) {
            return state;
        }

        return reducerFunction( state, action );
    };
}

// 注册一个状态库名字为auth,这个名字是在modul里面注册的名字,需要一样
export const selectTodosState = createFeatureSelector<TodosState>('todosState');


// const initialTodosState = fromTodos.initialState;
// const initialFilterState = fromFilter.initialState;

// export function getInitialState() {
//     return {...initialTodosState, ...initialFilterState};
// }

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
