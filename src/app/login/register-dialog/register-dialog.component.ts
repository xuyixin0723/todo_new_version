import { AuthService } from './../../core/auth.service';
import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Inject
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription'; // 用于订阅类型的强类型检测， 第8章提前讲的课里面有涉及
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { AuthActionType } from './../actions/auth.action';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';


import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from '@angular/material'; // 为了使用@angular/material库里面的dialog，作者代码用的是mdl

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  // @ViewChild('firstElement') private inputElement;
  regForm: FormGroup;
  processingRegister = false;
  // private subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store$: Store<fromRoot.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any) { // 这里使用@Inject是因为注入的是第三方库，我们不关心查找它的引用
    this.regForm = fb.group({
      // login中username要求至少3个字符，那注册是理应也要有3个字符，作者不设minLength是不对的，必须增加Validators.minLength(3)
      'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'passwords': fb.group({
        'password': new FormControl('', Validators.required),
        'repeatPassword': new FormControl('', Validators.required)
      }, { validator: this.passwordMatchValidator })
    });
    // just if you want to be informed if the dialog is hidden
    // 我们使用的是@angular/material, 所以要做相应的修改
    this.dialogRef.afterClosed().subscribe((auth) => {
      console.log('login dialog closed');
      if (auth) {
        console.log('authenticated user', auth);
      }
    });
    // this.dialogRef.afterOpen().subscribe(() => {
    //   this.inputElement.setFocus();
    // }); // opendialog时设置了autoFocus就不用写这种代码了
  }

  ngOnInit() {

  }

  passwordMatchValidator(group: FormGroup) {
    // 作者极为粗心，关于pristine是input组件特有的属性，如果是true代表没有输入过
    // 所以也就是“无污染的”，一旦有过输入那就是dirty了
    // 作者第一个逻辑分之明显只能对控件pristine比较，如果这里加上.value那就成字符串了
    // 字符串是不会有pristine属性的，所以如果这里不把.value去掉永远不会进第一个逻辑分之
    const password = group.get('password'); // .value;
    const confirm = group.get('repeatPassword'); // .value;

    // Don't kick in until user touches both fields
    if (password.pristine || confirm.pristine) {
      return null;
    }
    if (password.value === confirm.value) { // 这里反而要把.value加上去，是拿input组件里面的value比较
      return null;
    }

    return { 'mismatch': 'Note: password not match!' }; // 补充作者没有完成的重复密码不匹配的报错信息
    // return 'password and repeat password are not matched!';
  }

  public register() {
    this.processingRegister = true;
    // this.statusMessage = 'processing your registration ...'; // 改为密码不匹配, 这个有状态进度spinner没必要再显示一句话了

    // 作者演示了如何获取一个订阅的Observable对象，其实如果没有单独在其它成员函数中使用只是单纯的局部变量，
    // 那是没必要这么做得，这还意味着ngOnDestroy还要取消订阅，不这么做还会有内存泄漏风险
    // this.subscription = this.authService
    // this.authService
    //     .register(
    //     this.regForm.get('username').value,
    //     this.regForm.get('passwords').get('password').value);
    this.store$.dispatch({
      type: AuthActionType.REGISTER,
      payload: {
        id: null,
        username: this.regForm.get('username').value,
        password: this.regForm.get('passwords').get('password').value
      }
    });
    this.processingRegister = false;
    setTimeout( () => {
        this.dialogRef.close();
        this.router.navigate(['todo']);
    }, 1500);
  }

  // 作者这段代码是基于mdl库, @angular/material的对话框默认就支持ESC退出
  // 但是对事件的监听还是掌握 @HostListener
  // @HostListener('keydown.esc')
  // public onEsc(): void {
  //   if (this.subscription !== undefined) {
  //     this.subscription.unsubscribe();
  //   }
  //   this.dialogRef.close();
  // }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
