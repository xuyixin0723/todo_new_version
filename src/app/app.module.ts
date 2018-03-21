// import { PlaygroundModule } from './playground/playground.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 没有这个动画，下拉菜单下不来
import { MaterialModule } from './shared/material/material.module';

import { StoreModule } from '@ngrx/store';

import * as forAuth from './login/reducers';
import * as forTodos from './todo/reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    TodoModule,
    // PlaygroundModule,
    LoginModule,
    BrowserAnimationsModule, // 没有这个动画，下拉菜单下不来
    MaterialModule,
    StoreModule.forRoot({})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
