import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { TodoService } from './todo.service';
import { Todo } from '../domain/entities';

import { TodoService } from './todo.service';

import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Observable<Todo[]>;

  constructor(
    // @Inject('todoService') private service, // 利用该契机再强调一下使用@Inject的第二个不如再多import一次的原因
    private service: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    // 通过路由参数实现了对todoservice中dataStore的订阅
    this.route.params // 可以通过点击其他页面再回来 然后证明还会进入该断点 说明todoservice中dataStore为啥需要是BehaviorSubject
      .pluck('filter')// 这个pluck有点为了用而用，并没有用到filter里面的某个属性值
      .subscribe(filter => {
        this.service.filterTodos(filter.toString()); // 比起作者的代码不加toString()方法tslint会报警
        this.todos = this.service.todos;
      });
  }

  addTodo(desc: string) {
    this.service.addTodo(desc);
  }
  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }
  removeTodo(todo: Todo) {
    this.service.deleteTodo(todo);
  }
  toggleAll() {
    this.service.toggleAll();
  }
  clearCompleted() {
    this.service.clearCompleted();
  }
}
