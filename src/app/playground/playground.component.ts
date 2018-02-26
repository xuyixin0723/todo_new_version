// import { Observable } from 'rxjs/Rx';/..
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/interval';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  clock = Observable.interval(1000)
    .do(_ => console.log('observable created:'));

  // clock: number;
  // subscription: Subscription;
  // index = 0;

  constructor() {

  }

  ngOnInit() {
    // this.subscription = Observable.interval(1000)
    //   ._do(_ => console.log('observable created: ' + this.index))
    //   .subscribe(value => {
    //     this.clock = value;
    //     this.index++;
    //   });
  }

}






