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
    selectedComponentId?: string | number | null;
}

export const adapter: EntityAdapter<Components> = createEntityAdapter<Components>({
    // 如果我们只想要高性能而不需要在CRUD操作中进行排序，我们应该将sortComparer值设置为false
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
   // selectedComponentId: null,
});

export const pcbviewReducer = (state = initialState, action: PcbViewActions) => {
    switch (action.type) {
      case PcbViewActionsType.LOAD_DATA_SUCCESS:
        return adapter.addAll(action.payload, state);
      case PcbViewActionsType.FETCH_FROM_API:
        return adapter.addAll(action.payload, state);
    //   case PcbViewActionsType.LOAD_LOCAL_DATA:
    //     return state;

      default:
        return state;
    }
};

export const getComponentId = (state: State) => state.selectedComponentId;


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
