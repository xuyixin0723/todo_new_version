import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent {
  inputValue = '';
  @Input() placeholder = 'What needs to be done?';
  @Input() delay = 300;

  // detect the input value and output this to parent
  @Output() textChanges = new EventEmitter<string>();
  // detect the enter keyup event and output this to parent

  // 书上没有交代这里要把泛型类型boolean改成string
  // 如果不改会发现每次输入的事件都是true作为新的待办事项
  // 大家可以恢复代码试试看
  // @Output() onEnterUp = new EventEmitter<boolean>();
  @Output() onEnterUp = new EventEmitter<string>();



  constructor(private elementRef: ElementRef) {
    const event$ = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue)
      .debounceTime(this.delay)
      .distinctUntilChanged();
    event$.subscribe(input => this.textChanges.emit(input));
  }
  enterUp() {
    // this.onEnterUp.emit(true);
    this.onEnterUp.emit(this.inputValue);
    this.inputValue = '';
  }
}
