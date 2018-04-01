import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { PcbviewService } from './../pcbview.service';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
// import { Store } from '@ngrx/store';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as fromPcbviewActions from '../actions/pcbview.actions';
import { Components } from '../models/componentsDB';
import { NotifyService } from '../service/notify';
import { DatabaseService } from './../service/database.service';
// import * as fromRoot from '../../reducers';

@Injectable()
export class PcbviewEffects {
    @Effect()
    updateData$ = this.actions$
        .ofType(fromPcbviewActions.PcbViewActionsType.LOAD_LOCAL_DATA)
        // 这里重点,对于没有payload的action,请使用swidtMap或者do,map需要会出错
        .switchMap(_ => {
            let hasLocalData = true;
            return this.pcbviewService.getComponents()
                    .switchMap((remoteData) =>
                        this.dbService.getAllItems()
                            .map((queryRes) => {
                                if ( queryRes.length !== 0 ) { // 如果本地数据库有数据返回
                                    console.log('本地有数据');
                                    return queryRes; // 返回本地数据
                                }
                                hasLocalData = false;
                                return remoteData; // 本地没有数据返回服务器的数据
                            })
                    )
                    .do((res) => {
                        if (hasLocalData === false) { // 如果本地数据为空,那么将服务器的数据写入本,异步方式
                            for (let i = 0; i < res.length; i++) {
                                this.dbService.setItem(`${i}`, res[i]).subscribe(item => console.log(item));
                            }
                        }

                    })
                    .map((res) => {
                        if ( hasLocalData === true) {
                            return new fromPcbviewActions.LoadDataSuccessAction(res as Components[]);
                        }
                        return new fromPcbviewActions.FetchAction(res as Components[]);
                    });
              })
        .catch(err => {
            console.log(err);
            return of(err);
        });
    constructor(
        private actions$: Actions,
        private pcbviewService: PcbviewService,
        private notify: NotifyService,
        // private store$: Store<fromRoot.AppState>,
        private dbService: DatabaseService
    ) {}
    // 这里暂时没有做的那么考究,只是为了演示
    compareArray(a1: Components[], a2: Components[]): {isSame: boolean, index?: number} {
        if (a1 === a2) { return {isSame: true}; }
        if ((!a1 && a2) || (a1 && ! a2)) {return {isSame: false}; }
        if (a1.length !== a2.length) { return {isSame: false}; }
        for (let i = 0, n = a1.length; i < n; i++) {
            if (a1[i].id !== a2[i].id ||
                a1[i].X !== a2[i].X ||
                a1[i].Y !== a2[i].Y ||
                a1[i].W !== a2[i].W ||
                a1[i].H !== a2[i].H) {
                    return {isSame: false, index: i};
            }
        }
           return {isSame: true};
    }
}
