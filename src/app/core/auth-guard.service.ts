import { Auth } from '../login/models/auth';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthGuardService implements CanLoad,
                                         CanActivate,
                                         CanActivateChild {

  constructor(private router: Router,
              private store$: Store<fromRoot.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.store$
               .select(fromRoot.fromAuth.getAuth)
               // 当存在错误的时候,取反为false,那么界面将不会跳转
               .map(auth => !auth.hasError);
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;

    return this.store$
               .select(fromRoot.fromAuth.getAuth)
               .map( auth => !auth.hasError);
  }
}

