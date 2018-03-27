import { AuthService } from './../core/auth.service';
import {
  Component,
  OnInit,
  trigger, // 用来定义整个动画触发器的
  state, // 用来定义动画状态
  style, // 用来定义动画样式
  transition, // 用来定义动画如何过渡的
  animate // 用来定义动画过渡时具体怎么动
} from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from './models/auth';

import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

import { Store } from '@ngrx/store';
import { AuthActionType } from './actions/auth.action';
import * as fromRoot from '../reducers';
import * as fromRouterActions from '../actions/router.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ // 动画具体设置的地方是在Component元数据里通过animations数组来实现
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;
  loginBtnState = 'inactive';

  // ---------->临时测试
  // animal: string;
  // name: string;
  // <----------临时测试

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store$: Store<fromRoot.AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // this.service
    //   .loginWithCredentials(this.username, this.password);
    this.store$.dispatch({
      type: AuthActionType.LOGIN,
      payload: {
        id: null,
        username: this.username,
        password: this.password
      }});
    // 订阅Login成功后的状态,如果确认成功了,将页面导航到todo界面
    this.store$.select(fromRoot.fromAuth.getAuth)
        .subscribe(res => {
          if (res.hasError !== true) {
              this.store$.dispatch({
                type: fromRouterActions.GO,
                payload: {
                  path: ['/todo']
                }
              });
          }
        });
  }

  toggleLoginState(stat: boolean) {
    this.loginBtnState = stat ? 'active' : 'inactive';
  }

  register() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '280px',
      height: '430px',
      autoFocus: true,
    });

    dialogRef.afterOpen().subscribe(result => {
      console.log('dialog visible');
    });
  }

  // ---------->临时测试
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(RegisterDialogComponent, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
  // <-----------临时测试
}
