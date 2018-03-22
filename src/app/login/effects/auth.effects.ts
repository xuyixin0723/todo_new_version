import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/of';
import 'rxjs/add/operator/tap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catchError';

import * as fromAuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
    // effects的作用是作为粘合剂,将action与其他服务进行结合
    @Effect()
    login$ = this.actions$
        .ofType(fromAuthActions.AuthActionType.LOGIN)
        .map((action: fromAuthActions.LoginAction) => action.payload);

    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService
    ) {}
}
