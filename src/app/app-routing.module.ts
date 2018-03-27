import { AuthGuardService } from './core/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'todo',
    // canLoad: [AuthGuardService], // canLoad只针对惰性加载模块有效，作者这里完全是误用，可通过设置断点观察，用在这里，对应的函数永远不会响应
    redirectTo: 'todo/ALL',
  },
  {
    path: 'playground',
    // canLoad: [AuthGuardService],
    loadChildren: 'app/playground/playground.module#PlaygroundModule',

  },
  {
    path: 'manual',
    loadChildren: 'app/manual/manual.module#ManualModule',
  },
  {
    path: 'pcbview',
    redirectTo: 'pcbview',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }) // 经过实验，在不使用useHash的情况下，无论是惰性加载还是直接加载，只要在浏览器输入路由app.component.ts都会相应ngOnInit
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
