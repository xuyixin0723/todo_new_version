import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'todo',
    redirectTo: 'todo/ALL'
  },
  {
    path: 'playground',
    loadChildren: 'app/playground/playground.module#PlaygroundModule',
  },
  {
    path: 'manual',
    loadChildren: 'app/manual/manual.module#ManualModule',
  }
  // {
  //   path: 'manual',
  //   redirectTo: 'manual/operation'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
