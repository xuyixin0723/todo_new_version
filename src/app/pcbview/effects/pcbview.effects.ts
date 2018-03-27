import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { PcbviewService } from './../pcbview.service';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
// import { Store } from '@ngrx/store';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as fromPcbviewActions from '../actions/pcbview.actions';
import { Components } from '../models/componentsDB';
// import * as fromRoot from '../../reducers';

@Injectable()
export class PcbviewEffects {
    @Effect({ dispatch: false })
    // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/defer.md
    // https://buctwbzs.gitbooks.io/rxjs/content/deffer.html
    openDB$: Observable<any> = defer(() => { // 延迟创建,
      console.log('数据库被打开');
      return this.db.open('pcbview_components', 1); // 之前存储的数据库名字
    });

    @Effect()
    updateData$ = this.actions$
        .ofType(fromPcbviewActions.PcbViewActionsType.LOAD_LOCAL_DATA)
        // 这里重点,对于没有payload的action,请使用swidtMap或者do,map需要会出错
        .switchMap(_ =>
           this.db.query('components') // 从本地indexDB中读取数据
               .toArray()
               .map((queryRes: Components[]) => {
                    if ( queryRes.length !== 0 ) {
                        return new fromPcbviewActions.LoadDataSuccessAction(queryRes);
                    } else { // 如本地没有将从服务器上获取最新的数据然后存储到本地的indexDB中
                        return this.pcbviewService.getComponents().map((res) => {
                            for (let i = 0; i < res.length; i++) {
                                this.db.insert('components', [res[i]]).subscribe((resa) => {console.log(i); });
                            }
                            return new fromPcbviewActions.FetchAction(res);
                        });
                    }
                 },
                 err => { console.log(err); }
        ))
        .catch(err => {
            console.log(err);
            return of(err);
        });
    // @Effect({ dispatch: false })
    // fetchData$ = this.actions$
    //     .ofType(fromPcbviewActions.PcbViewActionsType.FETCH_FROM_API)
    //     .map((action: fromPcbviewActions.FetchAction) => action.payload)
    //     .flatMap(c);
    constructor(
        private actions$: Actions,
        private pcbviewService: PcbviewService,
        // private store$: Store<fromRoot.AppState>,
        private db: Database
    ) {}
}
