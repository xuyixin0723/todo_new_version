import { Components } from './../models/componentsDB';
import { PcbViewActionsType, PcbViewActions } from '../actions/pcbview.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// export interface State {
//     components: ComponentsDB[];
// }

// export const initialState: State = {
//     components: []
// };

export interface State extends EntityState<Components> {
    // 这个属性是记录服务器数据与本地数据是否不一样,如果不一样需要更新本地数据从服务器
    IdbStatus?: boolean; // 没有使用
    // 这里我们可以自定义一些其他的属性,
    // 比如被选择的元器件id,这里我暂时没有使用
}
// 创建适配器实例,讲解 https://www.jianshu.com/p/9d0575311214
// 这里由@ngrx/entity的适配器创建统一接口并帮我们管理state
// https://github.com/ngrx/platform/blob/master/docs/entity/adapter.md
export const adapter: EntityAdapter<Components> = createEntityAdapter<Components>({
    // 如果我们只想要高性能而不需要在CRUD操作中进行排序，我们应该将sortComparer值设置为false
    sortComparer: false
});
// 初始值
export const initialState: State = adapter.getInitialState({
    // IdbStatus: false,
});

export const pcbviewReducer = (state = initialState, action: PcbViewActions) => {
    switch (action.type) {
      case PcbViewActionsType.LOAD_DATA_SUCCESS:
        // 调用EntityAdapter的addAll方法,一次性添加多个componnet数据
        // 当然还有添加一个addOne,addMany等等方法
        return adapter.addAll(action.payload, state);
      case PcbViewActionsType.FETCH_FROM_API:
        return adapter.addAll(action.payload, state);
      case PcbViewActionsType.LOAD_LOCAL_DATA:
        return state;
    //   case PcbViewActionsType.UPDATE_DATA_PCBVIEW:
    //     return adapter.updateOne(action.payload, state);

      default:
        return state;
    }
};

// export const getIdbStatus = (state: State) => state.IdbStatus;


// export const {
//     // select the array of user ids
//     selectIds: selectComponentIds,

//     // select the dictionary of user entities
//     selectEntities: selectComponentEntities,

//     // select the array of users
//     selectAll: selectAllComponents,

//     // select the total user count
//     selectTotal: selectComponentTotal
//   } = adapter.getSelectors();
