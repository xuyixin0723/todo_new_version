// import { Observable } from 'rxjs/Rx';/..
import { Observable } from 'rxjs/Observable';
import {
  Component,
  OnInit,
  trigger, // 用来定义整个动画触发器的
  state, // 用来定义动画状态
  style, // 用来定义动画样式
  transition, // 用来定义动画如何过渡的
  animate, // 用来定义动画过渡时具体怎么动
  keyframes
} from '@angular/core';
import 'rxjs/add/observable/interval';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  animations: [
    trigger('signal', [
      state('void', style({
        'transform': 'translateY(-100%)'
      })),
      state('go', style({
        'background-color': 'green' // 这里等于是修改css中的样式属性了
      })),
      state('stop', style({
        'background-color': 'orange' // 这里等于是修改css中的样式属性了
      })),
      state('start', style({
        'background-color': 'cyan', // 这里等于是修改css中的样式属性了
        'height': '75px'
      })),
      state('end', style({
        'background-color': 'teal', // 这里等于是修改css中的样式属性了
        'height': '50px'
      })),
      // transition('void => *', animate(1000)),
      // transition('go => stop', animate(1000)),
      // transition('start => end', animate(1000)),
      // transition('* => *', animate('1.5s 1s ease-out')),
      transition('void => *', animate(5000, keyframes([
        style({ 'transform': 'scale(0)', 'padding': '0px' }),
        style({ 'transform': 'scale(0.1)', 'padding': '50px' }),
        style({ 'transform': 'scale(0.5)', 'padding': '100px' }),
        style({ 'transform': 'scale(0.9)', 'padding': '120px' }),
        style({ 'transform': 'scale(0.95)', 'padding': '135px' }),
        style({ 'transform': 'scale(1)', 'padding': '150px' })
      ])))
    ])
  ]
})
export class PlaygroundComponent implements OnInit {
  clock = Observable.interval(1000)
    .do(_ => console.log('observable created:'));

  stat1: string;
  stat2: string;

  constructor() {
  }

  ngOnInit() {
  }

  onGo() {
    this.stat1 = 'go';
  }
  onStop() {
    this.stat1 = 'stop';
  }

  onStart() {
    this.stat2 = 'start';
  }
  onEnd() {
    this.stat2 = 'end';
  }
}






