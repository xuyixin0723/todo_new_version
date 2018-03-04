import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '../domain/entities';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

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

}
