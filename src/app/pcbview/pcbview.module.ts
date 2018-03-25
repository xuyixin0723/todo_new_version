import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcbviewComponent } from './pcbview.component';
import { PcbviewRoutingModule } from './pcbview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PcbviewRoutingModule
  ],
  declarations: [
    PcbviewComponent
  ]
})
export class PcbviewModule { }
