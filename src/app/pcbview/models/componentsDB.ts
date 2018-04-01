// import { DBSchema } from '@ngrx/db';
// import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
export interface Components {
    id: number;
    X: number;
    Y: number;
    W: number;
    H: number;
}

// declare interface RxComponentType {
//     id: number;
//     X: number;
//     Y: number;
//     W: number;
//     H: number;
// }
// // 文档是存储在集合中的单个对象。它可以与关系数据库表中的单个记录进行比较。
// export type RxComponent = RxDocument<RxComponentType>;

// // A collection stores documents of the same type.
// // 存储相同类型的集合，继承RxCollection，可以操作这个集合
// declare class RxComponentCollection extends RxCollection<RxComponentType> {
//   pouch: any;
// }
// /**
//  * RxDatabase-Object包含您的集合并处理更改事件的同步。
//  */
// export class RxComponentsDatabase extends RxDatabase {
//   component?: RxComponentCollection;
// }
// // 合并导出
// declare let _default: {
//   RxComponentCollection,
//   RxComponentsDatabase
// };

// export default _default;
