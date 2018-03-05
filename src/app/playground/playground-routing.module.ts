import { AuthGuardService } from './../core/auth-guard.service';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { PlaygroundComponent } from './playground.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuardService], // 为了第7章展示方便，取消playground的路由守卫
        component: PlaygroundComponent,
        children: [
            {
                path: 'one',
                component: OneComponent
            },
            {
                path: 'two',
                component: TwoComponent,
                children: [
                    {
                        path: 'three',
                        component: ThreeComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlaygroundRoutingModule { }
