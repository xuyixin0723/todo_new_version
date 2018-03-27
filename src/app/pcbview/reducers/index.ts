import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromPcbview from './pcbview.reducer';

export interface ComponentState {
    components: fromPcbview.State;
}

export const reducers: ActionReducerMap<ComponentState> = {
    components: fromPcbview.pcbviewReducer
};
// createFeatureSelector创建特性的selector,并起一个名字
export const selectComponentState = createFeatureSelector<ComponentState>('components');

export const selectComponentEntitiesState = createSelector(
    selectComponentState,
    state => state.components
  );


export const {
    // select the array of user ids
    selectIds: selectComponentIds,

    // select the dictionary of user entities
    selectEntities: selectComponentEntities,

    // select the array of users
    selectAll: selectAllComponents,

    // select the total user count
    selectTotal: selectComponentTotal
  } = fromPcbview.adapter.getSelectors(selectComponentEntitiesState);

// export const selectCurrentComponentId = createSelector(selectComponentState, fromPcbview.getComponentId);

// export const selectCurrentUser = createSelector(
//     selectComponentEntities,
//     selectCurrentComponentId,
//     (componentEntities, componentId) => componentEntities[componentId]
//   );
