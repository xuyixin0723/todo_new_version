import { Auth } from './login/models/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  auth: Auth;
  fillerNav = Array(5).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  constructor(private service: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.service
      .getAuth() // 因为getAuth返回的Observable对象是ReplaySubject，所以每次初始化这个组件时就会因为subscribe得到最近的一次值
      .subscribe(auth => this.auth = Object.assign({}, auth)); // 异常处理可以改到此处来
  }
  login() {
    this.router.navigate(['login']);
  }
  logout() {
    this.service.unAuth();
    this.auth = null;
    this.router.navigate(['login']);
  }
}
