import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
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
import { NotifyService } from '../service/notify';
// import * as fromRoot from '../../reducers';

@Injectable()
export class PcbviewEffects {
    @Effect({ dispatch: false })
    // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/defer.md
    // https://buctwbzs.gitbooks.io/rxjs/content/deffer.html
    openDB$: Observable<any> = defer(() => { // 延迟创建,
      return this.db.open('pcbview_components', 1); // 之前存储的数据库名字
    });

    @Effect()
    updateData$ = this.actions$
        .ofType(fromPcbviewActions.PcbViewActionsType.LOAD_LOCAL_DATA)
        // 这里重点,对于没有payload的action,请使用swidtMap或者do,map需要会出错
        .switchMap(_ => {
            let hasData = true;
            return this.pcbviewService.getComponents()
                    .switchMap((res) =>
                        this.db.query('components') // 从本地indexDB中读取数据
                            .toArray()
                            .map((queryRes: Components[]) => {
                                const result = this.compareArray(queryRes, res);
                                if (!result.isSame) {
                                    console.log('Server data has changed, please update!');
                                    this.notify.send(true); // 通知更新
                                    // 正常应该需要将数据更新,然后通知用户,这里只为了演示
                                }
                                if ( queryRes.length !== 0 ) { // 如果本地数据库有数据返回
                                    return queryRes; // 返回本地数据
                                    // return new fromPcbviewActions.LoadDataSuccessAction(queryRes);
                                }
                                hasData = false;
                                return res; // 本地没有数据返回服务器的数据
                            })
                    )
                    .do((res) => {
                        if (hasData === false) { // 如果本地数据为空,那么将服务器的数据写入本,异步方式
                            for (let i = 0; i < res.length; i++) {
                                // 有哪些方法
                                // https://github.com/JimTheMan/db/blob/4f21f8509c8328b6fa8df2ee288164565caa4669/README.md
                                // 这里我发现不使用订阅会出现错误,Observable对象必须被订阅才能工作
                                this.db.insert('components', [res[i]]).subscribe((resa) => { console.log(resa); });
                            }
                        }

                    })
                    .map((res) => {
                        if ( hasData === true) {
                            return new fromPcbviewActions.LoadDataSuccessAction(res);
                        }
                        return new fromPcbviewActions.FetchAction(res);
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
        private db: Database
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
