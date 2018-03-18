import { Todo, Auth } from './entities';

export { Todo, Auth };

// 这里相当于本地的状态库
export interface AppState {
    todos: Todo[];
    todoFilter: any;
    auth: Auth;
}
