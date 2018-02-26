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
      .then(auth => {
        const redirectUrl = (auth.redirectUrl === null) ? '/todo' : auth.redirectUrl;
        if (!auth.hasError) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }

}
