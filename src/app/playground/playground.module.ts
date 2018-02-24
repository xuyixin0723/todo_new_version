
import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    PlaygroundRoutingModule // 勿忘此处imports自己的路由模块，不这么写编译不会报错，只会�, OneComponent�, TwoComponent, ThreeComponent运行时有奇怪的异常
  ],
  declarations: [
    PlaygroundComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent
  ]
})
export class PlaygroundModule { }
