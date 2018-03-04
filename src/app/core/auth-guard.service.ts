import { Auth } from './../domain/entities';
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


@Injectable()
export class AuthGuardService implements CanLoad, CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;

    // return this.authService.getAuth()
    // .map(auth => !auth.hasError); // 这里不需要有subscribe 可能是因为它是二传手，canActivate赋值的地方有angular内部自己实现了
    // 也许正因为如此， login时的next是它最早拿到，而onSubmit和todo的ngOnInit都是要依靠subscribe来拿到
    return this.authService.getAuth()
      .map(auth => {
        if (auth.hasError === true) {
          this.router.navigate(['login']); // 如果这句话不写，意味着验证失败时原先是什么页面就还是什么页面，如果写了可以在失败的时候转到navigate去的路由
          return false;
        } else {
          return true;
        }
      });

  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  // 与canActivate同理，它的subscribe等于是元数据交由angular底层自行实现了
  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;

    return this.authService.getAuth()
      .map(auth => {
        if (auth.hasError === true) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      });
  }
}

