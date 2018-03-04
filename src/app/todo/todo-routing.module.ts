import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';

import { AuthGuardService } from '../core/auth-guard.service';

const routes: Routes = [
  {
    path: 'todo/:filter',
    canActivate: [AuthGuardService], // 可以注销此处 看看canLoad独自使用的效果
    component: TodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
