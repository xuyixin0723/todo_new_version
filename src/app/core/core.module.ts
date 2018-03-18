import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
/**
 * 导入ngrx的module
 */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/**
 * 导入自定义Reducer
 */
import { todoReducer, todoFilterReducer } from './todo/reducers/todo.reducer';
import { authReducer } from './todo/reducers/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    // 这里不再使用provideStore了,而是forRoot
    StoreModule.forRoot({
      todos: todoReducer,
      todoFilter: todoFilterReducer,
      auth: authReducer
    })
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
