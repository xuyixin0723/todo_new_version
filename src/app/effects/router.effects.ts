import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/*
* `Location` is responsible for normalizing the URL against the application's base href.
* A normalized URL is absolute from the URL host, includes the application's base href, and has no
* trailing slash:
* - `/my/app/user/123` is normalized
* - `my/app/user/123` **is not** normalized
* - `/my/app/user/123/` **is not** normalized
**/
import { Location } from '@angular/common';

import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRouter from '../actions/router.actions';

import 'rxjs/add/operator/do'; // tap被重命名为do了,在rxjs 5版本后
import 'rxjs/add/operator/map';

@Injectable()
export class RouterEffects {

    @Effect({ dispatch: false })
    navigate$ = this.actions$
        .ofType(fromRouter.GO)
        .map((action: fromRouter.Go) => action.payload)
        .do(({ path, query: queryParams, extras}) => {
            this.router.navigate(path, {queryParams, ...extras});
        });

    @Effect({dispatch: false})
    navigateBack$ = this.actions$
        .ofType(fromRouter.BACK)
        .do(() => this.location.back);

    @Effect({dispatch: false})
    navigateForward$ = this.actions$
        .ofType(fromRouter.FORWARD)
        .do(() => this.location.forward);
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) { }
}
