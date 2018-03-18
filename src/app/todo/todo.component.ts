import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { TodoService } from './todo.service';
import { Todo } from '../domain/entities';

import { TodoService } from './todo.service';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from './../domain/state';
import { TodoRequestType } from './../core/todo/actions/todo.action';
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
    private store$: Store<AppState>) {
      // 在构建TodoComponent的时候,获取最新的数据否则只能在创建完毕后
      // 在重新渲染,这里最好应该是放到服务里面,但是由于ActiveRouter的原因
      // 需要做一些调整才能实现,这里就不实现了
      const fetchData$ = this.service.getTodos()
        .flatMap( todos => {
          this.store$.dispatch({
            type: TodoRequestType.FETCH_FROM_API,
            payload: todos
          });
          return this.store$.select('todos');
        })
        // startWidth操作符为发出给定的第一个值
        // BehaviorSubject当然也可以做到,这里从一个空的数组开始,
        // 防止意外发生
        .startWith([]);
      // pluck操作符是获取对象的属性值,比如:
      /* const source = Rx.Observable.from([
          { name: 'Joe', age: 30 },
          { name: 'Sarah', age: 35 }
        ]);
        // 提取 name 属性
        const example = source.pluck('name');
        // 输出: "Joe", "Sarah"
        const subscribe = example.subscribe(val => console.log(val));
      */
      const filterData$ = this.route.params.pluck('filter')
        .do(value => {
          const filter = value as string;
          this.store$.dispatch({type: filter});
        })
        // select('todoFilter')为选择返回什么样的Observable数据
        // 这里我们设计的是返回函数
        .flatMap(_ => this.store$.select('todoFilter'));

      // 这里只有当fetchData$和filterData$都至少有一个值之后才会触发
      // 这里的第三个参数是projection 函数,projection的参数是所有Observable
      // 对象,当fetchData$和filterData$都有了值之后会调用这个函数
      this.todos = Observable.combineLatest(
        fetchData$,
        filterData$,
        (todos: Todo[], filter: any) => todos.filter(filter)
      );
    }
    ngOnInit() {
    }

    addTodo(desc: string): void {
      this.service.addTodo(desc);
    }
    toggleTodo(todo: Todo): void {
      this.service.toggleTodo(todo);
    }
    removeTodo(todo: Todo): void {
      this.service.deleteTodo(todo);
    }
    toggleAll(): void {
      this.service.toggleAll();
    }
    clearCompleted(): void {
      this.service.clearCompleted();
    }
}
