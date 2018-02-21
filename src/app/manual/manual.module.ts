import { TodoService } from './../todo/todo.service';
import { ManualRoutingModule } from './manual-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualComponent } from './manual.component';
import { OperationComponent } from './operation/operation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SpcComponent } from './spc/spc.component';


@NgModule({
  imports: [
    CommonModule,
    ManualRoutingModule
  ],
  declarations: [
    ManualComponent,
    OperationComponent,
    MaintenanceComponent,
    SpcComponent
  ],
  // providers: [
  //   TodoService
  // ],
})
export class ManualModule { }
