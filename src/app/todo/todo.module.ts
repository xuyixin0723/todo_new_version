import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HttpModule } from '@angular/http';

import { TodoRoutingModule } from './todo-routing.module';

import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoService } from './todo.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './effects/todo.effects';
@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    TodoRoutingModule,
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoListComponent
  ],
  // providers: [
  //   { provide: 'todoService', useClass: TodoService }
  // ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
