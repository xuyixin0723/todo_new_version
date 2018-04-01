import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import {NgForage, NgForageConfig} from '@ngforage/ngforage-ng5';

@Injectable()
export class DatabaseService {

  constructor(private readonly ngf: NgForage) { }

  /**
   *
   * @param key
   *  存储的数据key值，必须为string类型，根据key获取相应的value值
   *  如果没有相对应的数据，返回Observable<null>
   * @returns {any}
   */
  getItem<T>(key: string): Observable<T> {
    try { // IO操作时必须加try catch
      return Observable.fromPromise(this.ngf.getItem<T>(key));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 获取数据库中所有数据数组，数组内存储的为对象
   */
  getAllItems<T>(): Observable<T[]> {
    try {
      return this.getAllKeys().flatMap((keys) => {
        const itemsPromise = [];
        length = keys.length;
        if ( 0 !== length ) {
          for ( let i = 0; i < length; ++i) {
            itemsPromise.push(this.ngf.getItem(keys[i]).then(item => item));
          }
          return Observable.fromPromise(Promise.all(itemsPromise));
        } else {
          return of([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 存储数据
   * @param key
   *  key为string类型，存储数据的键值
   * @param value
   *  value为T,根据传入的数据类型，自动识别
   * @returns {any}
   */
  setItem<T>(key: string, value: T): Observable<T> {
    try {
      return Observable.fromPromise(this.ngf.setItem(key, value));
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 更新数据，适用于存储的value或item为对象类型
   * @param key
   *  key为某条数据的键值，这里代表被更新的数据键值
   * @param value
   *  value为对象类型
   */
  update(key: string, value: {}): Observable<boolean> {
    try {
      return Observable.fromPromise(this.ngf.getItem(key)
              .then((item) => {
                if (null !== item) {
                  const newItem = Object.assign(item, value);
                  return this.ngf.setItem(key, newItem)
                                 .then((result) => result !== null)
                                 .catch(e => {
                                   console.log(e);
                                   return false;
                                  });
                }
              }));
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 删除数据库中某条数据
   * @param key
   *  key为string，数据的键值
   * @returns {void}
   */
  removeItem(key: string): Observable<void> {
    try {
      return Observable.fromPromise(this.ngf.removeItem(key));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 删除所有的数据
   * @returns {void}
   */
  removeAllItems(): Observable<void> {
    try {
      return Observable.fromPromise(this.ngf.clear());
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 获取数据库中的数据条目数
   * @returns {number}
   */
  getLength(): Observable<number> {
    try {
      return Observable.fromPromise(this.ngf.length());
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 获取数据库中所有的key值，返回其Observable的string数组
   * @returns {string[]}
   */
  getAllKeys(): Observable<string[]> {
    try {
      return Observable.fromPromise(this.ngf.keys());
    } catch (error) {
      console.log(error);
    }
  }
}
