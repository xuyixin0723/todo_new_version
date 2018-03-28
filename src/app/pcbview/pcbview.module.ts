import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';

import { PcbviewComponent } from './pcbview.component';
import { PcbviewRoutingModule } from './pcbview-routing.module';
import { PcbviewService } from './pcbview.service';

import { reducers } from './reducers';
import { PcbviewEffects } from './effects/pcbview.effects';
import { HttpClientModule } from '@angular/common/http';
import { schema } from './models/componentsDB';
import { NotifyService } from './service/notify';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    PcbviewRoutingModule,
    StoreModule.forFeature('components', reducers),
    EffectsModule.forFeature([PcbviewEffects])
  ],
  declarations: [
    PcbviewComponent
  ],
  providers: [
    PcbviewService,
    NotifyService
  ]
})
export class PcbviewModule { }
