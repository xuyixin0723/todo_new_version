import { DBSchema } from '@ngrx/db';
export interface Components {
    id: number;
    X: number;
    Y: number;
    W: number;
    H: number;
}

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
    version: 1,
    name: 'pcbview_components', // 本地数据库的名称
    stores: {
      components: { // 这里的components是我们定义的数据表头名字,好比json数据内的分组属性
        autoIncrement: true, // id是否自动增长,当我们添加的时候
        primaryKey: 'id' // 设置主键类型,这里的id为我们定义数据内的属性,如果没有设置组件,
        // DBSchema会为我们自动生成一个唯一的id
      }
    },
};
