import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule,
        ReactiveFormsModule, // 要使用响应式表单，必须导入该模块
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects])
    ],
    entryComponents: [RegisterDialogComponent], // 这里不设置将无法正确跳出对话框
    declarations: [LoginComponent, RegisterDialogComponent]
})
export class LoginModule { }
