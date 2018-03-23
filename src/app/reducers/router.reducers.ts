import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params, } from '@angular/router';
import { createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export type RouterState = RouterReducerState<RouterStateUrl>;

export const reducer = routerReducer;
// The RouterStateSnapshot is a large complex structure
// This can cause performance issues when used with the Store Devtools
// In most cases, you may only need a piece of information from the RouterStateSnapshot
// In order to pare down the RouterStateSnapshot provided during navigation,
// you provide a custom serializer for the snapshot to only return what you need
// to be added to the payload and store.
// reducer ngrx已经帮我实现了
// @ngrx/router-store 可以让你定义一个格式化的功能，将自己需要的部分映射到
// @ngrx/store 提供的 store 上，并在路由跳转的时候，自动监听并更新相应的值
export class CustomeSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        // 获取当前需要跳转的网址比如从/login到/login/todo/ALL,
        // 那么这个值就是/todo/ALL
        const { url } = routerState;
        // queryParams就是查询的参数,比如 /todo/ALL?id=1,那么就是{queryParams: {id: 1}}
        // routerState.root是指当前的网址作为相对路径查找
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;

        // while循环,为查找参数,比如/member/report/3
        // 通过while循环一层一层找出3
        // 这里是/todo/ALL,通过while循环后找出的是ALL
        while (state.firstChild) {
            state = state.firstChild;
        }
        // {filter: "ALL"}
        const { params } = state;
        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, queryParams, params };
    }
}
// 导出获取RouterState接口
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');
