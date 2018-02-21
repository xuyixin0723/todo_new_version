
import { OperationComponent } from './operation/operation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SpcComponent } from './spc/spc.component';

import { ManualComponent } from './manual.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';


const routes: Routes = [
    {
        path: '',
        // canActivateChild: [AuthGuardService], // canActivateChild是对下一级所有子路由的路由守卫
        component: ManualComponent,
        // redirectTo: 'manual/operation',
        // redirectTo: 'operation',

        children: [
            {
                path: '', // 这是默认进入operation这个子路由的意思
                redirectTo: 'operation'
            },
            {
                path: 'operation',
                component: OperationComponent
            },
            {
                path: 'maintenance',
                // canActivate: [AuthGuardService], // 这里是具体的某一个子路由的路由守卫，所以反而只能是canActivate有效
                component: MaintenanceComponent,
            },
            {
                path: 'spc',
                component: SpcComponent,
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManualRoutingModule { }
