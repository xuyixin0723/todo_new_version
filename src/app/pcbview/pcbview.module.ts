import { SharedModule } from './../shared/shared.module';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';

import { PcbviewComponent } from './pcbview.component';
import { PcbviewRoutingModule } from './pcbview-routing.module';
import { PcbviewService } from './pcbview.service';

import { PcbviewEffects } from './effects/pcbview.effects';
import { HttpClientModule } from '@angular/common/http';
// import { schema } from './models/componentsDB';
import { NotifyService } from './service/notify';
import { NgForageModule, NgForageConfig, NgForageOptions } from '@ngforage/ngforage-ng5';
import { DatabaseService } from './service/database.service';

import * as fromFeature from './reducers';
export const FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<fromFeature.ComponentState>>('Feature Reducers');
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    PcbviewRoutingModule,
    StoreModule.forFeature('components', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([PcbviewEffects]),
    NgForageModule // 将ngforage模块导入
  ],
  declarations: [
    PcbviewComponent
  ],
  providers: [
    PcbviewService,
    DatabaseService,
    NotifyService,
    { provide: FEATURE_REDUCER_TOKEN, useFactory: fromFeature.getReducers}
  ]
})
export class PcbviewModule {
  constructor(conf: NgForageConfig) {
    // Set the database name
    conf.name = 'ComponentsDB';
    // 数据库的描述，一般是提供给开发者的,默认值为''
    conf.description = 'Database used for offline storage of components.';
    // Set the store name (e.g. in IndexedDB this is the dataStore)
    conf.storeName = 'Components_store';
    // Set driver to local storage
    // conf.driver = NgForageConfig.DRIVER_LOCALSTORAGE;
    /**
     * Set the driver to indexed db if available,
     * falling back to websql
     * falling back to local storage
     * 当浏览器不支持indexed的时候使用websql，不支持websql使用localstorage
     */
    conf.driver = [
      NgForageConfig.DRIVER_INDEXEDDB,
      NgForageConfig.DRIVER_WEBSQL,
      NgForageConfig.DRIVER_LOCALSTORAGE
    ];
    // Set websql database size
    conf.size = 1024 * 1024 * 4;
    // Set DB version. Currently unused.
    conf.version = 2.0;
    // const bulk: NgForageOptions = {
    //   version: 1,
    //   name: 'newDatabase'
    // };
    // conf.configure(bulk);
  }
}
