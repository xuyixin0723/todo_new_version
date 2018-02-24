import { NgModule } from '@angular/core';
import { ManualRoutingModule } from './manual-routing.module';

// import { CommonModule } from '@angular/common';
import { ManualComponent } from './manual.component';
import { OperationComponent } from './operation/operation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SpcComponent } from './spc/spc.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    ManualRoutingModule,
    SharedModule
  ],
  declarations: [
    ManualComponent,
    OperationComponent,
    MaintenanceComponent,
    SpcComponent
  ]
})
export class ManualModule { }
