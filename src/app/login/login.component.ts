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

import { Auth } from '../domain/entities';


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
        transform: 'scale(1.5)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('1.5s ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;
  loginBtnState = 'inactive';

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service
      .loginWithCredentials(this.username, this.password) // 之前是formValue.login.username的写法，现在改回this.username, 这是为了美观的代价
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          // this.router.navigate(['todo']);
          this.router.navigate(['/todo']);
        } // 异常处理应该写在这里，只是作者没有写
      });
  }

  toggleLoginState(stat: boolean) {
    this.loginBtnState = stat ? 'active' : 'inactive';
  }

}
