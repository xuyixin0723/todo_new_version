// import { PlaygroundModule } from './playground/playground.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 没有这个动画，下拉菜单下不来
import { MaterialModule } from './shared/material/material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import {RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import * as fromRoot from './reducers';
import { RouterEffects } from './effects/router.effects';
import { PcbviewModule } from './pcbview/pcbview.module';
import { schema } from './pcbview/models/componentsDB';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    TodoModule,
    // PlaygroundModule,
    LoginModule,
    PcbviewModule,
    BrowserAnimationsModule, // 没有这个动画，下拉菜单下不来
    MaterialModule,
    StoreModule.forRoot(fromRoot.reducers, {}), // 这里必须引入,否则将会出错
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    DBModule.provideDB(schema) // 将indexdb数据库在这里导入
  ],
  // 使用ngrx/router需要在这里定义
  providers: [ {provide: RouterStateSerializer, useClass: fromRoot.CustomeSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
