import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PcbviewComponent } from './pcbview.component';

const routes: Routes = [
    {
        path: 'pcbview',
        component: PcbviewComponent,
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'pcbview'
        //     },
        //     {
        //         path: 'pcbview',
        //         component: PcbviewComponent
        //     }
        // ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PcbviewRoutingModule { }
